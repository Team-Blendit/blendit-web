'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/common/Button';
import { LoginModal } from '@/components/common/LoginModal';
import { OnboardingModal, OnboardingData } from '@/components/common/OnboardingModal';
import { UserProfile } from '@/components/layout/UserProfile';
import { UserDropdown } from '@/components/layout/UserDropdown';
import { useAuthStore } from '@/stores/authStore';

// const BellIcon = () => (
//   <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
//     <path d="M41.6854 33.2592C40.5562 31.3086 38.8771 25.8722 38.8771 18.8247C38.8771 14.8929 37.3101 11.1222 34.5208 8.34204C31.7315 5.56188 27.9484 4 24.0038 4C20.0592 4 16.2761 5.56188 13.4868 8.34204C10.6976 11.1222 9.13057 14.8929 9.13057 18.8247C9.13057 25.8722 7.4495 31.3086 6.32031 33.2494C6.11202 33.6051 6.00154 34.0092 6.00002 34.421C5.99849 34.8327 6.10599 35.2376 6.31165 35.5948C6.5173 35.9519 6.81384 36.2487 7.17134 36.4551C7.52883 36.6614 7.93463 36.7702 8.34777 36.7703H17.0036C17.1989 38.4845 18.0205 40.067 19.3116 41.216C20.6027 42.3649 22.273 43 24.0038 43C25.7346 43 27.4049 42.3649 28.696 41.216C29.9871 40.067 30.8087 38.4845 31.004 36.7703H39.6599C40.0714 36.7689 40.4753 36.6597 40.8312 36.4536C41.187 36.2476 41.4823 35.952 41.6874 35.5964C41.8926 35.2408 42.0004 34.8377 42 34.4275C41.9996 34.0173 41.8911 33.6144 41.6854 33.2592ZM24.0038 41.4518C22.6863 41.4516 21.4128 40.9783 20.4169 40.1185C19.421 39.2588 18.7692 38.0701 18.581 36.7703H29.4267C29.2385 38.0701 28.5867 39.2588 27.5907 40.1185C26.5948 40.9783 25.3214 41.4516 24.0038 41.4518ZM40.335 34.8197C40.2681 34.9388 40.1704 35.0379 40.0519 35.1065C39.9335 35.1751 39.7988 35.2108 39.6618 35.2098H8.34777C8.21079 35.2108 8.07607 35.1751 7.95765 35.1065C7.83923 35.0379 7.74146 34.9388 7.67456 34.8197C7.60585 34.7011 7.56968 34.5665 7.56968 34.4296C7.56968 34.2926 7.60585 34.1581 7.67456 34.0394C9.13057 31.5368 10.6962 25.7142 10.6962 18.8247C10.6962 15.3068 12.0982 11.933 14.5939 9.44548C17.0896 6.95796 20.4744 5.56049 24.0038 5.56049C27.5332 5.56049 30.9181 6.95796 33.4137 9.44548C35.9094 11.933 37.3115 15.3068 37.3115 18.8247C37.3115 25.7123 38.8771 31.5368 40.3331 34.0394C40.4021 34.1579 40.4386 34.2923 40.4389 34.4293C40.4393 34.5663 40.4034 34.7009 40.335 34.8197Z" fill="#121212"/>
//   </svg>
// );

