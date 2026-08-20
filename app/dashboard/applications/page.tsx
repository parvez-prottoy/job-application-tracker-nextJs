import { getApplications } from '@/app/actions/application';
import ApplicationsClient from '@/components/applications/ApplicationsClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Applications | CareerFlow',
  robots: {
    index: false,
    follow: false,
  },
};

export default async function ApplicationsPage() {
  const result = await getApplications();
  const applications = result.success && result.data ? result.data : [];

  return <ApplicationsClient initialApplications={applications} />;
}
