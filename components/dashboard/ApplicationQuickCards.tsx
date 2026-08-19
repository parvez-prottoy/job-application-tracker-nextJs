import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Briefcase, CalendarClock, Target, Trophy, XCircle, Send } from 'lucide-react';
import { KanbanItem } from '@/components/applications/KanbanCard';

interface ApplicationQuickCardsProps {
  applications: KanbanItem[];
}

export default function ApplicationQuickCards({ applications }: ApplicationQuickCardsProps) {
  const counts = {
    total: applications.length,
    wishlist: applications.filter((a) => a.status === 'wishlist').length,
    applied: applications.filter((a) => a.status === 'applied').length,
    interviewing: applications.filter((a) => a.status === 'interviewing').length,
    offer: applications.filter((a) => a.status === 'offer').length,
    rejected: applications.filter((a) => a.status === 'rejected').length,
  };

  const stats = [
    {
      name: 'Total Applications',
      value: counts.total.toString(),
      icon: Briefcase,
      color: 'text-blue-600',
      bg: 'bg-blue-600/10',
    },
    {
      name: 'Wishlist',
      value: counts.wishlist.toString(),
      icon: Target,
      color: 'text-slate-600',
      bg: 'bg-slate-600/10',
    },
    {
      name: 'Applied',
      value: counts.applied.toString(),
      icon: Send,
      color: 'text-purple-600',
      bg: 'bg-purple-600/10',
    },
    {
      name: 'Interviewing',
      value: counts.interviewing.toString(),
      icon: CalendarClock,
      color: 'text-amber-600',
      bg: 'bg-amber-600/10',
    },
    {
      name: 'Offer',
      value: counts.offer.toString(),
      icon: Trophy,
      color: 'text-emerald-600',
      bg: 'bg-emerald-600/10',
    },
    {
      name: 'Rejected',
      value: counts.rejected.toString(),
      icon: XCircle,
      color: 'text-red-600',
      bg: 'bg-red-600/10',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 sm:gap-6">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card
            key={stat.name}
            className="border-slate-200/60 shadow-sm hover:shadow-md transition-shadow"
          >
            <CardContent className="p-4 sm:p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-slate-500 mb-1">
                    {stat.name}
                  </p>
                  <div className="flex items-baseline gap-2">
                    <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
                      {stat.value}
                    </h3>
                  </div>
                </div>
                <div
                  className={cn(
                    'w-10 h-10 rounded-xl flex items-center justify-center shrink-0',
                    stat.bg,
                    stat.color
                  )}
                >
                  <Icon className="w-5 h-5" />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
