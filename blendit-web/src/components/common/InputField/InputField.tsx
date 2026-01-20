'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export interface InputFieldProps {
  label?: string;
  required?: boolean;
  placeholder?: string;
  error?: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  type?: 'text' | 'email' | 'password' | 'number';
  disabled?: boolean;
}

export const InputField: React.FC<InputFieldProps> = ({
  label = 'Text',
  required = true,
  placeholder = '내용을 입력해주세요',
  error,
  value,
  onChange,
  className,
  type = 'text',
  disabled = false,
}) => {
  return (
    <div className={cn('flex flex-col gap-[12px] w-full items-start self-stretch', className)}>
      {/* Label */}
      <div className="flex items-start gap-[2px]">
        <label className="font-semibold text-xl text-[var(--text-secondary)]">
          {label}
        </label>
        {required && (
          <div className="w-[6px] h-[6px] rounded-full bg-[var(--border-error)]" aria-label="required" />
        )}
      </div>

      {/* Field Group */}
      <div className="flex flex-col gap-2 w-full self-stretch">
        {/* Input */}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          className={cn(
            'w-full h-[60px] px-4 py-4 rounded-xl',
            'font-medium text-[18px] leading-[24px]',
            'focus:outline-none transition-colors',
            disabled 
              ? 'bg-[var(--accent-secondary-disabled)] border border-[var(--border-default)] text-[var(--text-disabled)] cursor-not-allowed'
              : error
                ? 'bg-[var(--bg-canvas)] border border-[var(--border-error)] text-[var(--text-primary)]'
                : 'bg-[var(--bg-canvas)] border border-[var(--border-default)] text-[var(--text-primary)] focus:border-[var(--border-focus)]',
            'placeholder:text-[var(--text-tertiary)]'
          )}
        />

        {/* Error Message */}
        {error && (
          <div>
            <p className="font-normal text-base text-[var(--text-error)] ps-3">
              {error}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
