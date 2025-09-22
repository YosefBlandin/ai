import React from 'react';

interface AvatarProps {
  name: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

/**
 * Avatar component for displaying user initials
 */
export const Avatar: React.FC<AvatarProps> = ({ 
  name, 
  size = 'md', 
  className = '' 
}) => {
  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'w-8 h-8 text-xs';
      case 'md':
        return 'w-12 h-12 text-sm';
      case 'lg':
        return 'w-16 h-16 text-lg';
      default:
        return 'w-12 h-12 text-sm';
    }
  };

  const initials = name.charAt(0).toUpperCase();

  return (
    <div className={`${getSizeClasses()} bg-blue-100 rounded-full flex items-center justify-center ${className}`}>
      <span className="font-medium text-blue-600">
        {initials}
      </span>
    </div>
  );
};
