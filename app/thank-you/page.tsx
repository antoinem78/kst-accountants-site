import type { Metadata } from 'next';
import Link from 'next/link';
import { site } from '@/lib/site';
import ThankYouConversion from '@/components/ThankYouConversion';

export const metadata: Metadata = {
  title: 'Thank you — we’ve got your details',
  description:
    'Your enquiry has been received. A member of the KST Accountants team will be in touch within one working day.',
  // Never index the conversion page — it has no organic value and would
  // pollute Search Console with a thin, duplicate-intent URL.
  robots: { index: false, follow: false },
  alternates: { canonical: '/thank-you' },
};

export default function ThankYouPage() {
  return (
    <>
      {/* Fires Google Ads conversion + GA4 lead event on mount */}
      <ThankYouConversion />

      <section className="relative overflow-hidden bg-navy-900 text-white">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.18]"
          style={{
            backgroundImage:
              'radial-gradient(700px 400px at 70% 30%, rgba(63,154,157,0.5), transparent 60%)',
          }}
        />
        <div className="container-x relative py-24 lg:py-32">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-gold-500">
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h1 className="h-display mt-6 !text-white">Thank you — we’ve got your details.</h1>
            <p className="prose-body mt-5 !text-navy-100">
              A member of the team at KST Accountants will be in touch within one working day.
              If it’s urgent, call us now on{' '}
              <a href={`tel:${site.phone.tel}`} className="font-semibold text-white underline underline-offset-2 hover:text-gold-400">
                {site.phone.display}
              </a>
              .
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-24">
        <div className="container-x mx-auto max-w-3xl">
          <p className="eyebrow text-center">While you wait</p>
          <h2 className="h-section mt-3 text-center">A few things that might help.</h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            <Link href="/tools/take-home-pay" className="card group text-center">
              <h3 className="font-display text-lg font-semibold text-navy-900">Take-home pay calculator</h3>
              <p className="mt-2 text-sm text-ink-muted">See your 2025/26 take-home pay in seconds.</p>
              <p className="mt-4 text-sm font-semibold text-navy-900">Open the calculator →</p>
            </Link>
            <Link href="/insights" className="card group text-center">
              <h3 className="font-display text-lg font-semibold text-navy-900">Insights</h3>
              <p className="mt-2 text-sm text-ink-muted">Practical tax and accounting guidance for owners.</p>
              <p className="mt-4 text-sm font-semibold text-navy-900">Read the latest →</p>
            </Link>
            <Link href="/#services" className="card group text-center">
              <h3 className="font-display text-lg font-semibold text-navy-900">Our services</h3>
              <p className="mt-2 text-sm text-ink-muted">Accountancy, tax, VAT, payroll and CIS.</p>
              <p className="mt-4 text-sm font-semibold text-navy-900">Explore services →</p>
            </Link>
          </div>
          <div className="mt-12 text-center">
            <Link href="/" className="btn-primary">Back to home</Link>
          </div>
        </div>
      </section>
    </>
  );
}
