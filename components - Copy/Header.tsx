'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { site } from '@/lib/site';
import { services } from '@/lib/services';

const primaryNav = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/#services', label: 'Services' },
  { href: '/#faqs', label: 'FAQs' },
  { href: '/contact', label: 'Contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change (hash nav safety)
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header
      className={[
        'sticky top-0 z-50 w-full backdrop-blur transition-all duration-200',
        scrolled
          ? 'bg-white/90 shadow-[0_1px_0_rgba(11,37,69,0.08)]'
          : 'bg-white/70',
      ].join(' ')}
      role="banner"
    >
      <div className="container-x flex h-16 items-center justify-between gap-4 sm:h-20">
        <Link
          href="/"
          aria-label={`${site.name} — home`}
          className="flex items-center gap-2.5 font-display text-lg font-semibold tracking-tight text-navy-900"
        >
          <span
            aria-hidden
            className="grid h-9 w-9 place-items-center rounded-lg bg-navy-900 font-sans text-sm font-bold text-gold-500"
          >
            KST
          </span>
          <span className="hidden sm:inline">{site.name}</span>
        </Link>

        <nav
          aria-label="Primary"
          className="hidden items-center gap-8 md:flex"
        >
          {primaryNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-ink-muted transition hover:text-navy-900"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href={`tel:${site.phone.tel}`}
            className="text-sm font-semibold text-navy-900 hover:text-gold-600"
            aria-label={`Call ${site.name} on ${site.phone.display}`}
          >
            {site.phone.display}
          </a>
          <Link href="/contact" className="btn-gold !py-2.5 !px-5">
            Book a Consultation
          </Link>
        </div>

        <button
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-navy-900 hover:bg-navy-50 md:hidden"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
            {open ? (
              <>
                <path d="M6 6l12 12" />
                <path d="M18 6L6 18" />
              </>
            ) : (
              <>
                <path d="M3 6h18" />
                <path d="M3 12h18" />
                <path d="M3 18h18" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile panel */}
      <div
        id="mobile-nav"
        className={[
          'md:hidden',
          open ? 'block' : 'hidden',
          'border-t border-navy-100 bg-white',
        ].join(' ')}
      >
        <nav aria-label="Mobile" className="container-x flex flex-col py-4">
          {primaryNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-2 py-3 text-base font-medium text-ink hover:bg-navy-50"
            >
              {item.label}
            </Link>
          ))}
          <div className="mt-2 border-t border-navy-100 pt-4">
            <p className="eyebrow mb-2">Services</p>
            {services.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-2 py-2 text-sm text-ink-muted hover:bg-navy-50 hover:text-navy-900"
              >
                {s.name}
              </Link>
            ))}
          </div>
          <div className="mt-4 flex flex-col gap-2 border-t border-navy-100 pt-4">
            <a
              href={`tel:${site.phone.tel}`}
              className="flex items-center justify-center gap-2 rounded-full bg-navy-50 px-4 py-3 text-sm font-semibold text-navy-900"
            >
              <PhoneIcon />
              {site.phone.display}
            </a>
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="btn-gold w-full"
            >
              Book a Consultation
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}

function PhoneIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}
