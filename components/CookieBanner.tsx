'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { site } from '@/lib/site';

const STORAGE_KEY = 'kst-cookie-consent';
type Consent = 'granted' | 'declined' | null;

function readConsent(): Consent {
  if (typeof window === 'undefined') return null;
  try {
    const v = window.localStorage.getItem(STORAGE_KEY);
    return v === 'granted' || v === 'declined' ? v : null;
  } catch {
    return null;
  }
}

function writeConsent(value: 'granted' | 'declined') {
  try {
    window.localStorage.setItem(STORAGE_KEY, value);
  } catch {
    /* localStorage blocked — banner will simply re-prompt next visit */
  }
}

/**
 * Inject GTM + GA4 client-side. Only called after the user grants consent —
 * keeps the site UK PECR compliant by not setting any analytics cookie until
 * the user has chosen to accept.
 */
function loadAnalytics() {
  if (typeof window === 'undefined') return;
  const w = window as Window & { __kstAnalyticsLoaded?: boolean };
  if (w.__kstAnalyticsLoaded) return;
  w.__kstAnalyticsLoaded = true;

  const { gtmId, gaId } = site.tracking;

  if (gtmId) {
    const s = document.createElement('script');
    s.id = 'gtm-loader';
    s.async = true;
    s.text = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${gtmId}');`;
    document.head.appendChild(s);
  }

  if (gaId) {
    const src = document.createElement('script');
    src.async = true;
    src.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
    document.head.appendChild(src);

    const inline = document.createElement('script');
    inline.id = 'ga4-config';
    inline.text = `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${gaId}', { anonymize_ip: true });`;
    document.head.appendChild(inline);
  }
}

export default function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = readConsent();
    if (consent === 'granted') {
      loadAnalytics();
    } else if (consent === null) {
      setShow(true);
    }
    // 'declined' → do nothing (no banner, no analytics)
  }, []);

  if (!show) return null;

  const accept = () => {
    writeConsent('granted');
    loadAnalytics();
    setShow(false);
  };

  const decline = () => {
    writeConsent('declined');
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
          We use analytics cookies to understand how visitors use this site so we
          can improve it. No marketing or advertising trackers. See our{' '}
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
            onClick={decline}
            className="rounded-full border border-white/30 bg-transparent px-5 py-2 text-xs font-semibold text-white transition hover:border-white hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
          >
            Decline
          </button>
          <button
            type="button"
            onClick={accept}
            className="rounded-full bg-gold-500 px-5 py-2 text-xs font-semibold text-white shadow-soft transition hover:bg-gold-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400"
          >
            Accept analytics
          </button>
        </div>
      </div>
    </div>
  );
}
