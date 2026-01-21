'use client';

import React from 'react';
import { cn } from '@/lib/utils';

// Blending Score Graphic - overlapping circles
const BlendingScoreGraphic = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="5" cy="8" r="5" fill="rgba(102, 102, 102, 0.6)" />
    <circle cx="8" cy="5" r="4" fill="rgba(102, 102, 102, 0.3)" />
  </svg>
);

export interface BlendingScoreBadgeProps {
  value: string;
  className?: string;
}

export const BlendingScoreBadge: React.FC<BlendingScoreBadgeProps> = ({
  value,
  className,
}) => {
  return (
    <div
      className={cn(
        'bg-[var(--badge-gray-bg)] flex gap-[4px] items-center justify-center px-[12px] py-[4px] rounded-[999px]',
        className
      )}
    >
      <BlendingScoreGraphic />
      <span className="text-[16px] font-medium leading-[22px] text-[var(--badge-gray-text)]">
        {value}
      </span>
    </div>
  );
};
