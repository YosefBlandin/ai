/**
 * @fileoverview Sidebar component for navigation and branding
 */

import React from 'react';
import { APP_TEXT } from '@aidonic/shared-utils';

interface SidebarProps {
  className?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  return (
    <div
      className={`fixed inset-y-0 left-0 z-50 bg-white border-r border-gray-200 w-64 ${className}`}
    >
      <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
        <h1 className="text-xl font-bold text-gray-900">
          {APP_TEXT.branding.appName}
        </h1>
      </div>
    </div>
  );
};
