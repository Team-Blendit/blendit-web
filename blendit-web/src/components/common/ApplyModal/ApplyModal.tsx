'use client';

import { useState } from 'react';
import { Button } from '@/components/common/Button';
import { PostMetaSection } from '@/components/common/PostMetaSection';

// Close Icon
const CloseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M19.281 18.2193C19.3507 18.289 19.406 18.3717 19.4437 18.4628C19.4814 18.5538 19.5008 18.6514 19.5008 18.7499C19.5008 18.8485 19.4814 18.9461 19.4437 19.0371C19.406 19.1281 19.3507 19.2109 19.281 19.2806C19.2114 19.3502 19.1286 19.4055 19.0376 19.4432C18.9465 19.4809 18.849 19.5003 18.7504 19.5003C18.6519 19.5003 18.5543 19.4809 18.4632 19.4432C18.3722 19.4055 18.2895 19.3502 18.2198 19.2806L12.0004 13.0602L5.78104 19.2806C5.64031 19.4213 5.44944 19.5003 5.25042 19.5003C5.05139 19.5003 4.86052 19.4213 4.71979 19.2806C4.57906 19.1398 4.5 18.949 4.5 18.7499C4.5 18.5509 4.57906 18.36 4.71979 18.2193L10.9401 11.9999L4.71979 5.78055C4.57906 5.63982 4.5 5.44895 4.5 5.24993C4.5 5.05091 4.57906 4.86003 4.71979 4.7193C4.86052 4.57857 5.05139 4.49951 5.25042 4.49951C5.44944 4.49951 5.64031 4.57857 5.78104 4.7193L12.0004 10.9396L18.2198 4.7193C18.3605 4.57857 18.5514 4.49951 18.7504 4.49951C18.9494 4.49951 19.1403 4.57857 19.281 4.7193C19.4218 4.86003 19.5008 5.05091 19.5008 5.24993C19.5008 5.44895 19.4218 5.63982 19.281 5.78055L13.0607 11.9999L19.281 18.2193Z" fill="#121212"/>
  </svg>
);

interface ApplyModalProps {
  isOpen: boolean;
  onClose: () => void;
  postData: {
    jobCategory: string;
    region: string;
    schedule: string;
    keywords: string[];
    currentMembers: number;
    maxMembers: number;
    openChatLink: string;
  };
  onSubmit: (message: string) => void;
}

export default function ApplyModal({ isOpen, onClose, postData, onSubmit }: ApplyModalProps) {
  const [message, setMessage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (message.trim()) {
      onSubmit(message);
      setMessage('');
      onClose();
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(30,30,30,0.3)]"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-[40px] w-[742px] h-[600px] p-[36px] flex flex-col justify-between items-center">
        {/* Header */}
        <div className="flex items-center justify-between w-full">
          <h2 className="font-bold text-[28px] leading-[34px] text-[var(--text-primary)]">
            블렌딩 신청하기
          </h2>
          <button onClick={onClose} className="p-[8px]">
            <CloseIcon />
          </button>
        </div>

        {/* Body */}
        <div className="flex flex-col items-start w-full gap-[24px] overflow-y-auto">
          {/* 게시글 정보 */}
          <div className="flex flex-col gap-[12px]">
            <div className="px-[20px]">
              <p className="font-medium text-[22px] leading-[28px] text-[var(--text-tertiary)]">
                게시글 정보
              </p>
            </div>
            <div className="bg-[var(--bg-section)] rounded-[20px] p-[20px]">
              <PostMetaSection 
                job={postData.jobCategory}
                location={postData.region}
                date={postData.schedule}
                keywords={postData.keywords}
                memberCount={postData.currentMembers}
                chatLink={postData.openChatLink}
              />
              
            </div>
          </div>

          {/* 신청 메시지 */}
          <div className="flex flex-col gap-[12px] w-full">
            <div className="px-[20px]">
              <div className='flex items-end gap-[8px]'>
                <p className="font-medium text-[22px] leading-[28px] text-[var(--text-tertiary)]">
                  신청 메세지
                </p>
                {message.length > 300 && (
                  <p className="text-[16px] leading-[22px] text-[var(--text-error)]">
                    300자 이내로 작성해주세요
                  </p>
                )}
              </div>
            </div>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="간단한 자기소개나 신청하는 이유를 작성해주세요."
              className="w-full h-[131px] bg-white border border-[var(--border-default)] rounded-[18px] p-[20px] text-[18px] leading-[24px] text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] resize-none focus:outline-none focus:border-[var(--border-focus)]"
            />
          </div>
        </div>

        {/* Footer Button */}
        <Button 
          variant="primary"
          size="lg"
          onClick={handleSubmit}
          disabled={!message.trim() || message.length > 300}
          className="w-full"
        >
          신청하기
        </Button>
      </div>
    </div>
  );
}
