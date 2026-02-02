'use client';

import { useState, useCallback } from 'react';
import { useAuthStore } from '@/stores/authStore';

interface UseOnboardingGuardReturn {
  /** 온보딩 모달 표시 여부 */
  showOnboardingModal: boolean;
  /** 온보딩 모달 닫기 */
  closeOnboardingModal: () => void;
  /** 액션 실행 전 온보딩 체크 - 온보딩 필요시 모달 표시, 아니면 액션 실행 */
  guardAction: (action: () => void) => void;
  /** 온보딩 완료 후 pending action 실행 */
  handleOnboardingComplete: () => void;
}

/**
 * 온보딩이 필요한 액션을 보호하는 훅
 * isNewUser가 true인 경우 액션 실행 전 온보딩 모달을 표시합니다.
 */
export function useOnboardingGuard(): UseOnboardingGuardReturn {
  const { user } = useAuthStore();
  const [showOnboardingModal, setShowOnboardingModal] = useState(false);
  const [pendingAction, setPendingAction] = useState<(() => void) | null>(null);

  const guardAction = useCallback((action: () => void) => {
    if (user?.isNewUser) {
      // 온보딩이 필요한 경우 액션을 저장하고 모달 표시
      setPendingAction(() => action);
      setShowOnboardingModal(true);
    } else {
      // 온보딩이 완료된 경우 바로 액션 실행
      action();
    }
  }, [user?.isNewUser]);

  const closeOnboardingModal = useCallback(() => {
    setShowOnboardingModal(false);
    setPendingAction(null);
  }, []);

  const handleOnboardingComplete = useCallback(() => {
    setShowOnboardingModal(false);
    // 온보딩 완료 후 저장된 액션 실행
    if (pendingAction) {
      pendingAction();
      setPendingAction(null);
    }
  }, [pendingAction]);

  return {
    showOnboardingModal,
    closeOnboardingModal,
    guardAction,
    handleOnboardingComplete,
  };
}
