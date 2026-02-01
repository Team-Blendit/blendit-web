'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';
import { apiClient } from '@/lib/api';

type Provider = 'kakao' | 'google';

const PROVIDER_CONFIG: Record<Provider, { endpoint: string; name: string }> = {
  kakao: { endpoint: '/auth/oidc/kakao', name: '카카오' },
  google: { endpoint: '/auth/oidc/google', name: '구글' },
};

export default function AuthCallbackPage() {
  const router = useRouter();
  const { login } = useAuthStore();
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    // 이미 처리 중이면 중복 실행 방지
    if (isProcessing) return;

    // window.location.search에서 직접 파라미터 파싱 (정적 빌드 호환)
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const error = urlParams.get('error');
    const state = urlParams.get('state');

    console.log('[AuthCallback] Params from window.location:', { code: code?.substring(0, 20) + '...', state, error });

    const provider = (state || 'kakao') as Provider;
    const config = PROVIDER_CONFIG[provider] || PROVIDER_CONFIG.kakao;

    if (error) {
      console.error(`${config.name} 로그인 에러:`, error);
      router.replace('/');
      return;
    }

    if (!code) {
      console.error('[AuthCallback] 인가 코드가 없습니다');
      router.replace('/');
      return;
    }

    setIsProcessing(true);

    const handleOAuthCallback = async () => {
      try {
        console.log(`[AuthCallback] ${config.name} 로그인 요청 시작`);

        const response = await apiClient.post(config.endpoint, { code });

        console.log('[AuthCallback] 로그인 성공:', response.data);

        const { data } = response.data;

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
      } catch (err) {
        console.error(`[AuthCallback] ${config.name} 로그인 처리 중 에러:`, err);
        router.replace('/');
      }
    };

    handleOAuthCallback();
  }, [isProcessing, login, router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4" />
        <p className="text-gray-600">로그인 처리 중...</p>
      </div>
    </div>
  );
}
