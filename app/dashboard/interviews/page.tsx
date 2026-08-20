import { auth } from '@/lib/auth/auth';
import { connectDB } from '@/lib/dbConnect';
import { Application } from '@/lib/models/Application';
import { Interview } from '@/lib/models/Interview';
import { headers } from 'next/headers';
import InterviewsClient from '@/components/interviews/InterviewsClient';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Interviews | CareerFlow',
  robots: {
    index: false,
    follow: false,
  },
};

export default async function InterviewsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.id) {
    redirect('/login');
  }

  await connectDB();

  // Fetch interviews
  const interviews = await Interview.find({ userId: session.user.id })
    .populate('applicationId')
    .sort({ interviewDate: -1, interviewTime: -1 })
    .lean();

  // Fetch applications for the 'Add Interview' dropdown
  const applications = await Application.find({ userId: session.user.id })
    .sort({ createdAt: -1 })
    .lean();

  return (
    <InterviewsClient
      initialInterviews={JSON.parse(JSON.stringify(interviews))}
      applications={JSON.parse(JSON.stringify(applications))}
    />
  );
}