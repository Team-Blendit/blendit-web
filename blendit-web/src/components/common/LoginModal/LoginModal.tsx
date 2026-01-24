'use client';

import React, { useEffect } from 'react';
import { SocialLoginButton } from '@/components/common/SocialLoginButton';

// X Icon (Close)
const XIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M19.281 18.2198C19.3507 18.2895 19.406 18.3722 19.4437 18.4632C19.4814 18.5543 19.5008 18.6519 19.5008 18.7504C19.5008 18.849 19.4814 18.9465 19.4437 19.0376C19.406 19.1286 19.3507 19.2114 19.281 19.281C19.2114 19.3507 19.1286 19.406 19.0376 19.4437C18.9465 19.4814 18.849 19.5008 18.7504 19.5008C18.6519 19.5008 18.5543 19.4814 18.4632 19.4437C18.3722 19.406 18.2895 19.3507 18.2198 19.281L12.0004 13.0607L5.78104 19.281C5.64031 19.4218 5.44944 19.5008 5.25042 19.5008C5.05139 19.5008 4.86052 19.4218 4.71979 19.281C4.57906 19.1403 4.5 18.9494 4.5 18.7504C4.5 18.5514 4.57906 18.3605 4.71979 18.2198L10.9401 12.0004L4.71979 5.78104C4.57906 5.64031 4.5 5.44944 4.5 5.25042C4.5 5.05139 4.57906 4.86052 4.71979 4.71979C4.86052 4.57906 5.05139 4.5 5.25042 4.5C5.44944 4.5 5.64031 4.57906 5.78104 4.71979L12.0004 10.9401L18.2198 4.71979C18.3605 4.57906 18.5514 4.5 18.7504 4.5C18.9494 4.5 19.1403 4.57906 19.281 4.71979C19.4218 4.86052 19.5008 5.05139 19.5008 5.25042C19.5008 5.44944 19.4218 5.64031 19.281 5.78104L13.0607 12.0004L19.281 18.2198Z" fill="#121212"/>
  </svg>
);

export interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onKakaoLogin?: () => void;
  onGoogleLogin?: () => void;
  onNaverLogin?: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onKakaoLogin,
  onGoogleLogin,
  onNaverLogin,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50"
        style={{ background: 'rgba(30, 30, 30, 0.30)' }}
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50">
        <div className="bg-(--bg-canvas) rounded-[20px] pt-[28px] pb-[36px] px-[36px] w-[640px] flex flex-col gap-[30px] justify-between items-center">
          {/* Close Button */}
          <div className="flex justify-between items-center w-full">
            <div className ="w-[24px] h-[24px]" /> {/* Placeholder for centering */}
            <button
              onClick={onClose}
              className="p-[8px] rounded-lg transition-colors"
            >
              <XIcon />
            </button>
          </div>

          {/* Logo Area */}
          <div className="flex justify-center">
            <div className="w-[220px] h-[176px] bg-[#DBDBDB] rounded-lg" />
          </div>

          <div className="flex flex-col gap-[16px] items-start self-stretch">
            {/* Divider with Text */}
            <div className="flex items-center justify-center gap-[10px] self-stretch py-[10px]">
                <div className="flex-1 h-px bg-(--border-default)" />
                <span className="text-[16px] font-normal leading-[22px] text-[var(--text-tertiary)]">
                SNS 계정으로 로그인
                </span>
                <div className="flex-1 h-px bg-(--border-default)" />
            </div>

            {/* Login Buttons */}
            <div className="flex flex-col items-start gap-[24px] self-stretch">
                <SocialLoginButton provider="kakao" onClick={onKakaoLogin} />
                <SocialLoginButton provider="google" onClick={onGoogleLogin} />
                <SocialLoginButton provider="naver" onClick={onNaverLogin} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
