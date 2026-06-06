import { ServiceItem, Testimonial, TimelineStep, FaqItem, QuizQuestion } from "./types";

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: "financial-planning",
    title: "Financial Planning",
    badge: "Wealth Growth & Retirement Protection",
    shortDescription: "Personalised strategies designed to construct durable assets, optimize superannuation, and ensure long-term retirement security for your family.",
    longDescription: "Our wealth creation and transition strategies are engineered to help Australian families build a lifetime of clear financial security. We look past general presets, focusing instead on tax optimization, SMSF support, passive income generation, and clear retirement pathways.",
    features: [
      "Superannuation Optimization & Choice",
      "Self-Managed Super Funds (SMSFs) Strategy",
      "Taxation Minimization & Structural Planning",
      "Retirement Transition & Income Streams (TTR)",
      "High-Yield Investment Portfolio Management",
      "Family Wealth Legacy & Estate Transition Planning"
    ],
    fullContent: [
      "Your strategic outline begins with a custom assessment of your family assets, personal debts, super balances, and wealth timeline.",
      "We build customized wealth models showcasing retirement paths under different income structures, helping you understand how long accumulated super balances will last during retirement.",
      "By utilizing structural contribution caps (including catch-up concessional contributions), we systematically lower your tax burdens while directing maximum resources into compound growth models."
    ],
    pricingModel: "Complimentary initial discovery consultation. Transparent flat-fee structural planning depending on asset complexities.",
    iconName: "TrendingUp"
  },
  {
    id: "mortgage-broking",
    title: "Mortgage Broking",
    badge: "Home Loans & Borrowing Power",
    shortDescription: "Specialist Australian mortgage advisory custom-matching top lenders to secure your first home, premium upgrade, or high-performing investment property.",
    longDescription: "As licensed Australian mortgage brokers, we navigate hundreds of competitive rates from over 30 leading tier-1 banks and specialty lenders. We handle all approvals, offsets, and loan re-structuring to save you tens of thousands on compound interest.",
    features: [
      "First Home Owner Grant (FHOG) Guidance",
      "Owner-Occupier & Residential Refinancing",
      "Specialist Construction & Renovation Loans",
      "High-Performance Investment Property Portfolios",
      "Offset Accounts & Line of Credit Structure",
      "Pre-Approval Fast-Tracking in Under 48 Hours"
    ],
    fullContent: [
      "We calculate your absolute maximum borrowing limit using realistic bank calculation calculators, so you bid with absolute confidence.",
      "Our team custom-matches your requirements against dozens of Australian lenders to find flexible offset accounts, low fixed/variable rates, and interest savings.",
      "We prepare, audit, and submit your absolute files directly to decision-makers to limit delays and avoid unnecessary credit file checks."
    ],
    pricingModel: "Our professional mortgage broking services are strictly client-centric, with lender-paid fee clarity and zero hidden service surcharges.",
    iconName: "Home"
  },
  {
    id: "aged-care",
    title: "Aged Care Advice",
    badge: "Compassionate Fee Protection",
    shortDescription: "Navigating complex placement fees, RAD vs DAP decisions, and Centrelink pension optimizations to secure your loved one's comfort.",
    longDescription: "Navigating aged care placement represents one of the most emotional and technically stressful seasons for Australian families. We manage RAD (Refundable Accommodation Deposit) vs DAP (Daily Accommodation Payment) equations to preserve legacy assets and boost state pensions.",
    features: [
      "RAD vs DAP Technical Modeling & Asset Protection",
      "Refundable Deposit Structuring & Refinancing",
      "Means-Tested Fee Avoidance & Financial Structuring",
      "Centrelink Assessment Audits & Liaison",
      "Estate Transition Safeguarding & Family Equity Planning",
      "Strategic Placement Advice & Accommodation Strategy"
    ],
    fullContent: [
      "We formulate specialized RAD/DAP models to show whether paying a lump-sum, a interest-bearing daily rate, or a customized hybrid makes the most financial sense.",
      "With direct experience in Australian aged care rules, we maximize ongoing Aged Pension entitlements and reduce ongoing means-tested facility fees.",
      "We eliminate family stress by compiling complex documentation and directly acting as your qualified state representatives."
    ],
    pricingModel: "Flat-rate fee structured explicitly on planning complexity. Zero commission alignment for RAD placements.",
    iconName: "HeartHandshake"
  }
];

