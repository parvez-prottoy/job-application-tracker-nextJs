import { ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';
export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Premium Layered Background */}
      <div className="absolute inset-0 -z-10 bg-background overflow-hidden pointer-events-none">
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]"></div>

        {/* Primary Radial Glow */}
        <div className="absolute left-1/2 top-0 h-200 w-200 -translate-x-1/2 -translate-y-1/2 opacity-20 blur-[100px] rounded-full bg-primary/40 mix-blend-multiply"></div>

        {/* Secondary Soft Accents */}
        <div className="absolute right-0 top-1/4 h-125 w-125 translate-x-1/3 opacity-20 blur-[80px] rounded-full bg-info/30 mix-blend-multiply"></div>
        <div className="absolute left-0 bottom-0 h-150 w-150 -translate-x-1/3 translate-y-1/3 opacity-15 blur-[100px] rounded-full bg-primary/30 mix-blend-multiply"></div>

        {/* Bottom Fade Gradient */}
        <div className="absolute inset-0 bg-linear-to-t from-background via-background/80 to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8">
          <Sparkles className="w-4 h-4" />
          <span>AI-Powered Career Management</span>
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

        {/* Dashboard Preview UI Skeleton */}
        <div className="relative mx-auto max-w-5xl rounded-2xl border border-slate-200/60 bg-white shadow-2xl overflow-hidden text-left ring-1 ring-black/5">
          {/* Mac-style window header */}
          <div className="h-12 border-b border-slate-100 bg-slate-50/50 flex items-center px-4">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-destructive/80"></div>
              <div className="w-3 h-3 rounded-full bg-warning/80"></div>
              <div className="w-3 h-3 rounded-full bg-success/80"></div>
            </div>
          </div>

          {/* Skeleton Body */}
          <div className="p-4 md:p-8 bg-slate-50/30">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Sidebar Skeleton */}
              <div className="hidden md:flex flex-col gap-4 col-span-1 border-r border-slate-100 pr-6">
                <div className="h-8 w-3/4 bg-muted rounded-md mb-6"></div>
                <div className="space-y-3">
                  <div className="h-4 w-full bg-muted rounded-md"></div>
                  <div className="h-4 w-full bg-muted rounded-md"></div>
                  <div className="h-4 w-5/6 bg-primary/20 rounded-md"></div>
                  <div className="h-4 w-full bg-muted rounded-md"></div>
                </div>
                <div className="mt-8 space-y-3">
                  <div className="h-4 w-1/2 bg-muted rounded-md mb-2"></div>
                  <div className="h-4 w-full bg-muted rounded-md"></div>
                  <div className="h-4 w-4/5 bg-muted rounded-md"></div>
                </div>
              </div>

              {/* Main Content Skeleton */}
              <div className="col-span-1 md:col-span-3 flex flex-col gap-6">
                <div className="flex justify-between items-center mb-2">
                  <div className="h-8 w-1/3 bg-muted rounded-md"></div>
                  <div className="h-9 w-32 bg-primary/90 rounded-md shadow-sm"></div>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="h-24 bg-white border border-slate-100 rounded-xl p-4 flex flex-col justify-between shadow-sm"
                    >
                      <div className="h-3 w-1/2 bg-slate-100 rounded-md"></div>
                      <div className="h-8 w-1/3 bg-slate-200 rounded-md"></div>
                    </div>
                  ))}
                </div>

                {/* Kanban Board Skeleton */}
                <div className="h-72 bg-background border border-border rounded-lg shadow-sm mt-2 flex gap-4 p-4 overflow-hidden">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="flex-1 bg-secondary/50 rounded-md p-3 flex flex-col gap-3 min-w-50"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="h-4 w-1/2 bg-muted rounded-md"></div>
                        <div className="h-4 w-6 bg-muted rounded-md"></div>
                      </div>
                      <div className="h-24 bg-card rounded-md border border-border shadow-sm p-3">
                        <div className="h-3 w-1/3 bg-muted rounded-md mb-3"></div>
                        <div className="h-4 w-3/4 bg-foreground/20 rounded-md mb-2"></div>
                        <div className="h-3 w-1/2 bg-muted rounded-md"></div>
                      </div>
                      <div className="h-24 bg-card rounded-md border border-border shadow-sm p-3">
                        <div className="h-3 w-2/5 bg-muted rounded-md mb-3"></div>
                        <div className="h-4 w-4/5 bg-foreground/20 rounded-md mb-2"></div>
                        <div className="h-3 w-1/3 bg-muted rounded-md"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom gradient fade for the preview */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-background via-background/80 to-transparent pointer-events-none"></div>
        </div>
      </div>
    </section>
  );
}
