'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Tab from '@/components/common/Tab';
import { NetworkingListItem } from '@/components/common/NetworkingListItem';
import Pagination from '@/components/common/Pagination';
import CancelConfirmModal from '@/components/common/CancelConfirmModal';

// 뒤로가기 아이콘
const BackIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15.5312 18.9698C15.6009 19.0395 15.6562 19.1222 15.6939 19.2132C15.7316 19.3043 15.751 19.4019 15.751 19.5004C15.751 19.599 15.7316 19.6965 15.6939 19.7876C15.6562 19.8786 15.6009 19.9614 15.5312 20.031C15.4615 20.1007 15.3788 20.156 15.2878 20.1937C15.1967 20.2314 15.0991 20.2508 15.0006 20.2508C14.902 20.2508 14.8045 20.2314 14.7134 20.1937C14.6224 20.156 14.5396 20.1007 14.47 20.031L6.96996 12.531C6.90023 12.4614 6.84491 12.3787 6.80717 12.2876C6.76943 12.1966 6.75 12.099 6.75 12.0004C6.75 11.9019 6.76943 11.8043 6.80717 11.7132C6.84491 11.6222 6.90023 11.5394 6.96996 11.4698L14.47 3.96979C14.6107 3.82906 14.8016 3.75 15.0006 3.75C15.1996 3.75 15.3905 3.82906 15.5312 3.96979C15.6719 4.11052 15.751 4.30139 15.751 4.50042C15.751 4.69944 15.6719 4.89031 15.5312 5.03104L8.5609 12.0004L15.5312 18.9698Z" fill="#121212"/>
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
  isCancelled?: boolean; // 신청 탭용: 취소 완료 여부
};

export default function ManageListClient() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('신청');
  const [currentPage, setCurrentPage] = useState(1);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
  const [modalType, setModalType] = useState<'cancel' | 'delete'>('cancel');

  // Mock 데이터 - 신청 목록
  const appliedPosts: NetworkingPost[] = [
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
      isCancelled: false,
    },
    {
      id: 2,
      title: 'Frontend 스터디 모집',
      status: '미승인',
      job: '프론트엔드',
      keywords: ['스터디', '취업', '커리어'],
      location: '서울 00구',
      memberCount: 3,
      date: '0000.00.00',
      chatLink: 'http://',
      isCancelled: false,
    },
    {
      id: 3,
      title: 'React 스터디',
      status: '취소',
      job: '프론트엔드',
      keywords: ['React', '스터디'],
      location: '서울 00구',
      memberCount: 4,
      date: '0000.00.00',
      chatLink: 'http://',
      isCancelled: true,
    },
  ];

  // Mock 데이터 - 생성 목록
  const createdPosts: NetworkingPost[] = [
    {
      id: 11,
      title: 'Backend 멘토링 진행합니다',
      status: '모집중',
      job: '백엔드',
      keywords: ['멘토링', '취업', '커리어'],
      location: '서울 00구',
      memberCount: 5,
      date: '0000.00.00',
      chatLink: 'http://',
      hasNewApplication: true,
    },
    {
      id: 12,
      title: 'DevOps 스터디',
      status: '마감',
      job: 'DevOps',
      keywords: ['스터디', 'AWS'],
      location: '서울 00구',
      memberCount: 5,
      date: '0000.00.00',
      chatLink: 'http://',
    },
    {
      id: 13,
      title: '알고리즘 스터디',
      status: '완료',
      job: '백엔드',
      keywords: ['알고리즘', '코딩테스트'],
      location: '서울 00구',
      memberCount: 4,
      date: '0000.00.00',
      chatLink: 'http://',
    },
  ];

  const mockPosts = activeTab === '신청' ? appliedPosts : createdPosts;

  const tabs = ['신청', '생성'];

  const handleBack = () => {
    router.back();
  };

  const handleDetailView = (id: number) => {
    router.push(`/manage/${id}`);
  };

  const handleCancelApplication = (id: number) => {
    setSelectedPostId(id);
    setModalType('cancel');
    setIsConfirmModalOpen(true);
  };

  const handleConfirm = () => {
    if (selectedPostId) {
      if (modalType === 'cancel') {
        console.log('Cancel application confirmed:', selectedPostId);
        // TODO: API 호출로 신청 취소
      } else if (modalType === 'delete') {
        console.log('Delete post confirmed:', selectedPostId);
        // TODO: API 호출로 게시글 삭제
      }
    }
    setIsConfirmModalOpen(false);
    setSelectedPostId(null);
  };

  const handleDeletePost = (id: number) => {
    setSelectedPostId(id);
    setModalType('delete');
    setIsConfirmModalOpen(true);
  };

  // 상태에 따른 뱃지 색상
  const getStatusBadgeColor = (status: string, tab: string): 'green' | 'gray' | 'red' => {
    if (tab === '신청') {
      return status === '승인' ? 'green' : 'gray';
    } else {
      return status === '모집중' ? 'red' : 'gray';
    }
  };

  return (
    <div className="flex flex-col gap-[30px] w-full max-w-[1440px] mx-auto my-[32px]">
      {/* Title Section */}
      <div className="flex gap-[24px] items-center justify-start self-stretch">
        <button onClick={handleBack} className="p-[4px]">
          <BackIcon />
        </button>
        <h1 className="font-bold text-[28px] leading-[34px] text-[var(--text-primary)]">
          블렌딩 관리
        </h1>
      </div>

      <div className='flex max-h-[1100px] flex-col items-start self-stretch'>
        {/* Tabs */}
        <div className="flex gap-[20px] items-center self-stretch border-b border-[var(--border-default)]">
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
        <div className="flex flex-col w-full">
          {mockPosts.map((post) => (
            <NetworkingListItem
              key={post.id}
              title={post.title}
              status={post.status}
              statusColor={getStatusBadgeColor(post.status, activeTab)}
              job={post.job}
              keywords={post.keywords}
              location={post.location}
              memberCount={post.memberCount}
              date={post.date}
              chatLink={post.chatLink}
              hasNewNotification={post.hasNewApplication}
              buttonText={activeTab === '신청' ? (post.isCancelled ? '취소 완료' : '신청 취소') : '삭제하기'}
              buttonDisabled={activeTab === '신청' && post.isCancelled}
              onMoreClick={() => handleDetailView(post.id)}
              onButtonClick={() => activeTab === '신청' ? handleCancelApplication(post.id) : handleDeletePost(post.id)}
            />
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-[30px]">
        <Pagination
          currentPage={currentPage}
          totalPages={3}
          onPageChange={setCurrentPage}
        />
      </div>

      {/* Confirmation Modal */}
      <CancelConfirmModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={handleConfirm}
        title={modalType === 'cancel' ? '블랜딩을 취소하시겠습니까?' : '블랜딩을 삭제하시겠습니까?'}
      />
    </div>
  );
}
