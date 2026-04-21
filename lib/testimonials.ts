// Placeholder testimonials — replace with real client reviews before launch.
// Keep 4-6 for good rotation/grid rendering.

export type Testimonial = {
  name: string;
  role: string;
  company: string;
  quote: string;
  rating: 5;
};

export const testimonials: Testimonial[] = [
  {
    name: 'James H.',
    role: 'Director',
    company: 'Construction contractor, Essex',
    quote:
      'Kris turned our CIS mess around in a matter of weeks. Refunds came through faster than we ever had before and the monthly returns are now on autopilot.',
    rating: 5,
  },
  {
    name: 'Sarah P.',
    role: 'Owner',
    company: 'E-commerce retailer, London',
    quote:
      'The tax planning session alone paid for a year of fees. Honest, responsive, and you actually speak to a real accountant — not a call centre.',
    rating: 5,
  },
  {
    name: 'Michael R.',
    role: 'Managing Director',
    company: 'Property services Ltd',
    quote:
      "We switched from a big-name firm and the difference is night and day. Accounts done weeks ahead of deadline, VAT handled, and any HMRC letter answered the same day.",
    rating: 5,
  },
  {
    name: 'Priya S.',
    role: 'Freelance consultant',
    company: 'IT services',
    quote:
      'Straightforward, no-jargon advice from day one. KST helped me pick the right company structure and I saved thousands in tax in the first year alone.',
    rating: 5,
  },
];
