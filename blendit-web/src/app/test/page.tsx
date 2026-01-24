'use client';

import { Button } from '@/components/common/Button';
import { SocialLoginButton } from '@/components/common/SocialLoginButton';
import { StepIndicator } from '@/components/common/StepIndicator';
import { Badge } from '@/components/common/Badge';
import { SelectField } from '@/components/common/SelectField';
import { InputField } from '@/components/common/InputField';
import { SearchBar } from '@/components/common/SearchBar';
import PageButton from '@/components/common/PageButton';
import PageInfo from '@/components/common/PageInfo';
import Pagination from '@/components/common/Pagination';
import Tab from '@/components/common/Tab';
import FilterChip from '@/components/common/FilterChip';
import SelectChip from '@/components/common/SelectChip';
import FilterSet from '@/components/common/FilterSet';
import KeywordChip from '@/components/common/KeywordChip';
import { useState } from 'react';
import { Tooltip } from '@/components/common/Tooltip';

// Alarm 아이콘
const AlarmIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12.0004 3.75042C10.2204 3.75042 8.48033 4.27826 7.00029 5.26719C5.52024 6.25612 4.36669 7.66173 3.6855 9.30627C3.00431 10.9508 2.82608 12.7604 3.17335 14.5062C3.52062 16.2521 4.37778 17.8557 5.63646 19.1144C6.89513 20.373 8.49878 21.2302 10.2446 21.5775C11.9904 21.9247 13.8 21.7465 15.4446 21.0653C17.0891 20.3841 18.4947 19.2306 19.4836 17.7505C20.4726 16.2705 21.0004 14.5304 21.0004 12.7504C20.9977 10.3643 20.0486 8.07671 18.3614 6.38947C16.6741 4.70223 14.3865 3.75315 12.0004 3.75042ZM12.0004 20.2504C10.5171 20.2504 9.06701 19.8105 7.83364 18.9864C6.60027 18.1623 5.63898 16.991 5.07132 15.6205C4.50366 14.2501 4.35514 12.7421 4.64453 11.2872C4.93392 9.83238 5.64822 8.49601 6.69712 7.44712C7.74601 6.39822 9.08238 5.68392 10.5372 5.39453C11.9921 5.10514 13.5001 5.25366 14.8705 5.82132C16.241 6.38898 17.4123 7.35027 18.2364 8.58364C19.0606 9.81701 19.5004 11.2671 19.5004 12.7504C19.4982 14.7389 18.7073 16.6452 17.3013 18.0513C15.8952 19.4573 13.9889 20.2482 12.0004 20.2504ZM5.78104 3.53104L2.78104 6.53104C2.64031 6.67177 2.44944 6.75083 2.25042 6.75083C2.05139 6.75083 1.86052 6.67177 1.71979 6.53104C1.57906 6.39031 1.5 6.19944 1.5 6.00042C1.5 5.80139 1.57906 5.61052 1.71979 5.46979L4.71979 2.46979C4.86052 2.32906 5.05139 2.25 5.25042 2.25C5.44944 2.25 5.64031 2.32906 5.78104 2.46979C5.92177 2.61052 6.00083 2.80139 6.00083 3.00042C6.00083 3.19944 5.92177 3.39031 5.78104 3.53104ZM22.281 6.53104C22.2114 6.60077 22.1287 6.65609 22.0376 6.69384C21.9466 6.73158 21.849 6.75101 21.7504 6.75101C21.6519 6.75101 21.5543 6.73158 21.4632 6.69384C21.3722 6.65609 21.2894 6.60077 21.2198 6.53104L18.2198 3.53104C18.0791 3.39031 18 3.19944 18 3.00042C18 2.80139 18.0791 2.61052 18.2198 2.46979C18.3605 2.32906 18.5514 2.25 18.7504 2.25C18.9494 2.25 19.1403 2.32906 19.281 2.46979L22.281 5.46979C22.3508 5.53945 22.4061 5.62216 22.4438 5.71321C22.4816 5.80426 22.501 5.90185 22.501 6.00042C22.501 6.09898 22.4816 6.19657 22.4438 6.28762C22.4061 6.37867 22.3508 6.46139 22.281 6.53104ZM17.2504 12.0004C17.4493 12.0004 17.6401 12.0794 17.7807 12.2201C17.9214 12.3607 18.0004 12.5515 18.0004 12.7504C18.0004 12.9493 17.9214 13.1401 17.7807 13.2807C17.6401 13.4214 17.4493 13.5004 17.2504 13.5004H12.0004C11.8015 13.5004 11.6107 13.4214 11.4701 13.2807C11.3294 13.1401 11.2504 12.9493 11.2504 12.7504V7.50042C11.2504 7.3015 11.3294 7.11074 11.4701 6.97009C11.6107 6.82943 11.8015 6.75042 12.0004 6.75042C12.1993 6.75042 12.3901 6.82943 12.5307 6.97009C12.6714 7.11074 12.7504 7.3015 12.7504 7.50042V12.0004H17.2504Z"
      fill="currentColor"
    />
  </svg>
);

