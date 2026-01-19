'use client';

import { cn } from '@/lib/utils';

type SelectChipProps = {
  label: string;
  selected?: boolean;
  size?: 'large' | 'small';
  variant?: 'line' | 'fill';
  onClick?: () => void;
  className?: string;
};

export default function SelectChip({ 
  label, 
  selected = false,
  size = 'large',
  variant = 'line',
  onClick,
  className 
}: SelectChipProps) {
  const isLarge = size === 'large';
  const isLine = variant === 'line';

  return (
    <button
      onClick={onClick}
      className={cn(
        'border border-solid rounded-full overflow-hidden',
        'font-["Pretendard"] font-normal transition-colors',
        // Size
        isLarge ? 'h-[52px] px-[24px] py-[8px] text-[20px] leading-[26px]' : 'px-[20px] py-[10px] text-[16px] leading-[22px]',
        // Style & State
        !selected && 'bg-(--bg-canvas) border-(--border-active) text-(--text-tertiary)',
        isLine && selected && 'bg-(--bg-canvas) border-(--border-strong) text-(--text-primary)',
        !isLine && selected && 'bg-(--badge-gray-bg) border-(--border-active) text-(--text-primary)',
        className
      )}
    >
      {label}
    </button>
  );
}
