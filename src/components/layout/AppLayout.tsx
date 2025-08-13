import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface AppLayoutProps {
  children: ReactNode;
  className?: string;
}

export function AppLayout({ children, className }: AppLayoutProps) {
  return (
    <div className={cn("min-h-screen bg-background", className)}>
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
}