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
import { BlendingDetail } from '@/lib/types/blending';

interface KeywordItem {
  uuid: string;
  name: string;
}

interface NetworkingEditClientProps {
  id: string;
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

export function NetworkingEditClient({ id }: NetworkingEditClientProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [keywordList, setKeywordList] = useState<KeywordItem[]>([]);
  const [formData, setFormData] = useState({
    jobCategory: '',
    keywords: [] as string[], // UUID 배열
    keywordNames: [] as string[], // 이름 배열 (SelectField 표시용)
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
  const [errors, setErrors] = useState({
    keywords: '',
    title: '',
    content: '',
    openChatLink: '',
  });

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

  // 블렌딩 상세 데이터 불러오기
  useEffect(() => {
    const fetchBlendingDetail = async () => {
      try {
        setIsLoading(true);
        const data: BlendingDetail = await blendingAPI.getBlendingDetail(id);

        // 날짜 파싱
        const scheduleDate = new Date(data.schedule);
        const year = `${scheduleDate.getFullYear()}년`;
        const month = `${scheduleDate.getMonth() + 1}월`;
        const day = `${scheduleDate.getDate()}일`;

        // 지역 파싱 (예: "서울특별시 강남구" -> location1: "서울특별시", location2: "강남구")
        const regionParts = data.region.split(' ');
        const location1 = regionParts[0] || '';
        const location2 = regionParts.slice(1).join(' ') || '';

        // 직군 찾기 (API에서 한글로 올 수도 있고 영문 코드로 올 수도 있음)
        const jobCategory = data.position;

        setFormData({
          jobCategory,
          keywords: [], // 키워드 UUID는 keywordList 로드 후 설정
          keywordNames: data.keywords, // API에서 받은 키워드 이름
          location1,
          location2,
          year,
          month,
          day,
          participants: `${data.capacity}명`,
          openChatLink: data.openChattingUrl || '',
          title: data.title,
          content: data.content,
          autoApproval: data.autoApproval,
        });
      } catch (err) {
        console.error('블렌딩 상세 조회 실패:', err);
        setError('블렌딩 정보를 불러오는데 실패했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlendingDetail();
  }, [id]);

  // 키워드 이름을 UUID로 매핑 (keywordList와 formData.keywordNames가 모두 로드된 후)
  useEffect(() => {
    if (keywordList.length > 0 && formData.keywordNames.length > 0 && formData.keywords.length === 0) {
      const uuids = formData.keywordNames
        .map(name => keywordList.find(k => k.name === name)?.uuid)
        .filter((uuid): uuid is string => !!uuid);
      setFormData(prev => ({ ...prev, keywords: uuids }));
    }
  }, [keywordList, formData.keywordNames, formData.keywords.length]);

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

      // position 변환 (한글 -> 영문 코드, 이미 영문 코드면 그대로)
      const positionOption = positionFilterOptions.find(
        opt => opt.value === formData.jobCategory || opt.label === formData.jobCategory
      );
      const position = (positionOption?.value as Position) || 'ALL';

      await blendingAPI.updateBlending(id, {
        title: formData.title,
        content: formData.content,
        position,
        capacity,
        region,
        openChattingUrl: formData.openChatLink || undefined,
        schedule,
        autoApproval: formData.autoApproval,
        keywordUuidList: formData.keywords,
      });

      alert('블렌딩이 수정되었습니다.');
      router.push(`/blending/manage/${id}`);
    } catch (error) {
      console.error('블렌딩 수정 실패:', error);
      alert('블렌딩 수정에 실패했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    router.back();
  };

  const hasErrors = Object.values(errors).some(error => error !== '');

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
    formData.content &&
    !hasErrors;

  // 로딩 상태
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col gap-[29.61px] pb-[94.39px] px-auto">
        <Header />
        <div className="w-[1440px] mx-auto flex items-center justify-center h-[400px]">
          <p className="text-[var(--text-secondary)]">로딩 중...</p>
        </div>
      </div>
    );
  }

  // 에러 상태
  if (error) {
    return (
      <div className="min-h-screen flex flex-col gap-[29.61px] pb-[94.39px] px-auto">
        <Header />
        <div className="w-[1440px] mx-auto flex items-center justify-center h-[400px]">
          <p className="text-[var(--text-secondary)]">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col gap-[29.61px] pb-[94.39px] px-auto">
      {/* Header */}
      <Header />

      <div className="w-[1440px] mx-auto flex flex-col gap-[80px] items-start">
        {/* Title Section */}
        <div className="flex items-center gap-[24px] self-stretch">
          <button onClick={handleBack} className="flex p-[4px] items-center gap-[8px]">
            <CaretLeftIcon />
          </button>
          <h1 className="font-bold text-[28px] leading-[34px] text-(--text-primary)">
            블렌딩 수정하기
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
              value={positionFilterOptions.find(opt => opt.value === formData.jobCategory || opt.label === formData.jobCategory)?.label || ''}
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
              value={formData.participants}
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
              value={formData.keywordNames}
              onSelect1={(value) => {
                if (Array.isArray(value)) {
                  // 선택된 이름들을 UUID로 변환
                  const uuids = value
                    .map(name => keywordList.find(k => k.name === name)?.uuid)
                    .filter((uuid): uuid is string => !!uuid);

                  setFormData(prev => {
                    // 이전보다 개수가 줄어드는 경우(해제)는 항상 허용
                    const isDeselecting = uuids.length < prev.keywords.length;

                    if (uuids.length > 3 && !isDeselecting) {
                      setErrors(prevErrors => ({ ...prevErrors, keywords: '최대 3개까지 선택할 수 있어요' }));
                      return prev;
                    }
                    setErrors(prevErrors => ({ ...prevErrors, keywords: uuids.length > 3 ? '최대 3개까지 선택할 수 있어요' : '' }));
                    return { ...prev, keywords: uuids, keywordNames: value };
                  });
                } else {
                  const selected = keywordList.find(k => k.name === value);
                  if (selected) {
                    setFormData(prev => {
                      const newKeywords = [selected.uuid];
                      if (newKeywords.length > 3) {
                        setErrors(prevErrors => ({ ...prevErrors, keywords: '최대 3개까지 선택할 수 있어요' }));
                        return prev;
                      }
                      setErrors(prevErrors => ({ ...prevErrors, keywords: '' }));
                      return { ...prev, keywords: newKeywords, keywordNames: [value] };
                    });
                  }
                }
              }}
              error={errors.keywords}
            />

            {/* 일정 */}
            <SelectField
              label="일정"
              required
              layout="triple"
              placeholder="년"
              placeholder2="월"
              placeholder3="일"
              value={formData.year}
              value2={formData.month}
              value3={formData.day}
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
              onChange={(value: string) => {
                setFormData(prev => ({ ...prev, openChatLink: value }));
                // 빈 값이면 에러 초기화
                if (!value) {
                  setErrors(prev => ({ ...prev, openChatLink: '' }));
                  return;
                }
                // URL 형식 검증
                const urlRegex = /^https?:\/\/.+\..+/;
                if (!urlRegex.test(value)) {
                  setErrors(prev => ({ ...prev, openChatLink: '올바른 링크 형식을 입력해주세요' }));
                } else {
                  setErrors(prev => ({ ...prev, openChatLink: '' }));
                }
              }}
              error={errors.openChatLink}
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
                onChange={(value: string) => {
                  if (value.length > 50) {
                    setErrors(prev => ({ ...prev, title: '제목은 최대 50자까지 입력할 수 있어요' }));
                  } else {
                    setErrors(prev => ({ ...prev, title: '' }));
                  }
                  setFormData(prev => ({ ...prev, title: value }));
                }}
                error={errors.title}
            />
            </div>

            {/* Content Section with Quill Editor */}
            <div className="flex flex-col w-full self-stretch">
            <QuillEditor
                value={formData.content}
                onChange={(value: string) => {
                  // HTML 태그를 제외한 순수 텍스트 길이 계산
                  const textContent = value.replace(/<[^>]*>/g, '').trim();
                  if (textContent.length > 1000) {
                    setErrors(prev => ({ ...prev, content: '본문은 최대 1000자까지 입력할 수 있어요' }));
                  } else {
                    setErrors(prev => ({ ...prev, content: '' }));
                  }
                  setFormData(prev => ({ ...prev, content: value }));
                }}
                placeholder="내용을 입력해주세요"
                maxLength={1000}
            />
            {errors.content && (
              <p className="mt-[8px] px-[12px] text-[18px] leading-[24px] text-[var(--text-error)]">
                {errors.content}
              </p>
            )}
            </div>
        </div>

        {/* Submit Button */}
        <div className="flex flex-col justify-center items-end self-stretch gap-[8px]">
          <Button
            variant={isFormValid ? 'primary' : 'secondary'}
            size="md"
            onClick={handleSubmit}
            disabled={!isFormValid || isSubmitting}
            className="w-[188px]"
          >
            수정완료
          </Button>
        </div>
      </div>
    </div>
  );
}
