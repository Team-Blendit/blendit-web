'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/common/Button';
import { LoginModal } from '@/components/common/LoginModal';
import { OnboardingModal, OnboardingData } from '@/components/common/OnboardingModal';
import { UserProfile } from '@/components/common/UserProfile';
import { UserDropdown } from '@/components/common/UserDropdown';
import { useAuthStore } from '@/stores/authStore';

export const Header: React.FC = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isOnboardingModalOpen, setIsOnboardingModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Zustand store에서 인증 상태 가져오기
  const { isAuthenticated, user, setNewUserComplete } = useAuthStore();

  // 카카오 로그인 핸들러
  const handleKakaoLogin = () => {
    const KAKAO_CLIENT_ID = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID;
    const REDIRECT_URI = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;

    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;

    // 카카오 로그인 페이지로 이동
    window.location.href = KAKAO_AUTH_URL;
  };

  const handleGoogleLogin = () => {
    console.log('구글 로그인 준비 중');
    // TODO: 구글 로그인 구현
  };

  const handleNaverLogin = () => {
    console.log('네이버 로그인 준비 중');
    // TODO: 네이버 로그인 구현
  };

  const handleOnboardingComplete = (data: OnboardingData) => {
    console.log('온보딩 완료:', data);
    setIsOnboardingModalOpen(false);
    setNewUserComplete();
    // TODO: 온보딩 데이터를 백엔드로 전송
  };

  // 신규 회원인 경우 온보딩 모달 자동 표시
  useEffect(() => {
    if (isAuthenticated && user?.isNewUser) {
      setIsOnboardingModalOpen(true);
    }
  }, [isAuthenticated, user?.isNewUser]);

  return (
    <>
      <header className="bg-transparent">
        <div className="max-w-[1440px] mx-auto px-[30px] py-[25px] flex items-center justify-between">
          {/* Logo */}
          <div className="bg-[#DEDEDE] w-[170px] h-[50px] rounded flex items-center justify-center">
            <span className="text-lg font-semibold text-[#999999]">LOGO</span>
          </div>

          {/* Right Section - Login Button or User Menu */}
          {isAuthenticated ? (
            <div className="flex gap-[4px] items-center relative">
              {/* User Profile */}
              <UserProfile
                size="small"
                className="w-[52px] h-[52px]"
                imageUrl={user?.profileImage}
                nickname={user?.nickname}
              />
              {/* Dropdown Arrow */}
              <button
                className="w-[20px] h-[20px]"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14 7L9.97 13L6 7H14Z" fill="#999999" />
                </svg>
              </button>

              {/* User Dropdown */}
              <UserDropdown
                isOpen={isDropdownOpen}
                onClose={() => setIsDropdownOpen(false)}
              />
            </div>
          ) : (
            <Button
              variant="primary"
              size="md"
              onClick={() => setIsLoginModalOpen(true)}
            >
              로그인 / 회원가입
            </Button>
          )}
        </div>
      </header>

      {/* Login Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onKakaoLogin={handleKakaoLogin}
        onGoogleLogin={handleGoogleLogin}
        onNaverLogin={handleNaverLogin}
      />

      {/* Onboarding Modal */}
      <OnboardingModal
        isOpen={isOnboardingModalOpen}
        onClose={() => setIsOnboardingModalOpen(false)}
        onComplete={handleOnboardingComplete}
      />
    </>
  );
};
