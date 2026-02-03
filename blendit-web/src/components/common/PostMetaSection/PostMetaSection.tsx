'use client';

import React from 'react';
import { Badge } from '@/components/common/Badge';

interface PostMetaSectionProps {
  job: string;
  keywords: string[];
  location: string;
  memberCount: number;
  date?: string;
  chatLink?: string;
}

export const PostMetaSection: React.FC<PostMetaSectionProps> = ({
  job,
  keywords,
  location,
  memberCount,
  date,
  chatLink,
}) => {
  return (
    <div className="flex justify-between w-[630px] items-center">
      {/* Left Column */}
      <div className="flex flex-col gap-[12px] items-start">
        {/* Job */}
        <div className="flex gap-[20px] items-center">
          <span className="text-[18px] leading-[24px] text-[var(--text-secondary)]">직군</span>
          <Badge
            color="blue"
            style="outline"
            text={ job }
          />
        </div>
        {/* Location */}
        <div className="flex gap-[20px] items-center text-[18px] leading-[24px]">
          <span className="text-[var(--text-secondary)]">지역</span>
          <span className="text-[var(--text-primary)]">{location}</span>
        </div>
        {/* Date */}
        <div className="flex gap-[20px] items-center text-[18px] leading-[24px]">
          <span className="text-[var(--text-secondary)]">일정</span>
          <span className="text-[var(--text-primary)]">{date || '-'}</span>
        </div>
      </div>

      {/* Right Column */}
      <div className="flex flex-col gap-[12px] items-start w-[339px]">
        {/* Keywords */}
        <div className="flex gap-[36px] items-center">
          <span className="text-[18px] leading-[24px] text-[var(--text-secondary)] whitespace-nowrap">키워드</span>
          <div className="flex gap-[8px] items-center flex-nowrap">
            {keywords.slice(0, 3).map((keyword, index) => (
              <Badge
                key={index}
                color="blue"
                style="solid"
                text={keyword}
              />
            ))}
          </div>
        </div>
        {/* Member */}
        <div className="flex gap-[36px] items-start self-stretch text-[18px] leading-[24px]">
          <span className="text-[var(--text-secondary)]">인원수</span>
          <span className="text-[var(--text-primary)]">{memberCount}명</span>
        </div>
        {/* Link */}
        <div className="flex gap-[20px] items-center self-stretch text-[18px] leading-[24px]">
          <span className="text-[var(--text-secondary)] whitespace-nowrap">오픈채팅</span>
          {chatLink ? (
            <a href={chatLink} className="text-(--color-blue-500)">
              {chatLink}
            </a>
          ) : (
            <span className="text-[var(--text-primary)]">-</span>
          )}
        </div>
      </div>
    </div>
  );
};
