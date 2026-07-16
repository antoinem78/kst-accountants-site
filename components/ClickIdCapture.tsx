'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { captureClickIds } from '@/lib/click-ids';

/**
 * Persists ad click IDs (gclid / msclkid / fbclid) from the URL on every
 * navigation, so LeadForm can attach them to the GHL contact at submit time.
 * Renders nothing.
 */
export default function ClickIdCapture() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    captureClickIds();
  }, [pathname, searchParams]);

  return null;
}
