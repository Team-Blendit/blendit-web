'use client';

import React, { useState } from 'react';
import { Badge } from '@/components/common/Badge';
import { Button } from '@/components/common/Button';
import { UserProfile } from '@/components/layout/UserProfile';
import { BlendingStatusModal } from '@/components/common/BlendingStatusModal';
import { BlendingStatus } from '@/lib/types/blending';
import { cn } from '@/lib/utils';

// Bookmark Icon (unfilled)
const BookmarkIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8.0625 26.1931V5.27383C8.0625 4.94246 8.33113 4.67383 8.6625 4.67383H23.3352C23.6666 4.67383 23.9352 4.94246 23.9352 5.27383V26.183C23.9352 26.6666 23.3924 26.9515 22.9944 26.6768L16.3992 22.1249C16.1954 21.9842 15.9261 21.9832 15.7212 22.1224L8.9997 26.6894C8.60134 26.9601 8.0625 26.6747 8.0625 26.1931Z" stroke="#999999" strokeWidth="1.5"/>
  </svg>
);

// Bookmark Icon (filled)
const BookmarkFilledIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8.0625 26.1931V5.27383C8.0625 4.94246 8.33113 4.67383 8.6625 4.67383H23.3352C23.6666 4.67383 23.9352 4.94246 23.9352 5.27383V26.183C23.9352 26.6666 23.3924 26.9515 22.9944 26.6768L16.3992 22.1249C16.1954 21.9842 15.9261 21.9832 15.7212 22.1224L8.9997 26.6894C8.60134 26.9601 8.0625 26.6747 8.0625 26.1931Z" fill="#999999" stroke="#999999" strokeWidth="1.5"/>
  </svg>
);

// Map Pin Icon
const MapPinIcon: React.FC<{ className?: string; size?: number }> = ({ className, size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M12 6C11.2583 6 10.5333 6.21993 9.91661 6.63199C9.29993 7.04404 8.81928 7.62971 8.53545 8.31494C8.25162 9.00016 8.17736 9.75416 8.32205 10.4816C8.46675 11.209 8.8239 11.8772 9.34835 12.4017C9.8728 12.9261 10.541 13.2833 11.2684 13.4279C11.9958 13.5726 12.7498 13.4984 13.4351 13.2145C14.1203 12.9307 14.706 12.4501 15.118 11.8334C15.5301 11.2167 15.75 10.4917 15.75 9.75C15.75 8.75544 15.3549 7.80161 14.6517 7.09835C13.9484 6.39509 12.9946 6 12 6ZM12 12C11.555 12 11.12 11.868 10.75 11.6208C10.38 11.3736 10.0916 11.0222 9.92127 10.611C9.75097 10.1999 9.70642 9.7475 9.79323 9.31105C9.88005 8.87459 10.0943 8.47368 10.409 8.15901C10.7237 7.84434 11.1246 7.63005 11.561 7.54323C11.9975 7.45642 12.4499 7.50097 12.861 7.67127C13.2722 7.84157 13.6236 8.12996 13.8708 8.49997C14.118 8.86998 14.25 9.30499 14.25 9.75C14.25 10.3467 14.0129 10.919 13.591 11.341C13.169 11.7629 12.5967 12 12 12ZM12 1.5C9.81273 1.50248 7.71575 2.37247 6.16911 3.91911C4.62247 5.46575 3.75248 7.56273 3.75 9.75C3.75 12.6938 5.11031 15.8138 7.6875 18.7734C8.84552 20.1108 10.1489 21.3151 11.5734 22.3641C11.6995 22.4524 11.8498 22.4998 12.0037 22.4998C12.1577 22.4998 12.308 22.4524 12.4341 22.3641C13.856 21.3147 15.1568 20.1104 16.3125 18.7734C18.8859 15.8138 20.25 12.6938 20.25 9.75C20.2475 7.56273 19.3775 5.46575 17.8309 3.91911C16.2843 2.37247 14.1873 1.50248 12 1.5ZM12 20.8125C10.4503 19.5938 5.25 15.1172 5.25 9.75C5.25 7.95979 5.96116 6.2429 7.22703 4.97703C8.4929 3.71116 10.2098 3 12 3C13.7902 3 15.5071 3.71116 16.773 4.97703C18.0388 6.2429 18.75 7.95979 18.75 9.75C18.75 15.1153 13.5497 19.5938 12 20.8125Z" fill="currentColor"/>
  </svg>
);

// ChartBar Icon (직군)
const ChartBarIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21 18.75H20.25V3.75C20.25 3.55109 20.171 3.36032 20.0303 3.21967C19.8897 3.07902 19.6989 3 19.5 3H14.25C14.0511 3 13.8603 3.07902 13.7197 3.21967C13.579 3.36032 13.5 3.55109 13.5 3.75V7.5H9C8.80109 7.5 8.61032 7.57902 8.46967 7.71967C8.32902 7.86032 8.25 8.05109 8.25 8.25V12H4.5C4.30109 12 4.11032 12.079 3.96967 12.2197C3.82902 12.3603 3.75 12.5511 3.75 12.75V18.75H3C2.80109 18.75 2.61032 18.829 2.46967 18.9697C2.32902 19.1103 2.25 19.3011 2.25 19.5C2.25 19.6989 2.32902 19.8897 2.46967 20.0303C2.61032 20.171 2.80109 20.25 3 20.25H21C21.1989 20.25 21.3897 20.171 21.5303 20.0303C21.671 19.8897 21.75 19.6989 21.75 19.5C21.75 19.3011 21.671 19.1103 21.5303 18.9697C21.3897 18.829 21.1989 18.75 21 18.75ZM15 4.5H18.75V18.75H15V4.5ZM9.75 9H13.5V18.75H9.75V9ZM5.25 13.5H8.25V18.75H5.25V13.5Z" fill="#666666"/>
  </svg>
);

