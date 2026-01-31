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

// Info Icon
const InfoIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9.98438 12.375C9.98438 12.4869 9.93993 12.5942 9.86081 12.6733C9.7817 12.7524 9.67439 12.7969 9.5625 12.7969C9.30143 12.7969 9.05105 12.6932 8.86644 12.5086C8.68184 12.324 8.57813 12.0736 8.57813 11.8125V9C8.57813 8.9627 8.56331 8.92694 8.53694 8.90056C8.51057 8.87419 8.4748 8.85938 8.4375 8.85938C8.32561 8.85938 8.21831 8.81493 8.13919 8.73581C8.06008 8.65669 8.01563 8.54939 8.01563 8.4375C8.01563 8.32561 8.06008 8.21831 8.13919 8.13919C8.21831 8.06007 8.32561 8.01562 8.4375 8.01562C8.69858 8.01562 8.94896 8.11934 9.13356 8.30394C9.31817 8.48855 9.42188 8.73893 9.42188 9V11.8125C9.42188 11.8498 9.43669 11.8856 9.46307 11.9119C9.48944 11.9383 9.52521 11.9531 9.5625 11.9531C9.67439 11.9531 9.7817 11.9976 9.86081 12.0767C9.93993 12.1558 9.98438 12.2631 9.98438 12.375ZM8.71875 6.60938C8.85782 6.60938 8.99376 6.56814 9.10939 6.49088C9.22502 6.41362 9.31514 6.3038 9.36836 6.17532C9.42157 6.04684 9.4355 5.90547 9.40837 5.76908C9.38124 5.63268 9.31427 5.5074 9.21594 5.40907C9.1176 5.31073 8.99232 5.24377 8.85593 5.21664C8.71953 5.18951 8.57816 5.20343 8.44968 5.25665C8.3212 5.30987 8.21139 5.39999 8.13413 5.51561C8.05687 5.63124 8.01563 5.76718 8.01563 5.90625C8.01563 6.09273 8.08971 6.27157 8.22157 6.40343C8.35343 6.5353 8.53227 6.60938 8.71875 6.60938ZM16.1719 9C16.1719 10.4185 15.7513 11.8051 14.9632 12.9845C14.1751 14.1639 13.055 15.0831 11.7446 15.6259C10.4341 16.1688 8.99205 16.3108 7.60084 16.0341C6.20963 15.7573 4.93173 15.0743 3.92872 14.0713C2.92572 13.0683 2.24266 11.7904 1.96593 10.3992C1.68921 9.00796 1.83123 7.56593 2.37405 6.25544C2.91688 4.94495 3.83611 3.82486 5.01552 3.0368C6.19493 2.24875 7.58154 1.82813 9 1.82812C10.9014 1.83036 12.7243 2.58668 14.0688 3.93119C15.4133 5.27569 16.1696 7.09859 16.1719 9ZM15.3281 9C15.3281 7.74841 14.957 6.52494 14.2616 5.48428C13.5663 4.44363 12.578 3.63254 11.4217 3.15357C10.2654 2.67461 8.99298 2.5493 7.76545 2.79347C6.53791 3.03764 5.41035 3.64034 4.52534 4.52534C3.64034 5.41034 3.03764 6.53791 2.79347 7.76544C2.5493 8.99298 2.67462 10.2654 3.15358 11.4217C3.63254 12.578 4.44363 13.5663 5.48429 14.2616C6.52494 14.957 7.74842 15.3281 9 15.3281C10.6778 15.3263 12.2863 14.659 13.4726 13.4726C14.659 12.2863 15.3263 10.6778 15.3281 9Z" fill="#BDBDBD"/>
  </svg>
);

