import { site, fullAddress } from '@/lib/site';
import { faqs } from '@/lib/faq';
import { services } from '@/lib/services';
import { testimonials } from '@/lib/testimonials';

function Json({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function OrganizationJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'AccountingService',
    '@id': `${site.url}/#organization`,
    name: site.name,
    url: site.url,
    telephone: site.phone.display,
    email: site.email.general,
    areaServed: ['Essex', 'London', 'United Kingdom'],
    priceRange: '££',
    address: {
      '@type': 'PostalAddress',
      streetAddress: `${site.address.line1}, ${site.address.line2}`,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      postalCode: site.address.postcode,
      addressCountry: site.address.countryCode,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: site.geo.latitude,
      longitude: site.geo.longitude,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '17:30',
      },
    ],
    sameAs: [site.social.linkedin, site.social.facebook].filter(Boolean),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Accountancy services',
      itemListElement: services.map((s) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: s.name,
          url: `${site.url}/services/${s.slug}`,
          description: s.metaDescription,
        },
      })),
    },
    description: site.shortDescription,
  };
  return <Json data={data} />;
}

export function FaqJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };
  return <Json data={data} />;
}

export function ReviewsJsonLd() {
  // Don't emit Review / AggregateRating schema when there are no real reviews —
  // inauthentic review markup violates Google's structured-data policies.
  if (testimonials.length === 0) return null;

  const data = {
    '@context': 'https://schema.org',
    '@type': 'AccountingService',
    name: site.name,
    address: {
      '@type': 'PostalAddress',
      streetAddress: `${site.address.line1}, ${site.address.line2}`,
      addressLocality: site.address.city,
      postalCode: site.address.postcode,
      addressCountry: site.address.countryCode,
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5.0',
      reviewCount: String(testimonials.length),
    },
    review: testimonials.map((t) => ({
      '@type': 'Review',
      reviewRating: { '@type': 'Rating', ratingValue: String(t.rating) },
      author: { '@type': 'Person', name: t.name },
      reviewBody: t.quote,
    })),
  };
  return <Json data={data} />;
}

export function BreadcrumbJsonLd({ items }: { items: { name: string; url: string }[] }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: it.url,
    })),
  };
  return <Json data={data} />;
}

export function ServiceJsonLd({
  name,
  description,
  url,
}: {
  name: string;
  description: string;
  url: string;
}) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    url,
    provider: { '@id': `${site.url}/#organization` },
    areaServed: 'United Kingdom',
    serviceType: name,
  };
  return <Json data={data} />;
}

export { fullAddress };
