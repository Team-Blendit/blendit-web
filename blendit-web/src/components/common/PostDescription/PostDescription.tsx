import React from 'react';
import { cn } from '@/lib/utils';

export interface PostDescriptionProps {
  title?: string;
  content: string;
  className?: string;
}

export const PostDescription: React.FC<PostDescriptionProps> = ({
  title = '소개',
  content,
  className,
}) => {
  return (
    <div className={cn('flex flex-col gap-[12px] items-start max-w-[940px]', className)}>
      <h2 className="font-semibold text-[22px] leading-[28px] text-[var(--text-primary)]">
        {title}
      </h2>
      <div className="bg-[var(--bg-section)] flex items-center justify-center p-[30px] rounded-[18px] w-full">
        <p className="flex-1 font-normal text-[18px] leading-[24px] text-[var(--text-primary)] whitespace-pre-wrap">
          {content}
        </p>
      </div>
    </div>
  );
};
