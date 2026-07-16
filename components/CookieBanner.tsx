'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { readConsent, writeConsent } from '@/lib/analytics';

/**
 * Consent banner for Google Consent Mode v2. The Google tag is already loaded
 * (see components/Analytics.tsx) in a cookieless "denied" state; this banner
 * simply records the visitor's choice and calls gtag('consent','update') so
 * cookies + full measurement switch on only after an explicit Accept.
 */
export default function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (readConsent() === null) setShow(true);
  }, []);

  if (!show) return null;

  const choose = (granted: boolean) => {
    writeConsent(granted ? 'granted' : 'declined');
    if (typeof window !== 'undefined' && window.gtag) {
      const state = granted ? 'granted' : 'denied';
      window.gtag('consent', 'update', {
        ad_storage: state,
        ad_user_data: state,
        ad_personalization: state,
        analytics_storage: state,
      });
    }
    setShow(false);
  };

  return (
    <div
      role="region"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-[60] border-t border-navy-800 bg-navy-900 text-white shadow-lift"
    >
      <div className="container-x flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
        <p className="text-sm leading-relaxed text-navy-100">
          We use cookies to measure how visitors use this site and the performance
          of our advertising. We only set these cookies if you accept. See our{' '}
          <Link
            href="/privacy"
            className="font-medium text-white underline underline-offset-2 hover:text-gold-400"
          >
            privacy policy
          </Link>
          .
        </p>
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={() => choose(false)}
            className="rounded-full border border-white/30 bg-transparent px-5 py-2 text-xs font-semibold text-white transition hover:border-white hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
          >
            Decline
          </button>
          <button
            type="button"
            onClick={() => choose(true)}
            className="rounded-full bg-gold-500 px-5 py-2 text-xs font-semibold text-white shadow-soft transition hover:bg-gold-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
