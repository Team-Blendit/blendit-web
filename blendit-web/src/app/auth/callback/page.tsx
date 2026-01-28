'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';

type Provider = 'kakao' | 'google';

const PROVIDER_CONFIG: Record<Provider, { endpoint: string; name: string }> = {
  kakao: { endpoint: '/auth/oidc/kakao', name: '카카오' },
  google: { endpoint: '/auth/oidc/google', name: '구글' },
};

export default function AuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuthStore();

  useEffect(() => {
    const code = searchParams.get('code');
    const error = searchParams.get('error');
    const state = searchParams.get('state');
    const provider = (state || 'kakao') as Provider;
    const config = PROVIDER_CONFIG[provider] || PROVIDER_CONFIG.kakao;

    if (error) {
      console.error(`${config.name} 로그인 에러:`, error);
      router.replace('/');
      return;
    }

    if (!code) {
      console.error('인가 코드가 없습니다');
      router.replace('/');
      return;
    }

    const handleOAuthCallback = async () => {
      try {
        console.log(`${config.name} 로그인 요청:`, { code, provider });

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${config.endpoint}`, {
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
            isNewUser: !data.user.isOnboardingComplete,
          },
          data.accessToken,
          data.refreshToken
        );

        router.replace('/');
      } catch (error) {
        console.error(`${config.name} 로그인 처리 중 에러:`, error);
        router.replace('/');
      }
    };

    handleOAuthCallback();
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
