'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import Tab from '@/components/common/Tab';
import { Button } from '@/components/common/Button';
import { Card } from '@/components/common/Card';
import Pagination from '@/components/common/Pagination';
import { NetworkingListItem } from '@/components/common/NetworkingListItem';
import { profileAPI } from '@/lib/api/profile';
import { UserProfile, Position, Experience, BookmarkedUser } from '@/lib/types/profile';
import { useAuthStore } from '@/stores/authStore';
import { PostDescription } from '@/components/common/PostDescription';

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

const experienceLabels: Record<Experience, string> = {
  NEWBIE: '신입',
  JUNIOR: '주니어',
  MIDDLE: '미들',
  SENIOR: '시니어',
};

// Mock 데이터 타입
type ActivityPost = {
  id: number;
  title: string;
  job: string;
  keywords: string[];
  location: string;
  memberCount: number;
  date: string;
  chatLink: string;
};

type BookmarkPost = {
  id: number;
  title: string;
  job: string;
  keywords: string[];
  location: string;
  memberCount: number;
  date: string;
  chatLink: string;
};


export default function MyPageClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isAuthenticated } = useAuthStore();

  // URL 쿼리에서 탭 상태 읽기
  const tabFromQuery = searchParams.get('tab') || 'profile';
  const subTabFromQuery = searchParams.get('subTab') as 'blending' | 'user' | null;
  const pageFromQuery = searchParams.get('page');

  const [activeTab, setActiveTab] = useState(tabFromQuery);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isHydrated, setIsHydrated] = useState(false);
  const [currentPage, setCurrentPage] = useState(pageFromQuery ? parseInt(pageFromQuery) : 1);
  const [bookmarkSubTab, setBookmarkSubTab] = useState<'blending' | 'user'>(subTabFromQuery || 'blending');
  const [bookmarkedUsers, setBookmarkedUsers] = useState<BookmarkedUser[]>([]);

  // 탭 변경 핸들러
  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    setCurrentPage(1);
    if (tabId === 'bookmark') {
      setBookmarkSubTab('blending');
    }
    const newParams = new URLSearchParams();
    newParams.set('tab', tabId);
    router.replace(`/mypage?${newParams.toString()}`, { scroll: false });
  };

  // 서브탭 변경 핸들러
  const handleSubTabChange = (subTab: 'blending' | 'user') => {
    setBookmarkSubTab(subTab);
    setCurrentPage(1);
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set('tab', 'bookmark');
    newParams.set('subTab', subTab);
    newParams.delete('page');
    router.replace(`/mypage?${newParams.toString()}`, { scroll: false });
  };

  // 페이지 변경 핸들러
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const newParams = new URLSearchParams(searchParams.toString());
    if (page > 1) {
      newParams.set('page', page.toString());
    } else {
      newParams.delete('page');
    }
    router.replace(`/mypage?${newParams.toString()}`, { scroll: false });
  };
  const [totalUserPages, setTotalUserPages] = useState(0);
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  const itemsPerPage = 5;
  const usersPerPage = 8;

  // Hydration 완료 대기
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;

    if (!isAuthenticated) {
      router.replace('/');
      return;
    }

    const fetchProfile = async () => {
      try {
        const data = await profileAPI.getMyProfile();
        console.log('Profile API response:', data);
        setProfile(data);
      } catch (error) {
        console.error('Failed to fetch profile:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [isHydrated, isAuthenticated, router]);

  // 북마크 유저 목록 조회
  useEffect(() => {
    if (!isHydrated || !isAuthenticated) return;
    if (activeTab !== 'bookmark' || bookmarkSubTab !== 'user') return;

    const fetchBookmarkedUsers = async () => {
      setIsLoadingUsers(true);
      try {
        const data = await profileAPI.getBookmarkedUsers(currentPage - 1, usersPerPage);
        console.log('📋 Bookmarked users response:', JSON.stringify(data, null, 2));
        setBookmarkedUsers(data.content);
        setTotalUserPages(data.totalPages);
      } catch (error) {
        console.error('Failed to fetch bookmarked users:', error);
      } finally {
        setIsLoadingUsers(false);
      }
    };

    fetchBookmarkedUsers();
  }, [isHydrated, isAuthenticated, activeTab, bookmarkSubTab, currentPage, usersPerPage]);

  const tabs = [
    { id: 'profile', label: '프로필' },
    { id: 'activity', label: '활동 내역' },
    { id: 'bookmark', label: '북마크' },
  ];

  // Mock 데이터 - 완료한 블렌딩
  const activityPosts: ActivityPost[] = [
    {
      id: 1,
      title: 'Backend 3년차의 멘토링',
      job: '백엔드',
      keywords: ['멘토링', '취업', '커리어'],
      location: '서울 강남구',
      memberCount: 5,
      date: '2024.01.15',
      chatLink: 'https://open.kakao.com/example1',
    },
    {
      id: 2,
      title: 'Frontend 스터디 모집',
      job: '프론트엔드',
      keywords: ['스터디', 'React', 'TypeScript'],
      location: '서울 서초구',
      memberCount: 4,
      date: '2024.01.20',
      chatLink: 'https://open.kakao.com/example2',
    },
    {
      id: 3,
      title: 'DevOps 실무 경험 공유',
      job: 'DevOps',
      keywords: ['멘토링', 'AWS', 'Docker'],
      location: '서울 강동구',
      memberCount: 6,
      date: '2024.02.01',
      chatLink: 'https://open.kakao.com/example3',
    },
    {
      id: 4,
      title: 'UX/UI 디자인 스터디',
      job: '디자인',
      keywords: ['스터디', 'Figma', '프로토타입'],
      location: '서울 마포구',
      memberCount: 5,
      date: '2024.02.10',
      chatLink: 'https://open.kakao.com/example4',
    },
    {
      id: 5,
      title: 'PM 커리어 토크',
      job: 'PM',
      keywords: ['멘토링', '커리어', '이직'],
      location: '서울 종로구',
      memberCount: 8,
      date: '2024.02.15',
      chatLink: 'https://open.kakao.com/example5',
    },
    {
      id: 6,
      title: '알고리즘 코딩 테스트 대비',
      job: '백엔드',
      keywords: ['스터디', '알고리즘', '코딩테스트'],
      location: '서울 송파구',
      memberCount: 4,
      date: '2024.02.20',
      chatLink: 'https://open.kakao.com/example6',
    },
  ];

  const totalPages = Math.ceil(activityPosts.length / itemsPerPage);
  const paginatedPosts = activityPosts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Mock 데이터 - 북마크한 블렌딩
  const bookmarkPosts: BookmarkPost[] = [
    {
      id: 101,
      title: '프론트엔드 멘토링 프로그램',
      job: '프론트엔드',
      keywords: ['멘토링', 'React', '신입'],
      location: '서울 강남구',
      memberCount: 4,
      date: '2024.03.01',
      chatLink: 'https://open.kakao.com/bookmark1',
    },
    {
      id: 102,
      title: '백엔드 개발자 모임',
      job: '백엔드',
      keywords: ['스터디', '코딩테스트', '알고리즘'],
      location: '서울 서초구',
      memberCount: 5,
      date: '2024.03.05',
      chatLink: 'https://open.kakao.com/bookmark2',
    },
    {
      id: 103,
      title: 'UX/UI 디자인 워크숍',
      job: '디자인',
      keywords: ['멘토링', 'Figma', '프로토타입'],
      location: '서울 마포구',
      memberCount: 6,
      date: '2024.03.10',
      chatLink: 'https://open.kakao.com/bookmark3',
    },
    {
      id: 104,
      title: 'PM 커리어 멘토링',
      job: 'PM',
      keywords: ['멘토링', '커리어', '성장'],
      location: '서울 종로구',
      memberCount: 3,
      date: '2024.03.15',
      chatLink: 'https://open.kakao.com/bookmark4',
    },
    {
      id: 105,
      title: 'DevOps 실무 경험 공유',
      job: 'DevOps',
      keywords: ['멘토링', 'AWS', 'CI/CD'],
      location: '서울 강동구',
      memberCount: 4,
      date: '2024.03.20',
      chatLink: 'https://open.kakao.com/bookmark5',
    },
    {
      id: 106,
      title: 'AI/ML 엔지니어 스터디',
      job: 'AI',
      keywords: ['스터디', '머신러닝', '딥러닝'],
      location: '서울 송파구',
      memberCount: 5,
      date: '2024.03.25',
      chatLink: 'https://open.kakao.com/bookmark6',
    },
  ];


  const totalBookmarkPages = Math.ceil(bookmarkPosts.length / itemsPerPage);
  const paginatedBookmarkPosts = bookmarkPosts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );


  const getLocation = () => {
    if (!profile?.province) return undefined;
    return profile.district ? `${profile.province} ${profile.district}` : profile.province;
  };

  // 프로필이 완성되었는지 확인 (소개 또는 링크가 있으면 완성)
  const isProfileComplete = profile && (profile.description || (profile.links && profile.links.length > 0));

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="max-w-[1440px] mx-auto w-full py-[32px] flex flex-col">
        {/* Page Title & Tabs */}
        <div className="flex flex-col gap-[20px]">
          <h1 className="text-[28px] font-bold leading-[34px] text-[#0a0a0a]">
            마이페이지
          </h1>

          {/* Tabs */}
          <div className="flex gap-[20px] items-center">
            {tabs.map((tab) => (
              <Tab
                key={tab.id}
                label={tab.label}
                active={activeTab === tab.id}
                onClick={() => handleTabChange(tab.id)}
              />
            ))}
          </div>
        </div>

        {/* Content */}
        {activeTab === 'profile' && (
          <div className="flex gap-[60px] items-start mt-[30px]">
            {/* Profile Card */}
            <Card
              variant="myProfile"
              userName={isLoading ? '-' : (profile?.nickname || '-')}
              userJob={profile?.position ? positionLabels[profile.position] : '-'}
              userCareer={profile?.experience ? experienceLabels[profile.experience] : '-'}
              userCompany={profile?.affiliation || undefined}
              userLocation={getLocation()}
              keywords={profile?.keywordList || []}
              skills={profile?.skills || []}
              profileImage={profile?.profileImage}
              onButtonClick={() => router.push('/profile/edit')}
            />

            {/* Profile Content or Empty State */}
            {isProfileComplete ? (
              <div className="flex-1 flex flex-col gap-[40px] items-start">
                {/* 소개 섹션 */}
                {profile.description && (
                  <PostDescription title='소개' content={profile.description} className='w-full' />
                )}

                {/* 연락처 및 링크 섹션 */}
                {(profile.email || (profile.links && profile.links.length > 0)) && (
                  <div className="w-full flex flex-col gap-[16px]">
                    <h2 className="text-[22px] font-semibold leading-[28px] text-[var(--text-primary)]">
                      연락처 및 링크
                    </h2>
                    <div className="w-full flex flex-col gap-[10px]">
                      {/* Email */}
                      {profile.email && (
                        <div className="flex gap-[12px] items-center">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M21 4.5H3C2.80109 4.5 2.61032 4.57902 2.46967 4.71967C2.32902 4.86032 2.25 5.05109 2.25 5.25V18C2.25 18.3978 2.40804 18.7794 2.68934 19.0607C2.97064 19.342 3.35218 19.5 3.75 19.5H20.25C20.6478 19.5 21.0294 19.342 21.3107 19.0607C21.592 18.7794 21.75 18.3978 21.75 18V5.25C21.75 5.05109 21.671 4.86032 21.5303 4.71967C21.3897 4.57902 21.1989 4.5 21 4.5ZM19.0716 6L12 12.4828L4.92844 6H19.0716ZM20.25 18H3.75V6.95531L11.4928 14.0531C11.6312 14.1801 11.8122 14.2506 12 14.2506C12.1878 14.2506 12.3688 14.1801 12.5072 14.0531L20.25 6.95531V18Z" fill="#666666"/>
                          </svg>
                          <span className="text-[18px] leading-[24px] text-[var(--text-secondary)]">
                            {profile.email}
                          </span>
                        </div>
                      )}
                      {/* Links */}
                      {profile.links && profile.links.map((link, index) => (
                        <div key={index} className="flex gap-[12px] items-center">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15.5309 8.46975C15.6006 8.53941 15.6559 8.62213 15.6937 8.71317C15.7314 8.80422 15.7509 8.90182 15.7509 9.00038C15.7509 9.09894 15.7314 9.19654 15.6937 9.28758C15.6559 9.37863 15.6006 9.46135 15.5309 9.531L9.53089 15.531C9.46121 15.6007 9.37848 15.656 9.28744 15.6937C9.19639 15.7314 9.09881 15.7508 9.00027 15.7508C8.90172 15.7508 8.80414 15.7314 8.7131 15.6937C8.62205 15.656 8.53932 15.6007 8.46964 15.531C8.39996 15.4613 8.34469 15.3786 8.30697 15.2876C8.26926 15.1965 8.24985 15.0989 8.24985 15.0004C8.24985 14.9018 8.26926 14.8043 8.30697 14.7132C8.34469 14.6222 8.39996 14.5394 8.46964 14.4698L14.4696 8.46975C14.5393 8.40002 14.622 8.3447 14.7131 8.30696C14.8041 8.26922 14.9017 8.24979 15.0003 8.24979C15.0988 8.24979 15.1964 8.26922 15.2875 8.30696C15.3785 8.3447 15.4612 8.40002 15.5309 8.46975ZM20.2128 3.78788C19.7253 3.30031 19.1465 2.91355 18.5095 2.64968C17.8725 2.38581 17.1898 2.25 16.5003 2.25C15.8108 2.25 15.128 2.38581 14.4911 2.64968C13.8541 2.91355 13.2753 3.30031 12.7878 3.78788L9.96964 6.60507C9.82891 6.7458 9.74985 6.93667 9.74985 7.13569C9.74985 7.33471 9.82891 7.52559 9.96964 7.66632C10.1104 7.80705 10.3012 7.88611 10.5003 7.88611C10.6993 7.88611 10.8902 7.80705 11.0309 7.66632L13.849 4.85382C14.5548 4.16349 15.5044 3.77936 16.4917 3.7848C17.479 3.79024 18.4243 4.1848 19.1225 4.88286C19.8207 5.58092 20.2154 6.52615 20.221 7.51343C20.2266 8.50071 19.8427 9.45037 19.1525 10.1563L16.3334 12.9744C16.1927 13.115 16.1136 13.3058 16.1135 13.5047C16.1134 13.7037 16.1923 13.8945 16.3329 14.0352C16.4735 14.176 16.6643 14.2551 16.8632 14.2552C17.0622 14.2552 17.253 14.1763 17.3937 14.0357L20.2128 11.2129C20.7003 10.7254 21.0871 10.1466 21.351 9.50959C21.6148 8.8726 21.7506 8.18986 21.7506 7.50038C21.7506 6.81089 21.6148 6.12816 21.351 5.49117C21.0871 4.85417 20.7003 4.27539 20.2128 3.78788ZM12.9696 16.3335L10.1515 19.1516C9.80472 19.5062 9.39102 19.7885 8.93438 19.9821C8.47774 20.1757 7.98722 20.2768 7.49124 20.2795C6.99526 20.2823 6.50367 20.1866 6.04492 19.998C5.58617 19.8094 5.16939 19.5317 4.81871 19.181C4.46802 18.8302 4.1904 18.4134 4.00192 17.9546C3.81343 17.4959 3.71783 17.0042 3.72065 16.5083C3.72347 16.0123 3.82465 15.5218 4.01834 15.0652C4.21203 14.6086 4.49437 14.1949 4.84902 13.8482L7.6662 11.031C7.80694 10.8903 7.886 10.6994 7.886 10.5004C7.886 10.3014 7.80694 10.1105 7.6662 9.96975C7.52547 9.82902 7.3346 9.74996 7.13558 9.74996C6.93656 9.74996 6.74569 9.82902 6.60496 9.96975L3.78777 12.7879C2.80315 13.7725 2.25 15.1079 2.25 16.5004C2.25 17.8928 2.80315 19.2283 3.78777 20.2129C4.77238 21.1975 6.10781 21.7506 7.50027 21.7506C8.89273 21.7506 10.2282 21.1975 11.2128 20.2129L14.0309 17.3938C14.1715 17.2531 14.2504 17.0623 14.2504 16.8633C14.2503 16.6644 14.1712 16.4736 14.0304 16.333C13.8897 16.1924 13.6989 16.1135 13.4999 16.1136C13.301 16.1137 13.1102 16.1928 12.9696 16.3335Z" fill="#666666"/>
                          </svg>
                          <a
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[18px] leading-[24px] text-[var(--text-secondary)] hover:text-[var(--accent-primary-default)] transition-colors"
                          >
                            {link.title}
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex-1 min-h-[755px] bg-[var(--bg-section)] rounded-[28px] flex items-center justify-center">
                <div className="flex flex-col gap-[36px] items-center text-center">
                  {/* Empty State Graphic */}
                  <div className="w-[240px] h-[240px] rounded-[40px] bg-[var(--accent-secondary-default)]" />

                  {/* Text */}
                  <div className="flex flex-col gap-[12px]">
                    <h3 className="text-[22px] font-semibold leading-[28px] text-black">
                      아직 프로필이 설정되지 않았어요
                    </h3>
                    <p className="text-[18px] leading-[24px] text-[var(--text-tertiary)]">
                      프로필에 정보를 미리 정리해두면<br />
                      활동할 때 더 편하게 소통할 수 있어요.
                    </p>
                  </div>

                  {/* CTA Button */}
                  <Button
                    variant="secondary"
                    size="lg"
                    onClick={() => router.push('/profile/edit')}
                  >
                    프로필 설정하러 가기
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Activity Tab */}
        {activeTab === 'activity' && (
          <div className="flex flex-col gap-[30px] w-full items-center mb-[54px]">
            {/* Activity List */}
            <div className="flex flex-col w-full">
              {paginatedPosts.map((post) => (
                <NetworkingListItem
                  key={post.id}
                  title={post.title}
                  status="완료"
                  statusColor="gray"
                  job={post.job}
                  keywords={post.keywords}
                  location={post.location}
                  memberCount={post.memberCount}
                  date={post.date}
                  chatLink={post.chatLink}
                  onMoreClick={() => router.push(`/${post.id}`)}
                />
              ))}
            </div>

            {/* Pagination */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}

        {/* Bookmark Tab */}
        {activeTab === 'bookmark' && (
          <div className="flex flex-col gap-[30px] w-full mt-[30px]">
            {/* Bookmark Sub-tabs */}
            <div className="flex gap-[16px] items-center">
              <button
                onClick={() => handleSubTabChange('blending')}
                className={`px-[16px] py-[8px] rounded-[99999px] min-w-[80px] flex items-center justify-center ${
                  bookmarkSubTab === 'blending'
                    ? 'bg-[var(--accent-primary-default)] text-white'
                    : 'bg-[var(--bg-section)] text-[var(--text-secondary)]'
                }`}
              >
                <span className="text-[18px] font-medium leading-[24px]">블렌딩</span>
              </button>
              <button
                onClick={() => handleSubTabChange('user')}
                className={`px-[16px] py-[8px] rounded-[99999px] min-w-[80px] flex items-center justify-center ${
                  bookmarkSubTab === 'user'
                    ? 'bg-[var(--accent-primary-default)] text-white'
                    : 'bg-[var(--bg-section)] text-[var(--text-secondary)]'
                }`}
              >
                <span className="text-[18px] font-medium leading-[24px]">유저</span>
              </button>
            </div>

            {/* Blending Bookmark List */}
            {bookmarkSubTab === 'blending' && (
              <div className="flex flex-col gap-[30px] w-full items-center">
                <div className="flex flex-col w-full">
                  {paginatedBookmarkPosts.map((post) => (
                    <NetworkingListItem
                      key={post.id}
                      title={post.title}
                      job={post.job}
                      keywords={post.keywords}
                      location={post.location}
                      memberCount={post.memberCount}
                      date={post.date}
                      chatLink={post.chatLink}
                      isBookmarked={true}
                      onMoreClick={() => router.push(`/${post.id}`)}
                    />
                  ))}
                </div>

                {/* Pagination */}
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalBookmarkPages}
                  onPageChange={handlePageChange}
                />
              </div>
            )}

            {/* User Bookmark List */}
            {bookmarkSubTab === 'user' && (
              <div className="flex flex-col gap-[30px] w-full items-center">
                {isLoadingUsers ? (
                  <div className="flex items-center justify-center py-20">
                    로딩 중...
                  </div>
                ) : (
                  <>
                  {/* User Grid */}
                  <div className="grid grid-cols-4 gap-x-[24px] gap-y-[30px] w-full">
                    {bookmarkedUsers.map((user) => (
                      <Card
                        key={user.userUuid}
                        variant="user"
                        userName={user.nickname}
                        userJob={positionLabels[user.position]}
                        userCareer={experienceLabels[user.experience]}
                        userLocation={user.province + ' ' + user.district}
                        keywords={user.keywords}
                        profileImage={user.profileImageUrl}
                        showButton={false}
                        isBookmarked={true}
                        onClick={() => router.push(`/profile/${user.userUuid}`)}
                        onBookmarkClick={async (e) => {
                          e?.stopPropagation();
                          try {
                            await profileAPI.removeBookmark(user.userUuid);
                            setBookmarkedUsers(prev => prev.filter(u => u.userUuid !== user.userUuid));
                          } catch (error) {
                            console.error('북마크 삭제 실패:', error);
                          }
                        }}
                      />
                    ))}
                  </div>

                  {/* Pagination */}
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalUserPages}
                    onPageChange={handlePageChange}
                  />
                  </>
                )}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
