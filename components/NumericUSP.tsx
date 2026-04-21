'use client';

import { useEffect, useRef, useState } from 'react';

type Stat = {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  sub?: string;
};

const stats: Stat[] = [
  { value: 500, suffix: '+', label: 'Clients served', sub: 'SMEs across the UK' },
  { value: 15, suffix: '+', label: 'Years experience', sub: 'In UK tax & compliance' },
  { value: 98, suffix: '%', label: 'Client retention', sub: "We keep the clients we win" },
  { value: 100, suffix: '%', label: 'Deadlines met', sub: 'Always filed ahead of time' },
];

function useCountUp(target: number, active: boolean, duration = 1400) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    let raf = 0;
    const start = performance.now();
    const step = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, active, duration]);
  return val;
}

function StatCard({ stat, active }: { stat: Stat; active: boolean }) {
  const display = useCountUp(stat.value, active);
  return (
    <div className="border-l-2 border-gold-500 pl-5">
      <div className="font-display text-5xl font-semibold leading-none text-white sm:text-6xl">
        {stat.prefix ?? ''}
        <span className="tabular-nums">{display.toLocaleString('en-GB')}</span>
        {stat.suffix ?? ''}
      </div>
      <div className="mt-3 text-sm font-semibold uppercase tracking-wider text-gold-400">
        {stat.label}
      </div>
      {stat.sub && <div className="mt-1 text-sm text-navy-200">{stat.sub}</div>}
    </div>
  );
}

export default function NumericUSP() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setActive(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      aria-label="KST Accountants by the numbers"
      className="relative bg-navy-900 py-20 text-white lg:py-24"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,0.35) 1px, transparent 1px)',
          backgroundSize: '80px 100%',
        }}
      />
      <div className="container-x relative">
        <div className="grid items-end gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow !text-gold-400">By the numbers</p>
            <h2 className="h-section mt-3 !text-white">The proof is in the practice.</h2>
            <p className="prose-body mt-5 !text-navy-100">
              A quick snapshot of who we are and what we do every month for our clients.
            </p>
          </div>
          <dl className="grid gap-10 sm:grid-cols-2 lg:col-span-7 lg:grid-cols-4">
            {stats.map((s) => (
              <StatCard key={s.label} stat={s} active={active} />
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
