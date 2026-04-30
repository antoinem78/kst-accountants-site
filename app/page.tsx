import Link from 'next/link';
import HeroSlider from '@/components/HeroSlider';
import WhyChooseUs from '@/components/WhyChooseUs';
import NumericUSP from '@/components/NumericUSP';
import FAQ from '@/components/FAQ';
import LeadForm from '@/components/LeadForm';
import CredentialsStrip from '@/components/CredentialsStrip';
import { FaqJsonLd } from '@/components/JsonLd';
import { services } from '@/lib/services';
import { site } from '@/lib/site';

export default function HomePage() {
  return (
    <>
      <HeroSlider />

      <CredentialsStrip />

      {/* Services overview */}
      <section id="services" className="py-20 lg:py-28">
        <div className="container-x">
          <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
            <div className="max-w-2xl">
              <p className="eyebrow">What we do</p>
              <h2 className="h-section mt-3">Accountancy services for every stage of your business.</h2>
              <p className="prose-body mt-5">
                From the first VAT return through to complex tax planning and CIS returns —
                everything you need, delivered by people who know your business.
              </p>
            </div>
            <Link href="/contact" className="btn-primary">Request a quote</Link>
          </div>

          <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/services/${s.slug}`}
                  className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-navy-100 bg-white p-7 shadow-soft transition hover:-translate-y-0.5 hover:shadow-lift"
                >
                  <span
                    aria-hidden
                    className="absolute right-5 top-5 text-navy-100 transition group-hover:text-gold-400"
                  >
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7M9 7h8v8" /></svg>
                  </span>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-700">
                    {s.shortName}
                  </p>
                  <h3 className="mt-3 font-display text-xl font-semibold text-navy-900">{s.tagline}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-muted">
                    {s.intro.split('. ')[0]}.
                  </p>
                  <p className="mt-5 text-sm font-semibold text-navy-900">
                    Explore {s.shortName.toLowerCase()} →
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <NumericUSP />
      <WhyChooseUs />
      <FAQ />

      {/* CTA + Form */}
      <section id="book" className="bg-navy-900 py-20 text-white lg:py-28">
        <div className="container-x grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p className="eyebrow !text-gold-400">Let&rsquo;s talk</p>
            <h2 className="h-section mt-3 !text-white">
              Free consultation &amp; tax review — no obligation.
            </h2>
            <p className="prose-body mt-5 !text-navy-100">
              Thirty minutes with Kris. We&rsquo;ll review your current setup, show you where you
              might be paying too much tax, and give you a fixed-fee quote if we&rsquo;re a good fit.
            </p>
            <dl className="mt-10 grid gap-5 sm:grid-cols-2">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wider text-gold-400">Call us</dt>
                <dd>
                  <a href={`tel:${site.phone.tel}`} className="font-display text-2xl font-semibold text-white hover:text-gold-400">
                    {site.phone.display}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wider text-gold-400">Email Kris</dt>
                <dd>
                  <a href={`mailto:${site.email.owner}`} className="font-display text-2xl font-semibold text-white hover:text-gold-400 break-words">
                    {site.email.owner}
                  </a>
                </dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-xs font-semibold uppercase tracking-wider text-gold-400">Visit</dt>
                <dd className="text-navy-100">
                  {site.address.line1}, {site.address.line2},<br />
                  {site.address.city}, {site.address.region} {site.address.postcode}
                </dd>
              </div>
            </dl>
          </div>
          <div className="lg:col-span-6">
            <LeadForm pageSource="homepage" />
          </div>
        </div>
      </section>

      <FaqJsonLd />
    </>
  );
}
