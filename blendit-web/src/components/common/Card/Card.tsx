'use client';

import React from 'react';
import { Badge } from '@/components/common/Badge';
import { Button } from '@/components/common/Button';
import { UserProfile } from '@/components/common/UserProfile';
import { BlendingScoreBadge } from '@/components/common/BlendingScoreBadge';
import { cn } from '@/lib/utils';

// Bookmark Icon (unfilled)
const BookmarkIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8.06348 26.1931V5.27383C8.06348 4.94246 8.33211 4.67383 8.66348 4.67383H23.3362C23.6676 4.67383 23.9362 4.94246 23.9362 5.27383V26.183C23.9362 26.6666 23.3934 26.9515 22.9954 26.6768L16.4002 22.1249C16.1964 21.9842 15.927 21.9832 15.7222 22.1224L9.00068 26.6894C8.60232 26.9601 8.06348 26.6747 8.06348 26.1931Z" stroke="#999999" strokeWidth="1.5"/>
  </svg>
);

// Map Pin Icon
const MapPinIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 5.15625C9.41284 5.15625 8.83886 5.33036 8.35065 5.65657C7.86244 5.98278 7.48193 6.44644 7.25723 6.98891C7.03254 7.53138 6.97374 8.12829 7.08829 8.70417C7.20284 9.28006 7.48559 9.80904 7.90078 10.2242C8.31596 10.6394 8.84494 10.9222 9.42083 11.0367C9.99671 11.1513 10.5936 11.0925 11.1361 10.8678C11.6786 10.6431 12.1422 10.2626 12.4684 9.77435C12.7946 9.28614 12.9688 8.71216 12.9688 8.125C12.9688 7.33764 12.656 6.58253 12.0992 6.02578C11.5425 5.46903 10.7874 5.15625 10 5.15625ZM10 10.1562C9.59826 10.1562 9.20554 10.0371 8.8715 9.81392C8.53746 9.59073 8.27711 9.27349 8.12337 8.90233C7.96963 8.53116 7.9294 8.12275 8.00778 7.72872C8.08616 7.3347 8.27961 6.97276 8.56369 6.68869C8.84776 6.40461 9.2097 6.21116 9.60372 6.13278C9.99775 6.0544 10.4062 6.09463 10.7773 6.24837C11.1485 6.40211 11.4657 6.66246 11.6889 6.9965C11.9121 7.33054 12.0312 7.72326 12.0312 8.125C12.0312 8.66372 11.8172 9.18038 11.4363 9.56131C11.0554 9.94224 10.5387 10.1562 10 10.1562ZM10 1.40625C8.21871 1.40832 6.51097 2.11685 5.25141 3.37641C3.99185 4.63597 3.28332 6.34371 3.28125 8.125C3.28125 10.5398 4.40156 13.1047 6.52109 15.5422C7.47774 16.6478 8.55442 17.6435 9.73125 18.5109C9.81003 18.5661 9.90385 18.5956 10 18.5956C10.0961 18.5956 10.19 18.5661 10.2688 18.5109C11.4456 17.6435 12.5223 16.6478 13.4789 15.5422C15.5984 13.1047 16.7188 10.5422 16.7188 8.125C16.7167 6.34371 16.0082 4.63597 14.7486 3.37641C13.489 2.11685 11.7813 1.40832 10 1.40625ZM10 17.5398C8.82812 16.6352 4.21875 12.7828 4.21875 8.125C4.21875 6.59172 4.82784 5.12123 5.91204 4.03704C6.99623 2.95284 8.46672 2.34375 10 2.34375C11.5333 2.34375 13.0038 2.95284 14.088 4.03704C15.1722 5.12123 15.7812 6.59172 15.7812 8.125C15.7812 12.7828 11.1719 16.6352 10 17.5398Z" fill="#999999"/>
  </svg>
);

