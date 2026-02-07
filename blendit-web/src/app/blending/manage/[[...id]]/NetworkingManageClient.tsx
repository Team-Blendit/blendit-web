'use client';

import { useState, useRef, useEffect } from 'react';
import { Badge } from '@/components/common/Badge';
import { PostDescription } from '@/components/common/PostDescription';
// import { CommentSection } from '@/components/common/CommentSection';
import { Card } from '@/components/common/Card';
import { Header } from '@/components/layout/Header';
import { useRouter, useParams, usePathname } from 'next/navigation';
import { blendingAPI } from '@/lib/api/blending';
import { profileAPI } from '@/lib/api/profile';
import { BlendingDetail, BlendingParticipant, BlendingStatus } from '@/lib/types/blending';
import { Position, Experience } from '@/lib/types/profile';
import { useAuthStore } from '@/stores/authStore';

// Back Arrow Icon
const CaretLeftIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15.5312 18.9693C15.6009 19.039 15.6562 19.1217 15.6939 19.2128C15.7316 19.3038 15.751 19.4014 15.751 19.4999C15.751 19.5985 15.7316 19.6961 15.6939 19.7871C15.6562 19.8781 15.6009 19.9609 15.5312 20.0306C15.4615 20.1002 15.3788 20.1555 15.2878 20.1932C15.1967 20.2309 15.0991 20.2503 15.0006 20.2503C14.902 20.2503 14.8045 20.2309 14.7134 20.1932C14.6224 20.1555 14.5396 20.1002 14.47 20.0306L6.96996 12.5306C6.90023 12.4609 6.84491 12.3782 6.80717 12.2871C6.76943 12.1961 6.75 12.0985 6.75 11.9999C6.75 11.9014 6.76943 11.8038 6.80717 11.7127C6.84491 11.6217 6.90023 11.539 6.96996 11.4693L14.47 3.9693C14.6107 3.82857 14.8016 3.74951 15.0006 3.74951C15.1996 3.74951 15.3905 3.82857 15.5312 3.9693C15.6719 4.11003 15.751 4.30091 15.751 4.49993C15.751 4.69895 15.6719 4.88982 15.5312 5.03055L8.5609 11.9999L15.5312 18.9693Z" fill="#121212"/>
  </svg>
);

// Bookmark Icon
const BookmarkIcon = ({ filled = false }: { filled?: boolean }) => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M8.0625 26.1931V5.27383C8.0625 4.94246 8.33113 4.67383 8.6625 4.67383H23.3352C23.6666 4.67383 23.9352 4.94246 23.9352 5.27383V26.183C23.9352 26.6666 23.3924 26.9515 22.9944 26.6768L16.3992 22.1249C16.1954 21.9842 15.9261 21.9832 15.7212 22.1224L8.9997 26.6894C8.60134 26.9601 8.0625 26.6747 8.0625 26.1931Z"
      stroke="#999999"
      strokeWidth="2"
      fill={filled ? "#999999" : "none"}
    />
  </svg>
);

const GearIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.0015 7.49956C11.1115 7.49956 10.2415 7.76348 9.50144 8.25794C8.76142 8.75241 8.18465 9.45521 7.84405 10.2775C7.50346 11.0997 7.41434 12.0045 7.58797 12.8775C7.76161 13.7504 8.19019 14.5522 8.81953 15.1815C9.44886 15.8109 10.2507 16.2395 11.1236 16.4131C11.9965 16.5867 12.9013 16.4976 13.7236 16.157C14.5459 15.8164 15.2487 15.2396 15.7431 14.4996C16.2376 13.7596 16.5015 12.8896 16.5015 11.9996C16.5003 10.8065 16.0258 9.66259 15.1821 8.81895C14.3385 7.9753 13.1946 7.5008 12.0015 7.49956ZM12.0015 14.9996C11.4082 14.9996 10.8281 14.8236 10.3348 14.494C9.84145 14.1643 9.45693 13.6958 9.22987 13.1476C9.00281 12.5994 8.9434 11.9962 9.05915 11.4143C9.17491 10.8323 9.46063 10.2978 9.88019 9.87823C10.2997 9.45868 10.8343 9.17295 11.4162 9.0572C11.9982 8.94144 12.6014 9.00085 13.1496 9.22792C13.6977 9.45498 14.1663 9.8395 14.4959 10.3328C14.8256 10.8262 15.0015 11.4062 15.0015 11.9996C15.0015 12.7952 14.6854 13.5583 14.1228 14.1209C13.5602 14.6835 12.7972 14.9996 12.0015 14.9996ZM20.2515 12.2021C20.2553 12.0671 20.2553 11.9321 20.2515 11.7971L21.6503 10.0496C21.7236 9.9578 21.7744 9.85011 21.7985 9.73514C21.8226 9.62018 21.8193 9.50116 21.789 9.38768C21.5597 8.52574 21.2167 7.69816 20.769 6.92674C20.7104 6.82579 20.629 6.73992 20.5314 6.67595C20.4337 6.61199 20.3225 6.5717 20.2065 6.5583L17.9828 6.3108C17.8903 6.2133 17.7965 6.11955 17.7015 6.02955L17.439 3.80018C17.4255 3.68413 17.3851 3.57284 17.321 3.47518C17.2568 3.37752 17.1708 3.29619 17.0696 3.23768C16.2979 2.79082 15.4704 2.44815 14.6087 2.21862C14.4951 2.18843 14.3761 2.18534 14.2611 2.2096C14.1461 2.23387 14.0385 2.2848 13.9468 2.3583L12.204 3.74955C12.069 3.74955 11.934 3.74955 11.799 3.74955L10.0515 2.35362C9.95976 2.28027 9.85206 2.22951 9.7371 2.20541C9.62213 2.18131 9.50312 2.18455 9.38963 2.21487C8.52784 2.44458 7.70031 2.78757 6.9287 3.23487C6.82774 3.29349 6.74187 3.37486 6.67791 3.47251C6.61394 3.57017 6.57366 3.6814 6.56026 3.79737L6.31276 6.02487C6.21526 6.11799 6.12151 6.21174 6.03151 6.30612L3.80213 6.56206C3.68608 6.57556 3.57479 6.61598 3.47713 6.68011C3.37947 6.74424 3.29814 6.8303 3.23963 6.93143C2.79277 7.70315 2.4501 8.53066 2.22057 9.39237C2.19038 9.50592 2.18729 9.62498 2.21156 9.73995C2.23582 9.85491 2.28675 9.96257 2.36026 10.0542L3.75151 11.7971C3.75151 11.9321 3.75151 12.0671 3.75151 12.2021L2.35557 13.9496C2.28223 14.0413 2.23146 14.149 2.20736 14.264C2.18326 14.3789 2.1865 14.4979 2.21682 14.6114C2.44612 15.4734 2.78913 16.3009 3.23682 17.0724C3.29544 17.1733 3.37681 17.2592 3.47447 17.3232C3.57212 17.3871 3.68336 17.4274 3.79932 17.4408L6.02307 17.6883C6.1162 17.7858 6.20995 17.8796 6.30432 17.9696L6.56401 20.1989C6.57751 20.315 6.61794 20.4263 6.68207 20.5239C6.7462 20.6216 6.83226 20.7029 6.93338 20.7614C7.7051 21.2083 8.53261 21.551 9.39432 21.7805C9.50788 21.8107 9.62693 21.8138 9.7419 21.7895C9.85687 21.7652 9.96453 21.7143 10.0562 21.6408L11.799 20.2496C11.934 20.2533 12.069 20.2533 12.204 20.2496L13.9515 21.6483C14.0433 21.7216 14.151 21.7724 14.2659 21.7965C14.3809 21.8206 14.4999 21.8174 14.6134 21.7871C15.4753 21.5578 16.3029 21.2147 17.0743 20.7671C17.1753 20.7084 17.2611 20.6271 17.3251 20.5294C17.3891 20.4318 17.4294 20.3205 17.4428 20.2046L17.6903 17.9808C17.7878 17.8883 17.8815 17.7946 17.9715 17.6996L20.2009 17.4371C20.3169 17.4236 20.4282 17.3831 20.5259 17.319C20.6235 17.2549 20.7049 17.1688 20.7634 17.0677C21.2102 16.296 21.5529 15.4685 21.7824 14.6067C21.8126 14.4932 21.8157 14.3741 21.7915 14.2592C21.7672 14.1442 21.7163 14.0365 21.6428 13.9449L20.2515 12.2021ZM18.7421 11.5927C18.7581 11.8637 18.7581 12.1354 18.7421 12.4064C18.731 12.592 18.7891 12.7751 18.9053 12.9202L20.2356 14.5824C20.0829 15.0675 19.8875 15.5381 19.6515 15.9886L17.5328 16.2286C17.3482 16.2491 17.1779 16.3373 17.0546 16.4761C16.8742 16.6791 16.682 16.8713 16.479 17.0517C16.3402 17.175 16.252 17.3454 16.2315 17.5299L15.9962 19.6467C15.5457 19.8828 15.0751 20.0783 14.5899 20.2308L12.9268 18.9005C12.7937 18.7942 12.6284 18.7363 12.4581 18.7364H12.4131C12.1421 18.7524 11.8703 18.7524 11.5993 18.7364C11.4138 18.7253 11.2307 18.7834 11.0856 18.8996L9.4187 20.2308C8.93357 20.0782 8.46297 19.8827 8.01245 19.6467L7.77245 17.5308C7.75196 17.3463 7.66378 17.1759 7.52495 17.0527C7.32199 16.8722 7.12978 16.68 6.94932 16.4771C6.82607 16.3382 6.65571 16.25 6.4712 16.2296L4.35432 15.9933C4.11825 15.5428 3.92279 15.0722 3.77026 14.5871L5.10057 12.9239C5.21673 12.7788 5.27486 12.5957 5.2637 12.4102C5.24776 12.1392 5.24776 11.8674 5.2637 11.5964C5.27486 11.4109 5.21673 11.2278 5.10057 11.0827L3.77026 9.41674C3.92291 8.93162 4.11836 8.46102 4.35432 8.01049L6.47026 7.77049C6.65477 7.75001 6.82513 7.66182 6.94838 7.52299C7.12884 7.32003 7.32105 7.12783 7.52401 6.94737C7.66339 6.82404 7.75194 6.65329 7.77245 6.46831L8.00776 4.35237C8.45823 4.1163 8.92884 3.92084 9.41401 3.7683L11.0771 5.09862C11.2223 5.21478 11.4053 5.27291 11.5909 5.26174C11.8619 5.24581 12.1336 5.24581 12.4046 5.26174C12.5902 5.27291 12.7733 5.21478 12.9184 5.09862L14.5843 3.7683C15.0694 3.92095 15.54 4.11641 15.9906 4.35237L16.2306 6.46831C16.2511 6.65282 16.3392 6.82318 16.4781 6.94643C16.681 7.12689 16.8732 7.31909 17.0537 7.52205C17.1769 7.66089 17.3473 7.74907 17.5318 7.76955L19.6487 8.00487C19.8848 8.45534 20.0802 8.92595 20.2328 9.41112L18.9024 11.0742C18.7852 11.2206 18.727 11.4056 18.7393 11.5927H18.7421Z" fill="white"/>
  </svg>
);

