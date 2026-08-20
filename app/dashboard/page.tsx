import ApplicationQuickCards from '@/components/dashboard/ApplicationQuickCards';
import RecentApplications from '@/components/dashboard/RecentApplications';
import UpcomingInterviews from '@/components/dashboard/UpcomingInterviews';
import { Button } from '@/components/ui/button';
import { getSession } from '@/lib/auth/auth-server';
import { getApplications } from '@/app/actions/application';
import { getInterviews } from '@/app/actions/interview';
import { ArrowRight, Sparkles } from 'lucide-react';

export default async function DashboardPage() {
  const session = await getSession();

  const fullName = session?.user?.name || 'User';
  
  const applicationsResult = await getApplications();
  const applications = applicationsResult.success && applicationsResult.data ? applicationsResult.data : [];

  const interviewsResult = await getInterviews();
  const interviews = interviewsResult.success && interviewsResult.data ? interviewsResult.data : [];
  
  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-500">
      {/* Welcome Section & AI Prompt */}
      <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Welcome back, {fullName}
          </h1>
          <p className="text-sm sm:text-base text-slate-500 mt-1">
            Here&apos;s what&apos;s happening with your job applications today.
          </p>
        </div>

        {/* AI Quick Action */}
        <div className="w-full md:w-auto bg-indigo-50/50 border border-indigo-100 rounded-xl p-3 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-indigo-950">
                Tailor a Resume
              </p>
              <p className="text-xs font-medium text-indigo-600/80">
                Paste a job description to start
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="w-full sm:w-auto ml-auto bg-white border-indigo-200 text-indigo-700 hover:bg-indigo-50 hover:text-indigo-800"
          >
            Start AI
            <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
      {/* Application Quick Cards */}
      <ApplicationQuickCards applications={applications} />
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 sm:gap-8">
        <div className="xl:col-span-2 space-y-6 sm:space-y-8">
          {/* Recent Applications */}
          <RecentApplications applications={applications} />
        </div>
        <div className="xl:col-span-1 space-y-6 sm:space-y-8">
          {/* UpcomingInterviews */}
          <UpcomingInterviews interviews={interviews} />
        </div>
      </div>
    </div>
  );
}
