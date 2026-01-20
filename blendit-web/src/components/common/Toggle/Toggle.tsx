'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

export interface ToggleProps {
  label?: string;
  enabled?: boolean;
  onChange?: (enabled: boolean) => void;
  className?: string;
  disabled?: boolean;
}

export const Toggle: React.FC<ToggleProps> = ({
  label,
  enabled = false,
  onChange,
  className,
  disabled = false,
}) => {
  const [isEnabled, setIsEnabled] = useState(enabled);

  const handleToggle = () => {
    if (disabled) return;
    const newValue = !isEnabled;
    setIsEnabled(newValue);
    onChange?.(newValue);
  };

  return (
    <div className={cn('flex items-center gap-2', className)}>
      {label && (
        <span className="font-semibold text-[18px] leading-[28px] text-[#BDBDBD]">
          {label}
        </span>
      )}
      <button
        type="button"
        role="switch"
        aria-checked={isEnabled}
        disabled={disabled}
        onClick={handleToggle}
        className={cn(
          'relative h-[20px] w-[34px] rounded-[66.667px] transition-colors',
          isEnabled ? 'bg-[#0066CC]' : 'bg-[#DBDBDB]',
          disabled && 'opacity-50 cursor-not-allowed'
        )}
      >
        <span
          className={cn(
            'absolute top-[2px] size-[16px] rounded-[66.667px] bg-white transition-transform',
            isEnabled ? 'left-[16.22px]' : 'left-[2.78px]'
          )}
        />
      </button>
    </div>
  );
};
