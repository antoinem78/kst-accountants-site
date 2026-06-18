/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      // Logo and certificates strip are now self-hosted in /public — no
      // remote pattern needed for kst-accountants.co.uk. Unsplash kept
      // for any stock imagery used in service-page heroes.
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ];
  },
  async redirects() {
    // 301 redirects from legacy Weebly URLs (.html suffixes) to the new Next.js
    // routes so SEO equity transfers cleanly. /contact.html in particular ranks
    // well organically and must not 404. Add new entries here as Search Console
    // surfaces other ranking old paths.
    return [
      { source: '/index.html', destination: '/', permanent: true },
      { source: '/home.html', destination: '/', permanent: true },
      { source: '/contact.html', destination: '/contact', permanent: true },
      { source: '/contact-us.html', destination: '/contact', permanent: true },
      { source: '/about.html', destination: '/about', permanent: true },
      { source: '/about-us.html', destination: '/about', permanent: true },
      { source: '/services.html', destination: '/#services', permanent: true },
      { source: '/our-services.html', destination: '/#services', permanent: true },
      { source: '/accountancy.html', destination: '/services/accountancy', permanent: true },
      { source: '/accounts.html', destination: '/services/accountancy', permanent: true },
      { source: '/taxation.html', destination: '/services/taxation', permanent: true },
      { source: '/tax.html', destination: '/services/taxation', permanent: true },
      { source: '/tax-planning.html', destination: '/services/taxation', permanent: true },
      { source: '/vat.html', destination: '/services/vat', permanent: true },
      { source: '/vat-returns.html', destination: '/services/vat', permanent: true },
      { source: '/payroll.html', destination: '/services/payroll', permanent: true },
      { source: '/cis.html', destination: '/services/cis', permanent: true },
      { source: '/construction.html', destination: '/services/cis', permanent: true },
      { source: '/faq.html', destination: '/#faqs', permanent: true },
      { source: '/faqs.html', destination: '/#faqs', permanent: true },
      { source: '/blog.html', destination: '/insights', permanent: true },
      { source: '/news.html', destination: '/insights', permanent: true },
      { source: '/privacy.html', destination: '/privacy', permanent: true },
      { source: '/privacy-policy.html', destination: '/privacy', permanent: true },
    ];
  },
};
module.exports = nextConfig;
