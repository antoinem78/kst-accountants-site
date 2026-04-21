const reasons = [
  {
    title: 'Chartered Certified',
    body: 'Fully qualified ACCA-regulated accountants. Your work is done by professionals, not juniors — every time.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M12 2l2.39 4.85L20 8l-4 3.9.94 5.5L12 15l-4.94 2.4L8 11.9 4 8l5.61-1.15L12 2z" />
      </svg>
    ),
  },
  {
    title: '15+ years serving SMEs',
    body: 'Deep experience with owner-managed businesses across construction, e-commerce, property, professional services and more.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <rect x="3" y="7" width="18" height="14" rx="2" />
        <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
        <path d="M3 13h18" />
      </svg>
    ),
  },
  {
    title: 'Fixed fees, agreed upfront',
    body: 'No clock-watching, no surprise invoices. You know what you are paying before we start work.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },
  {
    title: 'Filed well before deadline',
    body: 'Accounts, VAT and tax returns completed ahead of every HMRC and Companies House deadline. No January panic.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    title: 'Direct access to Kris',
    body: "You don't get bounced through a support queue. You call, email or drop in — and you get your accountant.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    title: 'Cloud-first, MTD ready',
    body: 'Xero, QuickBooks, FreeAgent, Sage — fully Making-Tax-Digital compliant for VAT and upcoming ITSA rollouts.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
      </svg>
    ),
  },
];

export default function WhyChooseUs() {
  return (
    <section id="why-choose-us" className="py-20 lg:py-28">
      <div className="container-x">
        <div className="max-w-2xl">
          <p className="eyebrow">Why choose KST</p>
          <h2 className="h-section mt-3">An accountant who actually cares about your business.</h2>
          <p className="prose-body mt-5">
            Most of our clients come to us through personal recommendation — because we pick up the
            phone, spot the savings, and stay ahead of every deadline.
          </p>
        </div>

        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((r) => (
            <li key={r.title} className="card group">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-navy-900 text-gold-500 transition group-hover:bg-navy-800">
                <span className="h-6 w-6">{r.icon}</span>
              </div>
              <h3 className="mt-5 font-display text-xl font-semibold text-navy-900">{r.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{r.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
