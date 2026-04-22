import type { Metadata } from 'next';
import LeadForm from '@/components/LeadForm';
import { site } from '@/lib/site';
import { BreadcrumbJsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'Contact KST Accountants — Free Consultation in Buckhurst Hill, Essex',
  description:
    "Call, email or drop into the Buckhurst Hill office. Free consultation and tax review with a chartered certified accountant — no obligation.",
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: `${site.url}/` },
        { name: 'Contact', url: `${site.url}/contact` },
      ]} />

      <section className="relative overflow-hidden bg-navy-900 text-white">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.18]"
          style={{
            backgroundImage:
              'radial-gradient(600px 300px at 20% 20%, rgba(63,154,157,0.5), transparent 60%)',
          }}
        />
        <div className="container-x relative py-24 lg:py-28">
          <p className="eyebrow !text-gold-400">Get in touch</p>
          <h1 className="h-display mt-4 !text-white max-w-3xl">
            Free consultation &amp; tax review — no obligation.
          </h1>
          <p className="prose-body mt-6 max-w-2xl !text-navy-100">
            Feel free to contact us. Leave your details and one of our team will be in touch with
            you within one working day.
          </p>
        </div>
      </section>

      <section className="py-20 lg:py-24">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="space-y-8">
              <InfoCard
                heading="Call us"
                primary={<a className="font-display text-3xl font-semibold text-navy-900 hover:text-gold-600" href={`tel:${site.phone.tel}`}>{site.phone.display}</a>}
                sub={<span>Monday – Friday, 9:00 – 17:30</span>}
                icon={<IconPhone />}
              />
              <InfoCard
                heading="Mobile"
                primary={<a className="font-display text-2xl font-semibold text-navy-900 hover:text-gold-600" href={`tel:${site.mobile.tel}`}>{site.mobile.display}</a>}
                sub={<span>Direct line to Kris</span>}
                icon={<IconPhone />}
              />
              <InfoCard
                heading="Email"
                primary={<a className="font-display text-xl font-semibold text-navy-900 hover:text-gold-600" href={`mailto:${site.email.general}`}>{site.email.general}</a>}
                sub={<a className="block text-sm text-ink-muted hover:text-navy-900" href={`mailto:${site.email.owner}`}>or {site.email.owner}</a>}
                icon={<IconMail />}
              />
              <InfoCard
                heading="Visit"
                primary={
                  <address className="font-display text-lg font-semibold not-italic text-navy-900">
                    {site.address.line1}<br />
                    {site.address.line2}<br />
                    {site.address.city}, {site.address.region} {site.address.postcode}
                  </address>
                }
                sub={
                  <a
                    className="mt-1 inline-flex text-sm font-medium text-navy-900 hover:text-gold-600"
                    href={`https://maps.google.com/?q=${encodeURIComponent(`${site.address.line1}, ${site.address.line2}, ${site.address.postcode}`)}`}
                    target="_blank" rel="noreferrer"
                  >
                    Get directions →
                  </a>
                }
                icon={<IconPin />}
              />
            </div>

            <div className="mt-10 rounded-2xl bg-bg-muted p-6">
              <p className="eyebrow">Before you call</p>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                A 10-minute phone call will tell you everything you need to know. Please have your
                name, business name, contact number and the service you&rsquo;re interested in ready —
                or fill out the form and we&rsquo;ll call you.
              </p>
            </div>
          </div>

          <div className="lg:col-span-7">
            <LeadForm
              pageSource="contact"
              heading="Leave your details"
              subheading="We'll reply within one working day. Urgent? Call 020 3150 2074."
            />
          </div>
        </div>
      </section>

      <section aria-label="Map" className="pb-20">
        <div className="container-x">
          <div className="overflow-hidden rounded-2xl border border-navy-100 shadow-soft">
            <iframe
              title={`Map of ${site.name}`}
              src={`https://www.google.com/maps?q=${encodeURIComponent(`${site.address.line1}, ${site.address.line2}, ${site.address.postcode}`)}&output=embed`}
              width="100%"
              height="420"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              style={{ border: 0, display: 'block' }}
            />
          </div>
        </div>
      </section>
    </>
  );
}

function InfoCard({ heading, primary, sub, icon }: { heading: string; primary: React.ReactNode; sub: React.ReactNode; icon: React.ReactNode }) {
  return (
    <div className="flex gap-5">
      <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-navy-900 text-gold-500">
        {icon}
      </div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-ink-soft">{heading}</p>
        <div className="mt-1">{primary}</div>
        <div className="text-sm text-ink-muted">{sub}</div>
      </div>
    </div>
  );
}
function IconPhone() { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>; }
function IconMail() { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 6-10 7L2 6" /></svg>; }
function IconPin() { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M20 10c0 7-8 12-8 12s-8-5-8-12a8 8 0 0 1 16 0z" /><circle cx="12" cy="10" r="3" /></svg>; }
