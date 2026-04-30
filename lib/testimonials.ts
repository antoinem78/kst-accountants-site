// No testimonials shown until real client reviews are collected and approved.
//
// To bring testimonials back:
//   1. Populate this array with real entries (with the client's written permission).
//   2. Re-add the imports and JSX for `Testimonials` and `ReviewsJsonLd` in app/page.tsx
//      (both components self-disable while this array is empty, so just re-rendering
//      them is enough — but we keep them out of the homepage for now to avoid an
//      empty section if someone repopulates without testing).
//
// See SingularWeb.ai/knowledge-base/KST/KNOWLEDGE_BASE.md §17 (Pending — Real testimonials).

export type Testimonial = {
  name: string;
  role: string;
  company: string;
  quote: string;
  rating: 5;
};

export const testimonials: Testimonial[] = [];
