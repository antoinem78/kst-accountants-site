import type { Metadata } from 'next';
import Calculator from './Calculator';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'UK Take-Home Pay Calculator (2025/26)',
  description:
    'Free 2025/26 UK take-home pay calculator — see your monthly net after income tax, National Insurance, and pension. Built by KST Accountants.',
  alternates: { canonical: `${site.url}/tools/take-home-pay` },
  openGraph: {
    title: 'UK Take-Home Pay Calculator (2025/26)',
    description:
      'See what lands in your bank after income tax, NI, and pension. UK 2025/26 rates.',
    url: `${site.url}/tools/take-home-pay`,
    type: 'website',
  },
};

export default function TakeHomePayPage() {
  return (
    <>
      <section className="bg-bg-muted py-12 lg:py-16">
        <div className="container-x max-w-3xl">
          <p className="eyebrow">Free tool</p>
          <h1 className="h-display mt-3">UK take-home pay calculator</h1>
          <p className="prose-body mt-5">
            Enter your gross salary and we&rsquo;ll show your net take-home for the
            2025/26 tax year, with income tax, National Insurance, and pension
            broken out so you can see where every pound goes.
          </p>
        </div>
      </section>

      <section className="py-14 lg:py-20">
        <div className="container-x">
          <Calculator />
        </div>
      </section>
    </>
  );
}