export const TIMELINE_ADVISORY: TimelineStep[] = [
  {
    step: "01",
    title: "Discovery Consultation",
    subtitle: "Complimentary Initial Roadmap Session",
    description: "An initial, zero-obligation face-to-face or Zoom consultation to understand your family wealth objectives, home ownership timelines, and financial pain points.",
    timeframe: "45 Minutes"
  },
  {
    step: "02",
    title: "Strategy & Analysis",
    subtitle: "Deep-Dive Wealth Assessment",
    description: "Our accredited advisors compile your debt profiles, asset structures, super contributions, and aged care positions, running specialized simulation models.",
    timeframe: "5 - 7 Business Days"
  },
  {
    step: "03",
    title: "Personal Financial Blueprint",
    subtitle: "Your Comprehensive Statement of Advice (SOA)",
    description: "We present your customized wealth growth pathway, specific mortgage combinations, and asset security recommendations in highly digestible formats.",
    timeframe: "Presented in Session"
  },
  {
    step: "04",
    title: "Implementation & Partnership",
    subtitle: "Active Execution & Ongoing Calibration",
    description: "We submit applications, execute SMSF transitions, handle RAD transfers, and meet annually to recalibrate filters as Australian regulations shift.",
    timeframe: "Consistent Growth Support"
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "story-1",
    name: "Dr. Dakotah Janes",
    location: "Toorak, Melbourne",
    avatarUrl: "https://images.unsplash.com/photo-1594824813573-246434de83fb?auto=format&fit=crop&q=80&w=200",
    rating: 5,
    service: "Aged Care & Refinancing advice",
    quote: "Moving my parents into custom residential care while managing my own medical practice seemed impossible. Anita solved the RAD vs DAP equation immediately. Her expertise saved our family home and optimized my mother's pension. An absolute savior.",
    timelineResult: "RAD hybrid savings: $48k, mother's pension optimized."
  },
  {
    id: "story-2",
    name: "Marcus & Elly Vance",
    location: "South Yarra, Victoria",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
    rating: 5,
    service: "Mortgage Refinancing & Wealth Creation",
    quote: "Refinancing our investment properties through BrightR was effortless. Anita discovered lending features our previous major bank completely omitted. The interest reduction let us fast-track a second SMSF build.",
    timelineResult: "Refinanced loan at 1.4% less with combined offset account strategy."
  },
  {
    id: "story-3",
    name: "Josephine & Ken Harrison",
    location: "Malvern, Melbourne",
    avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200",
    rating: 5,
    service: "Retirement & Super Transition",
    quote: "With retirement less than a year away, we were desperately concerned about the falling market. Anita created a tailored bucket-strategy with clear dividend streams. We are now enjoying full retirement without looking at daily market drops.",
    timelineResult: "Tax-free pension setup structured to support 25+ years of active lifestyle."
  }
];

