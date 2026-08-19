import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowUpRight, CalendarDays, MapPin, Video } from 'lucide-react';
import Link from 'next/link';

const interviews = [
  {
    id: '1',
    company: 'Google',
    role: 'Senior Frontend Engineer',
    type: 'Technical Round',
    date: 'Tomorrow, 10:00 AM',
    location: 'Google Meet',
    isVirtual: true,
  },
  {
    id: '2',
    company: 'Stripe',
    role: 'Software Engineer, Product',
    type: 'Hiring Manager',
    date: 'Thu, Oct 26, 2:30 PM',
    location: 'Zoom',
    isVirtual: true,
  },
  {
    id: '3',
    company: 'Local Startup',
    role: 'Lead UI Developer',
    type: 'On-site',
    date: 'Mon, Oct 30, 9:00 AM',
    location: 'San Francisco, CA',
    isVirtual: false,
  },
];

export default function UpcomingInterviews() {
  return (
    <Card className="border-slate-200/60 shadow-sm flex flex-col h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-4 border-b border-slate-100">
        <CardTitle className="text-lg font-bold text-slate-900">
          Upcoming Interviews
        </CardTitle>
        <Link
          href="/dashboard/interviews"
          className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors flex items-center"
        >
          View calendar
          <ArrowUpRight className="ml-1 h-4 w-4" />
        </Link>
      </CardHeader>
      <CardContent className="p-0 flex-1">
        <div className="divide-y divide-slate-100">
          {interviews.map((interview) => (
            <div
              key={interview.id}
              className="p-5 hover:bg-slate-50/50 transition-colors group cursor-pointer"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-bold text-slate-900 group-hover:text-primary transition-colors">
                    {interview.company}
                  </h4>
                  <p className="text-sm text-slate-500 font-medium">
                    {interview.role}
                  </p>
                </div>
                <span className="px-2 py-1 text-[11px] font-bold uppercase tracking-wider text-indigo-600  rounded bg-indigo-500/10">
                  {interview.type}
                </span>
              </div>

              <div className="flex flex-wrap gap-y-2 gap-x-4 mt-3">
                <div className="flex items-center text-sm text-slate-600 font-medium">
                  <CalendarDays className="h-4 w-4 mr-1.5 text-slate-400" />
                  {interview.date}
                </div>
                <div className="flex items-center text-sm text-slate-600 font-medium">
                  {interview.isVirtual ? (
                    <Video className="h-4 w-4 mr-1.5 text-slate-400" />
                  ) : (
                    <MapPin className="h-4 w-4 mr-1.5 text-slate-400" />
                  )}
                  {interview.location}
                </div>
              </div>
            </div>
          ))}

          {interviews.length === 0 && (
            <div className="p-8 text-center">
              <CalendarDays className="mx-auto h-8 w-8 text-slate-300 mb-3" />
              <p className="text-slate-500 font-medium">
                No upcoming interviews
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
