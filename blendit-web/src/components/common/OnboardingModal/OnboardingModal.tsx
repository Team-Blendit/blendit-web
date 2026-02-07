'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/common/Button';
import { SelectField } from '@/components/common/SelectField';
import { FlowModalHeader } from '@/components/common/FlowModalHeader';
import { InputField } from '@/components/common/InputField';
import KeywordChip from '@/components/common/KeywordChip';
import { useAuthStore } from '@/stores/authStore';
import { apiClient } from '@/lib/api';
import { useRouter } from 'next/navigation';

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

interface KeywordItem {
  uuid: string;
  name: string;
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [keywordList, setKeywordList] = useState<KeywordItem[]>([]);
  const [emailError, setEmailError] = useState<string>('');
  const [nicknameError, setNicknameError] = useState<string>('');
  const { user } = useAuthStore();
  const router = useRouter();
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';

      // 키워드 목록 불러오기
      const fetchKeywords = async () => {
        try {
          const response = await apiClient.get('/keyword');
          if (response.data.result === 'SUCCESS' && response.data.data) {
            setKeywordList(response.data.data);
          }
        } catch {
          // 키워드 목록 불러오기 실패
        }
      };

      fetchKeywords();
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  // 한글 → API enum 매핑 함수들
  const mapPositionToApi = (position: string): string => {
    const mapping: { [key: string]: string } = {
      '프론트엔드': 'FRONTEND',
      '백엔드': 'BACKEND',
      'PM': 'PM',
      '마케팅': 'MARKETING',
      '디자인': 'DESIGN',
      '데이터': 'DATA',
      'AI': 'AI',
      '보안': 'SECURITY',
    };
    return mapping[position] || 'ALL';
  };

  const mapExperienceToApi = (experience: string): string => {
    const mapping: { [key: string]: string } = {
      '신입': 'NEWBIE',
      '주니어 (1~3년)': 'JUNIOR',
      '미들 (4~6년)': 'MIDDLE',
      '시니어 (7년 이상)': 'SENIOR',
    };
    return mapping[experience] || 'NEWBIE';
  };

  const validateEmailFormat = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateNicknameFormat = (nickname: string): { isValid: boolean; error: string } => {
    const trimmed = nickname.trim();
    
    // 1. 최소 글자 수 체크
    if (trimmed.length === 0) {
      return { isValid: false, error: '닉네임은 1자 이상 입력해주세요.' };
    }
    
    // 2. 최대 글자 수 체크
    if (trimmed.length > 10) {
      return { isValid: false, error: '닉네임은 최대 10자까지 입력할 수 있어요.' };
    }

    // 3. 공백 포함 여부 체크
    if (/\s/.test(nickname)) {
      return { isValid: false, error: '닉네임에는 공백이나 특수문자를 사용할 수 없어요.' };
    }

    // 4. 허용 문자(한글/영문/숫자)만 사용했는지 체크
    if (!/^[가-힣a-zA-Z0-9]+$/.test(trimmed)) {
      return { isValid: false, error: '닉네임에는 공백이나 특수문자를 사용할 수 없어요.' };
    }
    
    // 5. 자음이나 모음만 있는지 체크 (한글 자음: ㄱ-ㅎ, 모음: ㅏ-ㅣ)
    const onlyConsonantOrVowel = /^[ㄱ-ㅎㅏ-ㅣ]+$/.test(trimmed);
    if (onlyConsonantOrVowel) {
      return { isValid: false, error: '자음이나 모음만으로는 닉네임을 만들 수 없어요.' };
    }
    
    return { isValid: true, error: '' };
  };

  const checkEmailDuplicate = async (email: string): Promise<boolean> => {
    // 이메일 형식 검증
    if (!validateEmailFormat(email)) {
      setEmailError('이메일 형식이 올바르지 않아요.');
      return false;
    }

    try {
      const response = await apiClient.get(
        `/user/onboarding/email-duplicate-check?email=${encodeURIComponent(email)}`
      );

      if (response.data.result === 'SUCCESS') {
        setEmailError('');
        return true;
      } else if (response.data.result === 'FAILED') {
        setEmailError(response.data.error?.message || '');
        return false;
      }

      return false;
    } catch (error: any) {
      const errorMessage = error?.response?.data?.error?.message || '이메일 중복 검사에 실패했습니다.';
      setEmailError(errorMessage);
      return false;
    }
  };

  const checkNicknameDuplicate = async (nickname: string): Promise<boolean> => {
    // 닉네임 형식 검증
    const validation = validateNicknameFormat(nickname);
    if (!validation.isValid) {
      setNicknameError(validation.error);
      return false;
    }

    try {
      const response = await apiClient.get(
        `/user/onboarding/nickname-duplicate-check?nickname=${encodeURIComponent(nickname)}`
      );

      if (response.data.result === 'SUCCESS') {
        setNicknameError('');
        return true;
      } else if (response.data.result === 'FAILED') {
        setNicknameError(response.data.error?.message || '');
        return false;
      }

      return false;
    } catch (error: any) {
      const errorMessage = error?.response?.data?.error?.message || '닉네임 중복 검사에 실패했습니다.';
      setNicknameError(errorMessage);
      return false;
    }
  };

