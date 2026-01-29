'use client';

import { useState } from 'react';
import { Badge } from '@/components/common/Badge';
import { Button } from '@/components/common/Button';

// Close Icon
const CloseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18.75 5.25L5.25 18.75M5.25 5.25L18.75 18.75" stroke="#121212" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
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
      <div className="bg-white rounded-[40px] w-[742px] h-[600px] p-[36px] flex flex-col justify-between">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-[28px] leading-[34px] text-[var(--text-primary)]">
            커피챗 신청
          </h2>
          <button onClick={onClose} className="p-[8px]">
            <CloseIcon />
          </button>
        </div>

        {/* Body */}
        <div className="flex flex-col gap-[24px] flex-1 overflow-y-auto">
          {/* 게시글 정보 */}
          <div className="flex flex-col gap-[12px]">
            <div className="px-[20px]">
              <p className="font-medium text-[22px] leading-[28px] text-[var(--text-tertiary)]">
                게시글 정보
              </p>
            </div>
            <div className="bg-[var(--bg-section)] rounded-[20px] p-[20px]">
              {/* PostMetaSection */}
              <div className="flex items-center justify-between w-[630px]">
                {/* Left */}
                <div className="flex flex-col gap-[12px] items-start">
                  {/* 직군 */}
                  <div className="flex gap-[20px] items-center">
                    <span className="text-[18px] leading-[24px] text-[var(--text-secondary)]">직군</span>
                    <Badge color="blue" style="outline" text={postData.jobCategory} />
                  </div>
                  {/* 지역 */}
                  <div className="flex gap-[20px] items-center text-[18px] leading-[24px]">
                    <span className="text-[var(--text-secondary)]">지역</span>
                    <span className="text-[var(--text-primary)]">{postData.region}</span>
                  </div>
                  {/* 일정 */}
                  <div className="flex gap-[20px] items-center text-[18px] leading-[24px]">
                    <span className="text-[var(--text-secondary)]">일정</span>
                    <span className="text-[var(--text-primary)]">{postData.schedule}</span>
                  </div>
                </div>

                {/* Right */}
                <div className="flex flex-col gap-[12px] items-start">
                  {/* 키워드 */}
                  <div className="flex gap-[36px] items-center">
                    <span className="text-[18px] leading-[24px] text-[var(--text-secondary)]">키워드</span>
                    <div className="flex gap-[8px] items-center">
                      {postData.keywords.slice(0, 3).map((keyword, index) => (
                        <Badge key={index} color="blue" style="solid" text={keyword} />
                      ))}
                    </div>
                  </div>
                  {/* 인원수 */}
                  <div className="flex gap-[36px] items-start text-[18px] leading-[24px]">
                    <span className="text-[var(--text-secondary)]">인원수</span>
                    <div className="flex items-center">
                      <span className="text-[var(--text-primary)]">{postData.currentMembers}</span>
                      <span className="text-[var(--text-primary)]">명</span>
                      <span className="text-[var(--text-tertiary)]">/</span>
                      <span className="text-[var(--text-tertiary)]">{postData.maxMembers}</span>
                      <span className="text-[var(--text-tertiary)]">명</span>
                    </div>
                  </div>
                  {/* 오픈채팅 */}
                  <div className="flex gap-[20px] items-center text-[18px] leading-[24px]">
                    <span className="text-[var(--text-secondary)]">오픈채팅</span>
                    <span className="text-[#006fe5]">{postData.openChatLink}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 신청 메시지 */}
          <div className="flex flex-col gap-[12px]">
            <div className="px-[20px]">
              <p className="font-medium text-[22px] leading-[28px] text-[var(--text-tertiary)]">
                신청 메세지
              </p>
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
          disabled={!message.trim()}
          className="w-full"
        >
          신청하기
        </Button>
      </div>
    </div>
  );
}