export interface SelectFieldProps {
  label?: string;
  required?: boolean;
  placeholder?: string;
  error?: string;
  layout?: 'single' | 'double' | 'triple';
  className?: string;
  disabled?: boolean;
  searchable?: boolean; // single layout용 (또는 모든 필드에 적용)
  searchable1?: boolean; // double/triple layout 첫 번째 필드용
  searchable2?: boolean; // double/triple layout 두 번째 필드용
  searchable3?: boolean; // triple layout 세 번째 필드용
  // 다중 선택 옵션
  multiple?: boolean; // single layout용
  multiple1?: boolean; // double/triple layout 첫 번째 필드용
  multiple2?: boolean; // double/triple layout 두 번째 필드용
  multiple3?: boolean; // triple layout 세 번째 필드용
  // 선택된 값 props
  value?: string | string[];
  value2?: string | string[];
  value3?: string | string[];
  // Double/Triple layout용 추가 props
  placeholder2?: string;
  placeholder3?: string;
  options1?: string[];
  options2?: string[];
  options3?: string[];
  onSelect1?: (value: string | string[]) => void;
  onSelect2?: (value: string | string[]) => void;
  onSelect3?: (value: string | string[]) => void;
  // 자동승인 토글 관련 props
  showAutoApproval?: boolean;
  autoApprovalEnabled?: boolean;
  onAutoApprovalChange?: (enabled: boolean) => void;
}

