'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { SearchBar } from '@/components/common/SearchBar';
import FilterSet from '@/components/common/FilterSet';
import Tab from '@/components/common/Tab';
import { Card } from '@/components/common/Card';
import Pagination from '@/components/common/Pagination';
import { profileAPI } from '@/lib/api/profile';
import { SearchedUser, Position, Experience } from '@/lib/types/profile';
import { apiClient } from '@/lib/api';
import { useAuthStore } from '@/stores/authStore';
import { blendingAPI } from '@/lib/api/blending';
import { HomeBanner } from '@/components/home/HomeBanner';
import { SearchedBlending } from '@/lib/types/blending';
import { useAuthGuard } from '@/hooks/useAuthGuard';
import { LoginModal } from '@/components/common/LoginModal/LoginModal';

interface KeywordItem {
  uuid: string;
  name: string;
}

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

// 직군 필터 옵션 (한글 -> Position 매핑) - 유저 탭용
const positionFilterOptions: { label: string; value: Position | '' }[] = [
  { label: '프론트엔드', value: 'FRONTEND' },
  { label: '백엔드', value: 'BACKEND' },
  { label: '디자이너', value: 'DESIGN' },
  { label: 'PM', value: 'PM' },
  { label: '마케팅', value: 'MARKETING' },
  { label: '데이터', value: 'DATA' },
  { label: 'AI', value: 'AI' },
  { label: '보안', value: 'SECURITY' },
];

// 블렌딩 탭용 직군 필터 옵션 (전체는 실제 position 값)
const blendingPositionFilterOptions: { label: string; value: Position | '' }[] = [
  { label: '전체', value: 'ALL' },
  { label: '프론트엔드', value: 'FRONTEND' },
  { label: '백엔드', value: 'BACKEND' },
  { label: '디자이너', value: 'DESIGN' },
  { label: 'PM', value: 'PM' },
  { label: '마케팅', value: 'MARKETING' },
  { label: '데이터', value: 'DATA' },
  { label: 'AI', value: 'AI' },
  { label: '보안', value: 'SECURITY' },
];

// 서울 구 목록
const seoulDistricts = [
  '강남구', '강동구', '강북구', '강서구', '관악구', '광진구', '구로구', '금천구',
  '노원구', '도봉구', '동대문구', '동작구', '마포구', '서대문구', '서초구', '성동구',
  '성북구', '송파구', '양천구', '영등포구', '용산구', '은평구', '종로구', '중구', '중랑구'
];

