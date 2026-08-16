import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { pricingPlans } from '@/data/pricing';
import { Check } from 'lucide-react';
import Link from 'next/link';

export default function Pricing() {
  return (
    <section
      id="pricing"
      className="py-24 md:py-32 bg-secondary/30 relative border-t border-border/50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <h2 className="mb-4">Simple, transparent pricing</h2>
          <p className="text-lg md:text-xl text-muted-foreground">
            Start for free and upgrade when you need more power. No hidden fees
            or surprise charges.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {pricingPlans.map((plan) => (
            <Card
              key={plan.name}
              className={`relative flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl ${
                plan.popular
                  ? 'border-primary shadow-lg shadow-primary/10 bg-white md:-translate-y-2 z-10'
                  : 'border-slate-200 bg-white'
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 inset-x-0 h-2 bg-primary"></div>
              )}
              {plan.popular && (
                <div className="absolute top-5 right-5 bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  Most Popular
                </div>
              )}

              <CardHeader className="pt-8 pb-6 px-6 md:px-8">
                <CardTitle className="text-2xl mb-2 text-slate-900">
                  {plan.name}
                </CardTitle>
                <CardDescription className="text-base text-slate-600 text-balance pr-16 md:pr-0">
                  {plan.description}
                </CardDescription>
                <div className="mt-6 flex items-baseline gap-2">
                  <span className="text-4xl md:text-5xl font-bold text-slate-900">
                    {plan.price}
                  </span>
                  <span className="text-slate-500 font-medium text-sm">
                    / {plan.period}
                  </span>
                </div>
              </CardHeader>

              <CardContent className="flex-1 px-6 md:px-8">
                <ul className="space-y-4">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div
                        className={`mt-0.5 rounded-full p-1 shrink-0 ${plan.popular ? 'bg-primary text-white' : 'bg-slate-100 text-slate-500'}`}
                      >
                        <Check className="w-3.5 h-3.5" strokeWidth={3} />
                      </div>
                      <span className="text-slate-700 leading-tight text-[15px] font-medium">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter className="pt-6 pb-8 px-6 md:px-8">
                <Button
                  size="lg"
                  variant={plan.popular ? 'outline' : 'outline'}
                  className={`w-full font-bold h-12 transition-all text-white ${
                    plan.popular
                      ? 'shadow-[0_4px_14px_0_rgba(37,99,235,0.2)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.3)] hover:-translate-y-0.5 '
                      : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <Link href={plan.href}>{plan.cta}</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
