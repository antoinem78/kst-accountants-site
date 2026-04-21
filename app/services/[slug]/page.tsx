import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { services, getService } from '@/lib/services';
import { site } from '@/lib/site';
import LeadForm from '@/components/LeadForm';
import FAQ from '@/components/FAQ';
import { BreadcrumbJsonLd, ServiceJsonLd } from '@/components/JsonLd';

type Params = { params: { slug: string } };

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: Params): Metadata {
  const s = getService(params.slug);
  if (!s) return {};
  return {
    title: `${s.name} | ${site.name}`,
    description: s.metaDescription,
    alternates: { canonical: `/services/${s.slug}` },
    openGraph: {
      title: `${s.name} — ${site.name}`,
      description: s.metaDescription,
      url: `${site.url}/services/${s.slug}`,
    },
  };
}

export default function ServicePage({ params }: Params) {
  const s = getService(params.slug);
  if (!s) notFound();

  const otherServices = services.filter((x) => x.slug !== s.slug);

  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: `${site.url}/` },
        { name: 'Services', url: `${site.url}/#services` },
        { name: s.name, url: `${site.url}/services/${s.slug}` },
      ]} />
      <ServiceJsonLd
        name={s.name}
        description={s.metaDescription}
        url={`${site.url}/services/${s.slug}`}
      />

      {/* Service-specific hero (CRO #12) */}
      <section className="relative overflow-hidden bg-navy-900 text-white">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.2]"
          style={{
            backgroundImage:
              'radial-gradient(700px 400px at 80% 20%, rgba(212,160,23,0.55), transparent 60%), radial-gradient(600px 350px at 0% 80%, rgba(79,122,168,0.55), transparent 60%)',
          }}
        />
        <div className="container-x relative grid gap-12 py-20 lg:grid-cols-12 lg:py-28">
          <div className="lg:col-span-7">
            <nav aria-label="Breadcrumb" className="text-sm text-navy-200">
              <Link href="/" className="hover:text-white">Home</Link>
              <span className="mx-2 text-navy-300" aria-hidden>/</span>
              <span>{s.name}</span>
            </nav>
            <p className="eyebrow mt-6 !text-gold-400">{s.shortName}</p>
            <h1 className="h-display mt-3 !text-white">{s.heroHeadline}</h1>
            <p className="prose-body mt-6 max-w-2xl !text-navy-100">{s.heroSubhead}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="#enquire" className="btn-gold">Request a quote</Link>
              <a href={`tel:${site.phone.tel}`} className="btn-ghost !text-white !border-white/30 hover:!bg-white/10">
                Call {site.phone.display}
              </a>
            </div>
          </div>

          {/* Sticky/inline form anchor for desktop */}
          <aside className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <LeadForm
                pageSource={`services/${s.slug}`}
                defaultService={s.name}
                heading="Request a quote"
                subheading={`Tell us about your ${s.shortName.toLowerCase()} needs — fixed-fee quote within 24 hours.`}
              />
            </div>
          </aside>
        </div>
      </section>

      {/* Body */}
      <section className="py-20 lg:py-24">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="eyebrow">What you get</p>
            <h2 className="h-section mt-3">{s.tagline}</h2>
            <p className="prose-body mt-5">{s.intro}</p>

            {s.groups ? (
              <div className="mt-10 grid gap-6 sm:grid-cols-2">
                {s.groups.map((g) => (
                  <div key={g.title} className="card">
                    <h3 className="font-display text-xl font-semibold text-navy-900">{g.title}</h3>
                    <ul className="mt-4 space-y-3">
                      {g.items.map((item) => (
                        <li key={item} className="flex items-start gap-3 text-sm text-ink">
                          <Tick />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ) : (
              <ul className="mt-10 grid gap-4 sm:grid-cols-2">
                {s.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-3 rounded-xl border border-navy-100 bg-white p-4 shadow-soft">
                    <Tick />
                    <span className="text-sm text-ink">{b}</span>
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-12 rounded-2xl bg-bg-muted p-8">
              <p className="eyebrow">How we work</p>
              <ol className="mt-5 grid gap-6 sm:grid-cols-3">
                <Step n={1} title="Free consultation" body="A 30-minute call to understand your business and pinpoint where we can help." />
                <Step n={2} title="Fixed-fee proposal" body="A written proposal with all services, timelines and a single fixed monthly fee." />
                <Step n={3} title="Onboard in a week" body="We handle the switch from your previous accountant. You won't lift a finger." />
              </ol>
            </div>
          </div>

          <aside className="lg:col-span-5">
            <div className="lg:sticky lg:top-28 space-y-6">
              <div className="card">
                <p className="eyebrow">Talk to a real accountant</p>
                <a href={`tel:${site.phone.tel}`} className="mt-3 block font-display text-3xl font-semibold text-navy-900 hover:text-gold-600">
                  {site.phone.display}
                </a>
                <p className="text-sm text-ink-muted">Mon – Fri, 9:00 – 17:30</p>
                <a href={`mailto:${site.email.owner}`} className="mt-4 inline-block text-sm font-semibold text-navy-900 hover:text-gold-600">
                  {site.email.owner} →
                </a>
              </div>
              <div className="card">
                <p className="eyebrow">Other services</p>
                <ul className="mt-3 space-y-2">
                  {otherServices.map((x) => (
                    <li key={x.slug}>
                      <Link
                        href={`/services/${x.slug}`}
                        className="flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium text-navy-900 hover:bg-navy-50"
                      >
                        {x.name}
                        <span className="text-navy-400" aria-hidden>→</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <FAQ />

      {/* Sticky quote CTA anchor */}
      <section id="enquire" className="bg-navy-900 py-20 text-white lg:py-24">
        <div className="container-x grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p className="eyebrow !text-gold-400">Next step</p>
            <h2 className="h-section mt-3 !text-white">
              Get your {s.shortName.toLowerCase()} quote.
            </h2>
            <p className="prose-body mt-5 !text-navy-100">
              Leave your details and we&rsquo;ll send over a fixed-fee quote within one working day.
              No obligation.
            </p>
          </div>
          <div className="lg:col-span-6">
            <LeadForm pageSource={`services/${s.slug}#enquire`} defaultService={s.name} heading="" subheading="" />
          </div>
        </div>
      </section>
    </>
  );
}

function Tick() {
  return (
    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-gold-500" aria-hidden>
      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#0B2545" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
    </span>
  );
}
function Step({ n, title, body }: { n: number; title: string; body: string }) {
  return (
    <li>
      <div className="grid h-9 w-9 place-items-center rounded-full bg-navy-900 font-display text-sm font-semibold text-gold-500">{n}</div>
      <h3 className="mt-3 font-display text-base font-semibold text-navy-900">{title}</h3>
      <p className="mt-1 text-sm text-ink-muted">{body}</p>
    </li>
  );
}
