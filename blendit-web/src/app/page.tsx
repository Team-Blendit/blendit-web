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

// 직군 필터 옵션 (한글 -> Position 매핑)
const positionFilterOptions: { label: string; value: Position | '' }[] = [
  { label: '전체', value: '' },
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

export default function HomePage() {
  const { user } = useAuthStore();
  const loggedInUserId = user?.id;

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

  // Mock data for blending cards
  const mockBlendingCards = Array.from({ length: 16 }, (_, i) => ({
    id: i + 1,
    title: i % 2 === 0 ? '디자이너 10년차의 멘토링' : '네카라쿠배 디자이너가 알려주는 실무 팁',
    userName: i % 3 === 0 ? '네카라쿠배의디자이너' : '김개발',
    userJob: i % 2 === 0 ? '디자인' : '백엔드',
    userCareer: i % 3 === 0 ? '시니어 (9년이상)' : i % 3 === 1 ? '미들 (4~6년)' : '주니어 (1~3년)',
    userLocation: '서울 강남구',
    keywords: ['실무 경험', '멘토링', '사이드 프로젝트'],
    currentNum: i % 5,
    totalNum: 5,
    isRecruiting: i % 2 === 0,
  }));

  return (
    <div className="min-h-screen flex flex-col gap-[30px] pb-[309.06px] px-auto">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="max-w-[1440px] mx-auto flex flex-col gap-[30px]">
        {/* Banner */}
        <section className="w-full h-[400px] bg-[#EEEEEE] rounded-[20px] flex items-center justify-center">
          <p className="text-2xl font-medium text-[#999999]">배너 영역 (디자인 확정 대기)</p>
        </section>

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
                  options: positionFilterOptions.map(opt => opt.label),
                  value: positionFilterOptions.find(opt => opt.value === filterValues.job)?.label || '전체',
                  onChange: (value) => {
                    const selected = positionFilterOptions.find(opt => opt.label === value);
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
                    options: ['1-2명', '3-5명', '6-10명', '10명 이상'],
                    value: filterValues.people,
                    onChange: (value: string | boolean) => setFilterValues(prev => ({ ...prev, people: value as string })),
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
              mockBlendingCards.map((card) => (
                <Card
                  key={card.id}
                  variant="main"
                  title={card.title}
                  userName={card.userName}
                  userJob={card.userJob}
                  userCareer={card.userCareer}
                  userLocation={card.userLocation}
                  keywords={card.keywords}
                  currentNum={card.currentNum}
                  totalNum={card.totalNum}
                  isRecruiting={card.isRecruiting}
                  onClick={() => router.push(`/${card.id}`)}
                  onButtonClick={() => console.log('Detail:', card.id)}
                  className='hover:shadow-[0_8px_20px_rgba(0,0,0,0.12)] hover:-translate-y-0.3'
                />
              ))
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
                  onBookmarkClick={async (e) => {
                    e?.stopPropagation();
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
                  }}
                  className='hover:shadow-[0_8px_20px_rgba(0,0,0,0.12)] hover:-translate-y-0.3'
                />
              ))
            )}
          </div>
        </section>

        {/* Pagination */}
        <section className="flex justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={activeTab === 'user' ? totalUserPages : 3}
            onPageChange={setCurrentPage}
          />
        </section>
      </main>
    </div>
  );
}
