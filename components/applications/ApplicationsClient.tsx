'use client';

import { KanbanItem, ApplicationStatus } from './KanbanCard';
import ApplicationHeader from './ApplicationHeader';
import SummaryCards from './SummaryCards';
import { KanbanBoard } from './KanbanBoard';
import { useState, useEffect } from 'react';

interface ApplicationsClientProps {
  initialApplications: KanbanItem[];
}

export default function ApplicationsClient({ initialApplications }: ApplicationsClientProps) {
  const [applications, setApplications] = useState<KanbanItem[]>(initialApplications);

  // Sync if server provides new initial items
  useEffect(() => {
    setApplications(initialApplications);
  }, [initialApplications]);

  const handleUpdateApplication = (updatedApp: KanbanItem) => {
    setApplications((prev) =>
      prev.map((app) => (app.id === updatedApp.id ? updatedApp : app))
    );
  };

  const handleAddApplication = (newApp: KanbanItem) => {
    setApplications((prev) => [newApp, ...prev]);
  };

  const handleDeleteApplication = (deletedAppId: string) => {
    setApplications((prev) => prev.filter((app) => app.id !== deletedAppId));
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-500 pb-8">
      <ApplicationHeader onApplicationAdd={handleAddApplication} />
      
      <SummaryCards applications={applications} />
      
      {applications.length > 0 ? (
        <KanbanBoard 
          initialItems={applications} 
          onApplicationUpdate={handleUpdateApplication}
          onApplicationDelete={handleDeleteApplication}
        />
      ) : (
        <div className="text-center py-20 bg-slate-50/50 rounded-xl border border-slate-100 border-dashed">
          <h3 className="text-lg font-bold text-slate-900 mb-1">No applications found</h3>
          <p className="text-slate-500 text-sm">You haven't tracked any job applications yet.</p>
        </div>
      )}
    </div>
  );
}
