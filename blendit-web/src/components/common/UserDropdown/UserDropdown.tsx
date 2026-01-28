'use client';

import React from 'react';
import { useAuthStore } from '@/stores/authStore';

interface UserDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UserDropdown: React.FC<UserDropdownProps> = ({ isOpen, onClose }) => {
  const { logout, refreshToken } = useAuthStore();

  if (!isOpen) return null;

  const handleLogout = async () => {
    try {
      // 백엔드 로그아웃 API 호출
      if (refreshToken) {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout?refreshToken=${refreshToken}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });
      }
      console.log('로그아웃 성공');
    } catch (error) {
      console.error('로그아웃 API 호출 실패:', error);
    } finally {
      // API 호출 실패해도 로컬 상태는 초기화
      logout();
      onClose();
    }
  };

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
            onClick={handleLogout}
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
