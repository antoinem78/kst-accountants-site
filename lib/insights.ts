// Blog / insights content. Each post is an object with metadata + a `body`
// string of HTML rendered with dangerouslySetInnerHTML. The .insights-prose
// class in globals.css handles the typography.
//
// To add a post: append a new object to `insights` below. Keep the slug
// kebab-case and unique. The /insights list page and the [slug] route pick
// it up automatically.

export type Insight = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  /** ISO yyyy-mm-dd. Used in the listing and in BlogPosting JSON-LD. */
  publishedAt: string;
  /** Approx minutes — humans skim this, no need to be precise. */
  readMinutes: number;
  /** Plain-text meta description for the article page. ≤ 155 chars. */
  metaDescription: string;
  /** HTML body. Use <h2>, <h3>, <p>, <ul>, <ol>, <strong>, <a>. */
  body: string;
};

export const insights: Insight[] = [
  {
    slug: 'making-tax-digital-itsa-2026-timeline',
    title: 'Making Tax Digital for Income Tax — what UK sole traders and landlords need to do before April 2026',
    category: 'MTD',
    publishedAt: '2026-04-30',
    readMinutes: 6,
    excerpt:
      'MTD for Income Tax Self Assessment is no longer a "next year" problem. Here is who it affects, when, and the three things to get sorted now to avoid a panic in April.',
    metaDescription:
      'Making Tax Digital for ITSA — who needs to comply, when, and the three practical steps every UK sole trader and landlord should take before April 2026.',
    body: `
<p>Making Tax Digital for Income Tax Self Assessment (MTD ITSA) has been delayed twice already, and as a result a lot of UK sole traders and landlords have stopped paying attention. That is now a problem: HMRC has confirmed the latest start dates and they are firm.</p>

<h2>Who is in, and when</h2>
<p>The rollout is staggered by income, not by entity type. The thresholds apply to combined gross income from self-employment <strong>and</strong> property:</p>
<ul>
  <li><strong>From 6 April 2026</strong> — anyone with combined self-employment / property income above <strong>£50,000</strong> in the 2024/25 tax year.</li>
  <li><strong>From 6 April 2027</strong> — anyone with combined income above <strong>£30,000</strong> in the 2025/26 tax year.</li>
  <li><strong>Below £30,000</strong> — currently outside MTD ITSA. HMRC has said it will review the threshold during the rollout but no decision has been announced.</li>
</ul>
<p>Limited companies, partnerships, and trusts are out of scope for now — this is purely an Income Tax Self Assessment change.</p>

<h2>What actually changes</h2>
<p>Three things, and the third one is the one most people miss:</p>
<ol>
  <li><strong>Quarterly updates.</strong> Five returns a year instead of one annual Self Assessment: four quarterly summaries plus a final declaration. Each quarterly update is filed within one month of the period end.</li>
  <li><strong>Digital records.</strong> You must keep your business income and expenses in MTD-compatible software — spreadsheets only count if they are connected to HMRC via bridging software. No more shoebox of receipts and a January catch-up.</li>
  <li><strong>The final declaration.</strong> This replaces the annual Self Assessment return and is where you confirm the year and add anything that was not in the quarterly updates (savings, dividends, gift aid, etc.). Most accountants — including KST — will handle this for clients alongside the quarterly filings, but it is worth understanding that it is now a discrete step.</li>
</ol>

<h2>Three things to do before April 2026</h2>
<h3>1. Find out which year you are in</h3>
<p>If your 2024/25 self-employment plus property income was over £50k, you are in scope from 6 April 2026 — that is around eleven months from now. If it was between £30k and £50k, you have until April 2027.</p>

<h3>2. Pick MTD-compatible software now, not in March</h3>
<p>Xero, QuickBooks Online, FreeAgent, Sage Accounting, and a few others are HMRC-listed for MTD ITSA. The choice usually comes down to three things: how comfortable you are with the interface, what your accountant uses (which determines how smoothly your data flows back and forth), and price. Switching software in the middle of a tax year is painful, so the cheap fix is to pick now and have the 2025/26 records already in place when MTD goes live.</p>

<h3>3. Sign up — but do not sign up too early</h3>
<p>Sign-up to MTD ITSA is opt-in until April 2026 (April 2027 for the £30k cohort). HMRC's pilot is running now, but signing up early means you start filing quarterly immediately. For most people the right approach is: get the software in place, run it through the 2025/26 year as if MTD were live, and only formally sign up when the deadline forces it. That gives you a year of practice without a real filing obligation.</p>

<h2>What about Class 4 NIC and payments on account?</h2>
<p>Both continue. MTD ITSA does not change <em>what</em> you pay — only how you report what you have earned. Payments on account in January and July still apply, Class 2 and Class 4 NIC still apply, and the tax due dates are unchanged.</p>

<h2>What we tell our clients</h2>
<p>If you are a KST client, we will move you onto MTD-compatible software well before your relevant start date and run the quarterly updates as part of your standard package. There is no add-on fee for MTD compliance — it is part of the engagement. If you are not yet a client and want a second opinion on whether you are in the April 2026 cohort or the April 2027 one, the free 30-minute consultation is the right starting point.</p>

<p><em>This article is general guidance and is current as of 30 April 2026. Tax thresholds and rules can change — speak to your accountant about your specific situation before making any decisions.</em></p>
`.trim(),
  },

  {
    slug: 'year-end-limited-company-tax-saving-checklist',
    title: 'Year-end tax-saving checklist for UK limited companies',
    category: 'Tax planning',
    publishedAt: '2026-04-15',
    readMinutes: 7,
    excerpt:
      'Twelve practical things every limited-company director should run through before their year-end — most of them are deductions you can still claim if you act in time.',
    metaDescription:
      'A practical year-end tax-saving checklist for UK limited companies — twelve things to review before your accounting year-end to keep more of what you earn.',
    body: `
<p>Most of the tax savings available to a UK limited company depend on doing the right thing <strong>before</strong> the year-end, not after. Once the books close, the planning window has closed with them. Here is the checklist we run through with every KST client in the four to six weeks before their accounting year-end.</p>

<h2>1. Review your salary / dividend mix</h2>
<p>The optimal split depends on your personal circumstances, but for most owner-directors with no other income, paying a salary up to the secondary NIC threshold (currently £9,100) and taking the rest as dividends remains efficient. Above £100,000 of total personal income, the marginal rate jumps sharply because of personal allowance taper — that is usually the trigger for moving more into pension contributions instead.</p>

<h2>2. Make employer pension contributions before year-end</h2>
<p>Employer pension contributions are deductible against Corporation Tax in the year they are paid, not the year they accrue. Pay before year-end and you reduce this year's tax bill; pay after and you have to wait twelve months for the deduction. Annual allowance is £60,000 (subject to taper above £200k of adjusted income), and you can carry forward unused allowance from the previous three years.</p>

<h2>3. Use the Annual Investment Allowance</h2>
<p>The AIA gives you 100% tax relief on qualifying plant and machinery up to £1 million per year. If you are planning to buy equipment, vehicles (excluding cars), tools or computer hardware, doing so before year-end pulls the deduction into this year. Note: cars do not qualify for AIA — they go through the writing-down allowance pool at 18% or 6% depending on emissions.</p>

<h2>4. Check whether full expensing applies</h2>
<p>Since April 2023, full expensing gives 100% first-year allowance on most new and unused plant and machinery for companies — uncapped, so it applies above the £1m AIA limit too. Most SMEs will hit the AIA limit first, but for larger purchases full expensing is the relevant relief.</p>

<h2>5. R&D tax relief — even if you "don't do R&D"</h2>
<p>The merged R&D scheme that came in for accounting periods starting on or after 1 April 2024 has changed the rates and tightened the qualifying-activity definition, but the principle still applies: any work that resolves scientific or technological uncertainty can qualify. Software development, process engineering, and product design all routinely qualify and most directors are surprised to discover their work counts. The relief is meaningful — typically a 16% net benefit on qualifying spend for profitable SMEs.</p>

<h2>6. Director's loan account — clear it within nine months</h2>
<p>If you owe the company money at year-end (an overdrawn DLA), repay it within nine months and one day of year-end to avoid the section 455 charge — currently 33.75% on the outstanding balance. The charge is refundable when the loan is repaid, but it is a cash-flow drag worth avoiding. If you cannot repay in cash, declaring a dividend or bonus to clear the balance is the standard fix.</p>

<h2>7. Time large dividends to fall in the right tax year</h2>
<p>Dividends are taxed in the personal tax year they are <em>paid</em>, not declared. If you are close to a higher-rate or additional-rate threshold, deferring or accelerating a dividend by a few weeks can move the income into a more favourable year. The dividend allowance is £500 for 2025/26.</p>

<h2>8. Charitable donations</h2>
<p>Donations from the company to UK charities are deductible against Corporation Tax. Donations from you personally also work, with Gift Aid extending the relief into your higher-rate band. Pick whichever is more efficient given the income mix above.</p>

<h2>9. Consider a trivial benefits run</h2>
<p>Each employee (including directors) can receive up to £300 of trivial benefits a year tax-free, capped at £50 per benefit. Common uses: a small Christmas voucher, a birthday gift, a meal out. The conditions are tight (it cannot be cash, cannot be a reward for work, cannot be in a contract), but used properly it is an easy £300 of tax-free remuneration.</p>

<h2>10. Health insurance, life cover, and relevant life policies</h2>
<p>A relevant life policy paid by the company is deductible for Corporation Tax, is not a benefit-in-kind for the director, and pays out tax-free to the family. For a director-only policy with no group scheme, this is normally cheaper than personal life insurance bought from net income.</p>

<h2>11. Review your VAT scheme</h2>
<p>If turnover has grown significantly, the flat-rate scheme may no longer be optimal — most growing service businesses end up better off on standard VAT once their input VAT picks up. The threshold to leave the flat-rate scheme is £230,000 of VAT-inclusive annual turnover, but the optimisation review can happen at any point.</p>

<h2>12. Get the Companies House and HMRC deadlines on a calendar</h2>
<p>This is not strictly tax-saving, but late-filing penalties are pure loss. Companies House annual accounts: nine months after year-end for private companies. Corporation Tax: nine months and one day after year-end for payment, twelve months for the return. Confirmation Statement: annually, anniversary of incorporation. Set up calendar reminders six weeks before each.</p>

<h2>The KST take</h2>
<p>We run this checklist with every client in the run-up to year-end and write up a one-page summary of what we are recommending and why. If you would like the same treatment for your company before your next year-end, the free 30-minute consultation includes a quick scan against this list and an estimate of how much there is to save.</p>

<p><em>General guidance only. Tax rates and rules change — and this article reflects the position as at 30 April 2026. Talk to your accountant about your specific circumstances before acting on any of the above.</em></p>
`.trim(),
  },
];

export function getInsight(slug: string): Insight | undefined {
  return insights.find((i) => i.slug === slug);
}

export function getInsightSlugs(): string[] {
  return insights.map((i) => i.slug);
}

export function formatInsightDate(iso: string): string {
  // British English long-form date.
  const d = new Date(iso + 'T00:00:00Z');
  return d.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}
