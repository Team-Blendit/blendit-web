'use client';

import React from 'react';

interface UserDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UserDropdown: React.FC<UserDropdownProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleItemClick = (action: string) => {
    console.log(`${action} 클릭`);
    onClose();
    // TODO: 각 메뉴 항목에 대한 액션 구현
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40"
        onClick={onClose}
      />
      
      {/* Dropdown Menu */}
      <div className="absolute top-[calc(100%+8px)] right-0 z-50 bg-white border border-[var(--border-focus)] rounded-[20px] p-[20px] shadow-[2px_4px_12px_0px_rgba(0,0,0,0.08)] min-w-[174px]">
        <div className="flex flex-col items-start gap-[8px] w-full">
          <button
            onClick={() => handleItemClick('네트워킹 관리')}
            className="flex items-center justify-center px-[8px] py-[12px] w-full whitespace-nowrap hover:bg-[var(--accent-secondary-hover)] rounded-lg transition-colors"
          >
            <span className="font-semibold text-[22px] leading-[28px] text-[var(--text-tertiary)]">
              네트워킹 관리
            </span>
          </button>
          
          <button
            onClick={() => handleItemClick('마이페이지')}
            className="flex items-center justify-center px-[8px] py-[12px] w-full whitespace-nowrap hover:bg-[var(--accent-secondary-hover)] rounded-lg transition-colors"
          >
            <span className="font-semibold text-[22px] leading-[28px] text-[var(--text-tertiary)]">
              마이페이지
            </span>
          </button>
          
          <button
            onClick={() => handleItemClick('로그아웃')}
            className="flex items-center justify-center px-[8px] py-[12px] w-full whitespace-nowrap hover:bg-[var(--accent-secondary-hover)] rounded-lg transition-colors"
          >
            <span className="font-semibold text-[22px] leading-[28px] text-[var(--text-tertiary)]">
              로그아웃
            </span>
          </button>
        </div>
      </div>
    </>
  );
};
