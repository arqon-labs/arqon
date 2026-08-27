export type NavItem = {
  label: string;
  href: string;
};

export type Fact = {
  label: string;
  value: string;
};

export type Service = {
  id: string;
  slug: string;
  title: string;
  description: string;
  outcome: string;
  tags: string[];
  navLabel: string;
  pageTitle: string;
  pageDescription: string;
  pageH1: string;
  formatId?: Format["id"];
  faq?: FaqItem[];
};

export type CaseDecision = {
  title: string;
  detail: string;
};

export type CaseMetric = {
  value: string;
  label: string;
};

export type CaseStudy = {
  id: string;
  label: string;
  title: string;
  context: string;
  challenge: string;
  decisions: CaseDecision[];
  result: string;
  metrics?: CaseMetric[];
};

export type Format = {
  id: string;
  title: string;
  description: string;
  duration: string;
};

export type ProcessStep = {
  title: string;
  detail: string;
};

export type FaqItem = {
  question: string;
  answer: string;
  link?: { href: string; label: string };
};

export type Content = {
  nav: NavItem[];
  seo: {
    title: string;
    description: string;
    keywords: string[];
    ogAlt: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    display: string;
    punch: string;
    lead: string;
    primaryCta: string;
    secondaryCta: string;
    trust: string;
    facts: Fact[];
  };
  about: {
    eyebrow: string;
    title: string;
    paragraphs: string[];
    domainsLabel: string;
    domains: string[];
    portraitAlt: string;
    portraitCaption: string;
  };
  services: {
    eyebrow: string;
    title: string;
    lead: string;
    path: string;
    indexTitle: string;
    indexDescription: string;
    indexH1: string;
    indexLead: string;
    moreLabel: string;
    breadcrumbHome: string;
    items: Service[];
  };
  cases: {
    eyebrow: string;
    title: string;
    lead: string;
    decisionsLabel: string;
    resultLabel: string;
    items: CaseStudy[];
  };
  formats: {
    eyebrow: string;
    title: string;
    lead: string;
    steps: ProcessStep[];
    durationsLabel: string;
    items: Format[];
    note: string;
  };
  faq: {
    eyebrow: string;
    title: string;
    items: FaqItem[];
  };
  contact: {
    eyebrow: string;
    title: string;
    lead: string;
    telegramTitle: string;
    telegramText: string;
    telegramCta: string;
    emailTitle: string;
    form: {
      nameLabel: string;
      namePlaceholder: string;
      contactLabel: string;
      contactHint: string;
      contactPlaceholder: string;
      messageLabel: string;
      messagePlaceholder: string;
      submit: string;
      submitting: string;
      successTitle: string;
      successText: string;
      successCta: string;
      errorTitle: string;
      privacy: string;
    };
  };
  footer: {
    description: string;
    rights: string;
    terms: string;
    linksLabel: string;
    servicesLabel: string;
  };
  errors: {
    notFoundTitle: string;
    notFoundText: string;
    notFoundCta: string;
    homeCta: string;
    crashTitle: string;
    crashText: string;
    crashCta: string;
  };
};