// ChartBar Icon (직군)
const ChartBarIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M3 3.75C3.41421 3.75 3.75 4.08579 3.75 4.5V18C3.75 18.1989 3.82902 18.3897 3.96967 18.5303C4.11032 18.671 4.30109 18.75 4.5 18.75H20.25C20.6642 18.75 21 19.0858 21 19.5C21 19.9142 20.6642 20.25 20.25 20.25H4.5C3.90326 20.25 3.33097 20.0129 2.90901 19.591C2.48705 19.169 2.25 18.5967 2.25 18V4.5C2.25 4.08579 2.58579 3.75 3 3.75ZM7.5 11.25C7.91421 11.25 8.25 11.5858 8.25 12V15.75C8.25 16.1642 7.91421 16.5 7.5 16.5C7.08579 16.5 6.75 16.1642 6.75 15.75V12C6.75 11.5858 7.08579 11.25 7.5 11.25ZM12 7.5C12.4142 7.5 12.75 7.83579 12.75 8.25V15.75C12.75 16.1642 12.4142 16.5 12 16.5C11.5858 16.5 11.25 16.1642 11.25 15.75V8.25C11.25 7.83579 11.5858 7.5 12 7.5ZM17.25 10.5C17.25 10.0858 16.9142 9.75 16.5 9.75C16.0858 9.75 15.75 10.0858 15.75 10.5V15.75C15.75 16.1642 16.0858 16.5 16.5 16.5C16.9142 16.5 17.25 16.1642 17.25 15.75V10.5Z" fill="#666666"/>
  </svg>
);

// Building Icon (회사)
const BuildingIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M3.75 3C3.75 2.58579 4.08579 2.25 4.5 2.25H12C12.4142 2.25 12.75 2.58579 12.75 3V5.25H19.5C19.9142 5.25 20.25 5.58579 20.25 6V21C20.25 21.4142 19.9142 21.75 19.5 21.75H4.5C4.08579 21.75 3.75 21.4142 3.75 21V3ZM5.25 3.75V20.25H11.25V3.75H5.25ZM12.75 20.25V6.75H18.75V20.25H12.75ZM7.5 6C7.08579 6 6.75 6.33579 6.75 6.75C6.75 7.16421 7.08579 7.5 7.5 7.5H9C9.41421 7.5 9.75 7.16421 9.75 6.75C9.75 6.33579 9.41421 6 9 6H7.5ZM6.75 10.5C6.75 10.0858 7.08579 9.75 7.5 9.75H9C9.41421 9.75 9.75 10.0858 9.75 10.5C9.75 10.9142 9.41421 11.25 9 11.25H7.5C7.08579 11.25 6.75 10.9142 6.75 10.5ZM7.5 13.5C7.08579 13.5 6.75 13.8358 6.75 14.25C6.75 14.6642 7.08579 15 7.5 15H9C9.41421 15 9.75 14.6642 9.75 14.25C9.75 13.8358 9.41421 13.5 9 13.5H7.5ZM14.25 9.75C14.25 9.33579 14.5858 9 15 9H16.5C16.9142 9 17.25 9.33579 17.25 9.75C17.25 10.1642 16.9142 10.5 16.5 10.5H15C14.5858 10.5 14.25 10.1642 14.25 9.75ZM15 13.5C14.5858 13.5 14.25 13.8358 14.25 14.25C14.25 14.6642 14.5858 15 15 15H16.5C16.9142 15 17.25 14.6642 17.25 14.25C17.25 13.8358 16.9142 13.5 16.5 13.5H15Z" fill="#666666"/>
  </svg>
);