// Building Icon (회사)
const BuildingIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M21.75 21H19.5V3H20.25C20.4489 3 20.6397 2.92098 20.7803 2.78033C20.921 2.63968 21 2.44891 21 2.25C21 2.05109 20.921 1.86032 20.7803 1.71967C20.6397 1.57902 20.4489 1.5 20.25 1.5H3.75C3.55109 1.5 3.36032 1.57902 3.21967 1.71967C3.07902 1.86032 3 2.05109 3 2.25C3 2.44891 3.07902 2.63968 3.21967 2.78033C3.36032 2.92098 3.55109 3 3.75 3H4.5V21H2.25C2.05109 21 1.86032 21.079 1.71967 21.2197C1.57902 21.3603 1.5 21.5511 1.5 21.75C1.5 21.9489 1.57902 22.1397 1.71967 22.2803C1.86032 22.421 2.05109 22.5 2.25 22.5H21.75C21.9489 22.5 22.1397 22.421 22.2803 22.2803C22.421 22.1397 22.5 21.9489 22.5 21.75C22.5 21.5511 22.421 21.3603 22.2803 21.2197C22.1397 21.079 21.9489 21 21.75 21ZM6 3H18V21H15V17.25C15 17.0511 14.921 16.8603 14.7803 16.7197C14.6397 16.579 14.4489 16.5 14.25 16.5H9.75C9.55109 16.5 9.36032 16.579 9.21967 16.7197C9.07902 16.8603 9 17.0511 9 17.25V21H6V3ZM13.5 21H10.5V18H13.5V21ZM8.25 6C8.25 5.80109 8.32902 5.61032 8.46967 5.46967C8.61032 5.32902 8.80109 5.25 9 5.25H10.5C10.6989 5.25 10.8897 5.32902 11.0303 5.46967C11.171 5.61032 11.25 5.80109 11.25 6C11.25 6.19891 11.171 6.38968 11.0303 6.53033C10.8897 6.67098 10.6989 6.75 10.5 6.75H9C8.80109 6.75 8.61032 6.67098 8.46967 6.53033C8.32902 6.38968 8.25 6.19891 8.25 6ZM12.75 6C12.75 5.80109 12.829 5.61032 12.9697 5.46967C13.1103 5.32902 13.3011 5.25 13.5 5.25H15C15.1989 5.25 15.3897 5.32902 15.5303 5.46967C15.671 5.61032 15.75 5.80109 15.75 6C15.75 6.19891 15.671 6.38968 15.5303 6.53033C15.3897 6.67098 15.1989 6.75 15 6.75H13.5C13.3011 6.75 13.1103 6.67098 12.9697 6.53033C12.829 6.38968 12.75 6.19891 12.75 6ZM8.25 9.75C8.25 9.55109 8.32902 9.36032 8.46967 9.21967C8.61032 9.07902 8.80109 9 9 9H10.5C10.6989 9 10.8897 9.07902 11.0303 9.21967C11.171 9.36032 11.25 9.55109 11.25 9.75C11.25 9.94891 11.171 10.1397 11.0303 10.2803C10.8897 10.421 10.6989 10.5 10.5 10.5H9C8.80109 10.5 8.61032 10.421 8.46967 10.2803C8.32902 10.1397 8.25 9.94891 8.25 9.75ZM12.75 9.75C12.75 9.55109 12.829 9.36032 12.9697 9.21967C13.1103 9.07902 13.3011 9 13.5 9H15C15.1989 9 15.3897 9.07902 15.5303 9.21967C15.671 9.36032 15.75 9.55109 15.75 9.75C15.75 9.94891 15.671 10.1397 15.5303 10.2803C15.3897 10.421 15.1989 10.5 15 10.5H13.5C13.3011 10.5 13.1103 10.421 12.9697 10.2803C12.829 10.1397 12.75 9.94891 12.75 9.75ZM8.25 13.5C8.25 13.3011 8.32902 13.1103 8.46967 12.9697C8.61032 12.829 8.80109 12.75 9 12.75H10.5C10.6989 12.75 10.8897 12.829 11.0303 12.9697C11.171 13.1103 11.25 13.3011 11.25 13.5C11.25 13.6989 11.171 13.8897 11.0303 14.0303C10.8897 14.171 10.6989 14.25 10.5 14.25H9C8.80109 14.25 8.61032 14.171 8.46967 14.0303C8.32902 13.8897 8.25 13.6989 8.25 13.5ZM12.75 13.5C12.75 13.3011 12.829 13.1103 12.9697 12.9697C13.1103 12.829 13.3011 12.75 13.5 12.75H15C15.1989 12.75 15.3897 12.829 15.5303 12.9697C15.671 13.1103 15.75 13.3011 15.75 13.5C15.75 13.6989 15.671 13.8897 15.5303 14.0303C15.3897 14.171 15.1989 14.25 15 14.25H13.5C13.3011 14.25 13.1103 14.171 12.9697 14.0303C12.829 13.8897 12.75 13.6989 12.75 13.5Z" fill="currentColor"/>
  </svg>
);

