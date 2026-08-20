'use client';
import { CalendarDays, KanbanSquare, LayoutDashboard } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

export default function HeroTabs() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'applications', label: 'Applications', icon: KanbanSquare },
    { id: 'interviews', label: 'Interviews', icon: CalendarDays },
  ];
  return (
    <div className="relative mx-auto max-w-5xl rounded-2xl border border-slate-200/60 bg-white shadow-2xl overflow-hidden text-left ring-1 ring-black/5 flex flex-col h-125">
      {/* Mac-style window header with Tabs */}
      <div className="h-14 border-b border-slate-100 bg-slate-50 flex items-center justify-between px-4 shrink-0">
        {/* Window Controls */}
        <div className="flex gap-2 w-20">
          <div className="w-3 h-3 rounded-full bg-destructive/80"></div>
          <div className="w-3 h-3 rounded-full bg-warning/80"></div>
          <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
        </div>

        {/* Interactive Tabs */}
        <div className="flex p-1 bg-slate-200/50 rounded-lg">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3 py-1.5 text-sm font-semibold rounded-md transition-all duration-200 ${
                  isActive
                    ? 'bg-white text-primary shadow-sm ring-1 ring-black/5'
                    : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Spacer to balance header */}
        <div className="w-20"></div>
      </div>

      {/* Skeleton Body with Fade Transitions */}
      <div className="relative flex-1 bg-slate-50/30 p-4 md:p-8 overflow-hidden">
        {/* 1. Dashboard View */}
        <div
          className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${activeTab === 'dashboard' ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
        >
          <Image
            src="/dashboard.png"
            alt="Dashboard Preview"
            fill
            priority
            className="object-cover object-top"
          />
        </div>

        {/* 2. Applications (Kanban) View */}
        <div
          className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${activeTab === 'applications' ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
        >
          <Image
            src="/application.png"
            alt="Applications Preview"
            fill
            priority
            className="object-cover object-top"
          />
        </div>

        {/* 3. Interviews View */}
        <div
          className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${activeTab === 'interviews' ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
        >
          <Image
            src="/application.png"
            alt="Interviews Preview"
            fill
            priority
            className="object-cover object-top"
          />
        </div>
      </div>

      {/* Bottom gradient fade for the preview */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-background via-background/80 to-transparent pointer-events-none"></div>
    </div>
  );
}