// PencilSimple Icon (편집)
const PencilSimpleIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4.5 19.5L8.25 19.5L19.125 8.625C19.6223 8.12772 19.9018 7.4568 19.9018 6.75746C19.9018 6.05813 19.6223 5.38721 19.125 4.88993C18.6277 4.39265 17.9568 4.11321 17.2575 4.11321C16.5581 4.11321 15.8872 4.39265 15.3899 4.88993L4.5 15.75L4.5 19.5Z" stroke="#999999" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M13.875 6.375L17.625 10.125" stroke="#999999" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export interface CardProps {
  variant: 'postInfo' | 'profile' | 'myProfile' | 'main' | 'user';
  
  // Common props
  userName?: string;
  userJob?: string;
  userCareer?: string;
  userLocation?: string;
  userCompany?: string;
  blendingScore?: string;
  keywords?: string[];
  skills?: string[];
  
  // PostInfoCard specific
  postDate?: string;
  meetDate?: string;
  meetLocation?: string;
  currentNum?: number;
  totalNum?: number;
  openChatLink?: string;
  
  // MainCard & UserCard specific
  title?: string;
  isRecruiting?: boolean;
  
  // UserCard specific
  showButton?: boolean;
  
  className?: string;
  onButtonClick?: () => void;
  onBookmarkClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  variant,
  userName = '김개발',
  userJob = '백엔드',
  userCareer = '3년차',
  userLocation = '서울 강남구',
  userCompany = '토스',
  blendingScore = '00.0',
  keywords = ['Badge', 'Badge', 'Badge'],
  skills = ['Badge', 'Badge', 'Badge', 'Badge'],
  postDate = '0000.00.00',
  meetDate = '0000. 00. 00',
  meetLocation = '서울 강남구',
  currentNum = 0,
  totalNum = 5,
  openChatLink = 'http://',
  title = 'Text',
  isRecruiting = true,
  showButton = true,
  className,
  onButtonClick,
  onBookmarkClick,
}) => {
  const isMainCard = variant === 'main';
  const isMyProfileCard = variant === 'myProfile';
  const isPostInfoCard = variant === 'postInfo';
  const isProfileCard = variant === 'profile';
  const isUserCard = variant === 'user';

  // Base classes
  const baseClasses = 'border border-[var(--border-default)] flex flex-col items-start overflow-hidden';
  const profileClasses = 'bg-[var(--bg-canvas)] gap-[24px] p-[30px] rounded-[20px] w-[440px]';
  const mainCardClasses = 'bg-[var(--bg-canvas)] gap-[16px] p-[24px] rounded-[20px] w-[342px]';
  const userCardClasses = 'bg-white gap-[16px] p-[24px] rounded-[12px] w-[342px]';

  return (
    <div
      className={cn(
        baseClasses,
        (isProfileCard || isMyProfileCard || isPostInfoCard) && profileClasses,
        isMainCard && mainCardClasses,
        isUserCard && userCardClasses,
        className
      )}
    >
      {/* ProfileCard & MyProfileCard: Header with large profile */}
      {(isProfileCard || isMyProfileCard) && (
        <>
          <div className="flex gap-[28px] items-center w-full">
            <UserProfile size="large" />
            <div className="flex-1 flex flex-col gap-[16px]">
              {/* Name and Score */}
              <div className={cn(
                "flex items-center w-full",
                isProfileCard ? "justify-between" : "gap-[16px]"
              )}>
                <div className="flex gap-[12px] items-center">
                  <h3 className="text-[22px] font-semibold text-[var(--text-primary)]">
                    {userName}
                  </h3>
                  <BlendingScoreBadge value={blendingScore} />
                </div>
                {isProfileCard && (
                  <button onClick={onBookmarkClick} className="shrink-0">
                    <BookmarkIcon />
                  </button>
                )}
              </div>

              {/* Meta Info */}
              <div className="flex flex-col gap-[10px] w-full">
                {/* Career */}
                <div className="flex gap-[8px] items-start">
                  <ChartBarIcon />
                  <div className="flex gap-[8px] items-start text-[18px] leading-[24px] text-[var(--text-secondary)]">
                    <span>{userJob}</span>
                    <span>·</span>
                    <span>{userCareer}</span>
                  </div>
                </div>

                {/* Company */}
                <div className="flex gap-[12px] items-center w-full">
                  <BuildingIcon />
                  <p className="flex-1 text-[18px] leading-[24px] text-[var(--text-secondary)]">
                    {userCompany}
                  </p>
                </div>

                {/* Location */}
                <div className="flex gap-[12px] items-center w-full">
                  <MapPinIcon />
                  <p className="flex-1 text-[18px] leading-[24px] text-[var(--text-secondary)]">
                    {userLocation}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Keywords and Skills */}
          <div className="flex flex-col gap-[20px] w-full">
            {/* Keywords */}
            <div className="flex flex-col gap-[12px] w-full">
              <p className="text-[18px] font-medium leading-[24px] text-[var(--text-primary)]">
                키워드
              </p>
              <div className="flex gap-[12px] items-center flex-wrap">
                {keywords.map((keyword, index) => (
                  <Badge key={index} color="blue" style="solid" text={keyword} />
                ))}
              </div>
            </div>

            {/* Skills */}
            <div className="flex flex-col gap-[10px] w-full">
              <p className="text-[18px] font-medium leading-[24px] text-[var(--text-primary)]">
                스킬
              </p>
              {skills && skills.length > 0 ? (
                <div className="flex gap-[12px] items-center flex-wrap">
                  {skills.map((skill, index) => (
                    <Badge key={index} color="blue" style="solid" text={skill} />
                  ))}
                </div>
              ) : (
                <p className="text-[18px] leading-[24px] text-[var(--text-disabled)] text-center">
                  아직 등록된 스킬이 없어요
                </p>
              )}
            </div>
          </div>
        </>
      )}

      {/* ProfileCard: 커피챗 신청하기 button */}
      {isProfileCard && (
        <Button
          variant="primary"
          size="md"
          className="w-full"
          onClick={onButtonClick}
        >
          커피챗 신청하기
        </Button>
      )}

      {/* MyProfileCard: 프로필 편집 button */}
      {isMyProfileCard && (
        <button
          onClick={onButtonClick}
          className="bg-[var(--accent-secondary-default)] flex gap-[10px] h-[48px] items-center justify-center px-[18px] py-[15px] rounded-[8px] w-full"
        >
          <PencilSimpleIcon />
          <span className="text-[18px] font-medium leading-[24px] text-[var(--text-secondary)]">
            프로필 편집
          </span>
        </button>
      )}

      {/* PostInfoCard: Post meta information */}
      {isPostInfoCard && (
        <>
          {/* User & Date */}
          <div className="flex items-center justify-between w-full">
            <div className="flex gap-[12px] h-[34px] items-center">
              <UserProfile size="small" />
              <p className="text-[18px] leading-[24px] text-[var(--text-primary)]">
                {userName}
              </p>
              <div className="bg-[#efefef] h-[18px] w-px" />
              <p className="text-[18px] leading-[24px] text-[var(--text-tertiary)]">
                {postDate}
              </p>
            </div>
          </div>

          {/* Post Meta Sections */}
          <div className="flex flex-col gap-[16px] w-full">
            {/* 직군 */}
            <div className="flex gap-[20px] items-center">
              <p className="text-[18px] leading-[24px] text-[var(--text-tertiary)]">
                직군
              </p>
              <Badge color="blue" style="outline" text={userJob} />
            </div>

            {/* 지역 */}
            <div className="flex gap-[20px] items-center text-[18px] leading-[24px]">
              <p className="text-[var(--text-tertiary)]">지역</p>
              <p className="text-[var(--text-primary)]">{meetLocation}</p>
            </div>

            {/* 일정 */}
            <div className="flex gap-[20px] items-center text-[18px] leading-[24px] w-full">
              <p className="text-[var(--text-tertiary)]">일정</p>
              <p className="text-[var(--text-primary)]">{meetDate}</p>
            </div>

            {/* 키워드 */}
            <div className="flex gap-[20px] items-center">
              <p className="text-[18px] leading-[24px] text-[var(--text-tertiary)]">
                키워드
              </p>
              <div className="flex gap-[8px] items-center flex-wrap">
                {keywords.map((keyword, index) => (
                  <Badge key={index} color="blue" style="solid" text={keyword} />
                ))}
              </div>
            </div>

            {/* 인원수 */}
            <div className="flex gap-[20px] items-start text-[18px] leading-[24px] w-full">
              <p className="text-[var(--text-tertiary)]">인원수</p>
              <div className="flex items-center">
                <span className="text-[var(--text-primary)]">{currentNum}</span>
                <span className="text-[var(--text-primary)]">명</span>
                <span className="text-[var(--text-tertiary)]">/</span>
                <span className="text-[var(--text-tertiary)]">{totalNum}</span>
                <span className="text-[var(--text-tertiary)]">명</span>
              </div>
            </div>

            {/* 오픈채팅 */}
            <div className="flex gap-[20px] items-center w-full">
              <p className="text-[18px] leading-[24px] text-[var(--text-tertiary)]">
                오픈채팅
              </p>
              <p className="text-[18px] leading-[24px] text-[#006fe5]">
                {openChatLink}
              </p>
            </div>
          </div>

          {/* Button */}
          <Button
            variant="primary"
            size="md"
            className="w-full"
            onClick={onButtonClick}
          >
            커피챗 신청하기
          </Button>
        </>
      )}

      {/* MainCard: Compact card with profile */}
      {isMainCard && (
        <>
          {/* Top Section */}
          <div className="flex flex-col gap-[8px] w-full">
            {/* Badges and Bookmark */}
            <div className="flex items-center justify-between w-full">
              <div className="flex gap-[8px] items-center">
                {isRecruiting && (
                  <Badge color="red" style="solid" text="모집중" />
                )}
                <Badge
                  color="gray"
                  style="recruit"
                  currentNum={currentNum}
                  totalNum={totalNum}
                />
              </div>
              <button onClick={onBookmarkClick} className="shrink-0">
                <BookmarkIcon />
              </button>
            </div>

            {/* Title */}
            <p className="text-[22px] leading-[28px] text-[#121212] truncate w-full">
              {title}
            </p>
          </div>

          {/* Bottom Section */}
          <div className="flex flex-col gap-[16px] w-full">
            {/* User Info */}
            <div className="flex gap-[16px] items-center w-full">
              <UserProfile size="medium" />
              <div className="flex-1 flex flex-col gap-[6px]">
                {/* Name and Job */}
                <div className="flex gap-[8px] items-center w-full">
                  <p className="text-[18px] leading-[24px] text-[#121212] truncate max-w-[110px]">
                    {userName}
                  </p>
                  <Badge color="blue" style="outline" text={userJob} />
                </div>

                {/* Career and Location */}
                <div className="flex flex-col gap-[4px] w-full">
                  <p className="text-[18px] leading-[24px] text-[#999]">
                    {userCareer}
                  </p>
                  <div className="flex gap-[2px] items-center w-full">
                    <MapPinIcon />
                    <p className="text-[18px] leading-[24px] text-[#999]">
                      {userLocation}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Keywords */}
            <div className="flex gap-[8px] items-start flex-wrap">
              {keywords.slice(0, 3).map((keyword, index) => (
                <Badge key={index} color="blue" style="solid" text={keyword} />
              ))}
            </div>
          </div>

          {/* Button */}
          <Button
            variant="primary"
            size="md"
            className="w-full"
            onClick={onButtonClick}
          >
            신청하기
          </Button>
        </>
      )}

      {/* UserCard: User info card */}
      {isUserCard && (
        <>
          {/* User Section */}
          <div className="flex flex-col gap-[16px] w-full">
            {/* Header */}
            <div className="flex items-center justify-between w-full">
              <div className="flex gap-[12px] items-center">
                <h3 className="text-[22px] font-semibold leading-[28px] text-[#121212]">
                  {userName}
                </h3>
                <BlendingScoreBadge value={blendingScore} />
              </div>
              <button onClick={onBookmarkClick} className="shrink-0">
                <BookmarkIcon />
              </button>
            </div>

            {/* Body */}
            <div className="flex gap-[16px] items-center w-full">
              <UserProfile size="medium" />
              <div className="flex-1 flex flex-col justify-center">
                <div className="flex flex-col gap-[6px] w-full">
                  {/* Job Badge */}
                  <Badge color="blue" style="outline" text={userJob} />

                  {/* User Info */}
                  <div className="flex flex-col gap-[2px] justify-center w-full">
                    <p className="text-[18px] leading-[1.5] text-[var(--text-tertiary)]">
                      {userCareer}
                    </p>
                    <div className="flex gap-[6px] items-center w-full">
                      <MapPinIcon />
                      <p className="text-[18px] leading-[1.5] text-[var(--text-tertiary)]">
                        {userLocation}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Badge Group */}
            <div className="flex gap-[8px] items-center flex-wrap">
              {keywords.map((keyword, index) => (
                <Badge key={index} color="blue" style="solid" text={keyword} />
              ))}
            </div>
          </div>

          {/* Button */}
          {showButton && (
            <Button
              variant="primary"
              size="md"
              className="w-full"
              onClick={onButtonClick}
            >
              네트워킹 신청하기
            </Button>
          )}
        </>
      )}
    </div>
  );
};
