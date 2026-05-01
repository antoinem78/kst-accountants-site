'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';

/**
 * UK take-home pay calculator — 2025/26 thresholds (rest-of-UK rates,
 * not Scotland). Assumptions are flagged in the Notes panel.
 */

// 2025/26 thresholds
const PA_DEFAULT = 12570;
const BASIC_LIMIT = 50270; // top of basic-rate band (i.e. higher rate starts after this)
const ADDITIONAL_LIMIT = 125140; // top of higher-rate band
const PA_TAPER_START = 100000;
const NI_PRIMARY_THRESHOLD = 12570;
const NI_UPPER_EARNINGS_LIMIT = 50270;

type Result = {
  gross: number;
  pensionContribution: number;
  adjustedGross: number;
  personalAllowance: number;
  taxableIncome: number;
  incomeTax: number;
  basicRateTax: number;
  higherRateTax: number;
  additionalRateTax: number;
  niableEarnings: number;
  ni: number;
  niMain: number;
  niUpper: number;
  net: number;
  monthlyNet: number;
  weeklyNet: number;
  effectiveRate: number;
};

function parseTaxCode(code: string): number {
  // 1257L → 12570; default to standard PA on parse failure
  const digits = code.replace(/[^0-9]/g, '');
  if (!digits) return PA_DEFAULT;
  const n = parseInt(digits, 10);
  if (Number.isNaN(n) || n < 0) return PA_DEFAULT;
  return n * 10;
}

