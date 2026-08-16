import { Button } from '@/components/ui/button';
import { ArrowRight, Star } from 'lucide-react';

export default function Cta() {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="relative rounded-[2.5rem] bg-primary overflow-hidden shadow-2xl">
          {/* Premium Blue Background Effects */}
          {/* Subtle Gradient Overlays for depth */}
          <div className="absolute inset-0 bg-linear-to-br from-white/10 via-transparent to-black/20"></div>

          {/* Glowing Orbs */}
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-white/20 rounded-full blur-[100px] pointer-events-none"></div>
          <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-black/20 rounded-full blur-[100px] pointer-events-none"></div>

          {/* Premium CSS Grid Pattern overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff1a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff1a_1px,transparent_1px)] bg-size-[32px_32px] mask-[radial-gradient(ellipse_80%_60%_at_50%_40%,#000_70%,transparent_100%)] pointer-events-none"></div>

          <div className="relative px-6 py-10 md:py-12 md:px-16 text-center flex flex-col items-center">
            {/* Social Proof Badge */}
            <div className="mb-10 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-sm font-medium backdrop-blur-md shadow-sm">
              <span className="flex items-center gap-0.5 text-amber-300">
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
              </span>
              <span className="w-px h-4 bg-white/30 mx-2"></span>
              Trusted by 10,000+ job seekers
            </div>

            {/* Typography */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6 max-w-3xl text-balance leading-[1.15]">
              Ready to take control of your career journey?
            </h2>

            <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl text-balance leading-relaxed">
              Join thousands of professionals who have ditched the messy
              spreadsheets and accelerated their job search with CareerFlow AI.
            </p>

            {/* CTA Button */}
            <div className="flex items-center sm:flex-row gap-4 w-full">
              <Button
                size="lg"
                className="flex justify-center gap-2 items-center group mx-auto h-14 px-6 text-base font-bold shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all text-primary bg-white hover:bg-white/90 rounded-xl"
              >
                Start Tracking for Free
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>

            <p className="mt-8 text-sm font-medium text-white/70">
              No credit card required. Free plan available forever.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
