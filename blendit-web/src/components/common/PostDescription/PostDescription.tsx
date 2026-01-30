import React from 'react';
import { cn } from '@/lib/utils';

export interface PostDescriptionProps {
  title?: string;
  content: string;
  className?: string;
  isHtml?: boolean;
}

export const PostDescription: React.FC<PostDescriptionProps> = ({
  title = '소개',
  content,
  className,
  isHtml = false,
}) => {
  return (
    <div className={cn('flex flex-col gap-[12px] items-start max-w-[940px]', className)}>
      <h2 className="font-semibold text-[22px] leading-[28px] text-[var(--text-primary)]">
        {title}
      </h2>
      <div className="bg-[var(--bg-section)] flex items-center justify-center p-[30px] rounded-[18px] w-full">
        {isHtml ? (
          <div
            className="flex-1 font-normal text-[18px] leading-[24px] text-[var(--text-primary)] [&_h1]:text-[32px] [&_h1]:font-bold [&_h1]:leading-[40px] [&_h1]:my-4 [&_h2]:text-[24px] [&_h2]:font-semibold [&_h2]:leading-[32px] [&_h2]:my-3 [&_h3]:text-[20px] [&_h3]:font-semibold [&_h3]:leading-[28px] [&_h3]:my-2 [&_p]:my-2 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:my-2 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:my-2 [&_li]:my-1 [&_strong]:font-bold [&_em]:italic [&_u]:underline [&_a]:text-blue-500 [&_a]:underline"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        ) : (
          <p className="flex-1 font-normal text-[18px] leading-[24px] text-[var(--text-primary)] whitespace-pre-wrap">
            {content}
          </p>
        )}
      </div>
    </div>
  );
};
