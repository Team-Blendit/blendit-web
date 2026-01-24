'use client';

import React, { useState } from 'react';
import { Button } from '@/components/common/Button';
import { LoginModal } from '@/components/common/LoginModal';
import { OnboardingModal, OnboardingData } from '@/components/common/OnboardingModal';

export const Header: React.FC = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isOnboardingModalOpen, setIsOnboardingModalOpen] = useState(false);

  const handleSocialLogin = () => {
    console.log('소셜 로그인 시도');
    // 로그인 모달 닫고 온보딩 모달 열기
    setIsLoginModalOpen(false);
    setIsOnboardingModalOpen(true);
  };

  const handleKakaoLogin = () => {
    handleSocialLogin();
  };

  const handleGoogleLogin = () => {
    handleSocialLogin();
  };

  const handleNaverLogin = () => {
    handleSocialLogin();
  };

  const handleOnboardingComplete = (data: OnboardingData) => {
    console.log('온보딩 완료:', data);
    setIsOnboardingModalOpen(false);
    // TODO: 온보딩 데이터 저장 및 메인 페이지로 이동
  };

  return (
    <>
      <header className="bg-transparent">
        <div className="max-w-[1440px] mx-auto px-[30px] py-[25px] flex items-center justify-between">
          {/* Logo */}
          <div className="bg-[#DEDEDE] w-[170px] h-[50px] rounded flex items-center justify-center">
            <span className="text-lg font-semibold text-[#999999]">LOGO</span>
          </div>

          {/* Login Button */}
          <Button
            variant="primary"
            size="md"
            onClick={() => setIsLoginModalOpen(true)}
          >
            로그인 / 회원가입
          </Button>
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
