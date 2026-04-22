import Link from 'next/link';
import { site } from '@/lib/site';
import { services } from '@/lib/services';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative mt-24 bg-navy-950 text-navy-100">
      <div className="container-x py-16">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 font-display text-xl font-semibold text-white"
            >
              <span
                aria-hidden
                className="grid h-10 w-10 place-items-center rounded-lg bg-gold-500 font-sans text-sm font-bold text-navy-900"
              >
                KST
              </span>
              {site.name}
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-navy-200">
              {site.shortDescription}
            </p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {site.credentials.memberships.map((m) => (
                <li
                  key={m}
                  className="rounded-full border border-navy-700 bg-navy-900/60 px-3 py-1 text-xs text-navy-100"
                >
                  {m}
                </li>
              ))}
            </ul>
          </div>

          <div className="grid gap-10 sm:grid-cols-3 lg:col-span-8">
            <div>
              <h3 className="text-sm font-semibold tracking-wide text-white">Services</h3>
              <ul className="mt-4 space-y-2.5 text-sm">
                {services.map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={`/services/${s.slug}`}
                      className="text-navy-200 transition hover:text-white"
                    >
                      {s.shortName}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold tracking-wide text-white">Company</h3>
              <ul className="mt-4 space-y-2.5 text-sm">
                <li><Link href="/about" className="text-navy-200 hover:text-white">About us</Link></li>
                <li><Link href="/#why-choose-us" className="text-navy-200 hover:text-white">Why choose us</Link></li>
                <li><Link href="/#faqs" className="text-navy-200 hover:text-white">FAQs</Link></li>
                <li><Link href="/contact" className="text-navy-200 hover:text-white">Contact</Link></li>
                <li><Link href="/privacy" className="text-navy-200 hover:text-white">Privacy policy</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold tracking-wide text-white">Get in touch</h3>
              <ul className="mt-4 space-y-3 text-sm">
                <li>
                  <a
                    href={`tel:${site.phone.tel}`}
                    className="flex items-start gap-2 text-navy-200 hover:text-white"
                  >
                    <IconPhone />
                    <span>{site.phone.display}</span>
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${site.email.general}`}
                    className="flex items-start gap-2 text-navy-200 hover:text-white"
                  >
                    <IconMail />
                    <span>{site.email.general}</span>
                  </a>
                </li>
                <li className="flex items-start gap-2 text-navy-200">
                  <IconPin />
                  <address className="not-italic">
                    {site.address.line1}<br />
                    {site.address.line2}<br />
                    {site.address.city}, {site.address.region} {site.address.postcode}
                  </address>
                </li>
              </ul>
              <p className="mt-5 text-xs text-navy-300">
                {site.hours.map((h) => (
                  <span key={h.days} className="block">
                    {h.days}: {h.time}
                  </span>
                ))}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-navy-800 pt-8 text-xs text-navy-300 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {site.legalName}. All rights reserved.</p>
          <p>Registered in England. Regulated for a range of investment business activities by ACCA.</p>
        </div>
      </div>
    </footer>
  );
}

function IconPhone() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0" aria-hidden>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}
function IconMail() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0" aria-hidden>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 6-10 7L2 6" />
    </svg>
  );
}
function IconPin() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0" aria-hidden>
      <path d="M20 10c0 7-8 12-8 12s-8-5-8-12a8 8 0 0 1 16 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}
