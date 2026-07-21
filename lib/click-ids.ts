// Ad click-ID capture for offline conversion tracking.
// A visitor who arrives from a paid ad carries ?gclid= (Google), ?msclkid= (Microsoft)
// or ?fbclid= (Meta) on the landing URL. We persist these client-side so that when
// the lead form is submitted, possibly several pages later, the IDs travel to GHL
// with the contact, ready for offline conversion upload when the lead closes.

const STORE_KEY = 'kst_click_ids';
const TTL_MS = 90 * 24 * 60 * 60 * 1000; // Google accepts gclids up to 90 days old

export type ClickIds = { gclid?: string; msclkid?: string; fbclid?: string };

type Stored = ClickIds & { capturedAt: number };

/** Call on every page load; captures any click IDs present in the URL. */
export function captureClickIds(): void {
  if (typeof window === 'undefined') return;
  try {
    const params = new URLSearchParams(window.location.search);
    const found: ClickIds = {};
    for (const key of ['gclid', 'msclkid', 'fbclid'] as const) {
      const v = params.get(key);
      if (v && v.length <= 200) found[key] = v;
    }
    if (Object.keys(found).length === 0) return;
    // Most-recent click wins per network; keep other networks' earlier IDs.
    const existing = readClickIds();
    const merged: Stored = { ...existing, ...found, capturedAt: Date.now() };
    window.localStorage.setItem(STORE_KEY, JSON.stringify(merged));
  } catch {
    // Private mode / storage disabled, attribution is best-effort.
  }
}

/** Read stored click IDs, dropping them once expired. */
export function readClickIds(): ClickIds {
  if (typeof window === 'undefined') return {};
  try {
    const raw = window.localStorage.getItem(STORE_KEY);
    if (!raw) return {};
    const stored = JSON.parse(raw) as Stored;
    if (!stored.capturedAt || Date.now() - stored.capturedAt > TTL_MS) {
      window.localStorage.removeItem(STORE_KEY);
      return {};
    }
    const { gclid, msclkid, fbclid } = stored;
    return { gclid, msclkid, fbclid };
  } catch {
    return {};
  }
}
