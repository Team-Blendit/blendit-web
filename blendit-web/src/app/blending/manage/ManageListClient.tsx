'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Tab from '@/components/common/Tab';
import { NetworkingListItem } from '@/components/common/NetworkingListItem';
import Pagination from '@/components/common/Pagination';
import CancelConfirmModal from '@/components/common/CancelConfirmModal';
import { useRequireAuth } from '@/hooks/useRequireAuth';
import { blendingAPI } from '@/lib/api/blending';
import { CreatedBlending, AppliedBlending, BlendingStatus, JoinStatus } from '@/lib/types/blending';
import { Position } from '@/lib/types/profile';

const positionLabels: Record<Position, string> = {
  ALL: '전체',
  FRONTEND: '프론트엔드',
  BACKEND: '백엔드',
  DESIGN: '디자이너',
  PM: 'PM',
  AI: 'AI',
  DATA: '데이터',
  SECURITY: '보안',
  MARKETING: '마케팅',
};

const blendingStatusLabels: Record<BlendingStatus, string> = {
  RECRUITING: '모집중',
  RECRUITMENT_CLOSED: '마감',
  COMPLETED: '완료',
  CANCELLED: '취소',
};

const joinStatusLabels: Record<JoinStatus, string> = {
  PENDING: '대기중',
  APPROVED: '승인',
  REJECTED: '거절',
  CANCEL: '취소',
};

const tabLabels: Record<string, string> = {
  applied: '신청',
  created: '생성',
};

// 뒤로가기 아이콘
const BackIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15.5312 18.9698C15.6009 19.0395 15.6562 19.1222 15.6939 19.2132C15.7316 19.3043 15.751 19.4019 15.751 19.5004C15.751 19.599 15.7316 19.6965 15.6939 19.7876C15.6562 19.8786 15.6009 19.9614 15.5312 20.031C15.4615 20.1007 15.3788 20.156 15.2878 20.1937C15.1967 20.2314 15.0991 20.2508 15.0006 20.2508C14.902 20.2508 14.8045 20.2314 14.7134 20.1937C14.6224 20.156 14.5396 20.1007 14.47 20.031L6.96996 12.531C6.90023 12.4614 6.84491 12.3787 6.80717 12.2876C6.76943 12.1966 6.75 12.099 6.75 12.0004C6.75 11.9019 6.76943 11.8043 6.80717 11.7132C6.84491 11.6222 6.90023 11.5394 6.96996 11.4698L14.47 3.96979C14.6107 3.82906 14.8016 3.75 15.0006 3.75C15.1996 3.75 15.3905 3.82906 15.5312 3.96979C15.6719 4.11052 15.751 4.30139 15.751 4.50042C15.751 4.69944 15.6719 4.89031 15.5312 5.03104L8.5609 12.0004L15.5312 18.9698Z" fill="#121212"/>
  </svg>
);

const PAGE_SIZE = 5;

