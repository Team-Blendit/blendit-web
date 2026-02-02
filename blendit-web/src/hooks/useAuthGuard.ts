'use client';

import { useState, useCallback } from 'react';
import { useAuthStore } from '@/stores/authStore';

interface UseAuthGuardReturn {
  /** 로그인 모달 표시 여부 */
  showLoginModal: boolean;
  /** 로그인 모달 닫기 */
  closeLoginModal: () => void;
  /** 액션 실행 전 로그인 체크 - 비로그인시 모달 표시, 로그인시 액션 실행 */
  requireAuth: (action: () => void) => void;
}

/**
 * 로그인이 필요한 액션을 보호하는 훅
 * 비로그인 상태에서 액션 실행 시 로그인 모달을 표시합니다.
 */
export function useAuthGuard(): UseAuthGuardReturn {
  const { isAuthenticated } = useAuthStore();
  const [showLoginModal, setShowLoginModal] = useState(false);

  const requireAuth = useCallback((action: () => void) => {
    if (!isAuthenticated) {
      // 비로그인 상태면 로그인 모달 표시
      setShowLoginModal(true);
    } else {
      // 로그인 상태면 바로 액션 실행
      action();
    }
  }, [isAuthenticated]);

  const closeLoginModal = useCallback(() => {
    setShowLoginModal(false);
  }, []);

  return {
    showLoginModal,
    closeLoginModal,
    requireAuth,
  };
}
