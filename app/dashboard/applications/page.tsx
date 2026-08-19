import { getApplications } from '@/app/actions/application';
import ApplicationsClient from '@/components/applications/ApplicationsClient';

export default async function ApplicationsPage() {
  const result = await getApplications();
  const applications = result.success && result.data ? result.data : [];

  return <ApplicationsClient initialApplications={applications} />;
}
