'use client';

import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

type DropDownRowProps = {
  label: string;
  selected?: boolean;
  onClick?: () => void;
};

const DropDownRow = ({ label, selected = false, onClick }: DropDownRowProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        'w-[134px] px-[8px] py-[12px] flex items-center justify-center rounded-[8px]',
        'font-semibold text-[22px] leading-[28px]',
        'transition-colors',
        isHovered && 'bg-(--accent-primary-hover)',
        selected 
          ? 'text-(--badge-blue-outline-text)' 
          : isHovered 
            ? 'text-(--text-secondary)' 
            : 'text-(--text-tertiary)'
      )}
    >
      {label}
    </button>
  );
};

type FilterChipProps = {
  label: string;
  options: string[];
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
};

const DownArrowIcon = ({ active }: { active: boolean }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20.031 9.53055L12.531 17.0306C12.4614 17.1003 12.3787 17.1556 12.2876 17.1933C12.1966 17.2311 12.099 17.2505 12.0004 17.2505C11.9019 17.2505 11.8043 17.2311 11.7132 17.1933C11.6222 17.1556 11.5394 17.1003 11.4698 17.0306L3.96979 9.53055C3.82906 9.38982 3.75 9.19895 3.75 8.99993C3.75 8.80091 3.82906 8.61003 3.96979 8.4693C4.11052 8.32857 4.30139 8.24951 4.50042 8.24951C4.69944 8.24951 4.89031 8.32857 5.03104 8.4693L12.0004 15.4396L18.9698 8.4693C19.0395 8.39962 19.1222 8.34435 19.2132 8.30663C19.3043 8.26892 19.4019 8.24951 19.5004 8.24951C19.599 8.24951 19.6965 8.26892 19.7876 8.30663C19.8786 8.34435 19.9614 8.39962 20.031 8.4693C20.1007 8.53899 20.156 8.62171 20.1937 8.71276C20.2314 8.8038 20.2508 8.90138 20.2508 8.99993C20.2508 9.09847 20.2314 9.19606 20.1937 9.2871C20.156 9.37815 20.1007 9.46087 20.031 9.53055Z" 
    fill={active ? "var(--text-primary)" : "var(--icon-tertiary)"} />  
  </svg>
);

const UpArrowIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20.031 15.5307C19.9614 15.6005 19.8787 15.6558 19.7876 15.6935C19.6966 15.7313 19.599 15.7507 19.5004 15.7507C19.4019 15.7507 19.3043 15.7313 19.2132 15.6935C19.1222 15.6558 19.0394 15.6005 18.9698 15.5307L12.0004 8.56041L5.03104 15.5307C4.89031 15.6715 4.69944 15.7505 4.50042 15.7505C4.30139 15.7505 4.11052 15.6715 3.96979 15.5307C3.82906 15.39 3.75 15.1991 3.75 15.0001C3.75 14.8011 3.82906 14.6102 3.96979 14.4695L11.4698 6.96948C11.5394 6.89974 11.6222 6.84443 11.7132 6.80668C11.8043 6.76894 11.9019 6.74951 12.0004 6.74951C12.099 6.74951 12.1966 6.76894 12.2876 6.80668C12.3787 6.84443 12.4614 6.89974 12.531 6.96948L20.031 14.4695C20.1008 14.5391 20.1561 14.6218 20.1938 14.7129C20.2316 14.8039 20.251 14.9015 20.251 15.0001C20.251 15.0987 20.2316 15.1963 20.1938 15.2873C20.1561 15.3784 20.1008 15.4611 20.031 15.5307Z" fill="#121212"/>
  </svg>
);

export default function FilterChip({ 
  label, 
  options,
  value,
  onChange,
  className 
}: FilterChipProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value || '');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 외부 value prop 변경 시 내부 상태 동기화
  useEffect(() => {
    setSelectedValue(value || '');
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleSelect = (option: string) => {
    setSelectedValue(option);
    onChange?.(option);
    setIsOpen(false);
  };

  const displayLabel = selectedValue || label;
  const hasSelection = !!selectedValue;

  return (
    <div ref={dropdownRef} className={cn('relative', className)}>
      <style jsx>{`
        .filter-chip-dropdown::-webkit-scrollbar {
          width: 18px;
        }
        
        .filter-chip-dropdown::-webkit-scrollbar-track {
          background: transparent;
        }
        
        .filter-chip-dropdown::-webkit-scrollbar-thumb {
          background-color: #BDBDBD;
          border-radius: 999px;
          border: 2px solid white;
          width: 14px;
        }
        
        .filter-chip-dropdown::-webkit-scrollbar-thumb:hover {
          background-color: #999999;
        }
      `}</style>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'w-[180px] h-[52px] rounded-full border bg-white text-[20px]',
          'flex items-center justify-between overflow-hidden',
          'pl-[24px] pr-0',
          'transition-colors',
          hasSelection || isOpen ? 'border-(--border-strong)' : 'border-(--border-active)'
        )}
      >
        <span className={cn(
          'flex-1 text-left overflow-hidden text-ellipsis whitespace-nowrap',
          'font-["Pretendard"] font-normal text-[20px] leading-[26px]',
          hasSelection || isOpen ? 'text-(--text-primary)' : 'text-(--text-tertiary)'
        )}>
          {displayLabel}
        </span>
        <div className="h-[52px] flex items-center justify-center pl-3.5 pr-[18px] rounded-r-full">
          {isOpen ? <UpArrowIcon /> : <DownArrowIcon active={hasSelection} />}
        </div>
      </button>

      {isOpen && (
        <div className="filter-chip-dropdown max-h-[400px] absolute top-[56px] left-1/2 -translate-x-1/2 bg-white border border-(--border-focus) rounded-[20px] p-[20px] shadow-[2px_4px_12px_0px_rgba(0,0,0,0.08)] z-10 flex flex-col gap-[8px] overflow-y-auto overflow-x-hidden">
          {options.map((option, index) => (
            <DropDownRow
              key={index}
              label={option}
              selected={selectedValue === option}
              onClick={() => handleSelect(option)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
