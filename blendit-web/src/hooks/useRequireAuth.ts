'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';

/**
 * 로그인이 필요한 페이지에서 사용하는 훅
 * 비로그인 상태면 루트 페이지로 리디렉션합니다.
 */
export function useRequireAuth() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    // persist hydration이 완료된 후 상태를 확인
    const unsubscribe = useAuthStore.persist.onFinishHydration(() => {
      setHasHydrated(true);
    });

    // 이미 hydration이 완료된 경우
    if (useAuthStore.persist.hasHydrated()) {
      setHasHydrated(true);
    }

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (hasHydrated && !isAuthenticated) {
      router.replace('/');
    }
  }, [hasHydrated, isAuthenticated, router]);

  return { isAuthenticated: hasHydrated && isAuthenticated };
}
