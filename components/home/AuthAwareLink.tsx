'use client';

import { forwardRef } from 'react';
import Link from 'next/link';
import { useSession } from '@/lib/auth/auth-client';
import { ReactNode } from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AuthAwareLinkProps extends Omit<React.ComponentPropsWithoutRef<typeof Link>, 'href'> {
  href: string;
  className?: string;
  children?: ReactNode;
}

const AuthAwareLink = forwardRef<HTMLAnchorElement, AuthAwareLinkProps>(
  ({ href, className, children, ...props }, ref) => {
    const { data: session, isPending } = useSession();

    if (isPending) {
      return (
        <span ref={ref as any} className={cn(className, "opacity-80 cursor-wait flex items-center justify-center")} {...(props as any)}>
          <Loader2 className="w-5 h-5 animate-spin mr-2" />
          Loading...
        </span>
      );
    }

    const destination = session?.user ? '/dashboard' : href;

    return (
      <Link href={destination} className={className} ref={ref} {...props}>
        {children}
      </Link>
    );
  }
);

AuthAwareLink.displayName = 'AuthAwareLink';

export default AuthAwareLink;