  const handleSubmitOnboarding = async (skipCallback = false): Promise<boolean> => {
    if (isSubmitting || !user) return false;

    setIsSubmitting(true);
    try {
      await apiClient.post(`/user/onboarding?currentUser=${user.id}`, {
        position: mapPositionToApi(formData.jobCategory),
        experience: mapExperienceToApi(formData.experience),
        email: formData.email,
        province: formData.location1,
        district: formData.location2,
        keywordUuidList: formData.keywords,
        nickname: formData.nickname,
      });

      if (!skipCallback) {
        onComplete(formData);
      }
      return true;
    } catch {
      alert('온보딩 정보 저장에 실패했습니다. 다시 시도해주세요.');
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNext = async () => {
    if (step === 2) {
      const isEmailAvailable = await checkEmailDuplicate(formData.email);
      if (!isEmailAvailable) {
        return; // 중복이면 다음 단계로 넘어가지 않음
      }
    }
    
    if (step === 4) {
      const isNicknameAvailable = await checkNicknameDuplicate(formData.nickname);
      if (!isNicknameAvailable) {
        return; // 중복이면 다음 단계로 넘어가지 않음
      }
      // 4단계 완료 시 온보딩 데이터 제출 후 5단계로 이동
      const success = await handleSubmitOnboarding(true);
      if (success) {
        setStep(5);
      }
      return;
    }

    if (step < 5) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleKeywordToggle = (keywordUuid: string) => {
    setFormData(prev => {
      const isSelected = prev.keywords.includes(keywordUuid);
      if (isSelected) {
        return { ...prev, keywords: prev.keywords.filter(k => k !== keywordUuid) };
      } else {
        if (prev.keywords.length >= 3) {
          return prev;
        }
        return { ...prev, keywords: [...prev.keywords, keywordUuid] };
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
          value={formData.jobCategory}
          options1={['프론트엔드', '백엔드', 'PM', '마케팅', '디자인', '데이터', 'AI', '보안']}
          onSelect1={(value) => setFormData({ ...formData, jobCategory: Array.isArray(value) ? value[0] : value })}
        />

        <SelectField
          label="경력"
          required
          placeholder="경력"
          value={formData.experience}
          options1={['신입', '주니어 (1~3년)', '미들 (3~6년)', '시니어 (7년 이상)']}
          onSelect1={(value) => setFormData({ ...formData, experience: Array.isArray(value) ? value[0] : value })}
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
          value={formData.email}
          error={emailError}
          onChange={(value: string) => {
            setFormData({ ...formData, email: value });
            if (emailError) setEmailError(''); // 입력 시 에러 메시지 초기화
          }}
        />

        <SelectField
          label="활동 지역"
          layout='double'
          required
          searchable2
          placeholder="시/도"
          value={formData.location1}
          options1={['서울특별시']}
          onSelect1={(value) => setFormData({ ...formData, location1: Array.isArray(value) ? value[0] : value })}
          placeholder2='시/구'
          value2={formData.location2}
          options2={['강남구', '강동구', '강북구', '강서구', '관악구', '광진구', '구로구', '금천구', '노원구', '도봉구', '동대문구', '동작구', '마포구', '서대문구', '서초구', '성동구', '성북구', '송파구', '양천구', '영등포구', '용산구', '은평구', '종로구', '중구', '중랑구']}
          onSelect2={(value) => setFormData({ ...formData, location2: Array.isArray(value) ? value[0] : value })}
        />
      </div>
    </>
    );
  };

  const renderStep3 = () => {
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
            {keywordList.map((keyword) => (
              <KeywordChip
                key={keyword.uuid}
                label={keyword.name}
                selected={formData.keywords.includes(keyword.uuid)}
                onClick={() => handleKeywordToggle(keyword.uuid)}
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
        value={formData.nickname}
        error={nicknameError}
        onChange={(value: string) => {
          setFormData({ ...formData, nickname: value });
          if (nicknameError) setNicknameError(''); // 입력 시 에러 메시지 초기화
        }}
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
              onClick={() => {
                onComplete(formData);
                onClose();
              }}
              className="flex-1"
            >
              건너뛰기
            </Button>
            <Button
              variant="primary"
              size="lg"
              onClick={() => {
                onComplete(formData);
                router.push('/mypage');
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
          showBackButton={step === 1 || step === 5 ? false : true}
          onBack={handleBack}
          onClose={step !== 5 ? onClose : undefined}
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
            {step !== 4 ? '다음' : '완료'}
          </Button>
        )}
      </div>
    </div>
  );
};
