import React from 'react';
import { DashboardHeader } from '@/components/organisms/DashboardHeader';
import { Sidebar } from '@/components/organisms/Sidebar';

interface DashboardLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  className?: string;
}

// Template: Main dashboard layout
export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  title,
  subtitle,
  className
}) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <div className="lg:pl-64">
        <DashboardHeader title={title} subtitle={subtitle} />
        <main className={`py-8 ${className}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
