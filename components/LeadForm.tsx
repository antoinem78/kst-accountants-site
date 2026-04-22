'use client';

import { useState } from 'react';
import { services } from '@/lib/services';

type Props = {
  /** Helps identify lead source in GHL (e.g. "homepage", "services/vat") */
  pageSource?: string;
  /** Preselect a service */
  defaultService?: string;
  /** Heading above the form */
  heading?: string;
  /** Subheading below heading */
  subheading?: string;
  /** Optional class for outer wrapper */
  className?: string;
  /** Compact layout (e.g. inline on service page) */
  compact?: boolean;
};

type Status = 'idle' | 'submitting' | 'success' | 'error';

export default function LeadForm({
  pageSource,
  defaultService,
  heading = 'Book a free consultation',
  subheading = 'Leave your details — Kris will be in touch within one working day.',
  className = '',
  compact = false,
}: Props) {
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('submitting');
    setError(null);

    const fd = new FormData(e.currentTarget);
    const payload = {
      firstName: String(fd.get('firstName') ?? ''),
      lastName: String(fd.get('lastName') ?? ''),
      email: String(fd.get('email') ?? ''),
      phone: String(fd.get('phone') ?? ''),
      company: String(fd.get('company') ?? ''),
      service: String(fd.get('service') ?? ''),
      message: String(fd.get('message') ?? ''),
      consent: fd.get('consent') === 'on',
      website: String(fd.get('website') ?? ''), // honeypot
      pageSource: pageSource ?? (typeof window !== 'undefined' ? window.location.pathname : ''),
    };

    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data?.error ?? 'Something went wrong. Please try again or call us.');
        setStatus('error');
        return;
      }
      setStatus('success');
      (e.target as HTMLFormElement).reset();
    } catch {
      setError('Network error. Please try again or call us.');
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div
        role="status"
        className={`rounded-2xl border border-gold-200 bg-gold-50 p-8 text-navy-900 ${className}`}
      >
        <div className="grid h-12 w-12 place-items-center rounded-full bg-gold-500">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden><polyline points="20 6 9 17 4 12" /></svg>
        </div>
        <h3 className="mt-4 font-display text-2xl font-semibold">Thanks — we&rsquo;ve got your details.</h3>
        <p className="mt-2 text-ink-muted">
          Kris will reply within one working day. If it&rsquo;s urgent, call us on&nbsp;
          <a className="font-semibold text-navy-900 underline" href="tel:+442031502074">020 3150 2074</a>.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className={`rounded-2xl border border-navy-100 bg-white p-6 shadow-soft sm:p-8 ${className}`}
    >
      {heading && (
        <div className="mb-6">
          <h3 className="font-display text-2xl font-semibold text-navy-900">{heading}</h3>
          {subheading && <p className="mt-1 text-sm text-ink-muted">{subheading}</p>}
        </div>
      )}

      <div className={compact ? 'grid gap-4' : 'grid gap-4 sm:grid-cols-2'}>
        <div>
          <label htmlFor="firstName" className="label">First name *</label>
          <input id="firstName" name="firstName" autoComplete="given-name" required className="input" />
        </div>
        <div>
          <label htmlFor="lastName" className="label">Last name *</label>
          <input id="lastName" name="lastName" autoComplete="family-name" required className="input" />
        </div>
        <div>
          <label htmlFor="email" className="label">Email *</label>
          <input id="email" name="email" type="email" autoComplete="email" required className="input" />
        </div>
        <div>
          <label htmlFor="phone" className="label">Phone *</label>
          <input id="phone" name="phone" type="tel" autoComplete="tel" required className="input" />
        </div>
        <div className={compact ? '' : 'sm:col-span-2'}>
          <label htmlFor="company" className="label">Business name (optional)</label>
          <input id="company" name="company" autoComplete="organization" className="input" />
        </div>
        <div className={compact ? '' : 'sm:col-span-2'}>
          <label htmlFor="service" className="label">Service you need</label>
          <select id="service" name="service" defaultValue={defaultService ?? ''} className="input">
            <option value="">Not sure yet — happy to discuss</option>
            {services.map((s) => (
              <option key={s.slug} value={s.name}>{s.name}</option>
            ))}
            <option value="Other">Other</option>
          </select>
        </div>
        <div className={compact ? '' : 'sm:col-span-2'}>
          <label htmlFor="message" className="label">Anything we should know? (optional)</label>
          <textarea id="message" name="message" rows={4} className="input" />
        </div>

        {/* Honeypot */}
        <div className="hidden" aria-hidden>
          <label htmlFor="website">Website</label>
          <input id="website" name="website" tabIndex={-1} autoComplete="off" />
        </div>

        <div className={compact ? '' : 'sm:col-span-2'}>
          <label className="flex items-start gap-3 text-sm text-ink-muted">
            <input
              type="checkbox"
              name="consent"
              required
              className="mt-1 h-4 w-4 rounded border-navy-300 text-navy-900 focus:ring-navy-700"
            />
            <span>
              I agree to be contacted about my enquiry and have read the{' '}
              <a href="/privacy" className="font-medium text-navy-900 underline">privacy policy</a>.
            </span>
          </label>
        </div>
      </div>

      {error && (
        <p role="alert" className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="btn-primary mt-6 w-full disabled:cursor-wait disabled:opacity-80"
      >
        {status === 'submitting' ? 'Sending…' : 'Request my free consultation'}
      </button>

      <p className="mt-3 text-center text-xs text-ink-soft">
        We never share your details. One-to-one reply, no spam.
      </p>
    </form>
  );
}
