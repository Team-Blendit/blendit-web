'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Tab from '@/components/common/Tab';
import { Badge } from '@/components/common/Badge';
import { PostMetaSection } from '@/components/common/PostMetaSection';
import { Button } from '@/components/common/Button';
import Pagination from '@/components/common/Pagination';

// 뒤로가기 아이콘
const BackIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15.5312 18.9693C15.6009 19.039 15.6562 19.1217 15.6939 19.2128C15.7316 19.3038 15.751 19.4014 15.751 19.4999C15.751 19.5985 15.7316 19.6961 15.6939 19.7871C15.6562 19.8781 15.6009 19.9609 15.5312 20.0306C15.4615 20.1002 15.3788 20.1555 15.2878 20.1932C15.1967 20.2309 15.0991 20.2503 15.0006 20.2503C14.902 20.2503 14.8045 20.2309 14.7134 20.1932C14.6224 20.1555 14.5396 20.1002 14.47 20.0306L6.96996 12.5306C6.90023 12.4609 6.84491 12.3782 6.80717 12.2871C6.76943 12.1961 6.75 12.0985 6.75 11.9999C6.75 11.9014 6.76943 11.8038 6.80717 11.7127C6.84491 11.6217 6.90023 11.539 6.96996 11.4693L14.47 3.9693C14.6107 3.82857 14.8016 3.74951 15.0006 3.74951C15.1996 3.74951 15.3905 3.82857 15.5312 3.9693C15.6719 4.11003 15.751 4.30091 15.751 4.49993C15.751 4.69895 15.6719 4.88982 15.5312 5.03055L8.5609 11.9999L15.5312 18.9693Z" fill="#121212"/>
  </svg>
);

// 자세히 보기 버튼 아이콘
const CaretRightIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.031 12.5306L9.53104 20.0306C9.46136 20.1002 9.37863 20.1555 9.28759 20.1932C9.19654 20.2309 9.09896 20.2503 9.00042 20.2503C8.90187 20.2503 8.80429 20.2309 8.71324 20.1932C8.6222 20.1555 8.53947 20.1002 8.46979 20.0306C8.40011 19.9609 8.34483 19.8781 8.30712 19.7871C8.26941 19.6961 8.25 19.5985 8.25 19.4999C8.25 19.4014 8.26941 19.3038 8.30712 19.2128C8.34483 19.1217 8.40011 19.039 8.46979 18.9693L15.4401 11.9999L8.46979 5.03055C8.32906 4.88982 8.25 4.69895 8.25 4.49993C8.25 4.30091 8.32906 4.11003 8.46979 3.9693C8.61052 3.82857 8.80139 3.74951 9.00042 3.74951C9.19944 3.74951 9.39031 3.82857 9.53104 3.9693L17.031 11.4693C17.1008 11.539 17.1561 11.6217 17.1938 11.7127C17.2316 11.8038 17.251 11.9014 17.251 11.9999C17.251 12.0985 17.2316 12.1961 17.1938 12.2871C17.1561 12.3782 17.1008 12.4609 17.031 12.5306Z" fill="#999999"/>
  </svg>
);

// Mock 데이터 타입
type NetworkingPost = {
  id: number;
  title: string;
  status: string;
  job: string;
  keywords: string[];
  location: string;
  memberCount: number;
  date: string;
  chatLink: string;
  hasNewApplication?: boolean;
};

export default function ManageListClient() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('전체');
  const [currentPage, setCurrentPage] = useState(1);

  // Mock 데이터
  const mockPosts: NetworkingPost[] = [
    {
      id: 1,
      title: 'Backend 3년차의 멘토링',
      status: '승인',
      job: '백엔드',
      keywords: ['멘토링', '취업', '커리어'],
      location: '서울 00구',
      memberCount: 5,
      date: '0000.00.00',
      chatLink: 'http://',
      hasNewApplication: true,
    },
    {
      id: 2,
      title: 'Backend 3년차의 멘토링',
      status: '승인',
      job: '백엔드',
      keywords: ['멘토링', '취업', '커리어'],
      location: '서울 00구',
      memberCount: 5,
      date: '0000.00.00',
      chatLink: 'http://',
    },
    {
      id: 3,
      title: 'Backend 3년차의 멘토링',
      status: '승인',
      job: '백엔드',
      keywords: ['멘토링', '취업', '커리어'],
      location: '서울 00구',
      memberCount: 5,
      date: '0000.00.00',
      chatLink: 'http://',
    },
    {
      id: 4,
      title: 'Backend 3년차의 멘토링',
      status: '승인',
      job: '백엔드',
      keywords: ['멘토링', '취업', '커리어'],
      location: '서울 00구',
      memberCount: 5,
      date: '0000.00.00',
      chatLink: 'http://',
    },
  ];

  const tabs = ['전체', '신청', '생성'];

  const handleBack = () => {
    router.back();
  };

  const handleDetailView = (id: number) => {
    router.push(`/manage/${id}`);
  };

  return (
    <div className="w-full max-w-[1440px] mx-auto px-[240px] py-[30px]">
      {/* Title Section */}
      <div className="flex gap-[24px] items-center justify-start mb-[30px]">
        <button onClick={handleBack} className="p-[4px]">
          <BackIcon />
        </button>
        <h1 className="font-bold text-[28px] leading-[34px] text-[var(--text-primary)]">
          블랜딩 관리
        </h1>
      </div>

      {/* Tabs */}
      <div className="flex gap-[20px] items-center mb-0">
        {tabs.map((tab) => (
          <Tab
            key={tab}
            label={tab}
            active={activeTab === tab}
            onClick={() => setActiveTab(tab)}
          />
        ))}
      </div>

      {/* List Container */}
      <div className="flex flex-col">
        {mockPosts.map((post) => (
          <div
            key={post.id}
            className="relative bg-white border-b border-[var(--border-default)] rounded-[20px] p-[30px] overflow-hidden"
          >
            {/* 새로운 신청 알림 점 */}
            {post.hasNewApplication && (
              <div className="absolute top-[32px] right-[30px] w-[6px] h-[6px] bg-[#EF4444] rounded-full" />
            )}

            {/* Content */}
            <div className="flex flex-col gap-[20px]">
              {/* Top Section */}
              <div className="flex items-center justify-between">
                <div className="flex gap-[12px] items-center">
                  <p className="font-medium text-[20px] leading-[26px] text-[var(--text-primary)]">
                    {post.title}
                  </p>
                  <Badge color="gray" style="solid" text={post.status} />
                </div>

                <button
                  onClick={() => handleDetailView(post.id)}
                  className="flex gap-[12px] items-center"
                >
                  <span className="font-medium text-[18px] leading-[24px] text-[var(--text-tertiary)]">
                    자세히 보기
                  </span>
                  <CaretRightIcon />
                </button>
              </div>

              {/* Bottom Section */}
              <div className="flex items-end justify-between">
                <PostMetaSection
                  job={post.job}
                  keywords={post.keywords}
                  location={post.location}
                  memberCount={post.memberCount}
                  date={post.date}
                  chatLink={post.chatLink}
                />

                <div className="flex flex-col items-end justify-end">
                  <Button variant="secondary" size="md" disabled>
                    신청하소
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-[30px]">
        <Pagination
          currentPage={currentPage}
          totalPages={3}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
