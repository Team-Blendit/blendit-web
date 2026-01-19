import React from 'react';
import { cn } from '@/lib/utils';

export interface StepIndicatorProps {
  currentStep: 1 | 2 | 3 | 4;
  totalSteps?: 4;
  className?: string;
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({
  currentStep,
  totalSteps = 4,
  className,
}) => {
  return (
    <div className={cn('flex items-center gap-[20px]', className)}>
      {Array.from({ length: totalSteps }, (_, index) => {
        const step = index + 1;
        const isActive = step === currentStep;

        return (
          <div
            key={step}
            className={cn(
              'flex items-center justify-center rounded-full transition-all',
              isActive
                ? 'w-[44px] h-[44px] bg-[#53A6FF]'
                : 'w-[24px] h-[24px] bg-[#DBDBDB]'
            )}
          >
            {isActive && (
              <span className="text-white font-medium text-lg leading-6">
                {step}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
};
