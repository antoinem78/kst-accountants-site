// Central source of truth for firm details.
// Edit these in ONE place and every page/component updates.

export const site = {
  name: 'KST Accountants',
  legalName: 'KST Accountants',
  tagline: 'Chartered Certified Accountants in Buckhurst Hill, Essex',
  shortDescription:
    'KST Accountants is a chartered certified accountancy firm in Buckhurst Hill, Essex. We help small and growing businesses save tax, stay compliant, and keep their books in order.',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.kst-accountants.co.uk',
  locale: 'en_GB',
  phone: {
    display: '020 3150 2074',
    tel: '+442031502074',
  },
  mobile: {
    display: '077 6898 5064',
    tel: '+447768985064',
  },
  email: {
    general: 'info@kst-accountants.co.uk',
    owner: 'Kris@kst-accountants.co.uk',
  },
  address: {
    line1: 'Challenge House',
    line2: '57-59 Queens Road',
    city: 'Buckhurst Hill',
    region: 'Essex',
    postcode: 'IG9 5BU',
    country: 'United Kingdom',
    countryCode: 'GB',
  },
  geo: {
    // Approx Buckhurst Hill — refine once confirmed.
    latitude: 51.6275,
    longitude: 0.0466,
  },
  hours: [
    { days: 'Mon - Fri', time: '9:00 — 17:30' },
    { days: 'Sat - Sun', time: 'Closed' },
  ],
  social: {
    linkedin: 'https://www.linkedin.com/company/kst-accountants/',
    facebook: 'https://www.facebook.com/profile.php?id=61579594988462',
    x: 'https://x.com/AccountantsKst',
    instagram: 'https://www.instagram.com/kstaccountants',
  },
  brand: {
    logoUrl: 'https://www.kst-accountants.co.uk/uploads/6/7/0/3/6703499/kst-accountants-logo.png',
    credentialsUrl: 'https://www.kst-accountants.co.uk/uploads/6/7/0/3/6703499/certificates_orig.jpg',
  },
  credentials: {
    // Placeholders — swap for real registration numbers.
    memberships: ['ACCA Chartered Certified', 'HMRC Agent Registered', 'ICO Registered'],
  },
  tracking: {
    gaId: process.env.NEXT_PUBLIC_GA_ID ?? 'G-1S1VWVV2SE',
    gtmId: process.env.NEXT_PUBLIC_GTM_ID ?? 'GTM-TT4QNR3G',
  },
} as const;

export const fullAddress = `${site.address.line1}, ${site.address.line2}, ${site.address.city}, ${site.address.region} ${site.address.postcode}`;
