# KST Accountants — Website

Modern, conversion-optimised site for KST Accountants (Buckhurst Hill, Essex).
Built with Next.js 14 (App Router) + TypeScript + Tailwind CSS. Leads flow to GoHighLevel via a secure server API route.

---

## Tech stack

- **Next.js 14.2** (App Router, React Server Components)
- **TypeScript** (strict mode)
- **Tailwind CSS** with a custom navy/gold palette
- **Zod** for lead-form validation
- **GoHighLevel** CRM via `services.leadconnectorhq.com/contacts/upsert`
- **Google Tag Manager** `GTM-TT4QNR3G` + **GA4** `G-1S1VWVV2SE`
- **Vercel** for hosting (zero-config)

---

## Local development

```bash
# 1. Install dependencies
npm install

# 2. Copy env template and fill in the real keys
cp .env.example .env.local

# 3. Run the dev server
npm run dev
# open http://localhost:3000
```

Available scripts:

| Script | What it does |
|---|---|
| `npm run dev` | Start dev server with hot reload |
| `npm run build` | Production build (runs locally and on Vercel) |
| `npm run start` | Serve the production build |
| `npm run lint` | Next.js lint check |

---

## Environment variables

All keys live in `.env.local` (never commit this file). A template is in `.env.example`.

| Variable | Required | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | yes | Canonical base URL — used by metadata, sitemap.xml, OG tags. Set to `https://www.kst-accountants.co.uk` in production. |
| `GHL_API_KEY` | yes | GoHighLevel Private Integration API key (server-side only). |
| `GHL_LOCATION_ID` | yes | GHL sub-account / location ID that should receive the leads. |
| `NEXT_PUBLIC_GA_ID` | optional | GA4 measurement ID. Already set to `G-1S1VWVV2SE` (ported from the Weebly site). |
| `NEXT_PUBLIC_GTM_ID` | optional | Google Tag Manager container ID. Already set to `GTM-TT4QNR3G`. |

---

## Deployment to Vercel (step-by-step)

### 1. Push to GitHub

```bash
cd kst-accountants-site
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/<your-org>/kst-accountants-site.git
git push -u origin main
```

### 2. Import the repo into Vercel

1. Go to <https://vercel.com/new>.
2. Select the `kst-accountants-site` repo.
3. Framework preset will auto-detect **Next.js** — leave defaults.
4. Before the first deploy, open **Environment Variables** and add:
   - `NEXT_PUBLIC_SITE_URL` → `https://www.kst-accountants.co.uk`
   - `GHL_API_KEY` → (from GHL Private Integration)
   - `GHL_LOCATION_ID` → (from GHL sub-account settings)
   - `NEXT_PUBLIC_GA_ID` → `G-1S1VWVV2SE`
   - `NEXT_PUBLIC_GTM_ID` → `GTM-TT4QNR3G`
5. Click **Deploy**. First build takes ~90 seconds.

### 3. Connect the domain

1. In Vercel → Project → **Settings → Domains**, add `kst-accountants.co.uk` and `www.kst-accountants.co.uk`.
2. Vercel will show you DNS records. At the domain registrar (currently wherever Weebly had it):
   - For `kst-accountants.co.uk` (apex): add an **A record** → `76.76.21.21`
   - For `www.kst-accountants.co.uk`: add a **CNAME record** → `cname.vercel-dns.com`
3. Wait for DNS to propagate (usually a few minutes, up to 24 hours). Vercel will auto-issue a Let's Encrypt SSL certificate.
4. In Vercel → Domains, set **www.kst-accountants.co.uk** as the primary and redirect the apex to it (or vice-versa — just pick one and redirect).

### 4. Post-deploy checks

Open the live site and confirm:

- [ ] Homepage loads, hero slider rotates every ~6.5s.
- [ ] Phone number `020 3150 2074` appears in the header/footer and is clickable on mobile.
- [ ] `/services/accountancy`, `/services/taxation`, `/services/vat`, `/services/payroll`, `/services/cis` all render.
- [ ] `/about`, `/contact`, `/privacy` all render.
- [ ] Submit a test lead at `/contact` — you should see a new contact appear in GoHighLevel within ~2 seconds.
- [ ] `/sitemap.xml` and `/robots.txt` are reachable.
- [ ] GTM Preview mode fires the pageview for `GTM-TT4QNR3G`.
- [ ] GA4 Realtime shows the visit under `G-1S1VWVV2SE`.

