import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Calendar, Video, MapPin, Search } from 'lucide-react';
import { KanbanItem } from '@/components/applications/KanbanCard';

interface UpcomingInterviewsProps {
  applications: KanbanItem[];
}

export default function UpcomingInterviews({ applications }: UpcomingInterviewsProps) {
  // Filter for applications in "interviewing" status
  const interviews = applications.filter((app) => app.status === 'interviewing').slice(0, 4);

  return (
    <Card className="border-slate-200/60 shadow-sm flex flex-col h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-4 border-b border-slate-100">
        <CardTitle className="text-lg font-bold text-slate-900">
          Upcoming Interviews
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0 flex-1 flex flex-col">
        {interviews.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
            <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center mb-3 border border-amber-100">
              <Search className="w-6 h-6 text-amber-500" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 mb-1">No interviews scheduled</h3>
            <p className="text-xs text-slate-500 max-w-[200px]">
              Move an application to the Interviewing stage to see it here.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {interviews.map((interview) => (
              <div
                key={interview.id}
                className="p-5 hover:bg-slate-50/50 transition-colors group"
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        'w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 shadow-sm',
                        interview.color || 'bg-slate-100 text-slate-700'
                      )}
                    >
                      {interview.logo || '💼'}
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 text-sm group-hover:text-primary transition-colors cursor-pointer leading-tight">
                        {interview.company}
                      </div>
                      <div className="text-slate-500 text-xs mt-0.5">
                        {interview.role}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 mt-3 pt-3 border-t border-slate-100/60">
                  <div className="flex items-center text-xs text-slate-600 font-medium bg-slate-100/80 px-2 py-1 rounded-md">
                    <Calendar className="w-3.5 h-3.5 mr-1.5 text-slate-400" />
                    {interview.deadline ? new Date(interview.deadline).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) : 'TBD'}
                  </div>
                  <div className="flex items-center text-xs text-slate-600 font-medium bg-slate-100/80 px-2 py-1 rounded-md">
                    {interview.workMode === 'remote' ? (
                      <Video className="w-3.5 h-3.5 mr-1.5 text-slate-400" />
                    ) : (
                      <MapPin className="w-3.5 h-3.5 mr-1.5 text-slate-400" />
                    )}
                    <span className="capitalize">{interview.workMode || 'Unknown'}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
