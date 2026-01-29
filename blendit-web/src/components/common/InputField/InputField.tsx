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
  // Double layout props
  layout?: 'single' | 'double';
  placeholder2?: string;
  value2?: string;
  onChange2?: (value: string) => void;
  error2?: string;
  type2?: 'text' | 'email' | 'password' | 'number';
  disabled2?: boolean;
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
  // Double layout props
  layout = 'single',
  placeholder2 = '내용을 입력해주세요',
  value2,
  onChange2,
  error2,
  type2 = 'text',
  disabled2 = false,
}) => {
  const inputClassName = (isDisabled: boolean, hasError?: string) =>
    cn(
      'w-full h-[60px] px-4 py-4 rounded-xl',
      'font-medium text-[18px] leading-[24px]',
      'focus:outline-none transition-colors',
      isDisabled
        ? 'bg-[var(--accent-secondary-disabled)] border border-[var(--border-default)] text-[var(--text-disabled)] cursor-not-allowed'
        : hasError
          ? 'bg-[var(--bg-canvas)] border border-[var(--border-error)] text-[var(--text-primary)]'
          : 'bg-[var(--bg-canvas)] border border-[var(--border-default)] text-[var(--text-primary)] focus:border-[var(--border-focus)]',
      'placeholder:text-[var(--text-tertiary)]'
    );

  return (
    <div className={cn('flex flex-col gap-[12px] w-full items-start self-stretch', className)}>
      {/* Label */}
      {label && (
        <div className="flex items-start gap-[2px]">
          <label className="font-semibold text-[22px] text-[var(--text-secondary)]">
            {label}
          </label>
          {required && (
            <div className="w-[6px] h-[6px] rounded-full bg-[var(--border-error)]" aria-label="required" />
          )}
        </div>
      )}

      {/* Field Group */}
      <div className="flex flex-col gap-[8px] w-full self-stretch">
        {layout === 'single' ? (
          // Single Input
          <input
            type={type}
            value={value || ''}
            onChange={(e) => onChange?.(e.target.value)}
            placeholder={placeholder}
            disabled={disabled}
            className={inputClassName(disabled, error)}
          />
        ) : (
          // Double Input
          <div className="flex gap-[12px] w-full">
            <input
              type={type}
              value={value || ''}
              onChange={(e) => onChange?.(e.target.value)}
              placeholder={placeholder}
              disabled={disabled}
              className={cn(inputClassName(disabled, error), 'flex-1')}
            />
            <input
              type={type2}
              value={value2 || ''}
              onChange={(e) => onChange2?.(e.target.value)}
              placeholder={placeholder2}
              disabled={disabled2}
              className={cn(inputClassName(disabled2, error2), 'flex-1')}
            />
          </div>
        )}

        {/* Error Message */}
        <div className="px-[12px] flex items-center min-h-[24px]">
          {(error || error2) && (
            <p className="font-normal text-lg text-[var(--text-error)]">
              {error || error2}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
