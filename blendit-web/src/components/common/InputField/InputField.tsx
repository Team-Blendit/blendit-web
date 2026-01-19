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
        {/* Input */}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
          className={cn(
            'w-full h-[60px] px-[16px] py-[16px]',
            'bg-(--bg-canvas) border border-(--border-default) rounded-xl',
            'font-medium text-lg text-(--text-primary) placeholder:text-(--text-tertiary)',
            'focus:outline-none',
            error && 'border-(--border-error)'
          )}
        />

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