---

## GoHighLevel setup

1. In GHL → Settings → **Private Integrations**, create a new integration.
2. Scopes needed: `contacts.write`, `contacts.readonly`.
3. Copy the token → use as `GHL_API_KEY` in Vercel env vars.
4. Location ID is in Settings → Business Profile (or in the URL of the sub-account).
5. In GHL → **Workflows**, create a trigger: "Contact Created with tag = `website-lead`" → send internal email to Kris, add to nurture pipeline, etc.

Lead payload sent to GHL includes:
- `firstName`, `lastName`, `email`, `phone`, `companyName`
- Custom field `service` (which service the prospect selected)
- Custom field `message`
- Custom field `pageSource` (which page they converted on — e.g. `services/vat`)
- Tags: `website-lead`, `kst-accountants`

If `GHL_API_KEY` isn't set, the API route logs the lead to stdout instead of failing — useful for dev.

---

## Tracking

- **GTM** and **GA4** are loaded via `next/script` in `app/layout.tsx` (strategy `afterInteractive`).
- The GA4 ID ported from the Weebly site is `G-1S1VWVV2SE`.
- The GTM container is `GTM-TT4QNR3G`.
- `<noscript>` iframe fallback for GTM is included.
- Lead form submissions also fire a `dataLayer.push({ event: 'lead_submit' })` on success so you can build a GTM conversion tag.

---

## Content editing

All site copy lives in plain TypeScript files so non-developers can still edit with a text editor:

| File | Edits |
|---|---|
| `lib/site.ts` | Business name, phone, email, address, opening hours |
| `lib/services.ts` | The 5 service pages (name, taglines, bullets, metadata) |
| `lib/faq.ts` | FAQ accordion items (question + answer) |
| `lib/testimonials.ts` | Client testimonials shown on home + service pages |
| `components/HeroSlider.tsx` | Homepage hero rotating headlines/subheads |
| `components/WhyChooseUs.tsx` | "Why choose us" 6-card grid |
| `components/NumericUSP.tsx` | The 4 stats (500+ clients, 15+ years, etc.) |
| `app/about/page.tsx` | About page copy, values, leadership |
| `app/privacy/page.tsx` | Privacy policy |

After any edit, commit & push to GitHub — Vercel auto-deploys within ~60 seconds.

---

## CRO features applied

The design brief included 12 conversion-rate optimisation recommendations. All are implemented:

1. Sticky header with a single primary CTA (`Book a consultation`).
2. Hero slider with rotating value propositions.
3. "Why choose us" 6-benefit grid above the fold.
4. Numeric USP section with animated count-up (500+, 15+, 98%, 100%).
5. FAQ accordion.
6. Testimonials with 5-star ratings and identity anchors.
7. Performance optimisation (system fonts with swap, next/image ready, no render-blocking scripts).
8. Expanded footer with services, contact, credentials.
9. All contact details are click-to-call / click-to-email.
10. About Us page with story, values and leadership.
11. Service pages with inline lead forms (sticky on desktop).
12. Service-specific hero banners on each service page.

---

## File structure

```
kst-accountants-site/
├─ app/
│  ├─ about/page.tsx
│  ├─ api/lead/route.ts         ← GHL integration (server)
│  ├─ contact/page.tsx
│  ├─ privacy/page.tsx
│  ├─ services/[slug]/page.tsx  ← dynamic service pages
│  ├─ globals.css
│  ├─ layout.tsx                ← GTM + GA4 injected here
│  ├─ not-found.tsx
│  ├─ page.tsx                  ← homepage
│  ├─ robots.ts
│  └─ sitemap.ts
├─ components/                   ← presentational components
├─ lib/                          ← content + validation
├─ public/                       ← static assets (favicons, OG image)
├─ next.config.js
├─ package.json
├─ postcss.config.js
├─ tailwind.config.ts
├─ tsconfig.json
└─ .env.example
```

---

## Support / next steps

- Ongoing content (blog, case studies) can be added under `app/blog/` in the same pattern.
- To add a new service, edit `lib/services.ts` — the dynamic route and sitemap will pick it up automatically.
- Any GHL workflow changes happen in GHL, no code needed.