// PencilSimple Icon (편집)
const PencilSimpleIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21.3103 6.87866L17.1216 2.68897C16.9823 2.54965 16.8169 2.43913 16.6349 2.36373C16.4529 2.28832 16.2578 2.24951 16.0608 2.24951C15.8638 2.24951 15.6687 2.28832 15.4867 2.36373C15.3047 2.43913 15.1393 2.54965 15 2.68897L3.43969 14.2502C3.2998 14.389 3.18889 14.5542 3.11341 14.7362C3.03792 14.9183 2.99938 15.1135 3.00001 15.3105V19.5002C3.00001 19.898 3.15804 20.2796 3.43935 20.5609C3.72065 20.8422 4.10218 21.0002 4.50001 21.0002H8.6897C8.88675 21.0009 9.08197 20.9623 9.26399 20.8868C9.44602 20.8113 9.61122 20.7004 9.75001 20.5605L21.3103 9.00022C21.4496 8.86093 21.5602 8.69556 21.6356 8.51355C21.711 8.33153 21.7498 8.13645 21.7498 7.93944C21.7498 7.74243 21.711 7.54735 21.6356 7.36534C21.5602 7.18333 21.4496 7.01795 21.3103 6.87866ZM18 10.189L13.8103 6.00022L16.0603 3.75022L20.25 7.93897L18 10.189Z" fill="#999999"/>
  </svg>
);

export interface CardProps {
  variant: 'postInfo' | 'userProfile' | 'myProfile' | 'main' | 'user';

