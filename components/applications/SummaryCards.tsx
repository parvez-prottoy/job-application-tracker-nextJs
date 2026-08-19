import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Award, Briefcase, MessageSquare, Send, XCircle } from 'lucide-react';

import { KanbanItem } from './KanbanCard';

interface SummaryCardsProps {
  applications: KanbanItem[];
}

export default function SummaryCards({ applications }: SummaryCardsProps) {
  const counts = {
    total: applications.length,
    applied: applications.filter((a) => a.status === 'applied').length,
    interviewing: applications.filter((a) => a.status === 'interviewing')
      .length,
    offer: applications.filter((a) => a.status === 'offer').length,
    rejected: applications.filter((a) => a.status === 'rejected').length,
  };

  const metrics = [
    {
      name: 'Total',
      value: counts.total,
      icon: Briefcase,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
      border: 'border-t-blue-500',
    },
    {
      name: 'Applied',
      value: counts.applied,
      icon: Send,
      color: 'text-purple-600',
      bg: 'bg-purple-50',
      border: 'border-t-purple-500',
    },
    {
      name: 'Interview',
      value: counts.interviewing,
      icon: MessageSquare,
      color: 'text-amber-600',
      bg: 'bg-amber-50',
      border: 'border-t-amber-500',
    },
    {
      name: 'Offer',
      value: counts.offer,
      icon: Award,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
      border: 'border-t-emerald-500',
    },
    {
      name: 'Rejected',
      value: counts.rejected,
      icon: XCircle,
      color: 'text-red-600',
      bg: 'bg-red-50',
      border: 'border-t-red-500',
    },
  ];
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
      {metrics.map((metric) => {
        const Icon = metric.icon;
        return (
          <Card
            key={metric.name}
            className={cn(
              'relative overflow-hidden border-slate-200/60 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md group border-t-2',
              metric.border
            )}
          >
            <CardContent className="p-3.5 sm:p-4 flex items-center justify-between gap-2">
              <div className="flex flex-col justify-center">
                <p className="text-[11px] sm:text-xs font-semibold text-slate-500 tracking-wider uppercase mb-0.5">
                  {metric.name}
                </p>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight leading-none">
                  {metric.value}
                </h3>
              </div>
              <div
                className={cn(
                  'w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl flex items-center justify-center shrink-0 transition-colors duration-200',
                  metric.bg,
                  metric.color
                )}
              >
                <Icon className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={2.5} />
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
