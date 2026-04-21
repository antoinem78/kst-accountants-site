export type FaqItem = { question: string; answer: string };

export const faqs: FaqItem[] = [
  {
    question: 'How much do you charge?',
    answer:
      'Our fees are fixed and agreed in advance — no hourly billing, no surprise invoices. Pricing depends on the size and complexity of your business, but most small-company annual packages start from a few hundred pounds a month. We offer a free initial consultation and tax review so we can quote accurately.',
  },
  {
    question: 'How quickly can I switch to KST from my current accountant?',
    answer:
      'Usually within a week or two. We handle the professional-clearance letter with your outgoing accountant and request the records ourselves — you just need to send us a signed 64-8 (HMRC agent authorisation). There is no break in service.',
  },
  {
    question: 'Which accounting software do you work with?',
    answer:
      'We work with all major cloud platforms — Xero, QuickBooks, FreeAgent, Sage and more. If you are already on one, we will plug straight in. If you are not, we can recommend the right fit for your business and set it up.',
  },
  {
    question: 'Do you handle HMRC enquiries and disputes?',
    answer:
      'Yes. As your registered HMRC agent we deal with every letter, call and enquiry directly. We prepare responses, negotiate settlements where appropriate and represent you right through to tribunal if needed.',
  },
  {
    question: 'Are you ready for Making Tax Digital?',
    answer:
      'Yes — we file VAT and Income Tax under MTD and will have your records, software and processes compliant well before any deadline that applies to you.',
  },
  {
    question: 'What happens at the free consultation?',
    answer:
      'A 30-minute phone call (or in-person meeting at our Buckhurst Hill office if you prefer). We review your current setup, look for tax-saving opportunities you might be missing, and give you a written quote. No pressure, no obligation.',
  },
];