  // Common props
  userName?: string;
  userJob?: string;
  userCareer?: string;
  userLocation?: string;
  userCompany?: string;
  keywords?: string[];
  skills?: string[];
  profileImage?: string;
  
  // PostInfoCard specific
  postDate?: string;
  meetDate?: string;
  meetLocation?: string;
  currentNum?: number;
  totalNum?: number;
  openChatLink?: string;
  isManagement?: boolean;
  
  // MainCard & UserCard specific
  title?: string;
  isRecruiting?: boolean;
  
  // UserCard specific
  showButton?: boolean;
  isBookmarked?: boolean;
  hideBookmark?: boolean;

  // Button props
  buttonText?: string;
  buttonIcon?: React.ReactNode;
  buttonDisabled?: boolean;

  // Status props
  blendingStatus?: BlendingStatus;
  onStatusChange?: (status: BlendingStatus) => void;

  className?: string;
  onClick?: () => void;
  onButtonClick?: () => void;
  onBookmarkClick?: (e?: React.MouseEvent) => void;
  onApproveClick?: () => void;
  onRejectClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  variant,
  userName,
  userJob,
  userCareer,
  userLocation,
  userCompany,
  keywords = [],
  skills = [],
  profileImage,
  postDate,
  meetDate,
  meetLocation,
  currentNum,
  totalNum,
  openChatLink,
  title,
  isRecruiting,
  isManagement = false,
  showButton = true,
  isBookmarked = false,
  hideBookmark = false,
  buttonText,
  buttonIcon,
  buttonDisabled,
  blendingStatus = 'RECRUITING',
  onStatusChange,
  className,
  onClick,
  onButtonClick,
  onBookmarkClick,
  onApproveClick,
  onRejectClick,
}) => {
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  
  const isMainCard = variant === 'main';
  const isMyProfileCard = variant === 'myProfile';
  const isPostInfoCard = variant === 'postInfo';
  const isUserProfileCard = variant === 'userProfile';
  const isUserCard = variant === 'user';

  // Base classes
  const baseClasses = 'border border-[var(--border-default)] flex flex-col items-start overflow-hidden transition-all duration-300';
  const profileClasses = 'bg-[var(--bg-canvas)] gap-[24px] p-[30px] rounded-[20px] w-[440px]';
  const mainCardClasses = 'bg-[var(--bg-canvas)] gap-[16px] p-[24px] rounded-[20px] w-[342px] cursor-pointer';
  const userCardClasses = 'bg-white gap-[16px] p-[24px] rounded-[12px] w-[342px] shrink-0 cursor-pointer';

  return (
    <div
      onClick={onClick}
      className={cn(
        baseClasses,
        (isUserProfileCard || isMyProfileCard || isPostInfoCard) && profileClasses,
        isMainCard && mainCardClasses,
        isUserCard && userCardClasses,
        className
      )}
    >
      {/* UserProfileCard & MyProfileCard: Header with large profile */}
      {(isUserProfileCard || isMyProfileCard) && (
        <>
          <div className="flex gap-[28px] items-center self-stretch">
            <UserProfile size="large" imageUrl={profileImage} nickname={userName} />
            <div className="flex-1 flex flex-col items-center gap-[16px]">
              {/* Name and Score */}
              <div className={cn(
                "flex items-center self-stretch",
                isUserProfileCard ? "justify-between" : "gap-[16px]"
              )}>
                <div className="flex gap-[12px] items-center">
                  <h3 className="text-[22px] font-semibold text-[var(--text-primary)]">
                    {userName}
                  </h3>
                </div>
                {isUserProfileCard && !hideBookmark && (
                  <button onClick={onBookmarkClick} className="shrink-0">
                    {isBookmarked ? <BookmarkFilledIcon /> : <BookmarkIcon />}
                  </button>
                )}
              </div>

              {/* Meta Info */}
              <div className="flex flex-col gap-[10px] self-stretch">
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
                <div className="flex gap-[12px] items-center self-stretch">
                  <BuildingIcon className={!userCompany ? "text-[var(--text-tertiary)]" : "text-[#666666]"} />
                  <p className={cn(
                    "flex-1 text-[18px] leading-[24px]",
                    !userCompany ? "text-[var(--text-tertiary)]" : "text-[var(--text-secondary)]"
                  )}>
                    {userCompany || '소속 정보 없음'}
                  </p>
                </div>

                {/* Location */}
                <div className="flex gap-[12px] items-center self-stretch">
                  <MapPinIcon />
                  <p className="flex-1 text-[18px] leading-[24px] text-[var(--text-secondary)]">
                    {userLocation}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Keywords and Skills */}
          <div className="flex flex-col items-start gap-[20px] self-stretch">
            {/* Keywords */}
            <div className="flex flex-col items-start gap-[12px] self-stretch">
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
            <div className="flex flex-col items-start gap-[10px] self-stretch">
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
                <p className="text-[18px] leading-[24px] text-[var(--text-disabled)]">
                  아직 등록된 스킬이 없어요
                </p>
              )}
            </div>
          </div>
        </>
      )}

      {/* MyProfileCard: 프로필 편집 button */}
      {isMyProfileCard && (
        <Button
          onClick={onButtonClick}
          className="w-full"
          variant='secondary'
          size='sm'
        >
          {buttonIcon || <PencilSimpleIcon />}
          <span className="text-[18px] font-medium leading-[24px] text-[var(--text-secondary)]">
            {buttonText || '프로필 편집'}
          </span>
        </Button>
      )}

      {/* PostInfoCard: Post meta information */}
      {isPostInfoCard && (
        <>
          {/* User & Date */}
          <div className="flex items-center justify-between self-stretch">
            <div className="flex h-[34px] gap-[12px] items-center">
              <div className="flex gap-[8px] justify-center items-center">
                <UserProfile size="small" imageUrl={profileImage} nickname={userName} />
                <p className="text-[18px] leading-[24px] text-[var(--text-primary)]">
                  {userName}
                </p>
              </div>
              <div className="bg-[#efefef] h-[18px] w-px" />
              <p className="text-[18px] leading-[24px] text-[var(--text-tertiary)]">
                {postDate}
              </p>
            </div>
          </div>

          {/* Post Meta Sections */}
          <div className="flex flex-col justify-end items-start gap-[16px] self-stretch">
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
              <a href={openChatLink} target="_blank" rel="noopener noreferrer" className="text-[18px] leading-[24px] text-[#006fe5]">
                {openChatLink}
              </a>
            </div>
          </div>

          {/* Button */}
          { isManagement ? (
            <div className='flex items-start gap-[10px] w-full'>
              <Button
                variant="secondary"
                size="sm"
                className='w-[127px] whitespace-nowrap'
                onClick={(e) => {
                  e.stopPropagation();
                  setIsStatusModalOpen(true);
                }}
              >
                상태 변경
              </Button>
              <Button
                variant="primary"
                size="sm"
                className="flex-1"
                onClick={onButtonClick}
                disabled={buttonDisabled}
              >
                {buttonIcon && <span className="flex items-center">{buttonIcon}</span>}
                {buttonText || '블렌딩 신청하기'}
              </Button>
            </div>
          ) : (
            <Button
              variant="primary"
              size="sm"
              className="w-full"
              onClick={onButtonClick}
              disabled={buttonDisabled}
            >
              {buttonIcon && <span className="flex items-center">{buttonIcon}</span>}
              {buttonText || '블렌딩 신청하기'}
            </Button>
          )}
          
        </>
      )}

      {/* MainCard: Compact card with profile */}
      {isMainCard && (
        <>
          {/* Top Section */}
          <div className="flex justify-between items-center self-stretch">
            {/* Left */}
            <div className="flex items-center gap-[8px]">
              {isRecruiting && (
                <Badge color="red" style="outline" text="모집중" />
              )}
              <Badge color="blue" style="outline" text={userJob} /> {/* TODO - 유저 직군이 아니라 모집 주제로 */}
            </div>
            {/* Right */}
            <div className="flex items-center gap-[8px]">
              <Badge
                color="gray"
                style="recruit"
                currentNum={currentNum}
                totalNum={totalNum}
              />
              <button onClick={(e) => { e.stopPropagation(); onBookmarkClick?.(e); }} className="shrink-0">
                {isBookmarked ? <BookmarkFilledIcon /> : <BookmarkIcon />}
              </button>
            </div>
          </div>

          {/* Title */}
          <div className='flex justify-center items-start gap-[8px] self-stretch h-[68px]'>
            <p className="text-[22px] leading-[34px] text-[#121212] line-clamp-2 w-full">
              {title}
            </p>
          </div>

          {/* Bottom Section */}
          <div className="flex flex-col items-start gap-[4px] self-stretch">
            {/* User Info */}
            <div className="flex gap-[8px] items-center">
              <UserProfile size="small" imageUrl={profileImage} nickname={userName} />
              <p className="text-[18px] leading-[24px] text-[var(--text-tertiary)] truncate">
                {userName}
              </p>
            </div>

            {/* Row */}
            <div className="flex gap-[8px] items-start">
              <p className="text-[16px] leading-[24px] text-[var(--text-tertiary)]">
                {userCareer}
              </p>
              <p className='text-[18px] text-[var(--text-tertiary)]'>·</p>
              <div className="flex gap-[2px] items-center">
                <MapPinIcon className="text-[var(--text-tertiary)]" size={16} />
                <p className="text-[16px] leading-[24px] text-[var(--text-tertiary)]">
                  {userLocation}
                </p>
              </div>    
            </div>
          </div>

          {/* BadgeSet */}
          <div className="flex gap-[6px] items-start self-stretch flex-wrap">
            {keywords.slice(0, 3).map((keyword, index) => (
              <Badge key={index} color="blue" style="solid" text={keyword} />
            ))}
          </div>
        </>
      )}

      {/* UserCard: User info card */}
      {isUserCard && (
        <>
          {/* User Section */}
          <div className="flex flex-col gap-[20px] w-full">
            {/* Header */}
            <div className="flex items-center justify-between w-full">
              <div className="flex gap-[12px] items-center">
                <h3 className="text-[22px] font-semibold leading-[28px] text-[#121212]">
                  {userName}
                </h3>
                {/* <BlendingScoreBadge value={blendingScore} /> */}
              </div>
              { !hideBookmark && (
                <button onClick={(e) => {
                  e.stopPropagation();
                  onBookmarkClick?.(e);
                }} className="shrink-0">
                  {isBookmarked ? <BookmarkFilledIcon /> : <BookmarkIcon />}
                </button>
              )}
            </div>

            {/* Body */}
            <div className="flex gap-[16px] items-center">
              <UserProfile size="medium" imageUrl={profileImage} nickname={userName} />
              <div className="flex-1 flex flex-col justify-center items-start gap-[8px]">
                {/* Job Badge */}
                <Badge color="blue" style="outline" text={userJob} />

                {/* User Info */}
                <div className="flex flex-col gap-[2px] justify-center">
                  <p className="text-[18px] leading-[1.5] text-[var(--text-tertiary)]">
                    {userCareer}
                  </p>
                  <div className="flex gap-[6px] items-center">
                    <MapPinIcon />
                    <p className="text-[18px] leading-[1.5] text-[var(--text-tertiary)]">
                      {userLocation}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Badge Group */}
            <div className="flex gap-[8px] items-center">
              {keywords.map((keyword, index) => (
                <Badge key={index} color="blue" style="solid" text={keyword} className='shrink-0' />
              ))}
            </div>
          </div>

          {/* Button */}
          {showButton && (
            <div className="flex items-start gap-[8px] self-stretch">
              <Button
                variant="primary"
                size="sm"
                className="w-full"
                onClick={(e) => {
                  e.stopPropagation();
                  onApproveClick?.();
                }}
              >
                수락
              </Button>
              <Button
                variant="secondary"
                size="sm"
                className="w-full"
                onClick={(e) => {
                  e.stopPropagation();
                  onRejectClick?.();
                }}
              >
                거절
              </Button>
            </div>
          )}
        </>
      )}

      {/* Blending Status Modal */}
      <BlendingStatusModal
        isOpen={isStatusModalOpen}
        onClose={() => setIsStatusModalOpen(false)}
        currentStatus={blendingStatus}
        onStatusChange={(status) => {
          onStatusChange?.(status);
        }}
      />
    </div>
  );
};
