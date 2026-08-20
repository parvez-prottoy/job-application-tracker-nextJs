import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Calendar, Video, MapPin, Phone, Search } from 'lucide-react';
import { IInterviewData } from '@/components/interviews/InterviewsClient';
import Link from 'next/link';

interface UpcomingInterviewsProps {
  interviews: IInterviewData[];
}

export default function UpcomingInterviews({ interviews }: UpcomingInterviewsProps) {
  const now = new Date();
  
  // Filter for upcoming scheduled interviews, sort by closest first, limit to 4
  const upcomingInterviews = interviews
    .filter((interview) => interview.status === 'scheduled' && new Date(`${interview.interviewDate}T${interview.interviewTime}`) >= now)
    .sort((a, b) => {
      const dateA = new Date(`${a.interviewDate}T${a.interviewTime}`).getTime();
      const dateB = new Date(`${b.interviewDate}T${b.interviewTime}`).getTime();
      return dateA - dateB;
    })
    .slice(0, 4);

  return (
    <Card className="border-slate-200/60 shadow-sm flex flex-col h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-4 border-b border-slate-100">
        <CardTitle className="text-lg font-bold text-slate-900">
          Upcoming Interviews
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0 flex-1 flex flex-col">
        {upcomingInterviews.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
            <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center mb-3 border border-amber-100">
              <Search className="w-6 h-6 text-amber-500" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 mb-1">No interviews scheduled</h3>
            <p className="text-xs text-slate-500 max-w-[200px] mb-4">
              Schedule an interview to see it here.
            </p>
            <Link 
              href="/dashboard/interviews"
              className="text-sm font-medium text-primary hover:text-primary/80 transition-colors bg-primary/10 px-4 py-2 rounded-lg"
            >
              Go to Interviews
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {upcomingInterviews.map((interview) => {
              const application = interview.applicationId as any;
              const company = application?.company || 'Unknown';
              const role = application?.role || 'Unknown';
              const logo = application?.logo || company.charAt(0);
              const color = application?.color || 'bg-slate-100 text-slate-700';

              return (
                <div
                  key={interview._id}
                  className="p-5 hover:bg-slate-50/50 transition-colors group"
                >
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          'w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 shadow-sm',
                          color
                        )}
                      >
                        {logo}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 text-sm group-hover:text-primary transition-colors cursor-pointer leading-tight">
                          {company}
                        </div>
                        <div className="text-slate-500 text-xs mt-0.5">
                          {role}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 mt-3 pt-3 border-t border-slate-100/60 flex-wrap">
                    <div className="flex items-center text-xs text-slate-600 font-medium bg-slate-100/80 px-2 py-1 rounded-md">
                      <Calendar className="w-3.5 h-3.5 mr-1.5 text-slate-400" />
                      {(() => {
                        const dateObj = new Date(`${interview.interviewDate}T${interview.interviewTime}`);
                        const today = new Date();
                        const tomorrow = new Date();
                        tomorrow.setDate(tomorrow.getDate() + 1);
                        
                        let dateStr = '';
                        if (dateObj.toDateString() === today.toDateString()) {
                          dateStr = 'Today';
                        } else if (dateObj.toDateString() === tomorrow.toDateString()) {
                          dateStr = 'Tomorrow';
                        } else {
                          dateStr = dateObj.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
                        }
                        
                        // Format time manually to match 12-hour AM/PM standard
                        const timeStr = dateObj.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit', hour12: true });
                        return `${dateStr} → ${timeStr}`;
                      })()}
                    </div>
                    <div className="flex items-center text-xs text-slate-600 font-medium bg-slate-100/80 px-2 py-1 rounded-md">
                      {interview.interviewType === 'Online' ? (
                        <Video className="w-3.5 h-3.5 mr-1.5 text-slate-400" />
                      ) : interview.interviewType === 'Phone' ? (
                        <Phone className="w-3.5 h-3.5 mr-1.5 text-slate-400" />
                      ) : (
                        <MapPin className="w-3.5 h-3.5 mr-1.5 text-slate-400" />
                      )}
                      <span className="capitalize">{interview.interviewType}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
