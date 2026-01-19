'use client';

import { cn } from '@/lib/utils';

type KeywordChipProps = {
  label: string;
  selected?: boolean;
  onClick?: () => void;
  className?: string;
};

export default function KeywordChip({ 
  label, 
  selected = false,
  onClick,
  className 
}: KeywordChipProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'min-w-[80px] px-[16px] py-[8px] rounded-full',
        'flex items-center justify-center',
        'font-medium text-[18px] leading-[24px] text-center',
        'transition-colors whitespace-pre-wrap',
        selected 
          ? 'bg-(--accent-primary-default) text-(--text-inverse)' 
          : 'bg-(--color-gray-80) text-(--text-secondary) hover:bg-(--color-gray-200)',
        className
      )}
    >
      {label}
    </button>
  );
}
