'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter, useParams, usePathname } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Badge } from '@/components/common/Badge';
import { PostDescription } from '@/components/common/PostDescription';
// import { CommentSection } from '@/components/common/CommentSection';
import { Card } from '@/components/common/Card';
import ApplyModal from '@/components/common/ApplyModal';
import { OnboardingModal, OnboardingData } from '@/components/common/OnboardingModal';
import { blendingAPI } from '@/lib/api/blending';
import { profileAPI } from '@/lib/api/profile';
import { BlendingDetail, BlendingParticipant, BlendingStatus } from '@/lib/types/blending';
import { Position, Experience } from '@/lib/types/profile';
import { useAuthStore } from '@/stores/authStore';
import { useOnboardingGuard } from '@/hooks/useOnboardingGuard';
import { useAuthGuard } from '@/hooks/useAuthGuard';
import { LoginModal } from '@/components/common/LoginModal';

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

interface NetworkingDetailClientProps {
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

export default function NetworkingDetailClient({ id }: NetworkingDetailClientProps) {
  const params = useParams();
  const pathname = usePathname();
  const paramId = Array.isArray(params.id) ? params.id[0] : params.id;
  const pathId = pathname.startsWith('/blending/') ? pathname.split('/')[2] || '' : '';
  const blendingId = pathId || paramId || id || '';
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const setNewUserComplete = useAuthStore((state) => state.setNewUserComplete);
  const {
    showOnboardingModal,
    closeOnboardingModal,
    guardAction,
    handleOnboardingComplete: onOnboardingComplete,
  } = useOnboardingGuard();
  const {
    showLoginModal,
    closeLoginModal,
    requireAuth,
  } = useAuthGuard();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const [blendingData, setBlendingData] = useState<BlendingDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [bookmarkedUsers, setBookmarkedUsers] = useState<Set<string>>(new Set());

  const getStoredUserId = () => {
    if (typeof window === 'undefined') return '';
    try {
      const authStorage = localStorage.getItem('auth-storage');
      if (!authStorage) return '';
      const parsed = JSON.parse(authStorage);
      return parsed?.state?.user?.id || '';
    } catch {
      return '';
    }
  };

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
    } catch {
      // 유저 북마크 변경 실패
    }
  };

  // API에서 블렌딩 상세 데이터 조회
  useEffect(() => {
    if (!blendingId) return;

    const fetchBlendingDetail = async () => {
      try {
        setIsLoading(true);
        const data = await blendingAPI.getBlendingDetail(blendingId);
        const hostUuid = data.blendingParticipant.find(
          (participant) => participant.blendingUserGrade === 'HOST'
        )?.uuid;
        const currentUserId = user?.id || getStoredUserId();
        const shouldRedirectToManage = Boolean(
          hostUuid && currentUserId && hostUuid === currentUserId
        );

        if (data.isHost || shouldRedirectToManage) {
          // Static export 환경에서 dynamic route client transition이 간헐적으로 실패할 수 있어 hard navigation 사용
          window.location.replace(`/blending/manage/${blendingId}`);
          return;
        }

        setBlendingData(data);
        setIsBookmarked(data.isBookmarked);
        setBookmarkedUsers(new Set(
          data.blendingParticipant.filter(p => p.isBookmarked).map(p => p.uuid)
        ));
      } catch {
        setError('블렌딩 정보를 불러오는데 실패했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlendingDetail();
  }, [blendingId, user?.id]);

  // 호스트 정보 추출
  const host = blendingData?.blendingParticipant.find(p => p.blendingUserGrade === 'HOST');

  // 참여 승인된 인원
  const approvedParticipants = blendingData?.blendingParticipant.filter(
    p => p.joinStatus === 'APPROVED' || p.blendingUserGrade === 'HOST'
  ) || [];

  // 현재 사용자가 이미 신청했는지 확인
  const hasApplied = blendingData?.currentUserJoinStatus === 'PENDING';
  const isClosed = blendingData?.status !== 'RECRUITING';

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
  //   console.log('Comment submitted:', content);
  //   // TODO: API 호출로 댓글 등록
  // };

  const handleApply = async (message: string) => {
    try {
      await blendingAPI.applyBlending(blendingId, message);
      setIsModalOpen(false);
      // 신청 완료 후 데이터 새로고침
      const data = await blendingAPI.getBlendingDetail(blendingId);
      setBlendingData(data);
    } catch {
      alert('참여 신청에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const handleOnboardingComplete = (_data: OnboardingData) => {
    setNewUserComplete();
    onOnboardingComplete();
  };

  // 북마크 토글 핸들러
  const handleBookmarkClick = () => {
    requireAuth(async () => {
      try {
        if (isBookmarked) {
          await blendingAPI.removeBookmark(blendingId);
        } else {
          await blendingAPI.addBookmark(blendingId);
        }
        setIsBookmarked(!isBookmarked);
      } catch {
        // 북마크 변경 실패
      }
    });
  };

  // 블렌딩 신청 버튼 핸들러 (로그인 -> 온보딩 -> 신청 모달)
  const handleApplyClick = () => {
    requireAuth(() => {
      guardAction(() => setIsModalOpen(true));
    });
  };

  // 카카오 로그인 핸들러
  const handleKakaoLogin = () => {
    const KAKAO_CLIENT_ID = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID;
    const REDIRECT_URI = process.env.NEXT_PUBLIC_REDIRECT_URI;
    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&state=kakao`;
    window.location.href = KAKAO_AUTH_URL;
  };

  // 구글 로그인 핸들러
  const handleGoogleLogin = () => {
    const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    const REDIRECT_URI = process.env.NEXT_PUBLIC_REDIRECT_URI;
    const GOOGLE_AUTH_URL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=openid%20email%20profile&state=google`;
    window.location.href = GOOGLE_AUTH_URL;
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2; // 스크롤 속도 조절
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
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
      {/* Header */}
      <Header />

      <div className="max-w-[1440px] mx-auto gap-[24px] flex flex-col">
        {/* Top Section */}
        <div className="flex items-center justify-between self-stretch">
          <div className="flex items-center gap-[24px] flex-1">
            <button
              onClick={() => router.back()}
              className="flex p-[4px] items-center gap-[8px]"
            >
              <CaretLeftIcon />
            </button>
            <div className="flex items-center gap-2.5">
              <h1 className="font-bold text-[28px] leading-[34px] text-[var(--text-primary)]">
                {blendingData.title}
              </h1>
              <Badge color={blendingData.status === 'RECRUITING' ? 'red' : 'gray'} style="solid" text={statusLabels[blendingData.status]} />
            </div>
          </div>
          <button
            className="p-[8px]"
            onClick={handleBookmarkClick}
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
              onButtonClick={handleApplyClick}
              profileImage={host?.profileImage}
              buttonText={hasApplied ? '이미 신청한 블렌딩이에요' : (isClosed ? '마감된 블렌딩이에요' : '블렌딩 신청하기')}
              buttonDisabled={hasApplied || isClosed}
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
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
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
                    hideBookmark={participant.uuid === user?.id}
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

      {/* Apply Modal */}
      <ApplyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        postData={{
          jobCategory: positionLabels[blendingData.position],
          region: blendingData.region,
          schedule: formatDate(blendingData.schedule),
          keywords: blendingData.keywords,
          currentMembers: approvedParticipants.length,
          maxMembers: blendingData.capacity,
          openChatLink: blendingData.openChattingUrl || '',
        }}
        onSubmit={handleApply}
      />

      {/* Login Modal */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={closeLoginModal}
        onKakaoLogin={handleKakaoLogin}
        onGoogleLogin={handleGoogleLogin}
      />

      {/* Onboarding Modal */}
      <OnboardingModal
        isOpen={showOnboardingModal}
        onClose={closeOnboardingModal}
        onComplete={handleOnboardingComplete}
      />
    </div>
  );
}
