// Shared consent storage helpers. The key matches the value the CookieBanner
// and the Consent Mode v2 bootstrap (components/Analytics.tsx) both read/write.
export const CONSENT_KEY = 'kst-cookie-consent';
export type Consent = 'granted' | 'declined' | null;

export function readConsent(): Consent {
  if (typeof window === 'undefined') return null;
  try {
    const v = window.localStorage.getItem(CONSENT_KEY);
    return v === 'granted' || v === 'declined' ? v : null;
  } catch {
    return null;
  }
}

export function writeConsent(value: 'granted' | 'declined') {
  try {
    window.localStorage.setItem(CONSENT_KEY, value);
  } catch {
    /* localStorage blocked, banner will simply re-prompt next visit */
  }
}
