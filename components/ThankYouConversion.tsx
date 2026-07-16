'use client';

import { useEffect } from 'react';
import { site } from '@/lib/site';

/**
 * Fires the Google Ads conversion (and a GA4 generate_lead event) when the
 * thank-you page loads — i.e. exactly once per completed form submission.
 *
 * Under Consent Mode v2 this fires regardless of the visitor's cookie choice:
 * a cookieless conversion ping when consent is denied, a full conversion when
 * granted. No-ops until adsId + adsLabel are configured (Vercel env or site.ts).
 */
export default function ThankYouConversion() {
  useEffect(() => {
    const { adsId, adsLabel, gaId } = site.tracking;

    const fire = (): boolean => {
      if (typeof window === 'undefined' || !window.gtag) return false;

      if (adsId && adsLabel) {
        window.gtag('event', 'conversion', {
          send_to: `${adsId}/${adsLabel}`,
        });
      }
      // GA4 lead event regardless of Ads config — useful for GA4 goals.
      if (gaId) {
        window.gtag('event', 'generate_lead', {
          currency: 'GBP',
          value: 0,
        });
      }
      return true;
    };

    // gtag may still be initialising on a hard navigation; retry briefly.
    if (fire()) return;
    let tries = 0;
    const id = window.setInterval(() => {
      tries += 1;
      if (fire() || tries > 20) window.clearInterval(id);
    }, 250);
    return () => window.clearInterval(id);
  }, []);

  return null;
}
