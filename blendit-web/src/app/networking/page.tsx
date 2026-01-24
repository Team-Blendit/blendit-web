'use client';

import { useState } from 'react';
import { Header } from '@/components/common/Header';
import Tab from '@/components/common/Tab';
import { NetworkingListItem } from '@/components/common/NetworkingListItem';
import Pagination from '@/components/common/Pagination';

interface NetworkingItem {
  id: number;
  title: string;
  status: '승인' | '대기' | '거절';
  job: string;
  keywords: string[];
  location: string;
  memberCount: number;
  date: string;
  chatLink: string;
  hasNewNotification?: boolean;
}

const mockData: NetworkingItem[] = [
  {
    id: 1,
    title: 'Backend 3년차의 멘토링',
    status: '승인',
    job: '백엔드',
    keywords: ['멘토링', '백엔드', '개발'],
    location: '서울 00구',
    memberCount: 5,
    date: '0000.00.00',
    chatLink: 'http://',
    hasNewNotification: true,
  },
  {
    id: 2,
    title: 'Backend 3년차의 멘토링',
    status: '승인',
    job: '백엔드',
    keywords: ['멘토링', '백엔드', '개발'],
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
    keywords: ['멘토링', '백엔드', '개발'],
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
    keywords: ['멘토링', '백엔드', '개발'],
    location: '서울 00구',
    memberCount: 5,
    date: '0000.00.00',
    chatLink: 'http://',
  },
];

export default function NetworkingManagementPage() {
  const [activeTab, setActiveTab] = useState<'전체' | '신청' | '생성'>('신청');
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(mockData.length / 4); // Assuming 4 items per page

  // TODO: 상태별 뱃지, 버튼 구현
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Main Content */}
      <div className="flex flex-col max-w-[1440px] mx-auto gap-[30px] items-start mt-[30px]">
          {/* Title Section */}
          <div className="flex justify-start items-center gap-[24px] self-stretch">
            <button className="p-[4px]">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.5312 18.9698C15.6009 19.0395 15.6562 19.1222 15.6939 19.2132C15.7316 19.3043 15.751 19.4019 15.751 19.5004C15.751 19.599 15.7316 19.6965 15.6939 19.7876C15.6562 19.8786 15.6009 19.9614 15.5312 20.031C15.4615 20.1007 15.3788 20.156 15.2878 20.1937C15.1967 20.2314 15.0991 20.2508 15.0006 20.2508C14.902 20.2508 14.8045 20.2314 14.7134 20.1937C14.6224 20.156 14.5396 20.1007 14.47 20.031L6.96996 12.531C6.90023 12.4614 6.84491 12.3787 6.80717 12.2876C6.76943 12.1966 6.75 12.099 6.75 12.0004C6.75 11.9019 6.76943 11.8043 6.80717 11.7132C6.84491 11.6222 6.90023 11.5394 6.96996 11.4698L14.47 3.96979C14.6107 3.82906 14.8016 3.75 15.0006 3.75C15.1996 3.75 15.3905 3.82906 15.5312 3.96979C15.6719 4.11052 15.751 4.30139 15.751 4.50042C15.751 4.69944 15.6719 4.89031 15.5312 5.03104L8.5609 12.0004L15.5312 18.9698Z" fill="#121212"/>
              </svg>
            </button>
            <h1 className="text-[28px] font-bold leading-[34px] text-[var(--text-primary)]">
              네트워킹 관리
            </h1>
          </div>

          {/* Body */}
          <div className="flex flex-col items-start self-stretch">
            {/* Tab Section */}
            <div className="flex gap-[20px] items-center self-stretch">
              <Tab
                label="전체"
                active={activeTab === '전체'}
                onClick={() => setActiveTab('전체')}
              />
              <Tab
                label="신청"
                active={activeTab === '신청'}
                onClick={() => setActiveTab('신청')}
              />
              <Tab
                label="생성"
                active={activeTab === '생성'}
                notification={true}
                onClick={() => setActiveTab('생성')}
              />
            </div>

            {/* List Items */}
            <div className="flex flex-col w-full">
              {mockData.map((item) => (
                <NetworkingListItem
                  key={item.id}
                  title={item.title}
                  status={item.status}
                  job={item.job}
                  keywords={item.keywords}
                  location={item.location}
                  memberCount={item.memberCount}
                  date={item.date}
                  chatLink={item.chatLink}
                  hasNewNotification={item.hasNewNotification}
                  showButton={true}
                  onMoreClick={() => console.log('More clicked:', item.id)}
                  onApplyClick={() => console.log('Apply clicked:', item.id)}
                />
              ))}
            </div>

            {/* Pagination */}
            <Pagination 
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                className='justify-center self-stretch mt-[30px] w-full'
              />
              
          </div>
      </div>
    </div>
  );
}
