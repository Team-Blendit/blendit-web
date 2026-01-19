'use client';

import { useState } from 'react';
import { Header } from '@/components/common/Header';
import { SearchBar } from '@/components/common/SearchBar';
import FilterSet from '@/components/common/FilterSet';
import Tab from '@/components/common/Tab';
import { Card } from '@/components/common/Card';
import Pagination from '@/components/common/Pagination';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('networking');
  const [currentPage, setCurrentPage] = useState(1);
  const [filterValues, setFilterValues] = useState({
    job: '',
    keyword: '',
    region: '',
    people: '',
    recruiting: false,
    bookmarked: false,
  });

  // Mock data for cards
  const mockCards = Array.from({ length: 16 }, (_, i) => ({
    id: i + 1,
    title: i % 2 === 0 ? '디자이너 10년차의 멘토링' : '네카라쿠배 디자이너가 알려주는 실무 팁',
    userName: i % 3 === 0 ? '네카라쿠배의디자이너' : '김개발',
    job: i % 2 === 0 ? '디자인' : 'Text',
    career: 'Text',
    location: 'Text',
    keywords: ['실무 경험', '멘토링'],
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
                label="전체 네트워킹"
                active={activeTab === 'networking'}
                onClick={() => setActiveTab('networking')}
              />
              <Tab
                label="전체 유저"
                active={activeTab === 'user'}
                onClick={() => setActiveTab('user')}
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
                  options: ['개발자', '디자이너', '기획자', 'PM', '마케터'],
                  value: filterValues.job,
                  onChange: (value) => setFilterValues(prev => ({ ...prev, job: value as string })),
                },
                {
                  type: 'dropdown',
                  label: '키워드',
                  options: ['React', 'TypeScript', 'Next.js', 'Tailwind', 'Node.js'],
                  value: filterValues.keyword,
                  onChange: (value) => setFilterValues(prev => ({ ...prev, keyword: value as string })),
                },
                {
                  type: 'dropdown',
                  label: '지역',
                  options: ['서울', '경기', '부산', '대구', '기타'],
                  value: filterValues.region,
                  onChange: (value) => setFilterValues(prev => ({ ...prev, region: value as string })),
                },
                {
                  type: 'dropdown',
                  label: '인원수',
                  options: ['1-2명', '3-5명', '6-10명', '10명 이상'],
                  value: filterValues.people,
                  onChange: (value) => setFilterValues(prev => ({ ...prev, people: value as string })),
                },
                {
                  type: 'select',
                  label: '모집중',
                  selected: filterValues.recruiting,
                  onChange: (selected) => {
                    if (selected as boolean) {
                      setFilterValues(prev => ({ ...prev, recruiting: true }));
                    } else {
                      setFilterValues(prev => ({ ...prev, recruiting: false }));
                    }
                  }
                },
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
              ]}
            />
            <SearchBar placeholder="검색" className="w-[287px]" />
          </section>
        </div>
        
        {/* Card Grid */}
        <section className="flex flex-col gap-[16px] items-stretch">
          <div className="grid grid-cols-4 gap-x-[24px] gap-y-[30px]">
            {mockCards.map((card) => (
              <Card
                key={card.id}
                title={card.title}
                userName={card.userName}
                job={card.job}
                career={card.career}
                location={card.location}
                keywords={card.keywords}
                currentNum={card.currentNum}
                totalNum={card.totalNum}
                isRecruiting={card.isRecruiting}
                onDetailClick={() => console.log('Detail:', card.id)}
              />
            ))}
          </div>
        </section>

        {/* Pagination */}
        <section className="flex justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={3}
            onPageChange={setCurrentPage}
          />
        </section>
      </main>
    </div>
  );
}