// const NotifiedBellIcon = () => (
//   <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
//     <path d="M41.6941 33.2592C40.5963 31.3086 38.9638 25.8722 38.9638 18.8247C38.9638 14.8929 37.4403 11.1222 34.7285 8.34204C32.0167 5.56188 28.3388 4 24.5037 4C20.6687 4 16.9907 5.56188 14.2789 8.34204C11.5671 11.1222 10.0436 14.8929 10.0436 18.8247C10.0436 25.8722 8.40924 31.3086 7.31141 33.2494C7.10891 33.6051 7.00149 34.0092 7.00002 34.421C6.99854 34.8327 7.10304 35.2376 7.30299 35.5948C7.50293 35.9519 7.79124 36.2487 8.1388 36.4551C8.48637 36.6614 8.88089 36.7702 9.28255 36.7703H17.6979C17.8879 38.4845 18.6866 40.067 19.9419 41.216C21.1971 42.3649 22.821 43 24.5037 43C26.1865 43 27.8103 42.3649 29.0656 41.216C30.3208 40.067 31.1196 38.4845 31.3095 36.7703H39.7249C40.125 36.7689 40.5177 36.6597 40.8636 36.4536C41.2096 36.2476 41.4967 35.952 41.6961 35.5964C41.8956 35.2408 42.0004 34.8377 42 34.4275C41.9996 34.0173 41.8942 33.6144 41.6941 33.2592ZM24.5037 41.4518C23.2227 41.4516 21.9847 40.9783 21.0164 40.1185C20.0482 39.2588 19.4145 38.0701 19.2315 36.7703H29.7759C29.5929 38.0701 28.9593 39.2588 27.991 40.1185C27.0227 40.9783 25.7847 41.4516 24.5037 41.4518ZM40.3813 34.8197C40.3162 34.9388 40.2212 35.0379 40.1061 35.1065C39.9909 35.1751 39.8599 35.2108 39.7268 35.2098H9.28255C9.14938 35.2108 9.0184 35.1751 8.90327 35.1065C8.78814 35.0379 8.69309 34.9388 8.62804 34.8197C8.56124 34.7011 8.52608 34.5665 8.52608 34.4296C8.52608 34.2926 8.56124 34.1581 8.62804 34.0394C10.0436 31.5368 11.5657 25.7142 11.5657 18.8247C11.5657 15.3068 12.9288 11.933 15.3552 9.44548C17.7815 6.95796 21.0723 5.56049 24.5037 5.56049C27.9351 5.56049 31.2259 6.95796 33.6522 9.44548C36.0786 11.933 37.4417 15.3068 37.4417 18.8247C37.4417 25.7123 38.9638 31.5368 40.3794 34.0394C40.4465 34.1579 40.482 34.2923 40.4823 34.4293C40.4826 34.5663 40.4478 34.7009 40.3813 34.8197Z" fill="#121212"/>
//     <rect x="30.668" y="6.66602" width="8" height="8" rx="4" fill="#F53333"/>
//   </svg>
// );

export const Header: React.FC = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isOnboardingModalOpen, setIsOnboardingModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Zustand store에서 인증 상태 가져오기
  const { isAuthenticated, user, setNewUserComplete } = useAuthStore();

  // 카카오 로그인 핸들러
  const handleKakaoLogin = () => {
    const KAKAO_CLIENT_ID = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID;
    const REDIRECT_URI = process.env.NEXT_PUBLIC_REDIRECT_URI;

    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&state=kakao`;

    window.location.href = KAKAO_AUTH_URL;
  };

  // 구글 로그인 핸들러
  const handleGoogleLogin = () => {
    const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    const REDIRECT_URI = process.env.NEXT_PUBLIC_REDIRECT_URI;

    const GOOGLE_AUTH_URL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=openid%20email%20profile&state=google`;

    window.location.href = GOOGLE_AUTH_URL;
  };

  // const handleNaverLogin = () => {
  //   console.log('네이버 로그인 준비 중');
  //   // TODO: 네이버 로그인 구현
  // };

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
        <div className="max-w-[1440px] mx-auto py-[25px] flex items-center justify-between">
          {/* Logo */}
          <Link href="/">
            <img src="/logo.svg" />
          </Link>

          {/* Right Section - Login Button or User Menu */}
          {isAuthenticated ? (
            <div className="flex gap-[20px] items-center relative">
              <Link href="/blending/new">
                <Button
                  variant='primary'
                  size='sm'
                  className='rounded-full'
                >
                  블렌딩 생성
                </Button>
              </Link>

              {/* Notification Bell - TODO: 호버 효과 제거 */}
              {/* <button className="flex items-center justify-center rounded-full hover:bg-[var(--color-gray-100)]">
                { false ? <NotifiedBellIcon /> : <BellIcon /> }
              </button> */}

              <div className='flex items-center gap-[4px]'>
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
            </div>
          ) : (
            <Button
              variant="primary"
              size="sm"
              onClick={() => setIsLoginModalOpen(true)}
              className='rounded-full'
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
        // onNaverLogin={handleNaverLogin}
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
