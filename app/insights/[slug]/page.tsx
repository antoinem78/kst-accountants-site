import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getInsight, getInsightSlugs, formatInsightDate, insights } from '@/lib/insights';
import { site } from '@/lib/site';

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  return getInsightSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const post = getInsight(slug);
  if (!post) return { title: 'Not found' };
  const url = `${site.url}/insights/${post.slug}`;
  return {
    title: post.title,
    description: post.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      url,
      title: post.title,
      description: post.metaDescription,
      publishedTime: post.publishedAt,
      authors: [site.name],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.metaDescription,
    },
  };
}

export default async function InsightPage({ params }: { params: Params }) {
  const { slug } = await params;
  const post = getInsight(slug);
  if (!post) notFound();

  const blogPosting = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.metaDescription,
    datePublished: post.publishedAt,
    author: { '@type': 'Organization', name: site.name, url: site.url },
    publisher: {
      '@type': 'Organization',
      name: site.name,
      url: site.url,
      logo: { '@type': 'ImageObject', url: `${site.url}/og-image.png` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${site.url}/insights/${post.slug}` },
  };

  const related = insights
    .filter((p) => p.slug !== post.slug)
    .slice(0, 2);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPosting) }}
      />

      <article>
        <header className="bg-bg-muted py-16 lg:py-20">
          <div className="container-x max-w-3xl">
            <Link href="/insights" className="text-sm font-semibold text-gold-700 hover:text-gold-600">
              ← All insights
            </Link>
            <p className="eyebrow mt-6">{post.category}</p>
            <h1 className="h-display mt-3">{post.title}</h1>
            <p className="mt-5 text-sm text-ink-soft">
              {formatInsightDate(post.publishedAt)} · {post.readMinutes} min read · By {site.name}
            </p>
          </div>
        </header>

        <div className="py-14 lg:py-20">
          <div
            className="container-x insights-prose max-w-3xl"
            dangerouslySetInnerHTML={{ __html: post.body }}
          />
        </div>
      </article>

      {related.length > 0 && (
        <section className="border-t border-navy-100 py-14 lg:py-20">
          <div className="container-x">
            <h2 className="h-section">Keep reading</h2>
            <ul className="mt-10 grid gap-6 md:grid-cols-2">
              {related.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/insights/${p.slug}`}
                    className="group flex h-full flex-col rounded-2xl border border-navy-100 bg-white p-7 shadow-soft transition hover:-translate-y-0.5 hover:shadow-lift"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-700">
                      {p.category}
                    </p>
                    <h3 className="mt-3 font-display text-xl font-semibold leading-snug text-navy-900">
                      {p.title}
                    </h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-muted">
                      {p.excerpt}
                    </p>
                    <p className="mt-5 text-sm font-semibold text-navy-900 transition group-hover:text-gold-600">
                      Read →
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="bg-navy-900 py-16 text-white">
        <div className="container-x flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <h2 className="h-section !text-white">Talk to KST about your situation</h2>
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