export default function ManageListClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const tabFromQuery = searchParams.get('tab') || 'applied';
  const pageFromQuery = searchParams.get('page');

  const { isAuthenticated } = useRequireAuth();
  const [activeTab, setActiveTab] = useState(tabFromQuery);
  const [currentPage, setCurrentPage] = useState(pageFromQuery ? parseInt(pageFromQuery) : 1);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [selectedPostUuid, setSelectedPostUuid] = useState<string | null>(null);
  const [modalType, setModalType] = useState<'cancel' | 'delete'>('cancel');

  const [createdBlendings, setCreatedBlendings] = useState<CreatedBlending[]>([]);
  const [appliedBlendings, setAppliedBlendings] = useState<AppliedBlending[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    if (!isAuthenticated) return;
    setLoading(true);
    try {
      if (activeTab === 'created') {
        const res = await blendingAPI.getMyCreatedBlendings(currentPage - 1, PAGE_SIZE);
        setCreatedBlendings(res.content);
        setTotalPages(res.totalPages);
      } else {
        const res = await blendingAPI.getMyAppliedBlendings(currentPage - 1, PAGE_SIZE);
        setAppliedBlendings(res.content);
        setTotalPages(res.totalPages);
      }
    } catch (error) {
      console.error('블렌딩 목록 조회 실패:', error);
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated, activeTab, currentPage]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // 탭 변경 시 페이지 초기화
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setCurrentPage(1);
    const newParams = new URLSearchParams();
    newParams.set('tab', tab);
    router.replace(`/blending/manage?${newParams.toString()}`, { scroll: false });
  };

  // 비로그인 시 리디렉션 중에는 아무것도 렌더링하지 않음
  if (!isAuthenticated) {
    return null;
  }

  const tabs = ['applied', 'created'];

  const handleBack = () => {
    router.back();
  };

  const handleDetailView = (uuid: string) => {
    window.location.href = `/blending/manage/${uuid}`;
  };

  const handleCancelApplication = (uuid: string) => {
    setSelectedPostUuid(uuid);
    setModalType('cancel');
    setIsConfirmModalOpen(true);
  };

  const handleConfirm = async () => {
    if (selectedPostUuid) {
      try {
        if (modalType === 'cancel') {
          await blendingAPI.cancelParticipation(selectedPostUuid);
        } else if (modalType === 'delete') {
          await blendingAPI.deleteBlending(selectedPostUuid);
        }
        await fetchData();
      } catch (error) {
        console.error('블렌딩 처리 실패:', error);
      }
    }
    setIsConfirmModalOpen(false);
    setSelectedPostUuid(null);
  };

  const handleDeletePost = (uuid: string) => {
    setSelectedPostUuid(uuid);
    setModalType('delete');
    setIsConfirmModalOpen(true);
  };

  // 상태에 따른 뱃지 색상
  const getCreatedStatusColor = (status: BlendingStatus): 'green' | 'gray' | 'red' => {
    return status === 'RECRUITING' ? 'red' : 'gray';
  };

  const getAppliedStatusColor = (status: JoinStatus): 'green' | 'gray' | 'red' => {
    return status === 'APPROVED' ? 'green' : 'gray';
  };

  const formatSchedule = (schedule: string) => {
    const date = new Date(schedule);
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}.${m}.${d}`;
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
              label={tabLabels[tab]}
              active={activeTab === tab}
              onClick={() => handleTabChange(tab)}
            />
          ))}
        </div>

        {/* List Container */}
        <div className="flex flex-col w-full">
          {loading ? (
            <div className="flex justify-center items-center py-[60px]">
              <p className="text-[var(--text-secondary)]">불러오는 중...</p>
            </div>
          ) : activeTab === 'applied' ? (
            appliedBlendings.length > 0 ? (
              appliedBlendings.map((post) => (
                <NetworkingListItem
                  key={post.blendingUuid}
                  title={post.title}
                  status={joinStatusLabels[post.joinStatus]}
                  statusColor={getAppliedStatusColor(post.joinStatus)}
                  job={positionLabels[post.position] || post.position}
                  keywords={post.keywords}
                  location={post.region}
                  memberCount={post.currentUserCount}
                  date={formatSchedule(post.schedule)}
                  chatLink={post.openChattingUrl || ''}
                  buttonText={post.joinStatus === 'REJECTED' ? '거절됨' : post.joinStatus === 'CANCEL' ? '취소 완료' : '신청 취소'}
                  buttonDisabled={post.joinStatus === 'REJECTED' || post.joinStatus === 'CANCEL'}
                  onMoreClick={() => handleDetailView(post.blendingUuid)}
                  onButtonClick={() => handleCancelApplication(post.blendingUuid)}
                />
              ))
            ) : (
              <div className="flex justify-center items-center py-[60px]">
                <p className="text-[var(--text-secondary)]">신청한 블렌딩이 없습니다.</p>
              </div>
            )
          ) : (
            createdBlendings.length > 0 ? (
              createdBlendings.map((post) => (
                <NetworkingListItem
                  key={post.blendingUuid}
                  title={post.title}
                  status={blendingStatusLabels[post.blendingStatus]}
                  statusColor={getCreatedStatusColor(post.blendingStatus)}
                  job={positionLabels[post.position] || post.position}
                  keywords={post.keywords}
                  location={post.region}
                  memberCount={post.currentUserCount}
                  date={formatSchedule(post.schedule)}
                  chatLink={post.openChattingUrl || ''}
                  buttonText="삭제하기"
                  onMoreClick={() => handleDetailView(post.blendingUuid)}
                  onButtonClick={() => handleDeletePost(post.blendingUuid)}
                />
              ))
            ) : (
              <div className="flex justify-center items-center py-[60px]">
                <p className="text-[var(--text-secondary)]">생성한 블렌딩이 없습니다.</p>
              </div>
            )
          )}
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-[30px]">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}

      {/* Confirmation Modal */}
      <CancelConfirmModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={handleConfirm}
        title={modalType === 'cancel' ? '블렌딩을 취소하시겠습니까?' : '블렌딩을 삭제하시겠습니까?'}
      />
    </div>
  );
}
