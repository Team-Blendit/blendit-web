'use client';

import { cn } from '@/lib/utils';

type TabProps = {
  label: string;
  active?: boolean;
  notification?: boolean;
  onClick?: () => void;
  className?: string;
};

export default function Tab({ 
  label, 
  active = false,
  notification = false,
  onClick,
  className 
}: TabProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'relative flex items-center justify-center px-[12px] py-[8px]',
        'font-semibold text-[26px] leading-[32px]',
        'transition-colors',
        active 
          ? 'text-(--text-primary) border-b-[1.5px] border-(--border-strong)' 
          : 'text-(--text-tertiary)',
        className
      )}
    >
      <span className="overflow-hidden text-ellipsis whitespace-nowrap">
        {label}
      </span>
      {notification && (
        <div className="absolute top-[12.5px] right-[5px] w-[6px] h-[6px] bg-[#EF4444] rounded-full" />
      )}
    </button>
  );
}