export default function ComponentTestPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState('tab1');
  const [selectedFilter, setSelectedFilter] = useState('');
  const [selectedChips, setSelectedChips] = useState<string[]>([]);
  const [filterValues, setFilterValues] = useState({
    job: '',
    keyword: '',
    region: '',
    people: '',
    recruiting: false,
    bookmark: false,
  });
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);
  
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-8">Components Test</h1>

      {/* Primary Buttons */}
      <section className="mb-8 bg-white p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Fill_Main_Btn (Primary)</h2>
        
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium mb-2">Sizes - Default State</h3>
            <div className="flex gap-4 items-center">
              <Button variant="primary" size="sm" leftIcon={<AlarmIcon />} rightIcon={<AlarmIcon />}>
                Small
              </Button>
              <Button variant="primary" size="md" leftIcon={<AlarmIcon />} rightIcon={<AlarmIcon />}>
                Medium
              </Button>
              <Button variant="primary" size="lg" leftIcon={<AlarmIcon />} rightIcon={<AlarmIcon />}>
                Large
              </Button>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-2">States - Medium Size</h3>
            <div className="flex gap-4 items-center flex-wrap">
              <Button variant="primary" leftIcon={<AlarmIcon />} rightIcon={<AlarmIcon />}>
                Default
              </Button>
              <Button variant="primary" disabled leftIcon={<AlarmIcon />} rightIcon={<AlarmIcon />}>
                Disabled
              </Button>
              <Button variant="primary" isLoading>
                Loading
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Secondary Buttons */}
      <section className="mb-8 bg-white p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Fill_Second_Btn (Secondary)</h2>
        
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium mb-2">Sizes - Default State</h3>
            <div className="flex gap-4 items-center">
              <Button variant="secondary" size="sm" leftIcon={<AlarmIcon />} rightIcon={<AlarmIcon />}>
                Small
              </Button>
              <Button variant="secondary" size="md" leftIcon={<AlarmIcon />} rightIcon={<AlarmIcon />}>
                Medium
              </Button>
              <Button variant="secondary" size="lg" leftIcon={<AlarmIcon />} rightIcon={<AlarmIcon />}>
                Large
              </Button>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-2">States - Medium Size</h3>
            <div className="flex gap-4 items-center flex-wrap">
              <Button variant="secondary" leftIcon={<AlarmIcon />} rightIcon={<AlarmIcon />}>
                Default
              </Button>
              <Button variant="secondary" disabled leftIcon={<AlarmIcon />} rightIcon={<AlarmIcon />}>
                Disabled
              </Button>
              <Button variant="secondary" isLoading>
                Loading
              </Button>
            </div>
          </div>
        </div>
      </section>


      {/* Social Login Buttons */}
      <section className="mt-8 bg-white p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Social Login Buttons</h2>
        <div className="space-y-4 max-w-[440px]">
          <SocialLoginButton provider="kakao" />
          <SocialLoginButton provider="google" />
          <SocialLoginButton provider="naver" />
        </div>
      </section>

      {/* Step Indicator */}
      <section className="mt-8 bg-white p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Step Indicator</h2>
        <div className="space-y-6">
          <div>
            <p className="text-sm text-gray-600 mb-2">Step 1</p>
            <StepIndicator currentStep={1} />
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-2">Step 2</p>
            <StepIndicator currentStep={2} />
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-2">Step 3</p>
            <StepIndicator currentStep={3} />
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-2">Step 4</p>
            <StepIndicator currentStep={4} />
          </div>
        </div>
      </section>

      {/* Badges */}
      <section className="mt-8 bg-white p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Badges</h2>
        
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium mb-2">Solid Style</h3>
            <div className="flex gap-2 items-center flex-wrap">
              <Badge color="blue" style="solid" text="Badge" />
              <Badge color="gray" style="solid" text="Badge" />
              <Badge color="red" style="solid" text="Badge" />
              <Badge color="orange" style="solid" text="Badge" />
              <Badge color="green" style="solid" text="Badge" />
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-2">Outline Style</h3>
            <div className="flex gap-2 items-center flex-wrap">
              <Badge color="blue" style="outline" text="Badge" />
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-2">Recruit Style (모집 인원)</h3>
            <div className="flex gap-2 items-center flex-wrap">
              <Badge color="gray" style="recruit" currentNum={0} totalNum={0} />
              <Badge color="gray" style="recruit" currentNum={2} totalNum={4} />
              <Badge color="gray" style="recruit" currentNum={10} totalNum={20} />
            </div>
          </div>
        </div>
      </section>

      {/* Select Field */}
      <section className="mt-8 bg-white p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Select Field</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-medium mb-2">Single Select</h3>
            <SelectField 
              label="Text" 
              required={true}
              placeholder="Text"
              layout="single"
            />
          </div>

          <div>
            <h3 className="text-sm font-medium mb-2">Single Select with Error</h3>
            <SelectField 
              label="Text" 
              required={true}
              placeholder="Text"
              layout="single"
              error="필수 항목을 선택해 주세요."
            />
          </div>

          <div>
            <h3 className="text-sm font-medium mb-2">Double Select</h3>
            <SelectField 
              label="Text" 
              required={true}
              placeholder="Text"
              placeholder2="Text"
              layout="double"
            />
          </div>

          <div>
            <h3 className="text-sm font-medium mb-2">Double Select with Error</h3>
            <SelectField 
              label="Text" 
              required={true}
              placeholder="Text"
              placeholder2="Text"
              layout="double"
              error="필수 항목을 선택해 주세요."
            />
          </div>
        </div>
      </section>

      {/* Input Field */}
      <section className="mt-8 bg-white p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Input Field</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-medium mb-2">Default</h3>
            <InputField 
              label="Text" 
              required={true}
              placeholder="내용을 입력해주세요"
            />
          </div>

          <div>
            <h3 className="text-sm font-medium mb-2">With Error</h3>
            <InputField 
              label="Text" 
              required={true}
              placeholder="내용을 입력해주세요"
              error="필수 내용을 입력해주세요"
            />
          </div>

          <div>
            <h3 className="text-sm font-medium mb-2">Email Type</h3>
            <InputField 
              label="이메일" 
              required={true}
              placeholder="이메일을 입력해주세요"
              type="email"
            />
          </div>

          <div>
            <h3 className="text-sm font-medium mb-2">Password Type</h3>
            <InputField 
              label="비밀번호" 
              required={true}
              placeholder="비밀번호를 입력해주세요"
              type="password"
            />
          </div>
        </div>
      </section>

      {/* Search Bar */}
      <section className="mt-8 bg-white p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Search Bar</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-medium mb-2">Default</h3>
            <SearchBar placeholder="Text" />
          </div>

          <div>
            <h3 className="text-sm font-medium mb-2">Search Example</h3>
            <SearchBar 
              placeholder="검색어를 입력하세요" 
              onSearch={(value) => console.log('Search:', value)}
            />
          </div>
        </div>
      </section>

      {/* Page Button */}
      <section className="mb-8 bg-white p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">PageButton</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-medium mb-2">Directions</h3>
            <div className="flex gap-4 items-center">
              <PageButton direction="left" onClick={() => console.log('Previous')} />
              <PageButton direction="right" onClick={() => console.log('Next')} />
            </div>
          </div>
        </div>
      </section>

      {/* Page Info */}
      <section className="mb-8 bg-white p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">PageInfo</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-medium mb-2">Page Display</h3>
            <div className="flex gap-8 items-center">
              <PageInfo currentPage={1} totalPages={3} />
              <PageInfo currentPage={5} totalPages={10} />
              <PageInfo currentPage={23} totalPages={100} />
            </div>
          </div>
        </div>
      </section>

      {/* Pagination */}
      <section className="mb-8 bg-white p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Pagination</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-medium mb-2">Interactive Pagination</h3>
            <Pagination 
              currentPage={currentPage} 
              totalPages={5} 
              onPageChange={setCurrentPage}
            />
          </div>

          <div>
            <h3 className="text-sm font-medium mb-2">Static Examples</h3>
            <div className="space-y-4">
              <Pagination currentPage={1} totalPages={3} onPageChange={() => {}} />
              <Pagination currentPage={2} totalPages={3} onPageChange={() => {}} />
              <Pagination currentPage={3} totalPages={3} onPageChange={() => {}} />
            </div>
          </div>
        </div>
      </section>

      {/* Tab */}
      <section className="mb-8 bg-white p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Tab</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-medium mb-2">Basic States</h3>
            <div className="flex gap-4 items-end">
              <Tab label="Active" active={true} />
              <Tab label="Inactive" active={false} />
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-2">With Notification Badge</h3>
            <div className="flex gap-4 items-end">
              <Tab label="Active" active={true} notification={true} />
              <Tab label="Inactive" active={false} notification={true} />
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-2">Interactive Tabs</h3>
            <div className="flex gap-2 border-b border-gray-200">
              <Tab 
                label="Tab 1" 
                active={activeTab === 'tab1'} 
                onClick={() => setActiveTab('tab1')}
              />
              <Tab 
                label="Tab 2" 
                active={activeTab === 'tab2'} 
                notification={true}
                onClick={() => setActiveTab('tab2')}
              />
              <Tab 
                label="Tab 3" 
                active={activeTab === 'tab3'} 
                onClick={() => setActiveTab('tab3')}
              />
            </div>
            <div className="mt-4 p-4 bg-gray-50 rounded">
              <p className="text-sm">Selected: {activeTab}</p>
            </div>
          </div>
        </div>
      </section>

      {/* FilterChip */}
      <section className="mb-8 bg-white p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">FilterChip</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-medium mb-2">Basic Usage</h3>
            <div className="flex gap-4 items-start">
              <FilterChip 
                label="직무" 
                options={['개발자', '디자이너', '기획자', 'PM', '마케터']}
                value={selectedFilter}
                onChange={setSelectedFilter}
              />
            </div>
            {selectedFilter && (
              <div className="mt-4 p-4 bg-gray-50 rounded">
                <p className="text-sm">Selected: {selectedFilter}</p>
              </div>
            )}
          </div>

          <div>
            <h3 className="text-sm font-medium mb-2">Multiple FilterChips</h3>
            <div className="flex gap-4 items-start flex-wrap">
              <FilterChip 
                label="분야" 
                options={['프론트엔드', '백엔드', '풀스택', 'DevOps', 'AI/ML']}
              />
              <FilterChip 
                label="경력" 
                options={['신입', '1-3년', '3-5년', '5년 이상']}
              />
              <FilterChip 
                label="지역" 
                options={['서울', '경기', '부산', '대구', '기타']}
              />
            </div>
          </div>
        </div>
      </section>

      {/* SelectChip */}
      <section className="mb-8 bg-white p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">SelectChip</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-medium mb-2">Large Size - Line Style</h3>
            <div className="flex gap-3 items-center flex-wrap">
              <SelectChip label="Text" size="large" variant="line" selected={false} />
              <SelectChip label="Text" size="large" variant="line" selected={true} />
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-2">Large Size - Fill Style</h3>
            <div className="flex gap-3 items-center flex-wrap">
              <SelectChip label="Text" size="large" variant="fill" selected={false} />
              <SelectChip label="Text" size="large" variant="fill" selected={true} />
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-2">Small Size - Line Style</h3>
            <div className="flex gap-3 items-center flex-wrap">
              <SelectChip label="Text" size="small" variant="line" selected={false} />
              <SelectChip label="Text" size="small" variant="line" selected={true} />
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-2">Small Size - Fill Style</h3>
            <div className="flex gap-3 items-center flex-wrap">
              <SelectChip label="Text" size="small" variant="fill" selected={false} />
              <SelectChip label="Text" size="small" variant="fill" selected={true} />
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-2">Interactive Example</h3>
            <div className="flex gap-3 items-center flex-wrap">
              {['React', 'TypeScript', 'Next.js', 'Tailwind', 'Node.js'].map((tech) => (
                <SelectChip
                  key={tech}
                  label={tech}
                  size="large"
                  variant="fill"
                  selected={selectedChips.includes(tech)}
                  onClick={() => {
                    setSelectedChips(prev => 
                      prev.includes(tech) 
                        ? prev.filter(t => t !== tech)
                        : [...prev, tech]
                    );
                  }}
                />
              ))}
            </div>
            {selectedChips.length > 0 && (
              <div className="mt-4 p-4 bg-gray-50 rounded">
                <p className="text-sm">Selected: {selectedChips.join(', ')}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* FilterSet */}
      <section className="mb-8 bg-white p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">FilterSet</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-medium mb-2">Complete Filter Set</h3>
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
                  onChange: (value) => setFilterValues(prev => ({ ...prev, recruiting: value as boolean })),
                },
                {
                  type: 'select',
                  label: '북마크',
                  selected: filterValues.bookmark,
                  onChange: (value) => setFilterValues(prev => ({ ...prev, bookmark: value as boolean })),
                },
              ]}
            />
          </div>

          <div>
            <h3 className="text-sm font-medium mb-2">Applied Filters</h3>
            <div className="p-4 bg-gray-50 rounded">
              <pre className="text-xs">{JSON.stringify(filterValues, null, 2)}</pre>
            </div>
          </div>
        </div>
      </section>

      {/* KeywordChip */}
      <section className="mb-8 bg-white p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">KeywordChip</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-medium mb-2">Basic States</h3>
            <div className="flex gap-3 items-center flex-wrap">
              <KeywordChip label="키워드" selected={false} />
              <KeywordChip label="키워드" selected={true} />
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-2">Interactive Keywords</h3>
            <div className="flex gap-3 items-center flex-wrap">
              {['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Node.js', 'Python', 'Java', 'Spring'].map((keyword) => (
                <KeywordChip
                  key={keyword}
                  label={keyword}
                  selected={selectedKeywords.includes(keyword)}
                  onClick={() => {
                    setSelectedKeywords(prev => 
                      prev.includes(keyword) 
                        ? prev.filter(k => k !== keyword)
                        : [...prev, keyword]
                    );
                  }}
                />
              ))}
            </div>
            {selectedKeywords.length > 0 && (
              <div className="mt-4 p-4 bg-gray-50 rounded">
                <p className="text-sm">Selected Keywords: {selectedKeywords.join(', ')}</p>
              </div>
            )}
          </div>

          <div>
            <h3 className="text-sm font-medium mb-2">Various Labels</h3>
            <div className="flex gap-3 items-center flex-wrap">
              <KeywordChip label="짧은글" />
              <KeywordChip label="중간 길이의 키워드" />
              <KeywordChip label="이것은 좀 더 긴 키워드입니다" selected />
            </div>
          </div>
        </div>
      </section>

      <section className="mb-8 bg-white p-6 rounded-lg">
        <div className="space-y-6">
        <Tooltip content="상호 리뷰를 기반으로 대한 경험의 질을 반영한 지표예요." position="bottom">
          <span>000000000 블렌딩 ----------------- 지수</span>
        </Tooltip>
        </div>
      </section>

      <div className="h-16" />
    </div>
  );
}