function gbp(n: number): string {
  return n.toLocaleString('en-GB', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

function calculate(grossInput: number, pensionPct: number, taxCode: string): Result {
  const gross = Math.max(0, grossInput);
  const pensionContribution = Math.max(0, gross * (pensionPct / 100));
  const adjustedGross = Math.max(0, gross - pensionContribution); // salary-sacrifice assumption

  // Personal allowance with taper above £100k of adjusted income
  const baseAllowance = parseTaxCode(taxCode);
  let personalAllowance = baseAllowance;
  if (adjustedGross > PA_TAPER_START) {
    const reduction = Math.floor((adjustedGross - PA_TAPER_START) / 2);
    personalAllowance = Math.max(0, baseAllowance - reduction);
  }

  // Income tax bands (after PA)
  const taxableIncome = Math.max(0, adjustedGross - personalAllowance);

  const basicBand = Math.max(0, BASIC_LIMIT - personalAllowance);
  const higherBand = Math.max(0, ADDITIONAL_LIMIT - BASIC_LIMIT);

  const basicSlice = Math.min(taxableIncome, basicBand);
  const higherSlice = Math.min(Math.max(0, taxableIncome - basicBand), higherBand);
  const additionalSlice = Math.max(0, taxableIncome - basicBand - higherBand);

  const basicRateTax = basicSlice * 0.2;
  const higherRateTax = higherSlice * 0.4;
  const additionalRateTax = additionalSlice * 0.45;
  const incomeTax = basicRateTax + higherRateTax + additionalRateTax;

  // Class 1 employee NI on adjusted gross (salary sacrifice reduces NI base)
  const niableEarnings = Math.max(0, adjustedGross - NI_PRIMARY_THRESHOLD);
  const niMainSlice = Math.min(niableEarnings, NI_UPPER_EARNINGS_LIMIT - NI_PRIMARY_THRESHOLD);
  const niUpperSlice = Math.max(0, niableEarnings - (NI_UPPER_EARNINGS_LIMIT - NI_PRIMARY_THRESHOLD));
  const niMain = niMainSlice * 0.08;
  const niUpper = niUpperSlice * 0.02;
  const ni = niMain + niUpper;

  const net = adjustedGross - incomeTax - ni;
  const monthlyNet = net / 12;
  const weeklyNet = net / 52;
  const effectiveRate = gross > 0 ? ((gross - net) / gross) * 100 : 0;

  return {
    gross,
    pensionContribution,
    adjustedGross,
    personalAllowance,
    taxableIncome,
    incomeTax,
    basicRateTax,
    higherRateTax,
    additionalRateTax,
    niableEarnings,
    ni,
    niMain,
    niUpper,
    net,
    monthlyNet,
    weeklyNet,
    effectiveRate,
  };
}

export default function Calculator() {
  const [salary, setSalary] = useState<string>('45000');
  const [pension, setPension] = useState<string>('5');
  const [taxCode, setTaxCode] = useState<string>('1257L');

  const result = useMemo(() => {
    const s = parseFloat(salary) || 0;
    const p = parseFloat(pension) || 0;
    return calculate(s, p, taxCode);
  }, [salary, pension, taxCode]);

  return (
    <div className="grid gap-10 lg:grid-cols-12">
      {/* Inputs */}
      <div className="lg:col-span-5">
        <div className="card lg:sticky lg:top-24">
          <h2 className="font-display text-xl font-semibold text-navy-900">Your details</h2>
          <p className="mt-2 text-sm text-ink-muted">
            Enter your annual salary and we&rsquo;ll show what lands in your bank.
          </p>

          <div className="mt-6 space-y-5">
            <div>
              <label htmlFor="salary" className="label">Gross annual salary</label>
              <div className="relative">
                <span aria-hidden className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-muted">£</span>
                <input
                  id="salary"
                  type="number"
                  inputMode="numeric"
                  min="0"
                  step="100"
                  className="input !pl-8"
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label htmlFor="pension" className="label">Pension contribution (% of gross)</label>
              <div className="relative">
                <input
                  id="pension"
                  type="number"
                  inputMode="decimal"
                  min="0"
                  max="60"
                  step="0.5"
                  className="input !pr-8"
                  value={pension}
                  onChange={(e) => setPension(e.target.value)}
                />
                <span aria-hidden className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-ink-muted">%</span>
              </div>
              <p className="mt-1.5 text-xs text-ink-soft">
                Salary-sacrifice pension. Reduces both income tax and NI.
              </p>
            </div>

            <div>
              <label htmlFor="taxCode" className="label">Tax code</label>
              <input
                id="taxCode"
                type="text"
                className="input"
                value={taxCode}
                onChange={(e) => setTaxCode(e.target.value.toUpperCase())}
              />
              <p className="mt-1.5 text-xs text-ink-soft">
                Default <code className="rounded bg-bg-muted px-1.5 py-0.5">1257L</code> = £12,570 personal allowance.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="space-y-6 lg:col-span-7">
        <div className="rounded-2xl bg-navy-900 p-8 text-white shadow-lift">
          <p className="eyebrow !text-gold-400">Your take-home pay</p>
          <p className="mt-3 font-display text-5xl font-semibold leading-none text-white sm:text-6xl">
            {gbp(result.net)}
            <span className="ml-2 text-lg font-medium text-navy-200">/ year</span>
          </p>
          <div className="mt-6 grid grid-cols-2 gap-4 border-t border-white/10 pt-6">
            <div>
              <p className="text-xs uppercase tracking-wider text-gold-400">Per month</p>
              <p className="mt-1 font-display text-2xl font-semibold">{gbp(result.monthlyNet)}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-gold-400">Per week</p>
              <p className="mt-1 font-display text-2xl font-semibold">{gbp(result.weeklyNet)}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="font-display text-lg font-semibold text-navy-900">Breakdown</h3>
          <dl className="mt-4 divide-y divide-navy-100 text-sm">
            <Row label="Gross salary" value={gbp(result.gross)} />
            <Row label={`Pension contribution`} value={`− ${gbp(result.pensionContribution)}`} muted />
            <Row label="Adjusted gross (after pension)" value={gbp(result.adjustedGross)} bold />
            <Row label={`Personal allowance${result.personalAllowance < parseTaxCode(taxCode) ? ' (tapered)' : ''}`} value={gbp(result.personalAllowance)} />
            <Row label="Taxable income" value={gbp(result.taxableIncome)} muted />
            <Row label="Income tax (basic 20%)" value={`− ${gbp(result.basicRateTax)}`} muted />
            {result.higherRateTax > 0 && (
              <Row label="Income tax (higher 40%)" value={`− ${gbp(result.higherRateTax)}`} muted />
            )}
            {result.additionalRateTax > 0 && (
              <Row label="Income tax (additional 45%)" value={`− ${gbp(result.additionalRateTax)}`} muted />
            )}
            <Row label="Total income tax" value={`− ${gbp(result.incomeTax)}`} bold />
            <Row label="National Insurance (8% main rate)" value={`− ${gbp(result.niMain)}`} muted />
            {result.niUpper > 0 && (
              <Row label="National Insurance (2% above UEL)" value={`− ${gbp(result.niUpper)}`} muted />
            )}
            <Row label="Total NI" value={`− ${gbp(result.ni)}`} bold />
            <Row label="Take-home (net)" value={gbp(result.net)} bold accent />
            <Row label="Effective tax & NI rate" value={`${result.effectiveRate.toFixed(1)}%`} muted />
          </dl>
        </div>

        <div className="rounded-2xl border border-navy-100 bg-bg-muted p-6 text-sm text-ink-muted">
          <h3 className="font-display text-base font-semibold text-navy-900">Notes &amp; assumptions</h3>
          <ul className="mt-3 list-disc space-y-1.5 pl-5">
            <li>2025/26 tax year, England / Wales / Northern Ireland rates. Scotland has different income-tax bands — figures will differ if you&rsquo;re a Scottish taxpayer.</li>
            <li>Personal allowance taper: reduced by £1 for every £2 of adjusted income above £100,000; fully tapered at £125,140.</li>
            <li>Class 1 employee NI: 0% to £12,570, 8% to £50,270, 2% above £50,270. Self-employed Class 4 rates differ.</li>
            <li>Pension assumed paid via salary sacrifice (reduces both income tax and NI base). Net-pay arrangements work similarly; relief-at-source schemes do not reduce NI.</li>
            <li>This is an estimator, not a personal tax calculation. Things like benefits-in-kind, student loans, dividends, savings income, gift aid, and Scottish residency are not modelled.</li>
          </ul>
        </div>

        <div className="rounded-2xl bg-navy-900 p-8 text-white">
          <h3 className="h-section !text-white !text-2xl">Could you keep more of this?</h3>
          <p className="mt-3 text-sm text-navy-100">
            For most owner-directors, the bigger savings sit in salary / dividend mix, pension contributions, and the company structure. We&rsquo;ll review your setup in 30 minutes — no obligation.
          </p>
          <Link href="/contact" className="btn-gold mt-5">Book a free tax review</Link>
        </div>
      </div>
    </div>
  );
}

function Row({
  label,
  value,
  muted,
  bold,
  accent,
}: {
  label: string;
  value: string;
  muted?: boolean;
  bold?: boolean;
  accent?: boolean;
}) {
  return (
    <div className="flex items-center justify-between py-2.5">
      <dt className={`${muted ? 'text-ink-soft' : 'text-ink-muted'} ${bold ? 'font-semibold !text-navy-900' : ''}`}>
        {label}
      </dt>
      <dd
        className={`tabular-nums ${
          accent
            ? 'font-display text-lg font-semibold text-gold-700'
            : bold
              ? 'font-semibold text-navy-900'
              : 'text-ink-muted'
        }`}
      >
        {value}
      </dd>
    </div>
  );
}
