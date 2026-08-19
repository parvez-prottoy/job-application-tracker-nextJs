import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { ArrowUpRight, FolderOpen, MoreHorizontal, Plus } from 'lucide-react';
import Link from 'next/link';
import { KanbanItem } from '@/components/applications/KanbanCard';

interface RecentApplicationsProps {
  applications: KanbanItem[];
}

const statusStyles = {
  wishlist: 'bg-slate-100 text-slate-700',
  applied: 'bg-blue-100 text-blue-700',
  interviewing: 'bg-amber-100 text-amber-700',
  offer: 'bg-emerald-100 text-emerald-700',
  rejected: 'bg-red-100 text-red-700',
};

export default function RecentApplications({ applications }: RecentApplicationsProps) {
  // Sort by date created or updated (KanbanItem doesn't have createdAt explicitly but date string can be parsed)
  // We'll just slice the top 5 recent ones as they're returned from DB latest first.
  const recentApps = applications.slice(0, 5);

  return (
    <Card className="border-slate-200/60 shadow-sm flex flex-col h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-4 border-b border-slate-100">
        <CardTitle className="text-lg font-bold text-slate-900">
          Recent Applications
        </CardTitle>
        {recentApps.length > 0 && (
          <Link
            href="/dashboard/applications"
            className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors flex items-center"
          >
            View all
            <ArrowUpRight className="ml-1 h-4 w-4" />
          </Link>
        )}
      </CardHeader>
      <CardContent className="p-0 flex-1 overflow-x-auto">
        {recentApps.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-center px-4">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
              <FolderOpen className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">No applications yet</h3>
            <p className="text-sm text-slate-500 mb-6 max-w-sm">
              You haven't tracked any job applications yet. Start adding your applications to see them here.
            </p>
            <Link href="/dashboard/applications">
              <Button className="bg-primary hover:bg-primary/90 text-white font-semibold shadow-sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Your First Application
              </Button>
            </Link>
          </div>
        ) : (
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 bg-slate-50/50 uppercase border-b border-slate-100">
              <tr>
                <th scope="col" className="px-6 py-3 font-semibold">
                  Company & Role
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 font-semibold hidden sm:table-cell"
                >
                  Date Applied
                </th>
                <th scope="col" className="px-6 py-3 font-semibold">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-right font-semibold">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {recentApps.map((app) => (
                <tr
                  key={app.id}
                  className="bg-white hover:bg-slate-50/50 transition-colors group"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          'w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm shrink-0',
                          app.color || 'bg-slate-100 text-slate-700'
                        )}
                      >
                        {app.logo || '💼'}
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900 group-hover:text-primary transition-colors cursor-pointer">
                          {app.company}
                        </div>
                        <div className="text-slate-500 text-[13px]">
                          {app.role}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap hidden sm:table-cell text-slate-500 font-medium">
                    {app.date ? new Date(app.date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }) : 'Unknown'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={cn(
                        'px-2.5 py-1 text-xs font-semibold rounded-full capitalize',
                        statusStyles[app.status as keyof typeof statusStyles] || statusStyles.wishlist
                      )}
                    >
                      {app.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <Link href="/dashboard/applications">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-slate-400 hover:text-slate-900"
                        title="View Application"
                      >
                        <ArrowUpRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </CardContent>
    </Card>
  );
}
