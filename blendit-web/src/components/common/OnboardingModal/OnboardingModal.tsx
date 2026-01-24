'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/common/Button';
import { SelectField } from '@/components/common/SelectField';
import { FlowModalHeader } from '@/components/common/FlowModalHeader';
import { InputField } from '@/components/common/InputField';
import KeywordChip from '@/components/common/KeywordChip';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (data: OnboardingData) => void;
}

export interface OnboardingData {
  jobCategory: string;
  experience: string;
  email: string;
  location1: string;
  location2: string;
  interests: string[];
  keywords: string[];
  nickname: string;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({
  isOpen,
  onClose,
  onComplete,
}) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<OnboardingData>({
    jobCategory: '',
    experience: '',
    email: '',
    location1: '',
    location2: '',
    interests: [],
    keywords: [],
    nickname: '',
  });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleNext = () => {
    if (step < 5) {
      setStep(step + 1);
    } else {
      onComplete(formData);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleKeywordToggle = (keyword: string) => {
    setFormData(prev => {
      const isSelected = prev.keywords.includes(keyword);
      if (isSelected) {
        return { ...prev, keywords: prev.keywords.filter(k => k !== keyword) };
      } else {
        if (prev.keywords.length >= 3) {
          return prev;
        }
        return { ...prev, keywords: [...prev.keywords, keyword] };
      }
    });
  };

  const isStep1Valid = formData.jobCategory && formData.experience;
  const isStep2Valid = formData.email && formData.location1 && formData.location2;
  const isStep3Valid = formData.keywords.length > 0;

  const canProceed = () => {
    switch (step) {
      case 1:
        return isStep1Valid;
      case 2:
        return isStep2Valid;
      case 3:
        return isStep3Valid;
      case 4:
        return formData.nickname !== '';
      case 5:
        return true;
      default:
        return false;
    }
  };

  const renderStep1 = () => (
    <>
      <div className="flex flex-col gap-[16px]">
        <h2 className="text-[28px] font-semibold leading-[34px] text-[var(--text-primary)]">
          직군, 경력을 선택해주세요
        </h2>
        <p className="text-[18px] font-normal leading-[24px] text-[var(--text-secondary)]">
          직군과 경력에 맞는 콘텐츠를 추천해드리기 위해<br />
          몇 가지 정보를 먼저 알려주세요.
        </p>
      </div>

      <div className="flex flex-col items-start gap-[20px] self-stretch">
        <SelectField
          label="직군"
          required
          placeholder="직군"
          options1={['프론트엔드', '백엔드', 'PM', '마케팅', '디자인', '데이터', 'AI', '보안']}
          onSelect1={(value: string) => setFormData({ ...formData, jobCategory: value })}
        />

        <SelectField
          label="경력"
          required
          placeholder="경력"
          options1={['신입', '주니어 (1~3년)', '미들 (3~6년)', '시니어 (7년 이상)']}
          onSelect1={(value: string) => setFormData({ ...formData, experience: value })}
        />
      </div>
    </>
  );

  const renderStep2 = () => {
    return (
      <>
      <div className="flex flex-col gap-[16px]">
        <h2 className="text-[28px] font-semibold leading-[34px] text-[var(--text-primary)]">
          이메일, 활동 지역을 입력해주세요
        </h2>
      </div>

      <div className="flex flex-col items-start gap-[20px] self-stretch">
        <InputField 
          label="이메일" 
          required 
          placeholder="example@domain.com" 
          onChange={(value: string) => setFormData({ ...formData, email: value })}
        />

        <SelectField
          label="활동 지역"
          layout='double'
          required
          searchable2
          placeholder="시/도"
          options1={['서울특별시']}
          onSelect1={(value: string) => setFormData({ ...formData, location1: value })}
          placeholder2='시/구'
          options2={['강남구', '강동구', '강북구', '강서구', '관악구', '광진구', '구로구', '금천구', '노원구', '도봉구', '동대문구', '동작구', '마포구', '서대문구', '서초구', '성동구', '성북구', '송파구', '양천구', '영등포구', '용산구', '은평구', '종로구', '중구', '중랑구']}
          onSelect2={(value: string) => setFormData({ ...formData, location2: value })}
        />
      </div>
    </>
    );
  };

  const renderStep3 = () => {
    const keywordOptions = [
      '실무', '멘토링', '스터디', '사이드프로젝트',
      '트렌드', '포트폴리오', '자소서', '면접',
      '커리어', '이직', '협업',
    ];

    return (
      <>
      <div className="flex flex-col gap-[16px] items-start">
        <div className="flex flex-col items-start gap-[36px]">
          <div className="flex flex-col gap-[16px]">
            <h2 className="text-[28px] font-semibold leading-[34px] text-[var(--text-primary)]">
                현재 관심있는 키워드를 선택해주세요
            </h2>
            <p className="text-[18px] font-normal leading-[24px] text-[var(--text-secondary)]">
                관심 있는 키워드를 최대 3개까지 선택할 수 있어요.
            </p>
          </div>

          <div className="flex flex-wrap items-start gap-y-[16px] gap-x-[8px] self-stretch">
            {keywordOptions.map((keyword) => (
              <KeywordChip
                key={keyword}
                label={keyword}
                selected={formData.keywords.includes(keyword)}
                onClick={() => handleKeywordToggle(keyword)}
              />
            ))}
          </div>
        </div>

        <div className="px-[12px] flex items-center min-h-[24px]" />
      </div>
      </>
    );
  };

  const renderStep4 = () => {
    return (
      <>
      <div className="flex flex-col gap-[16px]">
        <h2 className="text-[28px] font-semibold leading-[34px] text-[var(--text-primary)]">
          활동에 사용할 닉네임을 입력해주세요
        </h2>
      </div>

      <InputField
        label="닉네임"
        required
        placeholder="닉네임을 입력해주세요"
        onChange={(value: string) => setFormData({ ...formData, nickname: value })}
      />
      </>
    )
  };

  const renderStep5 = () => {
    return (
      <>
        <div className='flex flex-col gap-[24px] items-center w-full'>
          <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M70.5813 32.1313C69.4031 30.9 68.1844 29.6313 67.725 28.5156C67.3 27.4937 67.275 25.8 67.25 24.1594C67.2031 21.1094 67.1531 17.6531 64.75 15.25C62.3469 12.8469 58.8906 12.7969 55.8406 12.75C54.2 12.725 52.5062 12.7 51.4844 12.275C50.3719 11.8156 49.1 10.5969 47.8687 9.41875C45.7125 7.34687 43.2625 5 40 5C36.7375 5 34.2906 7.34687 32.1313 9.41875C30.9 10.5969 29.6313 11.8156 28.5156 12.275C27.5 12.7 25.8 12.725 24.1594 12.75C21.1094 12.7969 17.6531 12.8469 15.25 15.25C12.8469 17.6531 12.8125 21.1094 12.75 24.1594C12.725 25.8 12.7 27.4937 12.275 28.5156C11.8156 29.6281 10.5969 30.9 9.41875 32.1313C7.34687 34.2875 5 36.7375 5 40C5 43.2625 7.34687 45.7094 9.41875 47.8687C10.5969 49.1 11.8156 50.3688 12.275 51.4844C12.7 52.5062 12.725 54.2 12.75 55.8406C12.7969 58.8906 12.8469 62.3469 15.25 64.75C17.6531 67.1531 21.1094 67.2031 24.1594 67.25C25.8 67.275 27.4937 67.3 28.5156 67.725C29.6281 68.1844 30.9 69.4031 32.1313 70.5813C34.2875 72.6531 36.7375 75 40 75C43.2625 75 45.7094 72.6531 47.8687 70.5813C49.1 69.4031 50.3688 68.1844 51.4844 67.725C52.5062 67.3 54.2 67.275 55.8406 67.25C58.8906 67.2031 62.3469 67.1531 64.75 64.75C67.1531 62.3469 67.2031 58.8906 67.25 55.8406C67.275 54.2 67.3 52.5062 67.725 51.4844C68.1844 50.3719 69.4031 49.1 70.5813 47.8687C72.6531 45.7125 75 43.2625 75 40C75 36.7375 72.6531 34.2906 70.5813 32.1313ZM54.2688 34.2688L36.7688 51.7688C36.5366 52.0012 36.2608 52.1856 35.9574 52.3114C35.6539 52.4372 35.3285 52.502 35 52.502C34.6715 52.502 34.3461 52.4372 34.0426 52.3114C33.7392 52.1856 33.4634 52.0012 33.2312 51.7688L25.7312 44.2688C25.2621 43.7997 24.9986 43.1634 24.9986 42.5C24.9986 41.8366 25.2621 41.2003 25.7312 40.7312C26.2003 40.2621 26.8366 39.9986 27.5 39.9986C28.1634 39.9986 28.7997 40.2621 29.2688 40.7312L35 46.4656L50.7312 30.7312C50.9635 30.499 51.2393 30.3147 51.5428 30.189C51.8462 30.0633 52.1715 29.9986 52.5 29.9986C52.8285 29.9986 53.1538 30.0633 53.4572 30.189C53.7607 30.3147 54.0365 30.499 54.2688 30.7312C54.501 30.9635 54.6853 31.2393 54.811 31.5428C54.9367 31.8462 55.0014 32.1715 55.0014 32.5C55.0014 32.8285 54.9367 33.1538 54.811 33.4572C54.6853 33.7607 54.501 34.0365 54.2688 34.2688Z" fill="#53A6FF"/>
          </svg>
          
          <div className="flex flex-col gap-[16px] text-center w-full self-stretch">
            <h2 className="text-[28px] font-semibold leading-[34px] text-[var(--text-primary)]">
              회원가입이 완료되었어요!
            </h2>
            <p className="text-[18px] font-normal leading-[24px] text-[var(--text-secondary)]">
              프로필에 정보를 미리 정리해두면<br />
              활동할 때 더 편하게 소통할 수 있어요.
            </p>
          </div>
        </div>

        <div className="flex flex-col items-start gap-[48px] w-full">
          <div className="flex gap-[24px] justify-center items-center w-full">
            <Button
              variant="secondary"
              size="lg"
              onClick={() => onComplete(formData)}
              className="flex-1"
            >
              건너뛰기
            </Button>
            <Button
              variant="primary"
              size="lg"
              onClick={() => {
              // TODO: 프로필 완성 페이지로 이동
              onComplete(formData);
              }}
              className="flex-1"
            >
              프로필 완성하기
            </Button>
          </div>
        </div>
      </>
    )
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: 'rgba(30, 30, 30, 0.30)' }}
      onClick={onClose}
    >
      <div
        className={`bg-white w-[640px] rounded-[28px] px-[36px] pt-[28px] pb-[36px] flex flex-col items-start 
            ${step !== 5 ? 'gap-[28px]' : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <FlowModalHeader
          currentStep={step as 1 | 2 | 3 | 4}
          showStepIndicator={step !== 5}
          showBackButton={step == 1 ? false : true}
          onBack={handleBack}
          onClose={onClose}
        />

        {/* Content */}
        <div className="flex flex-col items-start self-stretch gap-[36px]">
          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}
          {step === 4 && renderStep4()}
          {step === 5 && renderStep5()}
        </div>

        {/* Next Button - 5단계가 아닐 때만 표시 */}
        {step !== 5 && (
          <Button
            variant="primary"
            size="lg"
            onClick={handleNext}
            disabled={!canProceed()}
            className="w-full"
          >
            다음
          </Button>
        )}
      </div>
    </div>
  );
};
