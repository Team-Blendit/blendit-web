'use client';

import React, { useState } from 'react';
import { Button } from '@/components/common/Button';
import { BlendingStatus } from '@/lib/types/blending';

// Radio Button Icon (checked)
const RadioCheckedIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="0.5" y="0.5" width="19" height="19" rx="9.5" fill="white"/>
  <rect x="0.5" y="0.5" width="19" height="19" rx="9.5" stroke="#BDBDBD"/>
  <circle cx="10" cy="10" r="6.5" fill="#BDBDBD"/>
  </svg>
);

// Radio Button Icon (unchecked)
const RadioUncheckedIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="0.5" y="0.5" width="19" height="19" rx="9.5" fill="white"/>
  <rect x="0.5" y="0.5" width="19" height="19" rx="9.5" stroke="#BDBDBD"/>
  </svg>
);

interface BlendingStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentStatus: BlendingStatus;
  onStatusChange: (status: BlendingStatus) => void;
}

export const BlendingStatusModal: React.FC<BlendingStatusModalProps> = ({
  isOpen,
  onClose,
  currentStatus,
  onStatusChange,
}) => {
  const [selectedStatus, setSelectedStatus] = useState<BlendingStatus>(currentStatus);

  if (!isOpen) return null;

  const handleSubmit = () => {
    onStatusChange(selectedStatus);
    onClose();
  };

  const statusOptions: { value: BlendingStatus; label: string }[] = [
    { value: 'RECRUITING', label: '모집중' },
    { value: 'RECRUITMENT_CLOSED', label: '마감' },
    { value: 'COMPLETED', label: '완료' },
  ];

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className="bg-white border border-[#DBDBDB] rounded-[20px] p-[30px] w-[440px] flex flex-col gap-[24px]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Content */}
        <div className="flex flex-col gap-[20px]">
          <h2 className="text-[22px] font-semibold leading-[28px] text-[var(--text-primary)]">
            블렌딩 상태
          </h2>
          
          {/* Radio Options */}
          {statusOptions.map((option) => (
            <div
              key={option.value}
              className="flex gap-[8px] items-center cursor-pointer"
              onClick={() => setSelectedStatus(option.value)}
            >
              {selectedStatus === option.value ? (
                <RadioCheckedIcon />
              ) : (
                <RadioUncheckedIcon />
              )}
              <p className="text-[18px] leading-[24px] text-[var(--text-primary)]">
                {option.label}
              </p>
            </div>
          ))}
        </div>

        {/* Button */}
        <Button
          variant="secondary"
          size="sm"
          className="w-full"
          onClick={handleSubmit}
        >
          상태 변경하기
        </Button>
      </div>
    </div>
  );
};
