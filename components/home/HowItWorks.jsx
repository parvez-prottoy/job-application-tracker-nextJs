import { workSteps } from '@/data/workSteps';
export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="py-24 md:py-32 bg-background relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <h2 className="mb-4 text-slate-900">How CareerFlow AI Works</h2>
          <p className="text-lg md:text-xl text-slate-600">
            A simple, streamlined workflow designed to take you from job seeker
            to hired faster than ever.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {workSteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className="relative flex flex-col items-center text-center group"
              >
                {/* Connector Line (hidden on mobile/tablet, visible on desktop) */}
                {index !== workSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-[60%] w-[80%] h-0.5 bg-slate-200">
                    <div className="h-full bg-primary/40 w-0 group-hover:w-full transition-all duration-700 ease-in-out"></div>
                  </div>
                )}

                {/* Icon Container */}
                <div className="relative z-10 w-20 h-20 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-center mb-6 transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-lg group-hover:border-primary/30">
                  <Icon className="w-10 h-10 text-slate-400 group-hover:text-primary transition-colors duration-300" />

                  {/* Step Number Badge */}
                  <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold border-[3px] border-white shadow-sm">
                    {index + 1}
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold mb-3 text-slate-900">
                  {step.title}
                </h3>
                <p className="text-slate-600 leading-relaxed text-balance">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
