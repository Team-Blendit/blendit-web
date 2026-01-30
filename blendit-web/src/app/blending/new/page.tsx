'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { SelectField } from '@/components/common/SelectField';
import { InputField } from '@/components/common/InputField';
import { QuillEditor } from '@/components/common/QuillEditor';
import { Button } from '@/components/common/Button';
import { Header } from '@/components/layout/Header';
import { apiClient } from '@/lib/api';
import { blendingAPI } from '@/lib/api/blending';
import { Position } from '@/lib/types/profile';

interface KeywordItem {
  uuid: string;
  name: string;
}

const positionFilterOptions: { label: string; value: Position | '' }[] = [
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

// Back Arrow Icon
const CaretLeftIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15.5312 18.9693C15.6009 19.039 15.6562 19.1217 15.6939 19.2128C15.7316 19.3038 15.751 19.4014 15.751 19.4999C15.751 19.5985 15.7316 19.6961 15.6939 19.7871C15.6562 19.8781 15.6009 19.9609 15.5312 20.0306C15.4615 20.1002 15.3788 20.1555 15.2878 20.1932C15.1967 20.2309 15.0991 20.2503 15.0006 20.2503C14.902 20.2503 14.8045 20.2309 14.7134 20.1932C14.6224 20.1555 14.5396 20.1002 14.47 20.0306L6.96996 12.5306C6.90023 12.4609 6.84491 12.3782 6.80717 12.2871C6.76943 12.1961 6.75 12.0985 6.75 11.9999C6.75 11.9014 6.76943 11.8038 6.80717 11.7127C6.84491 11.6217 6.90023 11.539 6.96996 11.4693L14.47 3.9693C14.6107 3.82857 14.8016 3.74951 15.0006 3.74951C15.1996 3.74951 15.3905 3.82857 15.5312 3.9693C15.6719 4.11003 15.751 4.30091 15.751 4.49993C15.751 4.69895 15.6719 4.88982 15.5312 5.03055L8.5609 11.9999L15.5312 18.9693Z" fill="#121212"/>
  </svg>
);