export const SelectField: React.FC<SelectFieldProps> = ({
  label = 'Text',
  required = true,
  placeholder = 'Text',
  error,
  layout = 'single',
  className,
  disabled = false,
  searchable = false,
  searchable1,
  searchable2,
  searchable3,
  multiple = false,
  multiple1,
  multiple2,
  multiple3,
  value,
  value2,
  value3,
  placeholder2 = 'Text',
  placeholder3 = 'Text',
  options1 = ['옵션 1', '옵션 2', '옵션 3'],
  options2 = ['옵션 1', '옵션 2', '옵션 3'],
  options3 = ['옵션 1', '옵션 2', '옵션 3'],
  onSelect1,
  onSelect2,
  onSelect3,
  showAutoApproval = false,
  autoApprovalEnabled = false,
  onAutoApprovalChange,
}) => {
  const [isOpen1, setIsOpen1] = React.useState(false);
  const [isOpen2, setIsOpen2] = React.useState(false);
  const [isOpen3, setIsOpen3] = React.useState(false);

  // 다중 선택 여부 확인
  const isMultiple1 = layout === 'single' ? multiple : (multiple1 ?? multiple);
  const isMultiple2 = multiple2 ?? multiple;
  const isMultiple3 = multiple3 ?? multiple;

  // 초기값 설정 (다중 선택일 경우 배열로)
  const getInitialValue = (val: string | string[] | undefined, isMulti: boolean): string | string[] => {
    if (isMulti) {
      if (Array.isArray(val)) return val;
      if (val) return [val];
      return [];
    }
    if (Array.isArray(val)) return val[0] || '';
    return val || '';
  };

  const [selectedValue1, setSelectedValue1] = React.useState<string | string[]>(getInitialValue(value, isMultiple1));
  const [selectedValue2, setSelectedValue2] = React.useState<string | string[]>(getInitialValue(value2, isMultiple2));
  const [selectedValue3, setSelectedValue3] = React.useState<string | string[]>(getInitialValue(value3, isMultiple3));
  const [searchTerm1, setSearchTerm1] = React.useState('');
  const [searchTerm2, setSearchTerm2] = React.useState('');
  const [searchTerm3, setSearchTerm3] = React.useState('');
  const [autoApproval, setAutoApproval] = React.useState(autoApprovalEnabled);

  const dropdown1Ref = useRef<HTMLDivElement>(null);
  const dropdown2Ref = useRef<HTMLDivElement>(null);
  const dropdown3Ref = useRef<HTMLDivElement>(null);

  // 외부 value prop 변경 시 내부 상태 동기화
  useEffect(() => {
    setSelectedValue1(getInitialValue(value, isMultiple1));
  }, [value, isMultiple1]);

  useEffect(() => {
    setSelectedValue2(getInitialValue(value2, isMultiple2));
  }, [value2, isMultiple2]);

  useEffect(() => {
    setSelectedValue3(getInitialValue(value3, isMultiple3));
  }, [value3, isMultiple3]);

  // 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdown1Ref.current && !dropdown1Ref.current.contains(event.target as Node)) {
        setIsOpen1(false);
      }
      if (dropdown2Ref.current && !dropdown2Ref.current.contains(event.target as Node)) {
        setIsOpen2(false);
      }
      if (dropdown3Ref.current && !dropdown3Ref.current.contains(event.target as Node)) {
        setIsOpen3(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect1 = (val: string) => {
    if (isMultiple1) {
      const currentValues = Array.isArray(selectedValue1) ? selectedValue1 : [];
      const newValues = currentValues.includes(val)
        ? currentValues.filter(v => v !== val)
        : [...currentValues, val];
      setSelectedValue1(newValues);
      onSelect1?.(newValues);
    } else {
      setSelectedValue1(val);
      setIsOpen1(false);
      setSearchTerm1('');
      onSelect1?.(val);
    }
  };

  const handleSelect2 = (val: string) => {
    if (isMultiple2) {
      const currentValues = Array.isArray(selectedValue2) ? selectedValue2 : [];
      const newValues = currentValues.includes(val)
        ? currentValues.filter(v => v !== val)
        : [...currentValues, val];
      setSelectedValue2(newValues);
      onSelect2?.(newValues);
    } else {
      setSelectedValue2(val);
      setIsOpen2(false);
      setSearchTerm2('');
      onSelect2?.(val);
    }
  };

  const handleSelect3 = (val: string) => {
    if (isMultiple3) {
      const currentValues = Array.isArray(selectedValue3) ? selectedValue3 : [];
      const newValues = currentValues.includes(val)
        ? currentValues.filter(v => v !== val)
        : [...currentValues, val];
      setSelectedValue3(newValues);
      onSelect3?.(newValues);
    } else {
      setSelectedValue3(val);
      setIsOpen3(false);
      setSearchTerm3('');
      onSelect3?.(val);
    }
  };

  // 표시할 값 포맷팅 (다중 선택시 쉼표로 구분)
  const getDisplayValue = (val: string | string[]): string => {
    if (Array.isArray(val)) return val.join(', ');
    return val;
  };

  // 선택 여부 확인
  const isSelected = (val: string | string[], option: string): boolean => {
    if (Array.isArray(val)) return val.includes(option);
    return val === option;
  };

  const handleToggleAutoApproval = () => {
    const newValue = !autoApproval;
    setAutoApproval(newValue);
    onAutoApprovalChange?.(newValue);
  };

  const getFilteredOptions1 = () => {
    const isSearchable = layout === 'single' ? searchable : (searchable1 ?? searchable);
    if (!isSearchable || !searchTerm1) return options1;
    return options1.filter(option => 
      option.toLowerCase().includes(searchTerm1.toLowerCase())
    );
  };

  const getFilteredOptions2 = () => {
    const isSearchable = searchable2 ?? searchable;
    if (!isSearchable || !searchTerm2) return options2;
    return options2.filter(option => 
      option.toLowerCase().includes(searchTerm2.toLowerCase())
    );
  };

  const getFilteredOptions3 = () => {
    const isSearchable = searchable3 ?? searchable;
    if (!isSearchable || !searchTerm3) return options3;
    return options3.filter(option => 
      option.toLowerCase().includes(searchTerm3.toLowerCase())
    );
  };

  return (
    <div className={cn('flex flex-col items-start self-stretch w-full', label ? 'gap-[12px]' : '')}>
      {/* Label with Auto Approval Toggle */}
      {label && (
        <div className="flex items-center justify-between self-stretch w-full">
          <div className="flex items-start gap-[2px]">
            <label className="font-semibold text-[22px] text-[var(--text-secondary)]">
              {label}
            </label>
            {required && (
              <div className="w-[6px] h-[6px] rounded-full bg-[var(--border-error)]" aria-label="required" />
            )}
          </div>
          
          {showAutoApproval && (
            <div className="flex w-[126px] justify-between items-center">
              <div className="flex items-center gap-[4px]">
                <span className="font-semibold text-[18px] leading-[28px] text-[var(--text-disabled)]">
                  자동승인
                </span>
                <InfoIcon />
              </div>
              <button
                type="button"
                onClick={handleToggleAutoApproval}
                className={cn(
                  'relative h-[20px] w-[34px] rounded-[66.667px] transition-colors',
                  autoApproval ? 'bg-(--accent-primary-default)' : 'bg-(--accent-secondary-default)'
                )}
              >
                <span
                  className={cn(
                    'absolute top-[2px] size-[16px] rounded-[66.667px] bg-white transition-transform',
                    autoApproval ? 'left-[16.22px]' : 'left-[2.78px]'
                  )}
                />
              </button>
            </div>
          )}
        </div>
      )}

      {/* Field Group */}
      <div className={cn('flex flex-col gap-[8px] w-full', className)}>
        {/* Select Box(es) */}
        {layout === 'single' ? (
          <div className="relative w-full" ref={dropdown1Ref}>
            <div className="relative">
              <input
                type="text"
                disabled={disabled}
                value={searchable && isOpen1 ? searchTerm1 : getDisplayValue(selectedValue1)}
                onChange={(e) => {
                  if (searchable) {
                    setSearchTerm1(e.target.value);
                    setIsOpen1(true);
                  }
                }}
                onFocus={() => !disabled && setIsOpen1(true)}
                onClick={() => !disabled && setIsOpen1(true)}
                placeholder={placeholder}
                readOnly={!searchable}
                className={cn(
                  'w-full h-[60px] px-[16px] py-[16px] rounded-xl',
                  'font-medium text-lg leading-base',
                  'transition-colors focus:outline-none',
                  disabled
                    ? 'bg-[var(--accent-secondary-disabled)] border border-[var(--border-default)] text-[var(--text-disabled)] cursor-not-allowed'
                    : error
                      ? 'bg-[var(--bg-canvas)] border border-[var(--border-error)] text-[var(--text-tertiary)]'
                      : isOpen1
                        ? 'bg-[var(--bg-canvas)] border border-[var(--border-focus)] text-[var(--text-secondary)]'
                        : 'bg-[var(--bg-canvas)] border border-[var(--border-default)] text-[var(--text-tertiary)] hover:border-[var(--border-focus)]',
                  !searchable && 'cursor-pointer'
                )}
              />
              <div 
                className="absolute right-[16px] top-1/2 -translate-y-1/2 pointer-events-none"
              >
                <div className={cn(
                  'transition-transform',
                  isOpen1 && !disabled && 'rotate-180'
                )}>
                  <DownArrowIcon />
                </div>
              </div>
            </div>
            
            {/* Dropdown Menu */}
            {isOpen1 && !disabled && (
              <div className="absolute z-10 w-full mt-[8px] bg-white border border-[var(--border-default)] rounded-xl shadow-lg max-h-[240px] overflow-y-auto">
                {getFilteredOptions1().map((option, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleSelect1(option)}
                    className={cn(
                      'w-full h-[60px] px-[14px] py-[15px] text-left text-lg font-medium',
                      'hover:bg-[#EEEEEE] transition-colors',
                      'text-[var(--text-secondary)]',
                      isSelected(selectedValue1, option) && 'bg-[#EEEEEE]'
                    )}
                  >
                    {isMultiple1 && (
                      <span className="inline-block w-[20px] h-[20px] mr-[8px] border border-[var(--border-default)] rounded align-middle">
                        {isSelected(selectedValue1, option) && (
                          <svg className="w-full h-full text-[var(--accent-primary-default)]" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </span>
                    )}
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        ) : layout === 'double' ? (
          <div className="flex gap-[12px] items-start w-full">
            <div className="relative flex-1" ref={dropdown1Ref}>
              <div className="relative">
                <input
                  type="text"
                  disabled={disabled}
                  value={(searchable1 ?? searchable) && isOpen1 ? searchTerm1 : getDisplayValue(selectedValue1)}
                  onChange={(e) => {
                    if (searchable1 ?? searchable) {
                      setSearchTerm1(e.target.value);
                      setIsOpen1(true);
                    }
                  }}
                  onFocus={() => !disabled && setIsOpen1(true)}
                  onClick={() => !disabled && setIsOpen1(true)}
                  placeholder={placeholder}
                  readOnly={!(searchable1 ?? searchable)}
                  className={cn(
                    'w-full h-[60px] px-4 py-4 rounded-xl',
                    'font-medium text-lg leading-base',
                    'transition-colors focus:outline-none',
                    disabled
                      ? 'bg-[var(--accent-secondary-disabled)] border border-[var(--border-default)] text-[var(--text-disabled)] cursor-not-allowed'
                      : error
                        ? 'bg-[var(--bg-canvas)] border border-[var(--border-error)] text-[var(--text-tertiary)]'
                        : isOpen1
                          ? 'bg-[var(--bg-canvas)] border border-[var(--border-focus)] text-[var(--text-secondary)]'
                          : 'bg-[var(--bg-canvas)] border border-[var(--border-default)] text-[var(--text-tertiary)] hover:border-[var(--border-focus)]',
                    !(searchable1 ?? searchable) && 'cursor-pointer'
                  )}
                />
                <div
                  className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none"
                >
                  <div className={cn(
                    'transition-transform',
                    isOpen1 && !disabled && 'rotate-180'
                  )}>
                    <DownArrowIcon />
                  </div>
                </div>
              </div>

              {/* Dropdown Menu */}
              {isOpen1 && !disabled && (
                <div className="absolute z-10 w-full mt-[8px] bg-white border border-[var(--border-default)] rounded-xl shadow-lg max-h-[240px] overflow-y-auto">
                  {getFilteredOptions1().map((option, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => handleSelect1(option)}
                      className={cn(
                        'w-full h-[60px] px-[14px] py-[15px] text-left text-lg font-medium',
                        'hover:bg-[#EEEEEE] transition-colors',
                        'text-[var(--text-secondary)]',
                        isSelected(selectedValue1, option) && 'bg-[#EEEEEE]'
                      )}
                    >
                      {isMultiple1 && (
                        <span className="inline-block w-[20px] h-[20px] mr-[8px] border border-[var(--border-default)] rounded align-middle">
                          {isSelected(selectedValue1, option) && (
                            <svg className="w-full h-full text-[var(--accent-primary-default)]" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </span>
                      )}
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="relative flex-1" ref={dropdown2Ref}>
              <div className="relative">
                <input
                  type="text"
                  disabled={disabled}
                  value={(searchable2 ?? searchable) && isOpen2 ? searchTerm2 : getDisplayValue(selectedValue2)}
                  onChange={(e) => {
                    if (searchable2 ?? searchable) {
                      setSearchTerm2(e.target.value);
                      setIsOpen2(true);
                    }
                  }}
                  onFocus={() => !disabled && setIsOpen2(true)}
                  onClick={() => !disabled && setIsOpen2(true)}
                  placeholder={placeholder2}
                  readOnly={!(searchable2 ?? searchable)}
                  className={cn(
                    'w-full h-[60px] px-4 py-4 rounded-xl',
                    'font-medium text-lg leading-base',
                    'transition-colors focus:outline-none',
                    disabled
                      ? 'bg-[var(--accent-secondary-disabled)] border border-[var(--border-default)] text-[var(--text-disabled)] cursor-not-allowed'
                      : error
                        ? 'bg-[var(--bg-canvas)] border border-[var(--border-error)] text-[var(--text-tertiary)]'
                        : isOpen2
                          ? 'bg-[var(--bg-canvas)] border border-[var(--border-focus)] text-[var(--text-secondary)]'
                          : 'bg-[var(--bg-canvas)] border border-[var(--border-default)] text-[var(--text-tertiary)] hover:border-[var(--border-focus)]',
                    !(searchable2 ?? searchable) && 'cursor-pointer'
                  )}
                />
                <div 
                  className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none"
                >
                  <div className={cn(
                    'transition-transform',
                    isOpen2 && !disabled && 'rotate-180'
                  )}>
                    <DownArrowIcon />
                  </div>
                </div>
              </div>
              
              {/* Dropdown Menu */}
              {isOpen2 && !disabled && (
                <div className="absolute z-10 w-full mt-[8px] bg-white border border-[var(--border-default)] rounded-xl shadow-lg max-h-[240px] overflow-y-auto">
                  {getFilteredOptions2().map((option, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => handleSelect2(option)}
                      className={cn(
                        'w-full h-[60px] px-[14px] py-[15px] text-left text-lg font-medium',
                        'hover:bg-[#EEEEEE] transition-colors',
                        'text-[var(--text-secondary)]',
                        isSelected(selectedValue2, option) && 'bg-[#EEEEEE]'
                      )}
                    >
                      {isMultiple2 && (
                        <span className="inline-block w-[20px] h-[20px] mr-[8px] border border-[var(--border-default)] rounded align-middle">
                          {isSelected(selectedValue2, option) && (
                            <svg className="w-full h-full text-[var(--accent-primary-default)]" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </span>
                      )}
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : (
          // Triple layout
          <div className="flex gap-4 w-full">
            <div className="relative flex-1" ref={dropdown1Ref}>
              <div className="relative">
                <input
                  type="text"
                  disabled={disabled}
                  value={(searchable1 ?? searchable) && isOpen1 ? searchTerm1 : getDisplayValue(selectedValue1)}
                  onChange={(e) => {
                    if (searchable1 ?? searchable) {
                      setSearchTerm1(e.target.value);
                      setIsOpen1(true);
                    }
                  }}
                  onFocus={() => !disabled && setIsOpen1(true)}
                  onClick={() => !disabled && setIsOpen1(true)}
                  placeholder={placeholder}
                  readOnly={!(searchable1 ?? searchable)}
                  className={cn(
                    'w-full h-[60px] px-4 py-4 rounded-xl',
                    'font-medium text-lg leading-base',
                    'transition-colors focus:outline-none',
                    disabled
                      ? 'bg-[var(--accent-secondary-disabled)] border border-[var(--border-default)] text-[var(--text-disabled)] cursor-not-allowed'
                      : error
                        ? 'bg-[var(--bg-canvas)] border border-[var(--border-error)] text-[var(--text-tertiary)]'
                        : isOpen1
                          ? 'bg-[var(--bg-canvas)] border border-[var(--border-focus)] text-[var(--text-secondary)]'
                          : 'bg-[var(--bg-canvas)] border border-[var(--border-default)] text-[var(--text-tertiary)] hover:border-[var(--border-focus)]',
                    !(searchable1 ?? searchable) && 'cursor-pointer'
                  )}
                />
                <div
                  className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none"
                >
                  <div className={cn(
                    'transition-transform',
                    isOpen1 && !disabled && 'rotate-180'
                  )}>
                    <DownArrowIcon />
                  </div>
                </div>
              </div>

              {/* Dropdown Menu */}
              {isOpen1 && !disabled && (
                <div className="absolute z-10 w-full mt-[8px] bg-white border border-[var(--border-default)] rounded-xl shadow-lg max-h-[240px] overflow-y-auto">
                  {getFilteredOptions1().map((option, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => handleSelect1(option)}
                      className={cn(
                        'w-full h-[60px] px-[14px] py-[15px] text-left text-lg font-medium',
                        'hover:bg-[#EEEEEE] transition-colors',
                        'text-[var(--text-secondary)]',
                        isSelected(selectedValue1, option) && 'bg-[#EEEEEE]'
                      )}
                    >
                      {isMultiple1 && (
                        <span className="inline-block w-[20px] h-[20px] mr-[8px] border border-[var(--border-default)] rounded align-middle">
                          {isSelected(selectedValue1, option) && (
                            <svg className="w-full h-full text-[var(--accent-primary-default)]" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </span>
                      )}
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            <div className="relative flex-1" ref={dropdown2Ref}>
              <div className="relative">
                <input
                  type="text"
                  disabled={disabled}
                  value={(searchable2 ?? searchable) && isOpen2 ? searchTerm2 : getDisplayValue(selectedValue2)}
                  onChange={(e) => {
                    if (searchable2 ?? searchable) {
                      setSearchTerm2(e.target.value);
                      setIsOpen2(true);
                    }
                  }}
                  onFocus={() => !disabled && setIsOpen2(true)}
                  onClick={() => !disabled && setIsOpen2(true)}
                  placeholder={placeholder2}
                  readOnly={!(searchable2 ?? searchable)}
                  className={cn(
                    'w-full h-[60px] px-4 py-4 rounded-xl',
                    'font-medium text-lg leading-base',
                    'transition-colors focus:outline-none',
                    disabled
                      ? 'bg-[var(--accent-secondary-disabled)] border border-[var(--border-default)] text-[var(--text-disabled)] cursor-not-allowed'
                      : error
                        ? 'bg-[var(--bg-canvas)] border border-[var(--border-error)] text-[var(--text-tertiary)]'
                        : isOpen2
                          ? 'bg-[var(--bg-canvas)] border border-[var(--border-focus)] text-[var(--text-secondary)]'
                          : 'bg-[var(--bg-canvas)] border border-[var(--border-default)] text-[var(--text-tertiary)] hover:border-[var(--border-focus)]',
                    !(searchable2 ?? searchable) && 'cursor-pointer'
                  )}
                />
                <div
                  className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none"
                >
                  <div className={cn(
                    'transition-transform',
                    isOpen2 && !disabled && 'rotate-180'
                  )}>
                    <DownArrowIcon />
                  </div>
                </div>
              </div>

              {/* Dropdown Menu */}
              {isOpen2 && !disabled && (
                <div className="absolute z-10 w-full mt-[8px] bg-white border border-[var(--border-default)] rounded-xl shadow-lg max-h-[240px] overflow-y-auto">
                  {getFilteredOptions2().map((option, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => handleSelect2(option)}
                      className={cn(
                        'w-full h-[60px] px-[14px] py-[15px] text-left text-lg font-medium',
                        'hover:bg-[#EEEEEE] transition-colors',
                        'text-[var(--text-secondary)]',
                        isSelected(selectedValue2, option) && 'bg-[#EEEEEE]'
                      )}
                    >
                      {isMultiple2 && (
                        <span className="inline-block w-[20px] h-[20px] mr-[8px] border border-[var(--border-default)] rounded align-middle">
                          {isSelected(selectedValue2, option) && (
                            <svg className="w-full h-full text-[var(--accent-primary-default)]" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </span>
                      )}
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="relative flex-1" ref={dropdown3Ref}>
              <div className="relative">
                <input
                  type="text"
                  disabled={disabled}
                  value={(searchable3 ?? searchable) && isOpen3 ? searchTerm3 : getDisplayValue(selectedValue3)}
                  onChange={(e) => {
                    if (searchable3 ?? searchable) {
                      setSearchTerm3(e.target.value);
                      setIsOpen3(true);
                    }
                  }}
                  onFocus={() => !disabled && setIsOpen3(true)}
                  onClick={() => !disabled && setIsOpen3(true)}
                  placeholder={placeholder3}
                  readOnly={!(searchable3 ?? searchable)}
                  className={cn(
                    'w-full h-[60px] px-4 py-4 rounded-xl',
                    'font-medium text-lg leading-base',
                    'transition-colors focus:outline-none',
                    disabled
                      ? 'bg-[var(--accent-secondary-disabled)] border border-[var(--border-default)] text-[var(--text-disabled)] cursor-not-allowed'
                      : error
                        ? 'bg-[var(--bg-canvas)] border border-[var(--border-error)] text-[var(--text-tertiary)]'
                        : isOpen3
                          ? 'bg-[var(--bg-canvas)] border border-[var(--border-focus)] text-[var(--text-secondary)]'
                          : 'bg-[var(--bg-canvas)] border border-[var(--border-default)] text-[var(--text-tertiary)] hover:border-[var(--border-focus)]',
                    !(searchable3 ?? searchable) && 'cursor-pointer'
                  )}
                />
                <div
                  className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none"
                >
                  <div className={cn(
                    'transition-transform',
                    isOpen3 && !disabled && 'rotate-180'
                  )}>
                    <DownArrowIcon />
                  </div>
                </div>
              </div>

              {/* Dropdown Menu */}
              {isOpen3 && !disabled && (
                <div className="absolute z-10 w-full mt-[8px] bg-white border border-[var(--border-default)] rounded-xl shadow-lg max-h-[240px] overflow-y-auto">
                  {getFilteredOptions3().map((option, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => handleSelect3(option)}
                      className={cn(
                        'w-full h-[60px] px-[14px] py-[15px] text-left text-lg font-medium',
                        'hover:bg-[#EEEEEE] transition-colors',
                        'text-[var(--text-secondary)]',
                        isSelected(selectedValue3, option) && 'bg-[#EEEEEE]'
                      )}
                    >
                      {isMultiple3 && (
                        <span className="inline-block w-[20px] h-[20px] mr-[8px] border border-[var(--border-default)] rounded align-middle">
                          {isSelected(selectedValue3, option) && (
                            <svg className="w-full h-full text-[var(--accent-primary-default)]" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </span>
                      )}
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Error Message */}
        <div className="px-[12px] flex items-center min-h-[24px]">
          {error && (
            <p className="font-normal text-lg text-[var(--text-error)]">
              {error}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
