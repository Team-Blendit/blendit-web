'use client';

import React, { useState } from 'react';
import { UserProfile } from '@/components/layout/UserProfile';
import { Button } from '@/components/common/Button';
import { cn } from '@/lib/utils';

export interface Comment {
  author: string;
  time: string;
  content: string;
}

export interface CommentSectionProps {
  comments: Comment[];
  onSubmitComment?: (content: string) => void;
  className?: string;
}

export const CommentSection: React.FC<CommentSectionProps> = ({
  comments,
  onSubmitComment,
  className,
}) => {
  const [comment, setComment] = useState('');

  const handleSubmit = () => {
    if (comment.trim() && onSubmitComment) {
      onSubmitComment(comment);
      setComment('');
    }
  };

  return (
    <div className={cn('flex flex-col gap-[12px]', className)}>
      {/* Header */}
      <div className="flex items-center gap-[8px]">
        <h2 className="font-semibold text-[22px] leading-[28px] text-[var(--text-primary)]">
          댓글
        </h2>
        <span className="font-medium text-[22px] leading-[28px] text-[var(--text-tertiary)]">
          {comments.length}
        </span>
      </div>

      {/* Comment List */}
      <div className="flex flex-col gap-[4px] items-start self-stretch">
        {comments.map((commentItem, idx) => (
          <div key={idx} className="w-full">
            <div className="h-px bg-(--border-subtle)" />
            <div className="rounded-[18px] p-[20px] flex flex-col gap-[10px] items-start self-stretch">
              <div className="flex items-center gap-[8px] h-[34px]">
                <UserProfile size="small" />
                <p className="font-medium text-[18px] leading-[24px] text-[var(--text-primary)]">
                  {commentItem.author}
                </p>
                <div className="bg-(--color-gray-100) h-[18px] w-px" />
                <p className="font-normal text-[18px] leading-[24px] text-[var(--text-tertiary)]">
                  {commentItem.time}
                </p>
              </div>
              <p className="font-normal text-[18px] leading-[24px] text-[var(--text-primary)]">
                {commentItem.content}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Comment Input */}
      <div className="bg-(--bg-canvas) border border-(--border-default) rounded-[18px] p-[20px] min-h-[131px] relative">
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="댓글을 작성해주세요"
          className="w-full items-start self-stretch font-normal text-[18px] leading-[24px] text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] resize-none outline-none"
        />
        <Button
          variant="secondary"
          size="sm"
          onClick={handleSubmit}
          disabled={!comment.trim()}
          className="absolute bottom-[19.5px] right-[19px]"
        >
          입력
        </Button>
      </div>
    </div>
  );
};