export const GENERAL_FAQS: FaqItem[] = [
  {
    category: "General",
    question: "Is BrightR Financial licensed and Australian owned?",
    answer: "Yes, BrightR Financial is 100% Australian owned and operated out of South Yarra, Melbourne. All our advisors are fully credentialed, licensed under matching ASIC regulations, and hold appropriate Australian Financial Services (AFS) or Credit Licences to deliver holistic planning and mortgage advice."
  },
  {
    category: "Super & Wealth",
    question: "What is Superannuation transition planning (Transition to Retirement)?",
    answer: "A Transition to Retirement (TTR) strategy allows you to access your accrued super balance via a tax-friendly pension income stream while you are still working (usually from age 60). This is specialized to let you maintain salary sacrifice balances, decrease personal income tax, or smooth work-hour reductions."
  },
  {
    category: "Mortgages",
    question: "How does a 100% offset account save money on mortgage interest?",
    answer: "An offset account is a standard transaction account directly linked to your home loan. Instead of earning taxable interest on your savings, the offset balance is directly subtracted from your mortgage debt before calculating daily interest. For example, a $500k home loan offset by $50k in cash means you only pay compounding interest on $450k, saving thousands over the loan life."
  },
  {
    category: "Aged Care",
    question: "What is RAD and DAP inside Australian Aged Care?",
    answer: "In Australian aged care, RAD (Refundable Accommodation Deposit) is an upfront, government-guaranteed lump sum deposit for your care room. DAP (Daily Accommodation Payment) is an alternative daily, non-refundable interest-based fee. Deciding which to pay—or custom building a hybrid payment—impacts your Centrelink pension rate, daily care fees, and estate value significantly. We help calculate the exact math."
  }
];

export const HEALTH_QUIZ_DATA: QuizQuestion[] = [
  {
    id: 1,
    question: "How would you describe your current Superannuation or retirement savings track?",
    category: "Superannuation",
    options: [
      { text: "Optimized with consistent extra salary sacrifice or SMSF setup", score: 25, tip: "Excellent work! Active super building compounding early saves tens of thousands in tax." },
      { text: "Have regular industry super but rarely check investment classes or fees", score: 12, tip: "Often, general defaults are allocated to conservative products. Let's look for active returns." },
      { text: "Concerned I don't have enough super as retirement approaches", score: 4, tip: "Don't panic—Australian rules allow catch-up concessional contributions and downsizing boosts." }
    ]
  },
  {
    id: 2,
    question: "When did you last review or negotiate your home loan or investment interest rates?",
    category: "Mortgages",
    options: [
      { text: "Secure on a highly competitive rate with active offset feature", score: 25, tip: "Outstanding mortgage structure. Keep tracking premium variable offset balances." },
      { text: "Over 18 months ago—I might be on a basic 'lazy variable' rate", score: 10, tip: "Major banks often raise variable rates on existing clients while offering low intro rates. You may need to refinance." },
      { text: "I do not currently own property but want a blueprint for a deposit", score: 15, tip: "First home schemes in Australia are highly supportive if categorized correctly. Clear plans yield results." }
    ]
  },
  {
    id: 3,
    question: "Do you have active wealth-building investments outside of your primary family home?",
    category: "Wealth Creation",
    options: [
      { text: "Yes, active shares, diversified ETFs, or residential property investment", score: 25, tip: "Superb. Diversification outside real estate mitigates regional downturns." },
      { text: "Only cash savings in typical high-yield bank accounts", score: 12, tip: "Cash is safe but undergoes inflation erosion. Broadening into long-term equities increases safety." },
      { text: "Not yet—my extra funds currently cover rent, lifestyle, or debt servicing", score: 5, tip: "Focusing first on strategic debt minimisation and budget clarity yields immediate 'guaranteed' returns." }
    ]
  },
  {
    id: 4,
    question: "What level of structure do you have for personal tax reduction and estate legacy?",
    category: "Protection",
    options: [
      { text: "Robust with clear family trusts, SMSF allocations, or up-to-date wills", score: 25, tip: "Exceptional. Clear asset structuring blocks legal claims and limits tax burdens." },
      { text: "Basic tax deductions at work, but no formal family legacy planning", score: 12, tip: "Tax structures can save substantial sums as salary levels scale. Worth structured review." },
      { text: "None—I usually just lodge standard self-returns online and cross my fingers", score: 5, tip: "Custom structural advice can uncover offset options, super booster rules, and tax shelters." }
    ]
  }
];
