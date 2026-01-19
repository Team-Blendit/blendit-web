'use client';

import React from 'react';
import { cn } from '@/lib/utils';

// Down Arrow Icon
const DownArrowIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M20.031 9.53055L12.531 17.0306C12.4614 17.1003 12.3787 17.1556 12.2876 17.1933C12.1966 17.2311 12.099 17.2505 12.0004 17.2505C11.9019 17.2505 11.8043 17.2311 11.7132 17.1933C11.6222 17.1556 11.5394 17.1003 11.4698 17.0306L3.96979 9.53055C3.82906 9.38982 3.75 9.19895 3.75 8.99993C3.75 8.80091 3.82906 8.61003 3.96979 8.4693C4.11052 8.32857 4.30139 8.24951 4.50042 8.24951C4.69944 8.24951 4.89031 8.32857 5.03104 8.4693L12.0004 15.4396L18.9698 8.4693C19.0395 8.39962 19.1222 8.34435 19.2132 8.30663C19.3043 8.26892 19.4019 8.24951 19.5004 8.24951C19.599 8.24951 19.6965 8.26892 19.7876 8.30663C19.8786 8.34435 19.9614 8.39962 20.031 8.4693C20.1007 8.53899 20.156 8.62171 20.1937 8.71276C20.2314 8.8038 20.2508 8.90138 20.2508 8.99993C20.2508 9.09847 20.2314 9.19606 20.1937 9.2871C20.156 9.37815 20.1007 9.46087 20.031 9.53055Z"
      fill="#999999"
    />
  </svg>
);

export interface SelectFieldProps {
  label?: string;
  required?: boolean;
  placeholder?: string;
  error?: string;
  layout?: 'single' | 'double';
  className?: string;
  // Double layout용 추가 props
  placeholder2?: string;
  onSelect1?: (value: string) => void;
  onSelect2?: (value: string) => void;
}

export const SelectField: React.FC<SelectFieldProps> = ({
  label = 'Text',
  required = true,
  placeholder = 'Text',
  error,
  layout = 'single',
  className,
  placeholder2 = 'Text',
  onSelect1,
  onSelect2,
}) => {
  return (
    <div className={cn('flex flex-col gap-[12px] w-full max-w-[560px]', className)}>
      {/* Label */}
      <div className="flex items-start gap-[2px]">
        <label className="font-semibold text-[22px] text-(--text-secondary)">
          {label}
        </label>
        {required && (
          <div className="w-[6px] h-[6px] rounded-full bg-(--border-error)" aria-label="required" />
        )}
      </div>

      {/* Field Group */}
      <div className="flex flex-col gap-[8px] w-full">
        {/* Select Box(es) */}
        {layout === 'single' ? (
          <div className="relative w-full">
            <select
              className={cn(
                'w-full h-[60px] px-[16px] py-[16px]',
                'bg-(--bg-canvas) border border-(--border-default) rounded-2xl',
                'font-medium text-lg text-(--text-tertiary)',
                'appearance-none cursor-pointer',
                'focus:outline-none',
                error && 'border-(--border-error)',
              )}
              onChange={(e) => onSelect1?.(e.target.value)}
            >
              <option value="">{placeholder}</option>
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
              <DownArrowIcon />
            </div>
          </div>
        ) : (
          <div className="flex gap-4 w-full">
            <div className="relative flex-1">
              <select
                className={cn(
                  'w-full h-[60px] px-[16px] py-[16px]',
                  'bg-(--bg-canvas) border border-(--color-gray-300) rounded-2xl',
                  'font-medium text-lg text-(--text-tertiary)',
                  'appearance-none cursor-pointer',
                  'focus:outline-none',
                  error && 'border-(--border-error)'
                )}
                onChange={(e) => onSelect1?.(e.target.value)}
              >
                <option value="">{placeholder}</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <DownArrowIcon />
              </div>
            </div>
            <div className="relative w-[272px]">
              <select
                className={cn(
                  'w-full h-[60px] px-[16px] py-[16px]',
                  'bg-(--bg-canvas) border border-(--color-gray-300) rounded-2xl',
                  'font-medium text-lg text-(--text-tertiary)',
                  'appearance-none cursor-pointer',
                  'focus:outline-none',
                  error && 'border-(--border-error)'
                )}
                onChange={(e) => onSelect2?.(e.target.value)}
              >
                <option value="">{placeholder2}</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <DownArrowIcon />
              </div>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div>
            <p className="font-normal text-lg text-(--text-error) ps-[12px]">
              {error}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
