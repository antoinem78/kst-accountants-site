import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="py-24 lg:py-32">
      <div className="container-x max-w-2xl text-center">
        <p className="eyebrow">404</p>
        <h1 className="h-display mt-3">We couldn&rsquo;t find that page.</h1>
        <p className="prose-body mt-6">
          It may have moved or never existed. Head back to the homepage, or get in touch and
          we&rsquo;ll point you in the right direction.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Link href="/" className="btn-primary">Back to home</Link>
          <Link href="/contact" className="btn-ghost">Contact us</Link>
        </div>
      </div>
    </section>
  );
}
