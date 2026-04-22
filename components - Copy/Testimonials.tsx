import { testimonials } from '@/lib/testimonials';

function initials(name: string) {
  return name
    .split(' ')
    .map((p) => p.trim()[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

export default function Testimonials() {
  return (
    <section className="bg-bg-muted py-20 lg:py-28">
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Client stories</p>
          <h2 className="h-section mt-3">Trusted by owner-managed businesses across the UK.</h2>
          <p className="prose-body mt-5">
            A small selection of what our clients say. Names shortened for privacy.
          </p>
        </div>

        <ul className="mt-14 grid gap-6 md:grid-cols-2">
          {testimonials.map((t) => (
            <li key={t.name + t.company} className="card">
              <div className="flex items-center gap-3">
                <div
                  aria-hidden
                  className="grid h-12 w-12 place-items-center rounded-full bg-navy-900 font-display text-sm font-semibold text-gold-500"
                >
                  {initials(t.name)}
                </div>
                <div>
                  <p className="font-semibold text-navy-900">{t.name}</p>
                  <p className="text-sm text-ink-muted">
                    {t.role} · {t.company}
                  </p>
                </div>
                <div className="ml-auto flex" aria-label={`${t.rating} out of 5`}>
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#D4A017" aria-hidden>
                      <polygon points="12,2 15,9 22,9.5 17,14.5 18.5,22 12,18 5.5,22 7,14.5 2,9.5 9,9" />
                    </svg>
                  ))}
                </div>
              </div>
              <blockquote className="mt-4 text-[15px] leading-relaxed text-ink">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
            </li>
          ))}
        </ul>

        <p className="mt-8 text-center text-xs text-ink-muted">
          Testimonials shown are from real clients; names shortened and anonymised at their request.
        </p>
      </div>
    </section>
  );
}
