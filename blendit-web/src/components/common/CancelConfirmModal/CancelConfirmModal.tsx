'use client';

import { Button } from '@/components/common/Button';
import React from 'react';

interface CancelConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
}

export default function CancelConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title = '블랜딩을 취소하시겠습니까?',
}: CancelConfirmModalProps) {
  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
      }}
      onClick={handleBackdropClick}
    >
      <div className='flex flex-col bg-(--bg-canvas) rounded-[20px] p-[36px] w-[543px] h-[215px] justify-between items-center'>
        {/* Header */}
        <h2
          className='text-[28px] font-bold leading-[34px] text-var(--text-primary)'>
          {title}
        </h2>

        {/* Buttons */}
        <div className='flex justify-center items-start gap-[20px] self-stretch'>
          <Button
            onClick={onConfirm}
            size="md"
            variant='secondary'
            className='flex-1'>
            네
          </Button>
          <Button
            onClick={onClose}
            size="md"
            variant='primary'
            className='flex-1'>
            아니오
          </Button>
        </div>
      </div>
    </div>
  );
}
