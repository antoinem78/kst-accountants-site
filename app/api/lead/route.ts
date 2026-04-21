import { NextResponse } from 'next/server';
import { leadSchema } from '@/lib/validation';
import { site } from '@/lib/site';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Very simple in-memory rate limit — Vercel/Edge-safe alternative
// would be an Upstash/KV counter. This is adequate for a small site.
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, { count: number; resetAt: number }>();

function rateLimitKey(req: Request) {
  const fwd = req.headers.get('x-forwarded-for') ?? '';
  const ip = fwd.split(',')[0]?.trim() || req.headers.get('x-real-ip') || 'unknown';
  return ip;
}
function rateLimit(ip: string) {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || entry.resetAt < now) {
    hits.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }
  entry.count += 1;
  return entry.count <= MAX_PER_WINDOW;
}

export async function POST(req: Request) {
  try {
    const ip = rateLimitKey(req);
    if (!rateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again in a minute.' },
        { status: 429 },
      );
    }

    const json = await req.json().catch(() => null);
    if (!json) return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });

    const parsed = leadSchema.safeParse(json);
    if (!parsed.success) {
      const firstIssue = parsed.error.issues[0];
      return NextResponse.json(
        { error: firstIssue?.message ?? 'Please check the form and try again.' },
        { status: 400 },
      );
    }
    const data = parsed.data;

    // Honeypot tripped — respond success to avoid signalling bots.
    if (data.website) {
      return NextResponse.json({ ok: true });
    }

    const ghlKey = process.env.GHL_API_KEY;
    const ghlLocation = process.env.GHL_LOCATION_ID;

    // If GHL isn't configured yet, log the lead and succeed so forms still work.
    if (!ghlKey || !ghlLocation) {
      console.warn(
        '[/api/lead] GHL not configured; lead was accepted but NOT forwarded:',
        {
          from: `${data.firstName} ${data.lastName}`,
          email: data.email,
          phone: data.phone,
          company: data.company,
          service: data.service,
          source: data.pageSource,
        },
      );
      return NextResponse.json({ ok: true, forwarded: false });
    }

    // GHL v2 Contacts upsert
    const ghlPayload = {
      locationId: ghlLocation,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      companyName: data.company || undefined,
      source: `kst-accountants.co.uk · ${data.pageSource || 'unknown'}`,
      tags: ['website-lead', data.service ? `service:${data.service.toLowerCase()}` : null].filter(Boolean),
      customFields: [
        data.service ? { key: 'service_of_interest', field_value: data.service } : null,
        data.message ? { key: 'enquiry_message', field_value: data.message } : null,
        { key: 'source_page', field_value: data.pageSource || '' },
      ].filter(Boolean),
    };

    const ghlRes = await fetch('https://services.leadconnectorhq.com/contacts/upsert', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${ghlKey}`,
        Version: '2021-07-28',
      },
      body: JSON.stringify(ghlPayload),
    });

    if (!ghlRes.ok) {
      const text = await ghlRes.text().catch(() => '');
      console.error('[/api/lead] GHL upsert failed', ghlRes.status, text);
      return NextResponse.json(
        { error: "We couldn't send your enquiry. Please call us on " + site.phone.display + '.' },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true, forwarded: true });
  } catch (err) {
    console.error('[/api/lead] unexpected error', err);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again or call us.' },
      { status: 500 },
    );
  }
}
