'use client';

import { authClient } from '@/lib/auth/auth-client';
import { cn } from '@/lib/utils';
import {
  BarChart3,
  CalendarDays,
  FileText,
  KanbanSquare,
  LayoutDashboard,
  LogOut,
  Settings,
  Sparkles,
  X,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

const navItems = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Applications', href: '/dashboard/applications', icon: KanbanSquare },
  { name: 'Interviews', href: '/dashboard/interviews', icon: CalendarDays },
  { name: 'AI Tools', href: '/dashboard/ai-tools', icon: Sparkles },
  { name: 'Documents', href: '/dashboard/documents', icon: FileText },
  { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart3 },
];

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}
export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleSignOut = async () => {
    await authClient.signOut();
    router.push('/login');
  };
  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm lg:hidden animate-in fade-in duration-200"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-slate-200 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:shrink-0',
          isOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
        )}
      >
        {/* Header / Logo */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-slate-100">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-primary shadow-sm flex items-center justify-center transition-transform group-hover:scale-105">
              <span className="text-primary-foreground font-bold text-xl leading-none">
                C
              </span>
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-900">
              Career<span className="text-primary">Flow</span>
            </span>
          </Link>
          <button
            onClick={() => setIsOpen(false)}
            className="lg:hidden text-slate-500 hover:text-slate-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4 px-2">
            Main Menu
          </div>
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg text-[15px] font-medium transition-all duration-200',
                  isActive
                    ? 'bg-primary/10 text-primary'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                )}
                onClick={() => setIsOpen(false)}
              >
                <Icon
                  className={cn(
                    'w-5 h-5',
                    isActive ? 'text-primary' : 'text-slate-400'
                  )}
                  strokeWidth={isActive ? 2.5 : 2}
                />
                {item.name}
              </Link>
            );
          })}
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-100 space-y-1">
          <Link
            href="/dashboard/settings"
            className={cn(
              'flex items-center gap-3 px-3 py-2.5 rounded-lg text-[15px] font-medium transition-all duration-200',
              pathname === '/dashboard/settings'
                ? 'bg-primary/10 text-primary'
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            )}
            onClick={() => setIsOpen(false)}
          >
            <Settings
              className={cn(
                'w-5 h-5',
                pathname === '/dashboard/settings'
                  ? 'text-primary'
                  : 'text-slate-400'
              )}
              strokeWidth={pathname === '/dashboard/settings' ? 2.5 : 2}
            />
            Settings
          </Link>
          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-[15px] font-medium text-slate-600 hover:bg-red-50 hover:text-red-600 transition-all duration-200"
          >
            <LogOut className="w-5 h-5 text-slate-400 hover:text-red-600" />
            Sign Out
          </button>
        </div>
      </aside>
    </>
  );
}
