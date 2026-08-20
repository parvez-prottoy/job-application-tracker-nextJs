'use client';

import { useSession } from '@/lib/auth/auth-client';
import { ArrowRight, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

function getInitials(name?: string) {
  if (!name) return 'U';
  const parts = name.split(' ').filter(Boolean);
  if (parts.length === 0) return 'U';
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { data: session, isPending } = useSession();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Features', href: '#features' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Pricing', href: '#pricing' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/80 backdrop-blur-xl border-b border-border shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="shrink-0">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-primary shadow-sm flex items-center justify-center transition-transform group-hover:scale-105">
                <span className="text-primary-foreground font-bold text-xl leading-none">
                  C
                </span>
              </div>
              <span className="font-bold text-2xl tracking-tight text-foreground transition-colors group-hover:text-foreground/80">
                Career<span className="text-primary">Flow</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Auth Actions */}
          <div className="hidden md:flex items-center gap-3">
            {isPending ? (
              <div className="w-44 h-10 animate-pulse bg-secondary/50 rounded-lg"></div>
            ) : session ? (
              <>
                <Link
                  href="/dashboard"
                  className="text-sm font-bold text-white bg-primary transition-all duration-300 px-5 py-2.5 rounded-lg shadow-[0_4px_14px_0_rgba(37,99,235,0.25)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.35)] hover:bg-primary/90 hover:-translate-y-0.5 active:translate-y-0 active:shadow-[0_2px_8px_rgba(37,99,235,0.2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 flex items-center gap-2"
                >
                  Dashboard
                </Link>
                <div className="flex items-center gap-2 pl-3 ml-2 border-l border-border/60">
                  <div className="w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm border border-primary/20">
                    {getInitials(session.user?.name)}
                  </div>
                  <span className="text-sm font-semibold text-foreground max-w-30 truncate">
                    {session.user?.name}
                  </span>
                </div>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-sm font-semibold text-foreground hover:text-primary transition-all duration-200 px-5 py-2.5 rounded-lg border border-transparent hover:bg-secondary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  Log In
                </Link>
                <Link
                  href="/register"
                  className="text-sm font-bold text-white bg-primary transition-all duration-300 px-6 py-2.5 rounded-lg shadow-[0_4px_14px_0_rgba(37,99,235,0.25)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.35)] hover:bg-primary/90 hover:-translate-y-0.5 active:translate-y-0 active:shadow-[0_2px_8px_rgba(37,99,235,0.2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 flex items-center gap-2"
                >
                  Get Started <ArrowRight className="w-4 h-4" />
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 -mr-2 text-foreground hover:bg-secondary/80 rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-background border-b border-border shadow-lg">
          <div className="px-4 pt-2 pb-6 space-y-2 sm:px-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-3 rounded-md text-base font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <div className="mt-6 pt-6 border-t border-border/50 flex flex-col gap-3">
              {isPending ? (
                <div className="w-full h-24 animate-pulse bg-secondary/50 rounded-md"></div>
              ) : session ? (
                <>
                  <div className="flex items-center gap-3 px-4 py-3 mb-1 rounded-lg bg-secondary/30 border border-border/40">
                    <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold border border-primary/20 shrink-0">
                      {getInitials(session.user?.name)}
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-sm font-bold text-foreground truncate">
                        {session.user?.name}
                      </span>
                      <span className="text-xs text-muted-foreground truncate">
                        {session.user?.email}
                      </span>
                    </div>
                  </div>
                  <Link
                    href="/dashboard"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-full text-center px-4 py-3 rounded-md text-base font-medium text-white bg-primary hover:bg-primary/95 transition-all shadow-sm flex items-center justify-center gap-2"
                  >
                    Go to Dashboard <ArrowRight className="w-4 h-4" />
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block w-full text-center px-4 py-3 rounded-md text-base font-medium text-foreground border border-border/80 bg-background/50 hover:bg-secondary/80 transition-all shadow-sm"
                  >
                    Log In
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block w-full text-center px-4 py-3 rounded-md text-base font-medium text-primary-foreground bg-primary transition-all shadow-[0_4px_14px_0_rgba(37,99,235,0.2)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.3)] hover:bg-primary/95"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
