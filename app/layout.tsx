import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';

import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'CareerFlow | Premium Job Application Tracker',
    template: '%s | CareerFlow'
  },
  description: 'Manage your job search efficiently. Track applications, schedule interviews, and land your dream job with CareerFlow.',
  keywords: ['job tracker', 'career', 'application tracking', 'interview preparation'],
  applicationName: 'CareerFlow',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'CareerFlow | Premium Job Application Tracker',
    description: 'Track applications, schedule interviews, and land your dream job with CareerFlow.',
    type: 'website',
    siteName: 'CareerFlow',
  },
};
const plusJakartaSans = Plus_Jakarta_Sans({
  variable: '--font-sans',
  subsets: ['latin'],
  display: 'swap',
});

import { Toaster } from '@/components/ui/sonner';

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground" suppressHydrationWarning>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
