export const pricingPlans = [
  {
    name: 'Basic',
    description:
      'Perfect for getting started and organizing your current job search.',
    price: '$0',
    period: 'forever',
    features: [
      'Smart Kanban Board (up to 50 jobs)',
      'Basic Application Tracking',
      '3 AI Resume Optimizations / month',
      'Standard Document Vault',
      'Community Support',
    ],
    cta: 'Start for Free',
    href: '/register',
    popular: false,
  },
  {
    name: 'Pro',
    description:
      'Everything you need to automate and land your dream job faster.',
    price: '$12',
    period: 'per month',
    features: [
      'Unlimited Kanban Board Jobs',
      'Advanced Career Analytics',
      'Unlimited AI Resume Optimizations',
      'Unlimited AI Cover Letters',
      'Secure Document Vault (10GB)',
      'Automated Interview Reminders',
      'Priority Email Support',
    ],
    cta: 'Upgrade to Pro',
    href: '/register',
    popular: true,
  },
];
