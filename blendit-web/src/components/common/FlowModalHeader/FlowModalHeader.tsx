'use client';

import React from 'react';
import { StepIndicator } from '@/components/common/StepIndicator';

interface FlowModalHeaderProps {
  currentStep?: 1 | 2 | 3 | 4;
  showStepIndicator?: boolean;
  showBackButton?: boolean;
  onBack?: () => void;
  onClose?: () => void;
  className?: string;
}

const XIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M19.281 18.2198C19.3507 18.2895 19.406 18.3722 19.4437 18.4632C19.4814 18.5543 19.5008 18.6519 19.5008 18.7504C19.5008 18.849 19.4814 18.9465 19.4437 19.0376C19.406 19.1286 19.3507 19.2114 19.281 19.281C19.2114 19.3507 19.1286 19.406 19.0376 19.4437C18.9465 19.4814 18.849 19.5008 18.7504 19.5008C18.6519 19.5008 18.5543 19.4814 18.4632 19.4437C18.3722 19.406 18.2895 19.3507 18.2198 19.281L12.0004 13.0607L5.78104 19.281C5.64031 19.4218 5.44944 19.5008 5.25042 19.5008C5.05139 19.5008 4.86052 19.4218 4.71979 19.281C4.57906 19.1403 4.5 18.9494 4.5 18.7504C4.5 18.5514 4.57906 18.3605 4.71979 18.2198L10.9401 12.0004L4.71979 5.78104C4.57906 5.64031 4.5 5.44944 4.5 5.25042C4.5 5.05139 4.57906 4.86052 4.71979 4.71979C4.86052 4.57906 5.05139 4.5 5.25042 4.5C5.44944 4.5 5.64031 4.57906 5.78104 4.71979L12.0004 10.9401L18.2198 4.71979C18.3605 4.57906 18.5514 4.5 18.7504 4.5C18.9494 4.5 19.1403 4.57906 19.281 4.71979C19.4218 4.86052 19.5008 5.05139 19.5008 5.25042C19.5008 5.44944 19.4218 5.64031 19.281 5.78104L13.0607 12.0004L19.281 18.2198Z" fill="#121212"/>
  </svg>
);

const CaretLeftIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15.5312 18.9693C15.6009 19.039 15.6562 19.1217 15.6939 19.2128C15.7316 19.3038 15.751 19.4014 15.751 19.4999C15.751 19.5985 15.7316 19.6961 15.6939 19.7871C15.6562 19.8781 15.6009 19.9609 15.5312 20.0306C15.4615 20.1002 15.3788 20.1555 15.2878 20.1932C15.1967 20.2309 15.0991 20.2503 15.0006 20.2503C14.902 20.2503 14.8045 20.2309 14.7134 20.1932C14.6224 20.1555 14.5396 20.1002 14.47 20.0306L6.96996 12.5306C6.90023 12.4609 6.84491 12.3782 6.80717 12.2871C6.76943 12.1961 6.75 12.0985 6.75 11.9999C6.75 11.9014 6.76943 11.8038 6.80717 11.7127C6.84491 11.6217 6.90023 11.539 6.96996 11.4693L14.47 3.9693C14.6107 3.82857 14.8016 3.74951 15.0006 3.74951C15.1996 3.74951 15.3905 3.82857 15.5312 3.9693C15.6719 4.11003 15.751 4.30091 15.751 4.49993C15.751 4.69895 15.6719 4.88982 15.5312 5.03055L8.5609 11.9999L15.5312 18.9693Z" fill="#121212"/>
  </svg>
);

export const FlowModalHeader: React.FC<FlowModalHeaderProps> = ({
  currentStep = 1,
  showStepIndicator = true,
  showBackButton = false,
  onBack,
  onClose,
  className = '',
}) => {
  return (
    <div className={`flex items-center justify-between w-full h-[44px] ${className}`}>
      {/* Left Button */}
      {showBackButton ? (
        <button
          onClick={onBack}
          className="w-[24px] h-[24px] flex items-center justify-center rounded transition-colors"
        >
          <CaretLeftIcon />
        </button>
      ) : (
        <div className="w-[24px] h-[24px]" /> // Spacer
      )}

      {/* Step Indicator */}
      {showStepIndicator && (
        <StepIndicator currentStep={currentStep} />
      )}

      {/* Close Button */}
      {onClose ? (
        <button
          onClick={onClose}
          className="w-[24px] h-[24px] flex items-center justify-center rounded transition-colors"
        >
          <XIcon />
        </button>
      ) : (
        <div className="w-[24px] h-[24px]" /> // Spacer
      )}
    </div>
  );
};
