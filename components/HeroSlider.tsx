'use client';

import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import { site } from '@/lib/site';

type Slide = {
  eyebrow: string;
  headline: React.ReactNode;
  sub: string;
  cta: { href: string; label: string };
  secondaryCta?: { href: string; label: string };
};

const slides: Slide[] = [
  {
    eyebrow: 'Tax savings, built in',
    headline: (
      <>
        Keep more of <span className="text-gold-500">what you earn</span> — without the stress.
      </>
    ),
    sub: "Pro-active tax planning that catches every legitimate saving before your year-end. Most new clients pay for our first year in the first tax review.",
    cta: { href: '/contact', label: 'Free tax review' },
    secondaryCta: { href: '/services/taxation', label: 'Tax services' },
  },
  {
    eyebrow: 'Compliance without drama',
    headline: (
      <>
        Accounts <span className="text-gold-500">filed early</span>, never late.
      </>
    ),
    sub: "Annual accounts, VAT, payroll and MTD handled end-to-end by chartered certified accountants. No last-minute surprises — ever.",
    cta: { href: '/services/accountancy', label: 'Our accountancy service' },
    secondaryCta: { href: '/contact', label: 'Talk to Kris' },
  },
  {
    eyebrow: 'Industry specialists',
    headline: (
      <>
        CIS contractors <span className="text-gold-500">and subcontractors</span> — fast refunds.
      </>
    ),
    sub: "Monthly CIS returns, subcontractor verification, and tax refunds back from HMRC quickly. We know the construction industry inside out.",
    cta: { href: '/services/cis', label: 'CIS services' },
    secondaryCta: { href: '/contact', label: 'Claim a refund' },
  },
  {
    eyebrow: 'A real person, not a call centre',
    headline: (
      <>
        Direct access to your <span className="text-gold-500">own accountant</span>.
      </>
    ),
    sub: "Pick up the phone, send an email, drop into our Buckhurst Hill office — you always get Kris, not a helpdesk.",
    cta: { href: '/about', label: 'Meet the team' },
    secondaryCta: { href: `tel:${site.phone.tel}`, label: site.phone.display },
  },
];

const INTERVAL = 6500;

export default function HeroSlider() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const go = useCallback((n: number) => setIndex((n + slides.length) % slides.length), []);
  const next = useCallback(() => go(index + 1), [go, index]);
  const prev = useCallback(() => go(index - 1), [go, index]);

  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(next, INTERVAL);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [next, paused]);

  // Keyboard nav
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [next, prev]);

  return (
    <section
      aria-roledescription="carousel"
      aria-label="What we do"
      className="relative overflow-hidden bg-navy-900 text-white"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {/* decorative */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            'radial-gradient(600px 300px at 80% 20%, rgba(63,154,157,0.55), transparent 60%), radial-gradient(700px 400px at 10% 90%, rgba(86,159,181,0.55), transparent 60%)',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.3) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="container-x relative grid grid-cols-1 items-center gap-12 py-16 sm:py-20 lg:min-h-[720px] lg:grid-cols-12 lg:py-28">
        <div className="lg:col-span-7">
          <div className="relative min-h-[420px] sm:min-h-[380px] lg:min-h-0">
            {slides.map((s, i) => (
              <div
                key={i}
                role="group"
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${slides.length}`}
                aria-hidden={i !== index}
                className={[
                  'absolute inset-0 flex flex-col justify-center transition-all duration-700 ease-out lg:static lg:h-auto',
                  i === index ? 'opacity-100 translate-y-0' : 'pointer-events-none opacity-0 translate-y-3',
                ].join(' ')}
              >
                <p className="eyebrow !text-gold-400">{s.eyebrow}</p>
                <h1 className="h-display mt-4 !text-white">{s.headline}</h1>
                <p className="prose-body mt-6 max-w-xl !text-navy-100">{s.sub}</p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link href={s.cta.href} className="btn-gold">
                    {s.cta.label}
                  </Link>
                  {s.secondaryCta && (
                    <Link
                      href={s.secondaryCta.href}
                      className="btn-ghost !text-white !border-white/30 hover:!bg-white/10"
                    >
                      {s.secondaryCta.label}
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trust block on the right */}
        <aside className="relative lg:col-span-5" aria-label="At a glance">
          <div className="card !bg-white/95 !border-white/30 lg:ml-auto lg:max-w-md">
            <p className="eyebrow">Why owners call us first</p>
            <ul className="mt-4 space-y-3.5">
              {[
                'Chartered Certified Accountants',
                'Fixed fees agreed upfront',
                'Free consultation & tax review',
                'Always filed ahead of deadline',
              ].map((t) => (
                <li key={t} className="flex items-start gap-3 text-ink">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-gold-500">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden><polyline points="20 6 9 17 4 12" /></svg>
                  </span>
                  <span className="text-sm font-medium">{t}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 border-t border-navy-100 pt-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-ink-soft">Speak to an accountant</p>
              <a
                href={`tel:${site.phone.tel}`}
                className="mt-1 block font-display text-2xl font-semibold text-navy-900 hover:text-gold-600"
              >
                {site.phone.display}
              </a>
              <p className="text-xs text-ink-muted">Mon – Fri, 9:00 – 17:30</p>
            </div>
          </div>
        </aside>
      </div>

      {/* Controls */}
      <div className="relative pb-8">
        <div className="container-x flex items-center justify-between">
          <div className="flex items-center gap-2" role="tablist" aria-label="Choose slide">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-current={i === index}
                aria-label={`Slide ${i + 1}`}
                onClick={() => go(i)}
                className="slider-dot"
              />
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={prev}
              aria-label="Previous slide"
              className="grid h-10 w-10 place-items-center rounded-full border border-white/30 text-white transition hover:bg-white/10"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><polyline points="15 18 9 12 15 6" /></svg>
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next slide"
              className="grid h-10 w-10 place-items-center rounded-full border border-white/30 text-white transition hover:bg-white/10"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><polyline points="9 18 15 12 9 6" /></svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
