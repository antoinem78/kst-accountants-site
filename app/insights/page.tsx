import type { Metadata } from 'next';
import Link from 'next/link';
import { insights, formatInsightDate } from '@/lib/insights';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Insights — tax planning, MTD, and accounting guidance',
  description:
    'Practical, plain-English guidance on UK tax, accounts and Making Tax Digital, written by KST Accountants for owner-managed businesses.',
  alternates: { canonical: `${site.url}/insights` },
  openGraph: {
    title: `Insights | ${site.name}`,
    description:
      'Practical, plain-English guidance on UK tax and accounting, for owner-managed businesses.',
    url: `${site.url}/insights`,
    type: 'website',
  },
};

export default function InsightsIndex() {
  const sorted = [...insights].sort((a, b) =>
    a.publishedAt < b.publishedAt ? 1 : -1,
  );

  return (
    <>
      <section className="bg-bg-muted py-16 lg:py-20">
        <div className="container-x max-w-3xl">
          <p className="eyebrow">Insights</p>
          <h1 className="h-display mt-3">
            Plain-English tax and accounting guidance.
          </h1>
          <p className="prose-body mt-5">
            Short, practical reads on tax planning, Making Tax Digital, and the
            things owner-managed businesses ask us most often. No jargon.
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="container-x">
          <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {sorted.map((post) => (
              <li key={post.slug}>
                <Link
                  href={`/insights/${post.slug}`}
                  className="group flex h-full flex-col rounded-2xl border border-navy-100 bg-white p-7 shadow-soft transition hover:-translate-y-0.5 hover:shadow-lift"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-700">
                    {post.category}
                  </p>
                  <h2 className="mt-3 font-display text-xl font-semibold leading-snug text-navy-900">
                    {post.title}
                  </h2>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-muted">
                    {post.excerpt}
                  </p>
                  <p className="mt-5 text-xs text-ink-soft">
                    {formatInsightDate(post.publishedAt)} · {post.readMinutes} min read
                  </p>
                  <p className="mt-2 text-sm font-semibold text-navy-900 transition group-hover:text-gold-600">
                    Read more →
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-navy-900 py-16 text-white">
        <div className="container-x flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <h2 className="h-section !text-white">Want this kind of advice for your business?</h2>
            <p className="mt-2 text-sm text-navy-100">
              Free 30-minute consultation. No obligation.
            </p>
          </div>
          <Link href="/contact" className="btn-gold">Book a consultation</Link>
        </div>
      </section>
    </>
  );
}
