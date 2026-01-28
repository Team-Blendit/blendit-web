'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';

export default function KakaoCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuthStore();

  useEffect(() => {
    const code = searchParams.get('code');
    const error = searchParams.get('error');

    if (error) {
      console.error('카카오 로그인 에러:', error);
      router.replace('/');
      return;
    }

    if (!code) {
      console.error('인가 코드가 없습니다');
      router.replace('/');
      return;
    }

    // 백엔드로 인가 코드 전송
    const handleKakaoCallback = async () => {
      try {
        console.log('카카오 로그인 요청:', { code });
        
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/oidc/kakao`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ code }),
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          console.error('백엔드 응답 에러:', response.status, errorData);
          throw new Error(`로그인 처리 실패: ${response.status}`);
        }

        const response_data = await response.json();
        console.log('로그인 성공:', response_data);

        const { data } = response_data;

        // Zustand store에 사용자 정보 저장
        login(
          {
            id: data.user.uuid,
            nickname: data.user.nickname,
            profileImage: data.user.profileImage,
            email: data.user.email,
            isNewUser: !data.user.isOnboardingComplete, // 온보딩 완료 여부로 신규 사용자 판단
          },
          data.accessToken,
          data.refreshToken
        );

        // 메인 페이지로 이동
        router.replace('/');
      } catch (error) {
        console.error('카카오 로그인 처리 중 에러:', error);
        router.replace('/');
      }
    };

    handleKakaoCallback();
  }, [searchParams, login, router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4" />
        <p className="text-gray-600">로그인 처리 중...</p>
      </div>
    </div>
  );
}
