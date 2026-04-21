import type { Metadata } from 'next';
import Link from 'next/link';
import { site } from '@/lib/site';
import { BreadcrumbJsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'About KST Accountants — Chartered Certified Accountants in Essex',
  description:
    "Meet the team behind KST Accountants. A chartered certified practice in Buckhurst Hill, Essex, specialising in tax planning, accounts and compliance for owner-managed businesses.",
  alternates: { canonical: '/about' },
};

const values = [
  { title: 'Save you money', body: "Our first aim on every engagement is finding where the tax planning and fee savings are hiding." },
  { title: 'Answer quickly', body: 'Phone support whenever you need it. Emails answered the same working day.' },
  { title: 'Ahead of deadlines', body: 'No last-minute scrambles. Your work is completed well before it&rsquo;s due.' },
  { title: 'Clear, fixed fees', body: "We agree a fixed fee upfront so there are no surprises — ever." },
];

export default function AboutPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: `${site.url}/` },
        { name: 'About', url: `${site.url}/about` },
      ]} />

      <section className="relative overflow-hidden bg-navy-900 text-white">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.18]"
          style={{
            backgroundImage:
              'radial-gradient(700px 400px at 70% 30%, rgba(212,160,23,0.5), transparent 60%)',
          }}
        />
        <div className="container-x relative py-24 lg:py-32">
          <p className="eyebrow !text-gold-400">About us</p>
          <h1 className="h-display mt-4 !text-white max-w-3xl">
            Chartered certified accountants who actually care about your business.
          </h1>
          <p className="prose-body mt-6 max-w-2xl !text-navy-100">
            KST Accountants is an independent, chartered certified practice based in Buckhurst Hill,
            Essex. We work with owner-managed businesses across construction, e-commerce, property,
            professional services and more.
          </p>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="eyebrow">Our story</p>
            <h2 className="h-section mt-3">Built on referrals, kept by results.</h2>
            <div className="prose-body mt-6 space-y-5">
              <p>
                Our main target is to save clients&rsquo; money. We understand that people want to pay
                as little tax as possible in the most tax-efficient way. Working closely with all our
                clients, we aim to provide professional expertise and specialist support.
              </p>
              <p>
                Our experience dealing with a variety of accounts and taxation services of companies
                in different sectors puts us in a strong position. We are still growing, and most of
                our clients have come from personal recommendation and referrals from other satisfied
                clients who appreciate our high professional standards, friendly approach and advice.
              </p>
              <p>
                We believe you don&rsquo;t only need an accountant — you need someone who actually
                cares about your business and can help take you where you want to be.
              </p>
            </div>
          </div>
          <aside className="lg:col-span-5">
            <div className="card">
              <p className="eyebrow">Our mission</p>
              <p className="mt-4 font-display text-xl leading-relaxed text-navy-900">
                &ldquo;We aim to provide a prompt, friendly and efficient service — working closely
                with clients to save them money and deliver the same professional expertise and
                specialist support to every one of them.&rdquo;
              </p>
              <p className="mt-5 text-sm text-ink-muted">— The KST Accountants team</p>
            </div>
          </aside>
        </div>
      </section>

      <section className="bg-bg-muted py-20 lg:py-24">
        <div className="container-x">
          <div className="max-w-2xl">
            <p className="eyebrow">What we stand for</p>
            <h2 className="h-section mt-3">Four things every client can count on.</h2>
          </div>
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <li key={v.title} className="card">
                <h3 className="font-display text-lg font-semibold text-navy-900">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted" dangerouslySetInnerHTML={{ __html: v.body }} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="container-x grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow">Leadership</p>
            <h2 className="h-section mt-3">Led by Kris, directly accessible to every client.</h2>
            <p className="prose-body mt-5">
              Every KST client works directly with Kris — a fully qualified chartered certified
              accountant with over 15 years&rsquo; experience advising owner-managed UK businesses.
            </p>
            <p className="prose-body mt-4">
              Full partner biographies, qualifications and team headshots will be added here — the
              section is wired up, we just need the content and photos from the team.
            </p>
            <Link href="/contact" className="btn-primary mt-8">Book a consultation</Link>
          </div>
          <ul className="grid gap-6 sm:grid-cols-2 lg:col-span-7">
            {[1, 2].map((i) => (
              <li key={i} className="card">
                <div className="aspect-[4/5] rounded-xl bg-navy-100" aria-hidden />
                <h3 className="mt-5 font-display text-xl font-semibold text-navy-900">
                  Partner name
                </h3>
                <p className="text-sm text-ink-muted">Qualification / Role</p>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                  Short bio goes here — years of experience, specialism, and what they love about
                  working with clients. Replace this placeholder with the real copy when ready.
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-navy-900 py-16 text-white">
        <div className="container-x flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <h2 className="h-section !text-white">Ready to talk?</h2>
          <div className="flex gap-3">
            <Link href="/contact" className="btn-gold">Book a consultation</Link>
            <a href={`tel:${site.phone.tel}`} className="btn-ghost !text-white !border-white/30 hover:!bg-white/10">
              {site.phone.display}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
