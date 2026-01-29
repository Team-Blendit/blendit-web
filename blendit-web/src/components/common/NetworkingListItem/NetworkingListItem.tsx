'use client';

import React from 'react';
import { Badge } from '@/components/common/Badge';
import { PostMetaSection } from '@/components/common/PostMetaSection';
import { Button } from '@/components/common/Button';

interface NetworkingListItemProps {
  title: string;
  status?: string;
  statusColor?: 'green' | 'gray' | 'red';
  job: string;
  keywords: string[];
  location: string;
  memberCount: number;
  date: string;
  chatLink: string;
  hasNewNotification?: boolean;
  isBookmarked?: boolean;
  buttonText?: string;
  buttonDisabled?: boolean;
  onMoreClick?: () => void;
  onButtonClick?: () => void;
}

export const NetworkingListItem: React.FC<NetworkingListItemProps> = ({
  title,
  status,
  statusColor = 'gray',
  job,
  keywords,
  location,
  memberCount,
  date,
  chatLink,
  hasNewNotification = false,
  isBookmarked = false,
  buttonText,
  buttonDisabled = false,
  onMoreClick,
  onButtonClick,
}) => {
  return (
    <div className="bg-white border-b border-[var(--border-default)] p-[30px] relative">
      <div className="flex flex-col items-start self-stretch gap-[20px]">
        {/* Top Section */}
        <div className="flex items-center justify-between self-stretch">
          <div className="flex gap-[12px] items-center">
            <div className='flex gap-[1px] items-start relative'>
              <h3 className="text-[20px] font-medium leading-[26px] text-[var(--text-primary)]">
                {title}
              </h3>
              {/* New Notification Dot */}
              {hasNewNotification && (
                <div className="w-[6px] h-[6px] bg-[#ef4444] rounded-full" />
              )}
            </div>
            
            {/* Status Badge or Bookmark Icon */}
            {isBookmarked ? (
              <div className="w-[32px] h-[32px] relative">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7.99996 4.67749C7.99996 4.30257 8.30257 3.99996 8.67749 3.99996H23.3225C23.6974 3.99996 24 4.30257 24 4.67749V26.6668C24 27.2087 23.3893 27.5075 22.9752 27.1603L15.5809 21.1155C15.5599 21.0984 15.5335 21.089 15.5063 21.089C15.4791 21.089 15.4527 21.0984 15.4317 21.1155L8.02479 27.1707C7.61069 27.5179 7 27.2191 7 26.6772V4.67749C7 4.30257 7.30261 3.99996 7.67753 3.99996H7.99996Z" fill="#999999" stroke="#999999" strokeWidth="1.5"/>
                </svg>
              </div>
            ) : status ? (
              <Badge color={statusColor} style='solid' text={status} className='min-w-[66px]'/>
            ) : null}
          </div>
          
          <button onClick={onMoreClick} className="flex gap-[12px] items-center">
            <span className="text-[18px] font-medium leading-[24px] text-[var(--text-tertiary)]">
              자세히 보기
            </span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.031 12.5306L9.53104 20.0306C9.46136 20.1002 9.37863 20.1555 9.28759 20.1932C9.19654 20.2309 9.09896 20.2503 9.00042 20.2503C8.90187 20.2503 8.80429 20.2309 8.71324 20.1932C8.6222 20.1555 8.53947 20.1002 8.46979 20.0306C8.40011 19.9609 8.34483 19.8781 8.30712 19.7871C8.26941 19.6961 8.25 19.5985 8.25 19.4999C8.25 19.4014 8.26941 19.3038 8.30712 19.2128C8.34483 19.1217 8.40011 19.039 8.46979 18.9693L15.4401 11.9999L8.46979 5.03055C8.32906 4.88982 8.25 4.69895 8.25 4.49993C8.25 4.30091 8.32906 4.11003 8.46979 3.9693C8.61052 3.82857 8.80139 3.74951 9.00042 3.74951C9.19944 3.74951 9.39031 3.82857 9.53104 3.9693L17.031 11.4693C17.1008 11.539 17.1561 11.6217 17.1938 11.7127C17.2316 11.8038 17.251 11.9014 17.251 11.9999C17.251 12.0985 17.2316 12.1961 17.1938 12.2871C17.1561 12.3782 17.1008 12.4609 17.031 12.5306Z" fill="#999999"/>
            </svg>
          </button>
        </div>

        {/* Bottom Section */}
        <div className="flex items-end justify-between gap-[20px] self-stretch">
          <PostMetaSection
            job={job}
            keywords={keywords}
            location={location}
            memberCount={memberCount}
            date={date}
            chatLink={chatLink}
          />

          <div className="flex flex-col items-end justify-end gap-[8px] flex-1">
            {/* Button */}
            {buttonText && (
              <Button 
                onClick={onButtonClick}
                variant='secondary'
                size='sm'
                disabled={buttonDisabled}
                className='w-[140px]'
              >
                {buttonText}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