export default function HomeClient() {
  const { user } = useAuthStore();
  const loggedInUserId = user?.id;
  const { requireAuth, showLoginModal, closeLoginModal } = useAuthGuard();

  const router = useRouter();
  const searchParams = useSearchParams();
  const tabFromUrl = searchParams.get('tab');
  const [activeTab, setActiveTab] = useState(tabFromUrl === 'user' ? 'user' : 'blending');
  const [currentPage, setCurrentPage] = useState(1);
  const [filterValues, setFilterValues] = useState({
    job: '' as Position | '',
    keyword: '',
    region: '',
    people: '',
    recruiting: false,
    bookmarked: false,
  });

  // 키워드 목록 상태
  const [keywordList, setKeywordList] = useState<KeywordItem[]>([]);

  // 유저 탭 상태
  const [users, setUsers] = useState<SearchedUser[]>([]);
  const [totalUserPages, setTotalUserPages] = useState(0);
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  const usersPerPage = 16;

  // 블렌딩 탭 상태
  const [blendings, setBlendings] = useState<SearchedBlending[]>([]);
  const [totalBlendingPages, setTotalBlendingPages] = useState(0);
  const [isLoadingBlendings, setIsLoadingBlendings] = useState(false);
  const blendingsPerPage = 16;

  // 키워드 목록 불러오기
  useEffect(() => {
    const fetchKeywords = async () => {
      try {
        const response = await apiClient.get('/keyword');
        if (response.data.result === 'SUCCESS' && response.data.data) {
          setKeywordList(response.data.data);
        }
      } catch (error) {
        console.error('키워드 목록 불러오기 실패:', error);
      }
    };

    fetchKeywords();
  }, []);

  // 필터 초기화 함수
  const handleResetFilters = () => {
    setFilterValues({
      job: '',
      keyword: '',
      region: '',
      people: '',
      recruiting: false,
      bookmarked: false,
    });
    setCurrentPage(1);
  };

  // 유저 검색 API 호출
  useEffect(() => {
    if (activeTab !== 'user') return;

    const fetchUsers = async () => {
      setIsLoadingUsers(true);
      const position = filterValues.job as Position;
      const requestParams = {
        ...(position && position !== 'ALL' ? { position } : {}),
        keywordUuidList: filterValues.keyword ? [filterValues.keyword] : [],
        districtList: filterValues.region ? [filterValues.region] : [],
        isBookmarked: filterValues.bookmarked,
      };
      console.log('🔍 User search request:', requestParams, 'page:', currentPage - 1, 'size:', usersPerPage);

      try {
        const data = await profileAPI.searchUsers(
          requestParams as Parameters<typeof profileAPI.searchUsers>[0],
          currentPage - 1,
          usersPerPage
        );
        console.log('✅ User search response:', data);
        setUsers(data.content);
        setTotalUserPages(data.totalPages);
      } catch (error) {
        console.error('❌ Failed to fetch users:', error);
      } finally {
        setIsLoadingUsers(false);
      }
    };

    fetchUsers();
  }, [activeTab, currentPage, filterValues.job, filterValues.keyword, filterValues.region, filterValues.bookmarked, usersPerPage]);

  // 블렌딩 검색 API 호출
  useEffect(() => {
    if (activeTab !== 'blending') return;

    const fetchBlendings = async () => {
      setIsLoadingBlendings(true);
      try {
        const position = filterValues.job ? (filterValues.job as Position) : undefined;
        const keywordUuidList = filterValues.keyword ? [filterValues.keyword] : [];
        const region = filterValues.region ? [`서울특별시 ${filterValues.region}`] : [];
        const capacity = filterValues.people ? Number(filterValues.people) : undefined;

        const data = await blendingAPI.searchBlendings(
          position,
          keywordUuidList,
          region,
          capacity,
          filterValues.recruiting,
          filterValues.bookmarked,
          '',
          currentPage - 1,
          blendingsPerPage,
          []
        );
        console.log('✅ Blending search response:', data);
        // 중복 제거 (blendingUuid 기준)
        const uniqueBlendings = data.content.filter(
          (blending, index, self) =>
            index === self.findIndex((b) => b.blendingUuid === blending.blendingUuid)
        );
        setBlendings(uniqueBlendings);
        setTotalBlendingPages(data.totalPages);
      } catch (error) {
        console.error('❌ Failed to fetch blendings:', error);
      } finally {
        setIsLoadingBlendings(false);
      }
    };

    fetchBlendings();
  }, [activeTab, currentPage, filterValues.job, filterValues.keyword, filterValues.region, filterValues.people, filterValues.recruiting, filterValues.bookmarked, blendingsPerPage]);

  return (
    <div className="min-h-screen flex flex-col gap-[52px] pb-[309.06px] px-auto">
      {/* Header */}
      <Header />

      {/* Banner */}
      <HomeBanner />

      {/* Main Content */}
      <main className="max-w-[1440px] mx-auto flex flex-col gap-[30px]">

        {/* Top */}
        <div className="flex flex-col gap-[24px]">
          {/* Tab Section */}
          <section>
            <div className="flex gap-2">
              <Tab
                label="전체 블렌딩"
                active={activeTab === 'blending'}
                onClick={() => {
                  setActiveTab('blending');
                  router.replace('/', { scroll: false });
                }}
              />
              <Tab
                label="전체 유저"
                active={activeTab === 'user'}
                onClick={() => {
                  setActiveTab('user');
                  router.replace('/?tab=user', { scroll: false });
                }}
              />
            </div>
          </section>

          {/* Filter Section */}
          <section className="flex gap-4 items-start justify-between">
            <FilterSet
              filters={[
                {
                  type: 'dropdown',
                  label: '직군',
                  options: (activeTab === 'blending' ? blendingPositionFilterOptions : positionFilterOptions).map(opt => opt.label),
                  value: (activeTab === 'blending' ? blendingPositionFilterOptions : positionFilterOptions).find(opt => opt.value === filterValues.job)?.label || '',
                  onChange: (value) => {
                    const options = activeTab === 'blending' ? blendingPositionFilterOptions : positionFilterOptions;
                    const selected = options.find(opt => opt.label === value);
                    setFilterValues(prev => ({ ...prev, job: selected?.value || '' }));
                  },
                },
                {
                  type: 'dropdown',
                  label: '키워드',
                  options: keywordList.map(k => k.name),
                  value: keywordList.find(k => k.uuid === filterValues.keyword)?.name || '',
                  onChange: (value) => {
                    const selected = keywordList.find(k => k.name === value);
                    setFilterValues(prev => ({ ...prev, keyword: selected?.uuid || '' }));
                  },
                },
                {
                  type: 'dropdown',
                  label: '지역',
                  options: seoulDistricts,
                  value: filterValues.region,
                  onChange: (value) => setFilterValues(prev => ({ ...prev, region: value as string })),
                },
                ...(activeTab === 'blending' ? [
                  {
                    type: 'dropdown' as const,
                    label: '인원수',
                    options: ['2명', '3명', '4명', '5명', '6명', '7명', '8명', '9명', '10명'],
                    value: filterValues.people ? `${filterValues.people}명` : '',
                    onChange: (value: string | boolean) => {
                      const str = value as string;
                      setFilterValues(prev => ({ ...prev, people: str.replace('명', '') }));
                    },
                  },
                  {
                    type: 'select' as const,
                    label: '모집중',
                    selected: filterValues.recruiting,
                    onChange: (selected: string | boolean) => {
                      if (selected as boolean) {
                        setFilterValues(prev => ({ ...prev, recruiting: true }));
                      } else {
                        setFilterValues(prev => ({ ...prev, recruiting: false }));
                      }
                    }
                  }
                ] : []),
                {
                  type: 'select',
                  label: '북마크',
                  selected: filterValues.bookmarked,
                  onChange: (selected) => {
                    if (selected as boolean) {
                      setFilterValues(prev => ({ ...prev, bookmarked: true }));
                    } else {
                      setFilterValues(prev => ({ ...prev, bookmarked: false }));
                    }
                  }
                },
                {
                  type: 'reset',
                  label: '초기화',
                  onClick: handleResetFilters,
                },
              ]}
            />
            <SearchBar placeholder="검색" className="w-[287px]" />
          </section>
        </div>

        {/* Card Grid */}
        <section className="flex flex-col gap-[16px] items-stretch w-full">
          <div className="grid grid-cols-4 gap-x-[24px] gap-y-[30px] w-full min-w-[1440px]">
            {activeTab === 'blending' ? (
              isLoadingBlendings ? (
                <div className="col-span-4 flex justify-center items-center py-20">
                  <p className="text-[var(--text-tertiary)]">로딩 중...</p>
                </div>
              ) : blendings.length === 0 ? (
                <div className="col-span-4 flex justify-center items-center py-20">
                  <p className="text-[var(--text-tertiary)]">검색 결과가 없습니다</p>
                </div>
              ) : (
                blendings.map((blending) => (
                  <Card
                    key={blending.blendingUuid}
                    variant="main"
                    profileImage={blending.userProfileImage}
                    title={blending.title}
                    userName={blending.hostNickname}
                    userJob={positionLabels[blending.position]}
                    userCareer={experienceLabels[blending.hostExperience]}
                    userLocation={blending.region}
                    keywords={blending.keywords}
                    currentNum={blending.currentUserCount}
                    totalNum={blending.capacity}
                    isRecruiting={blending.blendingStatus === 'RECRUITING'}
                    isBookmarked={blending.isBookmark}
                    onClick={() => router.push(`/blending/${blending.blendingUuid}`)}
                    onBookmarkClick={async (e) => {
                      e?.stopPropagation();
                      try {
                        if (blending.isBookmark) {
                          await blendingAPI.removeBookmark(blending.blendingUuid);
                        } else {
                          await blendingAPI.addBookmark(blending.blendingUuid);
                        }
                        setBlendings(prev => prev.map(b =>
                          b.blendingUuid === blending.blendingUuid
                            ? { ...b, isBookmark: !b.isBookmark }
                            : b
                        ));
                      } catch (error) {
                        console.error('북마크 변경 실패:', error);
                      }
                    }}
                    onButtonClick={() => console.log('Detail:', blending.blendingUuid)}
                    className='hover:shadow-[0_8px_20px_rgba(0,0,0,0.12)] hover:-translate-y-0.3'
                  />
                ))
              )
            ) : isLoadingUsers ? (
              <div className="col-span-4 flex justify-center items-center py-20">
                <p className="text-[var(--text-tertiary)]">로딩 중...</p>
              </div>
            ) : users.length === 0 ? (
              <div className="col-span-4 flex justify-center items-center py-20">
                <p className="text-[var(--text-tertiary)]">검색 결과가 없습니다</p>
              </div>
            ) : (
              users.map((user) => (
                <Card
                  key={user.userUuid}
                  variant="user"
                  userName={user.nickname}
                  userJob={positionLabels[user.position]}
                  userCareer={experienceLabels[user.experience]}
                  userLocation={`${user.province} ${user.district}`}
                  profileImage={user.profileImageUrl}
                  keywords={user.keywordList}
                  isBookmarked={user.isBookmarked}
                  onClick={() => router.push(`/profile/${user.userUuid}`)}
                  showButton={false}
                  hideBookmark={(user.userUuid===loggedInUserId)}
                  onBookmarkClick={(e) => {
                    e?.stopPropagation();
                    requireAuth(async () => {
                      try {
                        if (user.isBookmarked) {
                          await profileAPI.removeBookmark(user.userUuid);
                        } else {
                          await profileAPI.addBookmark(user.userUuid);
                        }
                        setUsers(prev => prev.map(u =>
                          u.userUuid === user.userUuid
                            ? { ...u, isBookmarked: !u.isBookmarked }
                            : u
                        ));
                      } catch (error) {
                        console.error('북마크 처리 실패:', error);
                      }
                    });
                  }}
                  className='hover:shadow-[0_8px_20px_rgba(0,0,0,0.12)] hover:-translate-y-0.3'
                />
              ))
            )}
          </div>
        </section>

        {/* Pagination */}
        {(activeTab === 'user' ? totalUserPages : totalBlendingPages) > 1 && (
          <section className="flex justify-center">
            <Pagination
              currentPage={currentPage}
              totalPages={activeTab === 'user' ? totalUserPages : totalBlendingPages}
              onPageChange={setCurrentPage}
            />
          </section>
        )}
      </main>

      {/* Login Modal */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={closeLoginModal}
        onKakaoLogin={() => {
          window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/oauth2/authorization/kakao`;
        }}
        onGoogleLogin={() => {
          window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/oauth2/authorization/google`;
        }}
      />
    </div>
  );
}
