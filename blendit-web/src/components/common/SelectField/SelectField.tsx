'use client';

import React, { useRef, useEffect } from 'react';
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
  disabled?: boolean;
  // Double layout용 추가 props
  placeholder2?: string;
  options1?: string[];
  options2?: string[];
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
  disabled = false,
  placeholder2 = 'Text',
  options1 = ['옵션 1', '옵션 2', '옵션 3'],
  options2 = ['옵션 1', '옵션 2', '옵션 3'],
  onSelect1,
  onSelect2,
}) => {
  const [isOpen1, setIsOpen1] = React.useState(false);
  const [isOpen2, setIsOpen2] = React.useState(false);
  const [selectedValue1, setSelectedValue1] = React.useState('');
  const [selectedValue2, setSelectedValue2] = React.useState('');
  
  const dropdown1Ref = useRef<HTMLDivElement>(null);
  const dropdown2Ref = useRef<HTMLDivElement>(null);

  // 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdown1Ref.current && !dropdown1Ref.current.contains(event.target as Node)) {
        setIsOpen1(false);
      }
      if (dropdown2Ref.current && !dropdown2Ref.current.contains(event.target as Node)) {
        setIsOpen2(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleToggle1 = () => {
    if (!disabled && !error) {
      setIsOpen1(prev => !prev);
    }
  };

  const handleToggle2 = () => {
    if (!disabled && !error) {
      setIsOpen2(prev => !prev);
    }
  };

  const handleSelect1 = (value: string) => {
    setSelectedValue1(value);
    setIsOpen1(false);
    onSelect1?.(value);
  };

  const handleSelect2 = (value: string) => {
    setSelectedValue2(value);
    setIsOpen2(false);
    onSelect2?.(value);
  };

  return (
    <div className={cn('flex flex-col gap-3 w-full max-w-[560px]', className)}>
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
      <div className="flex flex-col gap-2 w-full">
        {/* Select Box(es) */}
        {layout === 'single' ? (
          <div className="relative w-full" ref={dropdown1Ref}>
            <button
              type="button"
              disabled={disabled}
              onClick={handleToggle1}
              className={cn(
                'w-full h-[60px] px-4 py-4 rounded-xl',
                'font-medium text-lg leading-base',
                'flex items-center justify-between',
                'transition-colors text-left',
                disabled 
                  ? 'bg-[var(--accent-secondary-disabled)] border border-[var(--border-default)] text-[var(--text-disabled)] cursor-not-allowed'
                  : error
                    ? 'bg-[var(--bg-canvas)] border border-[var(--border-error)] text-[var(--text-tertiary)]'
                    : isOpen1
                      ? 'bg-[var(--bg-canvas)] border border-[var(--border-focus)] text-[var(--text-secondary)]'
                      : 'bg-[var(--bg-canvas)] border border-[var(--border-default)] text-[var(--text-tertiary)] hover:border-[var(--border-focus)]'
              )}
            >
              <span>{selectedValue1 || placeholder}</span>
              <div className={cn(
                'transition-transform flex-shrink-0',
                isOpen1 && !disabled && !error && 'rotate-180'
              )}>
                <DownArrowIcon />
              </div>
            </button>
            
            {/* Dropdown Menu */}
            {isOpen1 && !disabled && !error && (
              <div className="absolute z-10 w-full mt-2 bg-white border border-[var(--border-default)] rounded-xl shadow-lg max-h-[240px] overflow-y-auto">
                {options1.map((option, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleSelect1(option)}
                    className={cn(
                      'w-full h-[60px] px-[14px] py-[15px] text-left text-lg font-medium',
                      'hover:bg-[#EEEEEE] transition-colors',
                      'text-[var(--text-secondary)]',
                      selectedValue1 === option && 'bg-[#EEEEEE]'
                    )}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="flex gap-4 w-full">
            <div className="relative flex-1" ref={dropdown1Ref}>
              <button
                type="button"
                disabled={disabled}
                onClick={handleToggle1}
                className={cn(
                  'w-full h-[60px] px-4 py-4 rounded-xl',
                  'font-medium text-lg leading-base',
                  'flex items-center justify-between',
                  'transition-colors text-left',
                  disabled 
                    ? 'bg-[var(--accent-secondary-disabled)] border border-[var(--border-default)] text-[var(--text-disabled)] cursor-not-allowed'
                    : error
                      ? 'bg-[var(--bg-canvas)] border border-[var(--border-error)] text-[var(--text-tertiary)]'
                      : isOpen1
                        ? 'bg-[var(--bg-canvas)] border border-[var(--border-focus)] text-[var(--text-secondary)]'
                        : 'bg-[var(--bg-canvas)] border border-[var(--border-default)] text-[var(--text-tertiary)] hover:border-[var(--border-focus)]'
                )}
              >
                <span>{selectedValue1 || placeholder}</span>
                <div className={cn(
                  'transition-transform flex-shrink-0',
                  isOpen1 && !disabled && !error && 'rotate-180'
                )}>
                  <DownArrowIcon />
                </div>
              </button>
              
              {/* Dropdown Menu */}
              {isOpen1 && !disabled && !error && (
                <div className="absolute z-10 w-full mt-2 bg-white border border-[var(--border-default)] rounded-xl shadow-lg max-h-[240px] overflow-y-auto">
                  {options1.map((option, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => handleSelect1(option)}
                      className={cn(
                        'w-full h-[60px] px-[14px] py-[15px] text-left text-lg font-medium',
                        'hover:bg-[#EEEEEE] transition-colors',
                        'text-[var(--text-secondary)]',
                        selectedValue1 === option && 'bg-[#EEEEEE]'
                      )}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            <div className="relative w-[272px]" ref={dropdown2Ref}>
              <button
                type="button"
                disabled={disabled}
                onClick={handleToggle2}
                className={cn(
                  'w-full h-[60px] px-4 py-4 rounded-xl',
                  'font-medium text-lg leading-base',
                  'flex items-center justify-between',
                  'transition-colors text-left',
                  disabled 
                    ? 'bg-[var(--accent-secondary-disabled)] border border-[var(--border-default)] text-[var(--text-disabled)] cursor-not-allowed'
                    : error
                      ? 'bg-[var(--bg-canvas)] border border-[var(--border-error)] text-[var(--text-tertiary)]'
                      : isOpen2
                        ? 'bg-[var(--bg-canvas)] border border-[var(--border-focus)] text-[var(--text-secondary)]'
                        : 'bg-[var(--bg-canvas)] border border-[var(--border-default)] text-[var(--text-tertiary)] hover:border-[var(--border-focus)]'
                )}
              >
                <span>{selectedValue2 || placeholder2}</span>
                <div className={cn(
                  'transition-transform flex-shrink-0',
                  isOpen2 && !disabled && !error && 'rotate-180'
                )}>
                  <DownArrowIcon />
                </div>
              </button>
              
              {/* Dropdown Menu */}
              {isOpen2 && !disabled && !error && (
                <div className="absolute z-10 w-full mt-2 bg-white border border-[var(--border-default)] rounded-xl shadow-lg max-h-[240px] overflow-y-auto">
                  {options2.map((option, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => handleSelect2(option)}
                      className={cn(
                        'w-full h-[60px] px-[14px] py-[15px] text-left text-lg font-medium',
                        'hover:bg-[#EEEEEE] transition-colors',
                        'text-[var(--text-secondary)]',
                        selectedValue2 === option && 'bg-[#EEEEEE]'
                      )}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="px-3">
            <p className="font-normal text-lg text-[var(--text-error)]">
              {error}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
