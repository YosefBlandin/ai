/**
 * @fileoverview Reusable header icon component
 */

import React from 'react';

interface HeaderIconProps {
  icon: string;
  className?: string;
}

export const HeaderIcon: React.FC<HeaderIconProps> = ({
  icon,
  className = '',
}) => (
  <div
    className={`flex items-center justify-center w-8 h-8 rounded-lg bg-primary-100 text-primary-600 ${className}`}
  >
    <span className="text-sm font-medium">{icon}</span>
  </div>
);
