import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import HeroTabs from './HeroTabs';

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10 bg-background overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]"></div>
        <div className="absolute left-1/2 top-0 h-200 w-200 -translate-x-1/2 -translate-y-1/2 opacity-20 blur-[100px] rounded-full bg-primary/40 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-primary/10 via-background to-background -z-10"></div>
      </div>
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-primary/20 to-transparent"></div>
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/20 rounded-full blur-3xl -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8 border border-primary/20 shadow-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          CareerFlow AI is now in public beta
        </div>

        {/* Headline */}
        <h1 className="mb-6 max-w-4xl mx-auto text-balance text-slate-900">
          Land your dream job with a smarter application tracker
        </h1>

        {/* Description */}
        <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto text-balance">
          Organize your entire job search in one place. Track applications,
          schedule interviews, and use AI tools to optimize your resume and land
          offers faster.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 md:mb-24">
          <Link
            href="/register"
            className="flex items-center gap-2 bg-primary text-white px-8 py-3.5 rounded-xl font-bold hover:bg-primary/90 transition-all shadow-[0_8px_20px_-6px_rgba(37,99,235,0.4)] hover:shadow-[0_12px_25px_-8px_rgba(37,99,235,0.5)] hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            Start Tracking Free
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            href="#how-it-works"
            className="px-8 py-3.5 rounded-xl font-semibold text-slate-700 bg-white border border-slate-200 shadow-sm hover:bg-slate-50 hover:text-slate-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            How it works
          </Link>
        </div>
        {/* Tabs */}
        <HeroTabs />
      </div>
    </section>
  );
}
