import Image from 'next/image';
import { site } from '@/lib/site';

export default function CredentialsStrip() {
  return (
    <section
      aria-label="Professional credentials and partners"
      className="border-y border-navy-100 bg-white py-10 lg:py-12"
    >
      <div className="container-x">
        <p className="eyebrow text-center">Trusted &amp; accredited</p>
        <div className="mt-6 flex items-center justify-center">
          <Image
            src={site.brand.credentialsUrl}
            alt="Intuit QuickBooks, ACCA, Sage, and Xero Certified Advisor"
            width={1213}
            height={126}
            sizes="(min-width: 1024px) 960px, 90vw"
            className="h-auto w-full max-w-[960px] object-contain opacity-95"
          />
        </div>
      </div>
    </section>
  );
}
