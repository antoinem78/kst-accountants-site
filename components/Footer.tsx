import Link from 'next/link';
import Image from 'next/image';
import { site } from '@/lib/site';
import { services } from '@/lib/services';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative mt-24 bg-navy-950 text-navy-100">
      <div className="container-x py-16">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Link href="/" className="inline-flex items-center" aria-label={`${site.name} — home`}>
              <Image
                src={site.brand.logoUrl}
                alt={`${site.name}`}
                width={194}
                height={100}
                className="h-12 w-auto brightness-0 invert"
              />
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
            <div className="mt-6 flex items-center gap-3" aria-label="Social links">
              <SocialLink href={site.social.facebook} label="Facebook"><IconFacebook /></SocialLink>
              <SocialLink href={site.social.linkedin} label="LinkedIn"><IconLinkedIn /></SocialLink>
              <SocialLink href={site.social.x} label="X (Twitter)"><IconX /></SocialLink>
              <SocialLink href={site.social.instagram} label="Instagram"><IconInstagram /></SocialLink>
            </div>
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
                <li><Link href="/insights" className="text-navy-200 hover:text-white">Insights</Link></li>
                <li><Link href="/tools/take-home-pay" className="text-navy-200 hover:text-white">Take-home pay calculator</Link></li>
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

function SocialLink({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  if (!href) return null;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="grid h-9 w-9 place-items-center rounded-full border border-navy-700 bg-navy-900/60 text-navy-100 transition hover:border-gold-500 hover:bg-gold-500 hover:text-navy-950"
    >
      {children}
    </a>
  );
}
function IconFacebook() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M13.5 22v-8h2.7l.4-3.1h-3.1V8.9c0-.9.3-1.5 1.6-1.5h1.7V4.6C16.5 4.5 15.6 4.4 14.6 4.4c-2.3 0-3.9 1.4-3.9 4v2.5H8v3.1h2.7V22h2.8z" />
    </svg>
  );
}
function IconLinkedIn() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.5 2h-17A1.5 1.5 0 0 0 2 3.5v17A1.5 1.5 0 0 0 3.5 22h17a1.5 1.5 0 0 0 1.5-1.5v-17A1.5 1.5 0 0 0 20.5 2zM8 19H5V9h3v10zM6.5 7.5A1.7 1.7 0 1 1 8.2 5.8 1.7 1.7 0 0 1 6.5 7.5zM19 19h-3v-5.3c0-1.3-.5-2.1-1.6-2.1a1.8 1.8 0 0 0-1.7 1.2 2.2 2.2 0 0 0-.1.8V19h-3V9h3v1.3A3 3 0 0 1 15.3 8.8c2 0 3.7 1.3 3.7 4.1V19z" />
    </svg>
  );
}
function IconX() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M18.9 2h3.3l-7.2 8.2L23.4 22h-6.6l-5.1-6.8L5.7 22H2.4l7.7-8.8L1.6 2h6.8l4.6 6.2L18.9 2zm-1.2 18h1.8L7.3 3.9H5.4l12.3 16.1z" />
    </svg>
  );
}
function IconInstagram() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="4.5" />
      <circle cx="12" cy="12" r="3.8" />
      <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}