export default function NetworkingCreatePage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    jobCategory: '',
    keywords: [] as string[], // UUID 배열로 변경
    location1: '',
    location2: '',
    year: '',
    month: '',
    day: '',
    participants: '',
    openChatLink: '',
    title: '',
    content: '',
    autoApproval: false,
  });

  const handleSubmit = async () => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      // 일정 생성 (년/월/일 -> ISO 8601)
      const year = parseInt(formData.year.replace('년', ''));
      const month = parseInt(formData.month.replace('월', ''));
      const day = parseInt(formData.day.replace('일', ''));
      const schedule = new Date(year, month - 1, day).toISOString();

      // 인원 파싱 (예: "5명" -> 5)
      const capacity = parseInt(formData.participants.replace('명', ''));

      // 지역 생성 (시/도 + 구)
      const region = `${formData.location1} ${formData.location2}`;

      await blendingAPI.createBlending({
        title: formData.title,
        content: formData.content,
        position: (formData.jobCategory as Position) || 'ALL',
        capacity,
        region,
        openChattingUrl: formData.openChatLink || undefined,
        schedule,
        autoApproval: formData.autoApproval,
        keywordUuidList: formData.keywords,
      });

      alert('블렌딩이 생성되었습니다.');
      router.push('/');
    } catch (error) {
      console.error('블렌딩 생성 실패:', error);
      alert('블렌딩 생성에 실패했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid =
    formData.jobCategory &&
    formData.keywords.length > 0 &&
    formData.location1 &&
    formData.location2 &&
    formData.year &&
    formData.month &&
    formData.day &&
    formData.participants &&
    formData.title &&
    formData.content;

  // 키워드 목록 상태
  const [keywordList, setKeywordList] = useState<KeywordItem[]>([]);

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

  return (
    <div className="min-h-screen flex flex-col gap-[29.61px] pb-[94.39px] px-auto">
      {/* Header */}
      <Header />

      <div className="w-[1440px] mx-auto flex flex-col gap-[80px] items-start">
        {/* Title Section */}
        <div className="flex items-center gap-[24px] self-stretch">
          <button className="flex p-[4px] items-center gap-[8px]">
            <CaretLeftIcon />
          </button>
          <h1 className="font-bold text-[28px] leading-[34px] text-(--text-primary)">
            네트워킹 만들기
          </h1>
        </div>

        {/* Form Section */}
        <div className="flex items-start gap-[40px] self-stretch">
          {/* Left Column */}
          <div className="flex-1 flex flex-col items-end gap-[30px]">
            {/* 직군 */}
            <SelectField
              label="직군"
              required
              placeholder="직군을 선택해주세요"
              options1={positionFilterOptions.filter(opt => opt.value !== '').map(opt => opt.label)}
              value={positionFilterOptions.find(opt => opt.value === formData.jobCategory)?.label || ''}
              onSelect1={(value) => {
                const label = Array.isArray(value) ? value[0] : value;
                const selected = positionFilterOptions.find(opt => opt.label === label);
                setFormData(prev => ({ ...prev, jobCategory: selected?.value || '' }));
              }}
            />

            {/* 지역 */}
            <SelectField
              label="지역"
              layout='double'
              required
              searchable2
              placeholder="시/도"
              value={formData.location1}
              options1={['서울특별시']}
              onSelect1={(value) => {
                setFormData(prev => ({ ...prev, location1: Array.isArray(value) ? value[0] : value }));
              }}
              placeholder2='시/구'
              value2={formData.location2}
              options2={['강남구', '강동구', '강북구', '강서구', '관악구', '광진구', '구로구', '금천구', '노원구', '도봉구', '동대문구', '동작구', '마포구', '서대문구', '서초구', '성동구', '성북구', '송파구', '양천구', '영등포구', '용산구', '은평구', '종로구', '중구', '중랑구']}
              onSelect2={(value) => {
                setFormData(prev => ({ ...prev, location2: Array.isArray(value) ? value[0] : value }));
              }}
            />

            {/* 인원 with 자동승인 toggle */}
            <SelectField
              label="인원"
              required
              placeholder="인원을 선택해주세요"
              options1={['2명', '3명', '4명', '5명', '6명', '7명', '8명', '9명', '10명']}
              onSelect1={(value) => setFormData(prev => ({ ...prev, participants: Array.isArray(value) ? value[0] : value }))}
              showAutoApproval={true}
              autoApprovalEnabled={formData.autoApproval}
              onAutoApprovalChange={(enabled) => setFormData(prev => ({ ...prev, autoApproval: enabled }))}
            />

          </div>

          {/* Right Column */}
          <div className="flex-1 flex flex-col gap-[30px]">
            {/* 키워드 */}
            <SelectField
              label="키워드"
              required
              multiple
              placeholder="키워드를 선택해주세요"
              options1={keywordList.map((k) => k.name)}
              onSelect1={(value) => {
                if (Array.isArray(value)) {
                  // 선택된 이름들을 UUID로 변환
                  const uuids = value
                    .map(name => keywordList.find(k => k.name === name)?.uuid)
                    .filter((uuid): uuid is string => !!uuid);
                  setFormData(prev => ({ ...prev, keywords: uuids }));
                } else {
                  const selected = keywordList.find(k => k.name === value);
                  if (selected) {
                    setFormData(prev => ({ ...prev, keywords: [selected.uuid] }));
                  }
                }
              }}
            />

            {/* 일정 */}
            <SelectField
              label="일정"
              required
              layout="triple"
              placeholder="년"
              placeholder2="월"
              placeholder3="일"
              options1={Array.from({ length: 6 }, (_, i) => `${(new Date().getFullYear() + i).toString()}년`)}
              options2={Array.from({ length: 12 }, (_, i) => `${i + 1}월`)}
              options3={Array.from({ length: 31 }, (_, i) => `${i + 1}일`)}
              onSelect1={(value) => setFormData(prev => ({ ...prev, year: Array.isArray(value) ? value[0] : value }))}
              onSelect2={(value) => setFormData(prev => ({ ...prev, month: Array.isArray(value) ? value[0] : value }))}
              onSelect3={(value) => setFormData(prev => ({ ...prev, day: Array.isArray(value) ? value[0] : value }))}
            />

            {/* 오픈채팅 */}
            <InputField
              label="오픈채팅"
              placeholder="내용을 입력해주세요"
              value={formData.openChatLink}
              required={false}
              onChange={(value: string) => setFormData(prev => ({ ...prev, openChatLink: value }))}
            />
          </div>
        </div>

        <div className="flex flex-col items-start self-stretch">
            {/* 제목 Section */}
            <div className="mb-[24px] w-full">
            <InputField
                label="제목"
                required
                placeholder="글 제목을 입력해주세요"
                value={formData.title}
                onChange={(value: string) => setFormData(prev => ({ ...prev, title: value }))}
            />
            </div>

            {/* Content Section with Quill Editor */}
            <div className="flex flex-col w-full self-stretch">
            <QuillEditor
                value={formData.content}
                onChange={(value: string) => setFormData(prev => ({ ...prev, content: value }))}
                placeholder="내용을 입력해주세요"
                maxLength={1000}
            />
            </div>
        </div>

        {/* Submit Button */}
        <div className="flex flex-col justify-center items-end self-stretch gap-[8px]">
          <Button
            variant={isFormValid ? 'primary' : 'secondary'}
            size="md"
            onClick={handleSubmit}
            disabled={!isFormValid}
            className="w-[188px]"
          >
            작성완료
          </Button>
        </div>
      </div>
    </div>
  );
}
