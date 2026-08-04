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
  title: string;
  description: string;
  outcome: string;
  tags: string[];
};

export type CaseDecision = {
  title: string;
  detail: string;
};

export type CaseStudy = {
  id: string;
  label: string;
  title: string;
  context: string;
  challenge: string;
  decisions: CaseDecision[];
  result: string;
};

export type Format = {
  id: string;
  title: string;
  description: string;
  duration: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type Content = {
  nav: NavItem[];
  hero: {
    eyebrow: string;
    title: string;
    lead: string;
    primaryCta: string;
    secondaryCta: string;
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
    linksLabel: string;
  };
  errors: {
    notFoundTitle: string;
    notFoundText: string;
    notFoundCta: string;
    crashTitle: string;
    crashText: string;
    crashCta: string;
  };
};
