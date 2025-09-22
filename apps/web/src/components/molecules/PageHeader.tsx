import React from 'react';

interface PageHeaderProps {
  title: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}

/**
 * Page header component with title, optional icon, and action button
 */
export const PageHeader: React.FC<PageHeaderProps> = ({ 
  title, 
  icon, 
  action, 
  className = '' 
}) => {
  return (
    <div className={`flex items-center justify-between mb-8 ${className}`}>
      <div className="flex items-center">
        {icon && <div className="mr-4">{icon}</div>}
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
      </div>
      {action && <div>{action}</div>}
    </div>
  );
};
