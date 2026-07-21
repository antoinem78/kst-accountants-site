import type { Metadata, Viewport } from 'next';
import { Suspense } from 'react';
import { Inter, Fraunces } from 'next/font/google';
import Header from '@/components/Header';
import ClickIdCapture from '@/components/ClickIdCapture';
import Footer from '@/components/Footer';
import Analytics from '@/components/Analytics';
import ChatWidget from '@/components/ChatWidget';
import CookieBanner from '@/components/CookieBanner';
import MobileStickyCTA from '@/components/MobileStickyCTA';
import { OrganizationJsonLd } from '@/components/JsonLd';
import { site } from '@/lib/site';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

export const viewport: Viewport = {
  themeColor: '#0A3D5C',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name}, ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.shortDescription,
  applicationName: site.name,
  keywords: [
    'accountants Essex',
    'accountants Buckhurst Hill',
    'chartered certified accountants',
    'tax planning UK',
    'VAT returns',
    'payroll bureau',
    'CIS accountants',
    'Making Tax Digital',
    'small business accountant London',
  ],
  authors: [{ name: site.name }],
  openGraph: {
    type: 'website',
    locale: site.locale,
    url: site.url,
    siteName: site.name,
    title: `${site.name}, ${site.tagline}`,
    description: site.shortDescription,
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: site.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${site.name}, ${site.tagline}`,
    description: site.shortDescription,
    images: ['/og-image.png'],
  },
  robots: { index: true, follow: true },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={`${inter.variable} ${fraunces.variable}`}>
      <body>
        {/*
          Google tag (GA4 + Ads) loads via <Analytics /> using Consent Mode v2:
          it starts fully denied (cookieless) and switches on only after the
          visitor accepts in the CookieBanner. See components/Analytics.tsx.
        */}
        <Analytics />
        {/* Persist gclid/msclkid/fbclid from ad landings for offline conversion tracking */}
        <Suspense fallback={null}>
          <ClickIdCapture />
        </Suspense>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-navy-900 focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to main content
        </a>
        <Header />
        <main id="main" className="min-h-screen pb-16 md:pb-0">
          {children}
        </main>
        <Footer />
        <OrganizationJsonLd />
        <MobileStickyCTA />
        <CookieBanner />
        <ChatWidget />
      </body>
    </html>
  );
}