interface NetworkingManageClientProps {
  id: string;
}

// Position을 한글로 변환
const positionLabels: Record<Position, string> = {
  ALL: '전체',
  FRONTEND: '프론트엔드',
  BACKEND: '백엔드',
  DESIGN: '디자인',
  PM: 'PM',
  AI: 'AI',
  DATA: '데이터',
  SECURITY: '보안',
  MARKETING: '마케팅',
};

// Experience를 한글로 변환
const experienceLabels: Record<Experience, string> = {
  NEWBIE: '신입',
  JUNIOR: '주니어 (1~3년)',
  MIDDLE: '미들 (4~6년)',
  SENIOR: '시니어 (7년+)',
};

// Status를 한글로 변환
const statusLabels: Record<BlendingStatus, string> = {
  RECRUITING: '모집중',
  RECRUITMENT_CLOSED: '마감',
  COMPLETED: '완료',
  CANCELLED: '취소',
};

export function NetworkingManageClient({ id }: NetworkingManageClientProps) {
  const params = useParams();
  const pathname = usePathname();
  const paramId = typeof params.id === 'string' ? params.id : '';
  const pathId = pathname.split('/')[3] || '';
  const manageId = pathId || paramId || id;
  const router = useRouter();
  const { user } = useAuthStore();
  const loggedInUserId = user?.id;
  const [isBookmarked, setIsBookmarked] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const applicantsScrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const [blendingData, setBlendingData] = useState<BlendingDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [bookmarkedUsers, setBookmarkedUsers] = useState<Set<string>>(new Set());

  const handleUserBookmark = async (e: React.MouseEvent | undefined, participant: BlendingParticipant) => {
    e?.stopPropagation();
    try {
      const isBookmarkedUser = bookmarkedUsers.has(participant.uuid);
      if (isBookmarkedUser) {
        await profileAPI.removeBookmark(participant.uuid);
      } else {
        await profileAPI.addBookmark(participant.uuid);
      }
      setBookmarkedUsers(prev => {
        const next = new Set(prev);
        if (isBookmarkedUser) {
          next.delete(participant.uuid);
        } else {
          next.add(participant.uuid);
        }
        return next;
      });
    } catch (err) {
      console.error('유저 북마크 변경 실패:', err);
    }
  };

  // API에서 블렌딩 상세 데이터 조회
  useEffect(() => {
    if (!manageId) return;

    const fetchBlendingDetail = async () => {
      try {
        setIsLoading(true);
        const data = await blendingAPI.getBlendingDetail(manageId);

        // 호스트가 아닌 경우 일반 상세 페이지로 리다이렉트
        if (!data.isHost) {
          router.replace(`/blending/${manageId}`);
          return;
        }

        console.log('블렌딩 상세 데이터:', data);

        setBlendingData(data);
        setIsBookmarked(data.isBookmarked);
        setBookmarkedUsers(new Set(
          data.blendingParticipant.filter(p => p.isBookmarked).map(p => p.uuid)
        ));
      } catch (err) {
        console.error('블렌딩 상세 조회 실패:', err);
        setError('블렌딩 정보를 불러오는데 실패했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlendingDetail();
  }, [manageId, router]);

  // 호스트 정보 추출
  const host = blendingData?.blendingParticipant.find(p => p.blendingUserGrade === 'HOST');

  // 신청 대기 중인 인원 (PENDING)
  const pendingParticipants = blendingData?.blendingParticipant.filter(
    p => p.joinStatus === 'PENDING'
  ) || [];

  // 참여 승인된 인원 (APPROVED 또는 HOST)
  const approvedParticipants = blendingData?.blendingParticipant.filter(
    p => p.joinStatus === 'APPROVED' || p.blendingUserGrade === 'HOST'
  ) || [];

  // 날짜 포맷팅
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
  };

  // // Mock 댓글 데이터 (댓글 API가 없으므로 유지)
  // const comments = [
  //   { author: '블린', time: '5분 전', content: '스터디 정보 부탁드립니다. 어떤 스택 사용하시나요 ?' },
  //   { author: '트렌드디자인', time: '1시간 전', content: '신청합니다 ! 좋은 시간 보냈으면 좋겠어요.' },
  // ];

  // const handleSubmitComment = (content: string) => {
  //   console.log('댓글 입력:', content);
  //   // TODO: API call to post comment
  // };

  // 참여 승인 핸들러
  const handleApproveParticipant = async (participantUuid: string) => {
    try {
      await blendingAPI.approveParticipation(manageId, participantUuid);
      // 승인 후 데이터 새로고침
      const data = await blendingAPI.getBlendingDetail(manageId);
      setBlendingData(data);
    } catch (err) {
      console.error('참여 승인 실패:', err);
      alert('참여 승인에 실패했습니다.');
    }
  };

  // 참여 거부 핸들러
  const handleRejectParticipant = async (participantUuid: string) => {
    try {
      await blendingAPI.rejectParticipation(manageId, participantUuid);
      // 거부 후 데이터 새로고침
      const data = await blendingAPI.getBlendingDetail(manageId);
      setBlendingData(data);
    } catch (err) {
      console.error('참여 거부 실패:', err);
      alert('참여 거부에 실패했습니다.');
    }
  };

  const handleMouseDown = (e: React.MouseEvent, ref: React.RefObject<HTMLDivElement | null>) => {
    if (!ref.current) return;
    setIsDragging(true);
    setStartX(e.pageX - ref.current.offsetLeft);
    setScrollLeft(ref.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent, ref: React.RefObject<HTMLDivElement | null>) => {
    if (!isDragging || !ref.current) return;
    e.preventDefault();
    const x = e.pageX - ref.current.offsetLeft;
    const walk = (x - startX) * 2;
    ref.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMoveToEditPage = () => {
    if (!manageId) return;
    const targetPath = `/blending/manage/${manageId}/edit`;
    // Static export 환경에서 동적 경로 client transition이 실패할 수 있어 hard navigation 사용
    window.location.assign(targetPath);
  };

  const handleBack = () => {
    router.back();
  };

  // 로딩 상태
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col gap-[30px] px-auto pb-[94px]">
        <Header />
        <div className="max-w-[1440px] mx-auto flex items-center justify-center h-[400px]">
          <p className="text-[var(--text-secondary)]">로딩 중...</p>
        </div>
      </div>
    );
  }

  // 에러 상태
  if (error || !blendingData) {
    return (
      <div className="min-h-screen flex flex-col gap-[30px] px-auto pb-[94px]">
        <Header />
        <div className="max-w-[1440px] mx-auto flex items-center justify-center h-[400px]">
          <p className="text-[var(--text-secondary)]">{error || '데이터를 불러올 수 없습니다.'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col gap-[30px] px-auto pb-[94px]">
      <Header />

      <div className="max-w-[1440px] mx-auto gap-[24px] flex flex-col">
        {/* Top Section - Title */}
        <div className="flex items-center justify-between self-stretch">
          <div className="flex items-center gap-[24px] flex-1">
            <button onClick={handleBack} className="flex p-[4px] items-center gap-[8px]">
              <CaretLeftIcon />
            </button>
            <div className="flex items-center gap-2.5">
              <h1 className="font-bold text-[28px] leading-[34px] text-[var(--text-primary)]">
                {blendingData.title}
              </h1>
              <Badge color={blendingData.status === 'RECRUITING' ? 'red' : 'gray'} style='solid' text={statusLabels[blendingData.status]} />
            </div>
          </div>
          <button
            className="p-[8px]"
            onClick={async () => {
              try {
                if (isBookmarked) {
                  await blendingAPI.removeBookmark(manageId);
                } else {
                  await blendingAPI.addBookmark(manageId);
                }
                setIsBookmarked(!isBookmarked);
              } catch (error) {
                console.error('북마크 변경 실패:', error);
              }
            }}
          >
            <BookmarkIcon filled={isBookmarked} />
          </button>
        </div>

        {/* Body Section */}
        <div className="flex items-start gap-[60px] self-stretch">
          {/* Left: Info Card */}
          <div className="w-[440px] shrink-0">
            <Card
              variant="postInfo"
              userName={host?.nickname || ''}
              userJob={positionLabels[blendingData.position]}
              postDate={formatDate(blendingData.createdDate)}
              meetDate={formatDate(blendingData.schedule)}
              meetLocation={blendingData.region}
              keywords={blendingData.keywords}
              currentNum={approvedParticipants.length}
              totalNum={blendingData.capacity}
              openChatLink={blendingData.openChattingUrl}
              buttonIcon={<GearIcon/>}
              buttonText='블렌딩 수정하기'
              isManagement
              blendingStatus={blendingData.status}
              onStatusChange={async (status) => {
                try {
                  await blendingAPI.updateBlendingStatus(manageId, status);
                  setBlendingData(prev => prev ? { ...prev, status } : prev);
                } catch (err) {
                  console.error('블렌딩 상태 변경 실패:', err);
                }
              }}
              onButtonClick={handleMoveToEditPage}
              profileImage={host?.profileImage}
            />
          </div>

          {/* Right: Content */}
          <div className="flex-1 flex flex-col gap-[50px]">
            {/* Description Section */}
            <PostDescription
              title="소개"
              content={blendingData.content}
              isHtml
            />

            {/* Applicants Section */}
            <div className="flex flex-col gap-[12px] w-[940px]">
              <div className="flex items-center gap-[8px]">
                <h2 className="font-semibold text-[22px] leading-[28px] text-[var(--text-primary)]">
                  신청 인원
                </h2>
                <span className="font-medium text-[22px] leading-[28px] text-[var(--text-tertiary)]">
                  {pendingParticipants.length}
                </span>
              </div>
              <div
                ref={applicantsScrollRef}
                onMouseDown={(e) => handleMouseDown(e, applicantsScrollRef)}
                onMouseMove={(e) => handleMouseMove(e, applicantsScrollRef)}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseLeave}
                className={`flex gap-[16px] overflow-x-auto scrollbar-hide select-none ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {pendingParticipants.length === 0 ? (
                  <p className="text-[var(--text-tertiary)]">신청 대기 중인 인원이 없습니다.</p>
                ) : (
                  pendingParticipants.map((participant, idx) => (
                    <Card
                      key={idx}
                      variant="user"
                      userName={participant.nickname}
                      profileImage={participant.profileImage}
                      userJob={positionLabels[participant.position]}
                      userCareer={experienceLabels[participant.experience]}
                      userLocation={`${participant.province} ${participant.district}`}
                      keywords={participant.keywords}
                      showButton={true}
                      isBookmarked={bookmarkedUsers.has(participant.uuid)}
                      hideBookmark={participant.uuid === loggedInUserId}
                      className="shrink-0"
                      onClick={() => router.push(`/profile/${participant.uuid}`)}
                      onBookmarkClick={(e) => handleUserBookmark(e, participant)}
                      onApproveClick={() => handleApproveParticipant(participant.uuid)}
                      onRejectClick={() => handleRejectParticipant(participant.uuid)}
                    />
                  ))
                )}
              </div>
            </div>

            {/* Participants Section */}
            <div className="flex flex-col gap-[12px] w-[940px]">
              <div className="flex items-center gap-[8px]">
                <h2 className="font-semibold text-[22px] leading-[28px] text-[var(--text-primary)]">
                  참여 인원
                </h2>
                <span className="font-medium text-[22px] leading-[28px] text-[var(--text-tertiary)]">
                  {approvedParticipants.length}
                </span>
              </div>
              <div
                ref={scrollRef}
                onMouseDown={(e) => handleMouseDown(e, scrollRef)}
                onMouseMove={(e) => handleMouseMove(e, scrollRef)}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseLeave}
                className={`flex gap-[16px] overflow-x-auto scrollbar-hide select-none ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {approvedParticipants.map((participant, idx) => (
                  <Card
                    key={idx}
                    variant="user"
                    userName={participant.nickname}
                    profileImage={participant.profileImage}
                    userJob={positionLabels[participant.position]}
                    userCareer={experienceLabels[participant.experience]}
                    userLocation={`${participant.province} ${participant.district}`}
                    keywords={participant.keywords}
                    showButton={false}
                    isBookmarked={bookmarkedUsers.has(participant.uuid)}
                    hideBookmark={participant.uuid === loggedInUserId}
                    className="shrink-0"
                    onClick={() => router.push(`/profile/${participant.uuid}`)}
                    onBookmarkClick={(e) => handleUserBookmark(e, participant)}
                  />
                ))}
              </div>
            </div>

            {/* Comments Section */}
            {/* <CommentSection
              comments={comments}
              onSubmitComment={handleSubmitComment}
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
}
