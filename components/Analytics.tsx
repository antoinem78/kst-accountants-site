'use client';

import { useEffect } from 'react';
import { site } from '@/lib/site';
import { readConsent } from '@/lib/analytics';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    __kstTagLoaded?: boolean;
  }
}

/**
 * Google Consent Mode v2 bootstrap.
 *
 * Unlike a hard cookie gate, the Google tag ALWAYS loads here but starts in a
 * fully "denied" state. In denied mode Google sets no cookies and instead sends
 * cookieless "pings", so conversions and analytics are still measured in
 * aggregate, UK PECR friendly, while personal/cookie data only flows once the
 * visitor accepts via the CookieBanner (which calls gtag('consent','update')).
 */
export default function Analytics() {
  useEffect(() => {
    if (typeof window === 'undefined' || window.__kstTagLoaded) return;
    window.__kstTagLoaded = true;

    const { gaId, gtmId, adsId } = site.tracking;

    window.dataLayer = window.dataLayer || [];
    function gtag(...args: unknown[]) {
      window.dataLayer!.push(args);
    }
    window.gtag = gtag as Window['gtag'];

    // Default: deny everything until the visitor chooses.
    gtag('consent', 'default', {
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      analytics_storage: 'denied',
      wait_for_update: 500,
    });

    // Re-apply a previously stored acceptance before the first hit reports.
    if (readConsent() === 'granted') {
      gtag('consent', 'update', {
        ad_storage: 'granted',
        ad_user_data: 'granted',
        ad_personalization: 'granted',
        analytics_storage: 'granted',
      });
    }

    gtag('js', new Date());
    if (gaId) gtag('config', gaId, { anonymize_ip: true });
    if (adsId) gtag('config', adsId);

    // One gtag.js library serves both GA4 and Google Ads.
    const tagId = gaId || adsId;
    if (tagId) {
      const s = document.createElement('script');
      s.async = true;
      s.src = `https://www.googletagmanager.com/gtag/js?id=${tagId}`;
      document.head.appendChild(s);
    }

    // GTM container kept for tag-management parity with the previous setup.
    if (gtmId) {
      const g = document.createElement('script');
      g.async = true;
      g.text = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtmId}');`;
      document.head.appendChild(g);
    }
  }, []);

  return null;
}
