'use client';
import DashboardHeader from '@/components/dashboard/Header';
import Sidebar from '@/components/dashboard/Sidebar';
import { useState } from 'react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <div className="min-h-screen bg-slate-50/50 flex">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <div className="flex-1 flex flex-col min-w-0">
        <main className="flex-1 overflow-y-auto">
          <DashboardHeader onMenuClick={() => setIsSidebarOpen(true)} />
          <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
