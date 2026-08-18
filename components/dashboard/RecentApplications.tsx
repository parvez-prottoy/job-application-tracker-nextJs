import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { ArrowUpRight, MoreHorizontal } from 'lucide-react';
import Link from 'next/link';

const applications = [
  {
    id: '1',
    company: 'Google',
    role: 'Senior Frontend Engineer',
    date: 'Oct 24, 2023',
    status: 'Interview',
    logo: 'G',
    color: 'bg-red-100 text-red-600',
  },
  {
    id: '2',
    company: 'Stripe',
    role: 'Software Engineer, Product',
    date: 'Oct 22, 2023',
    status: 'Applied',
    logo: 'S',
    color: 'bg-indigo-100 text-indigo-600',
  },
  {
    id: '3',
    company: 'Vercel',
    role: 'Design Engineer',
    date: 'Oct 18, 2023',
    status: 'Offer',
    logo: 'V',
    color: 'bg-black text-white',
  },
  {
    id: '4',
    company: 'Linear',
    role: 'Frontend Developer',
    date: 'Oct 15, 2023',
    status: 'Screening',
    logo: 'L',
    color: 'bg-purple-100 text-purple-600',
  },
];

const statusStyles = {
  Applied: 'bg-slate-100 text-slate-700',
  Screening: 'bg-blue-100 text-blue-700',
  Interview: 'bg-amber-100 text-amber-700',
  Offer: 'bg-emerald-100 text-emerald-700',
  Rejected: 'bg-red-100 text-red-700',
};

export default function RecentApplications() {
  return (
    <Card className="border-slate-200/60 shadow-sm flex flex-col h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-4 border-b border-slate-100">
        <CardTitle className="text-lg font-bold text-slate-900">
          Recent Applications
        </CardTitle>
        <Link
          href="/dashboard/applications"
          className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors flex items-center"
        >
          View all
          <ArrowUpRight className="ml-1 h-4 w-4" />
        </Link>
      </CardHeader>
      <CardContent className="p-0 flex-1 overflow-x-auto">
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
            {applications.map((app) => (
              <tr
                key={app.id}
                className="bg-white hover:bg-slate-50/50 transition-colors group"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        'w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm shrink-0',
                        app.color
                      )}
                    >
                      {app.logo}
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
                  {app.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={cn(
                      'px-2.5 py-1 text-xs font-semibold rounded-full',
                      statusStyles[app.status as keyof typeof statusStyles]
                    )}
                  >
                    {app.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-slate-400 hover:text-slate-900"
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}
