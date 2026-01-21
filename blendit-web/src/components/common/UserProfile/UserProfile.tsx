import React from 'react';
import { cn } from '@/lib/utils';

export interface UserProfileProps {
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

export const UserProfile: React.FC<UserProfileProps> = ({
  size = 'large',
  className,
}) => {
  const sizeClasses = {
    small: 'size-[34px]',
    medium: 'size-[88px]',
    large: 'size-[140px]',
  };

  return (
    <div 
      className={cn(
        'bg-[var(--accent-secondary-default)] rounded-full relative overflow-hidden',
        sizeClasses[size],
        className
      )}
    >
      <svg className="size-full" viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="70" cy="47" r="21" fill="white"/>
        <ellipse cx="70" cy="104.5" rx="44" ry="27.5" fill="white"/>
      </svg>
    </div>
  );
};
