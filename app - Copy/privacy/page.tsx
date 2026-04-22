import type { Metadata } from 'next';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: `Privacy policy for ${site.name}. How we collect, use and protect personal data.`,
  alternates: { canonical: '/privacy' },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <article className="py-20 lg:py-28">
      <div className="container-x max-w-3xl">
        <p className="eyebrow">Legal</p>
        <h1 className="h-display mt-3">Privacy Policy</h1>
        <p className="prose-body mt-6">
          This privacy policy explains how {site.name} (&ldquo;we&rdquo;, &ldquo;us&rdquo;)
          collects, uses and protects personal information you provide via this website or by email,
          phone or in person. We are a UK-registered data controller under the Data Protection Act
          2018 and UK GDPR.
        </p>

        <h2 className="h-section mt-10">What we collect</h2>
        <p className="prose-body mt-4">
          When you submit a contact form we collect your name, business name (optional), email
          address, phone number and the message you choose to send. If you become a client, we will
          collect additional information required to deliver accountancy services (e.g. company
          registration details, HMRC references, bank information and identification for
          anti-money-laundering checks).
        </p>

        <h2 className="h-section mt-10">How we use it</h2>
        <p className="prose-body mt-4">
          We use your information to respond to enquiries, deliver our services, meet legal and
          regulatory obligations, and keep our records secure. Website forms post securely to our
          CRM (GoHighLevel) where your enquiry is triaged and replied to.
        </p>

        <h2 className="h-section mt-10">Analytics &amp; cookies</h2>
        <p className="prose-body mt-4">
          We use Google Analytics 4 and Google Tag Manager to understand how visitors use the site
          and improve it. No information that directly identifies you is sent. You can opt out by
          using your browser&rsquo;s Do Not Track or ad-preference settings.
        </p>

        <h2 className="h-section mt-10">Your rights</h2>
        <p className="prose-body mt-4">
          You can ask us to provide a copy of the personal information we hold about you, correct
          it, delete it, or stop processing it. Email{' '}
          <a className="font-medium text-navy-900 underline" href={`mailto:${site.email.general}`}>
            {site.email.general}
          </a>{' '}
          and we will respond within 30 days.
        </p>

        <h2 className="h-section mt-10">Contact</h2>
        <p className="prose-body mt-4">
          {site.name}<br />
          {site.address.line1}, {site.address.line2}<br />
          {site.address.city}, {site.address.region} {site.address.postcode}<br />
          {site.email.general} · {site.phone.display}
        </p>

        <p className="mt-12 text-xs text-ink-soft">
          Last updated: {new Date().toLocaleDateString('en-GB', { year: 'numeric', month: 'long' })}
        </p>
      </div>
    </article>
  );
}
