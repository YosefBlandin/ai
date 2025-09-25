/**
 * @fileoverview Sidebar
 */

import React from 'react';
import { APP_TEXT } from '@aidonic/shared-utils';

interface SidebarProps {
  className?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  return (
    <div
      className={`fixed inset-y-0 left-0 z-50 bg-background-primary border-r border-border-light w-64 ${className}`}
    >
      <div className="flex items-center justify-between h-16 px-4 border-b border-border-light">
        <h1 className="text-xl font-bold text-text-primary">
          {APP_TEXT.branding.appName}
        </h1>
      </div>
    </div>
  );
};
