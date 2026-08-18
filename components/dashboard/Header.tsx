'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Bell, Menu, Search } from 'lucide-react';

interface HeaderProps {
  onMenuClick: () => void;
}
export default function DashboardHeader({ onMenuClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-slate-200 bg-white px-4 shadow-sm sm:gap-6 sm:px-6 lg:px-8">
      {/* Mobile Menu Button */}
      <button
        onClick={onMenuClick}
        className="lg:hidden -ml-2 p-2 text-slate-500 hover:text-slate-900 transition-colors"
      >
        <Menu className="h-6 w-6" />
        <span className="sr-only">Open sidebar</span>
      </button>

      {/* Search Bar */}
      <div className="flex-1 flex items-center">
        <div className="w-full max-w-md relative group hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-primary transition-colors" />
          <Input
            type="search"
            placeholder="Search applications, roles, or companies..."
            className="w-full pl-9 h-10 bg-slate-50/50 border-slate-200 hover:border-slate-300 focus-visible:ring-primary/10 transition-all rounded-lg text-sm shadow-none placeholder:text-slate-400"
          />
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-3 sm:gap-4">
        <Button
          variant="outline"
          size="icon"
          className="h-10 w-10 rounded-full border-slate-200 text-slate-500 hover:text-slate-900 hover:bg-slate-50"
        >
          <Bell className="h-5 w-5" />
          <span className="sr-only">Notifications</span>
        </Button>

        {/* Quick Action Button */}
        <Button className="hidden sm:flex h-10 bg-primary hover:bg-primary/95 text-white font-semibold rounded-lg shadow-sm hover:shadow-[0_4px_14px_0_rgba(37,99,235,0.2)] transition-all">
          + New Application
        </Button>

        {/* User Profile Avatar */}
        <button className="h-10 w-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center overflow-hidden transition-transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
          <div className="w-full h-full bg-linear-to-tr from-blue-100 to-indigo-100 text-primary flex items-center justify-center font-bold text-sm">
            JD
          </div>
        </button>
      </div>
    </header>
  );
}
