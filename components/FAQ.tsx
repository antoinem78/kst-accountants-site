import { faqs } from '@/lib/faq';

export default function FAQ() {
  return (
    <section id="faqs" className="py-20 lg:py-28">
      <div className="container-x">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">Common questions</p>
          <h2 className="h-section mt-3">Everything owners ask us before switching.</h2>
          <p className="prose-body mt-5">
            Still not sure if we are the right fit? Pick up the phone — 10 minutes with Kris will tell you everything.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-3xl divide-y divide-navy-100 rounded-2xl border border-navy-100 bg-white shadow-soft">
          {faqs.map((f, i) => (
            <details key={i} className="group px-6 py-5 open:bg-navy-50/40 sm:px-8">
              <summary className="flex items-start justify-between gap-6">
                <span className="font-display text-lg font-semibold text-navy-900">
                  {f.question}
                </span>
                <span
                  aria-hidden
                  className="mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-full border border-navy-200 text-navy-700 transition group-open:rotate-45 group-open:bg-navy-900 group-open:text-white"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>
                </span>
              </summary>
              <p className="mt-3 text-[15px] leading-relaxed text-ink-muted">
                {f.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
