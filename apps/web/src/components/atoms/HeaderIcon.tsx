/**
 * @fileoverview HeaderIcon component for displaying header icons
 */

import React from 'react';

interface HeaderIconProps {
  icon?: React.ReactNode;
  className?: string;
}

/**
 * Header icon component for displaying icons in headers
 */
export const HeaderIcon: React.FC<HeaderIconProps> = ({
  icon,
  className = 'w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center',
}) => {
  return (
    <div className={className}>
      {icon || <span className="text-2xl font-bold text-blue-600">A</span>}
    </div>
  );
};
