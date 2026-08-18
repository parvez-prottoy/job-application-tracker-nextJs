import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Briefcase, CalendarClock, Sparkles, Trophy } from 'lucide-react';

const stats = [
  {
    name: 'Total Applications',
    value: '48',
    change: '+12%',
    changeType: 'positive',
    icon: Briefcase,
    color: 'text-blue-600',
    bg: 'bg-blue-600/10',
  },
  {
    name: 'Interviews Scheduled',
    value: '4',
    change: '+2',
    changeType: 'positive',
    icon: CalendarClock,
    color: 'text-indigo-600',
    bg: 'bg-indigo-600/10',
  },
  {
    name: 'Offers Received',
    value: '1',
    change: '+1',
    changeType: 'positive',
    icon: Trophy,
    color: 'text-emerald-600',
    bg: 'bg-emerald-600/10',
  },
  {
    name: 'AI Optimized Resumes',
    value: '14',
    change: '+5 this week',
    changeType: 'neutral',
    icon: Sparkles,
    color: 'text-amber-600',
    bg: 'bg-amber-600/10',
  },
];
export default function ApplicationQuickCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card
            key={stat.name}
            className="border-slate-200/60 shadow-sm hover:shadow-md transition-shadow"
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500 mb-1">
                    {stat.name}
                  </p>
                  <div className="flex items-baseline gap-2">
                    <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
                      {stat.value}
                    </h3>
                    <span
                      className={cn(
                        'text-xs font-semibold px-2 py-0.5 rounded-full',
                        stat.changeType === 'positive'
                          ? 'bg-emerald-100 text-emerald-700'
                          : stat.changeType === 'negative'
                            ? 'bg-red-100 text-red-700'
                            : 'bg-slate-100 text-slate-700'
                      )}
                    >
                      {stat.change}
                    </span>
                  </div>
                </div>
                <div
                  className={cn(
                    'w-12 h-12 rounded-xl flex items-center justify-center shrink-0',
                    stat.bg,
                    stat.color
                  )}
                >
                  <Icon className="w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
