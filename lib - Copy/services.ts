// Service data — drives /services/[slug] pages and homepage tiles.

export type Service = {
  slug: string;
  name: string;
  shortName: string;
  tagline: string;
  heroHeadline: string;
  heroSubhead: string;
  metaDescription: string;
  intro: string;
  bullets: string[];
  groups?: { title: string; items: string[] }[];
  icon: string; // SVG path — see ServiceIcon component
};

export const services: Service[] = [
  {
    slug: 'accountancy',
    name: 'Accountancy',
    shortName: 'Accountancy',
    tagline: 'Annual accounts, filed on time and tax-efficient',
    heroHeadline: 'Annual Accounts & Bookkeeping You Can Trust',
    heroSubhead:
      'Full statutory accounts, prepared in the correct format and submitted to HMRC and Companies House — always well before the deadline.',
    metaDescription:
      'Annual accounts, bookkeeping and Companies House submissions for SMEs in Essex and London. Chartered certified accountants.',
    intro:
      "Our experienced team delivers a full range of cost-effective accountancy services, tailored to your business. We keep you compliant, spot where you can save, and make sure there are no last-minute surprises at year-end.",
    bullets: [
      "Preparation of your company's annual statutory accounts in the correct format with fully compliant disclosures",
      'Meetings and phone calls to discuss accounts prior to online submission to HMRC and Companies House',
      'Identify areas of improvement and where you can save money',
      'Identify areas where we can assist in tax planning',
      'Advice on keeping good accounting records',
      'Discuss possible allowable expenses and tax relief',
    ],
    icon: 'accountancy',
  },
  {
    slug: 'taxation',
    name: 'Taxation',
    shortName: 'Taxation',
    tagline: 'Keep more of what you earn',
    heroHeadline: 'Tax Planning That Puts Money Back in Your Pocket',
    heroSubhead:
      'Effective tax planning — carried out before your year-end, not after — can significantly increase the earnings you take out of your business.',
    metaDescription:
      'Personal and corporate tax planning, HMRC agent services, tax disputes and enquiries. Qualified chartered certified accountants in Essex.',
    intro:
      'We work with clients prior to their financial year-end to identify every legitimate way tax can be minimised or deferred. We also act as your agent with HMRC whenever an enquiry lands.',
    bullets: [
      'Claiming all the tax relief you are entitled to',
      'A clear list of allowable expenses specific to your business',
      'Advice on the best business and corporate structure',
      'Regular meetings to discuss where you can save money',
      'Acting as your agent with HMRC',
      'Help with tax enquiries',
      'Dealing with tax disputes',
    ],
    icon: 'taxation',
  },
  {
    slug: 'vat',
    name: 'VAT',
    shortName: 'VAT',
    tagline: 'Registration, returns and Making Tax Digital — handled',
    heroHeadline: 'VAT Returns, MTD Filing & Scheme Selection',
    heroSubhead:
      'VAT is a moving target — rules change, thresholds shift and HMRC inspections happen. We handle the full cycle so you can focus on the business.',
    metaDescription:
      'VAT registration, returns, Making Tax Digital (MTD), scheme selection and inspection support. KST Accountants, Essex.',
    intro:
      'VAT is one of the most complex taxes affecting UK businesses. We help you pick the right scheme, file accurately, handle Intrastat and EC sales, and defend you in inspections.',
    bullets: [
      'VAT registration and de-registration',
      'Selecting the best available VAT scheme for your business',
      'Completing and submitting VAT returns correctly to HMRC',
      'VAT advice for small businesses, international traders (EU and beyond) and corporates',
      'Intrastat and EC sales for import and export businesses',
      'Dealing with VAT inspections, investigations and disputes',
      'Making Tax Digital (MTD) compliance and filing',
    ],
    icon: 'vat',
  },
  {
    slug: 'payroll',
    name: 'Payroll',
    shortName: 'Payroll',
    tagline: 'Your people paid on time, every time',
    heroHeadline: 'Fast, Flexible, Accurate Payroll',
    heroSubhead:
      'So you can get on with growing the business instead of running a payroll department.',
    metaDescription:
      'Full-service payroll — PAYE, RTI, auto-enrolment and year-end. Reliable UK payroll bureau for SMEs in Essex and London.',
    intro:
      'We guarantee a fast, flexible and accurate payroll service. From a single director on PAYE through to multi-site teams with bonuses and commission — we handle the lot.',
    bullets: [
      'PAYE registration',
      'Employee payslips and monthly payroll summary',
      'Bonus, commission and overtime payments',
      'Real Time Information (RTI) and auto-enrolment',
      'Ongoing expert tax planning and advisory',
      'End-of-year returns submission to HMRC',
    ],
    icon: 'payroll',
  },
  {
    slug: 'cis',
    name: 'CIS (Construction Industry Scheme)',
    shortName: 'CIS',
    tagline: 'Specialist CIS for contractors and subcontractors',
    heroHeadline: 'CIS Accountancy & Tax Returns — Done Properly',
    heroSubhead:
      'Whether you run a contracting business or you are a subcontractor claiming tax back, we are specialists in the Construction Industry Scheme.',
    metaDescription:
      'CIS specialists for contractors and subcontractors — HMRC registration, monthly returns, tax refunds, disputes. KST Accountants, Essex.',
    intro:
      'We handle everything from CIS registration and monthly returns for contractors, through to fast tax-refund claims and enquiry defence for subcontractors.',
    groups: [
      {
        title: 'For Contractors',
        items: [
          'CIS registration with HMRC',
          'Adding and verifying new subcontractors',
          'Submitting your monthly CIS returns',
          'Preparing accounts to identify all eligible expenses',
          'Quick and easy HMRC tax refund claims',
          'Tax advice and planning',
          'Claiming all the tax relief you are entitled to',
          'Acting as your agent with HMRC',
          'Help with tax enquiries and disputes',
        ],
      },
      {
        title: 'For Subcontractors',
        items: [
          'CIS registration with HMRC',
          'Preparing accounts to identify all eligible expenses',
          'Submitting tax returns on time and in full compliance',
          'Quick and easy HMRC tax refund claims',
          'Acting as your agent with HMRC',
          'Help with tax enquiries',
          'Dealing with tax disputes',
        ],
      },
    ],
    bullets: [],
    icon: 'cis',
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}
