'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { UserProfile } from '@/components/layout/UserProfile';
import { InputField } from '@/components/common/InputField';
import { SelectField } from '@/components/common/SelectField';
import { Button } from '@/components/common/Button';
import { apiClient } from '@/lib/api';
import { profileAPI } from '@/lib/api/profile';
import { Position, Experience } from '@/lib/types/profile';
import { useAuthStore } from '@/stores/authStore';

interface KeywordItem {
  uuid: string;
  name: string;
}

const positionOptions = ['프론트엔드', '백엔드', 'PM', '마케팅', '디자인', '데이터', 'AI', '보안'];
const positionMap: Record<string, Position> = {
  '프론트엔드': 'FRONTEND',
  '백엔드': 'BACKEND',
  'PM': 'PM',
  '마케팅': 'MARKETING',
  '디자인': 'DESIGN',
  '데이터': 'DATA',
  'AI': 'AI',
  '보안': 'SECURITY',
};
const positionReverseMap: Record<Position, string> = {
  'ALL': '전체',
  'FRONTEND': '프론트엔드',
  'BACKEND': '백엔드',
  'PM': 'PM',
  'MARKETING': '마케팅',
  'DESIGN': '디자인',
  'DATA': '데이터',
  'AI': 'AI',
  'SECURITY': '보안',
};

const experienceOptions = ['신입', '주니어 (1-3년)', '미들(4-6년)', '시니어(7년 이상)'];
const experienceMap: Record<string, Experience> = {
  '신입': 'NEWBIE',
  '주니어 (1-3년)': 'JUNIOR',
  '미들(4-6년)': 'MIDDLE',
  '시니어(7년 이상)': 'SENIOR',
};
const experienceReverseMap: Record<Experience, string> = {
  'NEWBIE': '신입',
  'JUNIOR': '주니어 (1-3년)',
  'MIDDLE': '미들(4-6년)',
  'SENIOR': '시니어(7년 이상)',
};

export default function ProfileEdit() {
  const router = useRouter();
  const { isAuthenticated, updateUser } = useAuthStore();
  const [isHydrated, setIsHydrated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // 원본 닉네임과 이메일 저장 (중복 검사용)
  const [originalNickname, setOriginalNickname] = useState('');
  const [originalEmail, setOriginalEmail] = useState('');

  const [profileImage, setProfileImage] = useState<string | undefined>(undefined);
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    nickname: '',
    introduction: '',
    job: '',
    experience: '',
    company: '',
    location1: '',
    location2: '',
    keywords: [] as string[],
    skill: '',
    email: '',
  });
  const [keywordList, setKeywordList] = useState<KeywordItem[]>([]);
  const [links, setLinks] = useState<Array<{ label: string; url: string }>>([]);
  const [newLink, setNewLink] = useState({ label: '', url: '' });
  
  // Error states
  const [errors, setErrors] = useState({
    nickname: '',
    email: '',
    introduction: '',
    keywords: '',
    linkLabel: '',
    linkUrl: '',
  });

  // Hydration 완료 대기
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // 키워드 목록 및 프로필 데이터 불러오기
  useEffect(() => {
    if (!isHydrated) return;

    if (!isAuthenticated) {
      router.replace('/');
      return;
    }

    const fetchData = async () => {
      try {
        // 키워드 목록 불러오기
        const keywordResponse = await apiClient.get('/keyword');
        if (keywordResponse.data.result === 'SUCCESS' && keywordResponse.data.data) {
          setKeywordList(keywordResponse.data.data);
        }

        // 프로필 데이터 불러오기
        const profile = await profileAPI.getMyProfile();

        setProfileImage(profile.profileImage);
        const nickname = profile.nickname || '';
        const email = profile.email || '';
        
        // 원본 값 저장
        setOriginalNickname(nickname);
        setOriginalEmail(email);
        
        setFormData({
          nickname,
          introduction: profile.description || '',
          job: profile.position ? positionReverseMap[profile.position] : '',
          experience: profile.experience ? experienceReverseMap[profile.experience] : '',
          company: profile.affiliation || '',
          location1: profile.province || '',
          location2: profile.district || '',
          keywords: profile.keywordList || [],
          skill: profile.skills?.join(', ') || '',
          email,
        });

        if (profile.links && profile.links.length > 0) {
          setLinks(profile.links.map(link => ({
            label: link.title,
            url: link.url,
          })));
        }
      } catch {
        // 데이터 불러오기 실패
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [isHydrated, isAuthenticated, router]);

  // Validation functions
  const validateNicknameFormat = (nickname: string): { isValid: boolean; error: string } => {
    const trimmed = nickname.trim();
    
    if (trimmed.length === 0) {
      return { isValid: false, error: '닉네임은 1자 이상 입력해주세요.' };
    }
    
    if (trimmed.length > 10) {
      return { isValid: false, error: '닉네임은 최대 10자까지 입력할 수 있어요.' };
    }

    if (/\s/.test(nickname)) {
      return { isValid: false, error: '닉네임에는 공백이나 특수문자를 사용할 수 없어요.' };
    }

    if (!/^[가-힣a-zA-Z0-9]+$/.test(trimmed)) {
      return { isValid: false, error: '닉네임에는 공백이나 특수문자를 사용할 수 없어요.' };
    }
    
    const onlyConsonantOrVowel = /^[ㄱ-ㅎㅏ-ㅣ]+$/.test(trimmed);
    if (onlyConsonantOrVowel) {
      return { isValid: false, error: '자음이나 모음만으로는 닉네임을 만들 수 없어요.' };
    }
    
    return { isValid: true, error: '' };
  };

  const validateEmailFormat = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateUrlFormat = (url: string): boolean => {
    const trimmed = url.trim();
    return trimmed.startsWith('https://') || trimmed.startsWith('http://') || trimmed.startsWith('www.');
  };

  const checkNicknameDuplicate = async (nickname: string): Promise<boolean> => {
    // 닉네임 형식 검증
    const validation = validateNicknameFormat(nickname);
    if (!validation.isValid) {
      setErrors(prev => ({ ...prev, nickname: validation.error }));
      return false;
    }

    try {
      const response = await apiClient.get(
        `/user/onboarding/nickname-duplicate-check?nickname=${encodeURIComponent(nickname)}`
      );

      if (response.data.result === 'SUCCESS') {
        setErrors(prev => ({ ...prev, nickname: '' }));
        return true;
      } else if (response.data.result === 'FAILED') {
        setErrors(prev => ({ ...prev, nickname: response.data.error?.message || '이미 사용 중인 닉네임이에요.' }));
        return false;
      }

      return false;
    } catch (error: any) {
      const errorMessage = error?.response?.data?.error?.message || '닉네임 중복 검사에 실패했습니다.';
      setErrors(prev => ({ ...prev, nickname: errorMessage }));
      return false;
    }
  };

  const checkEmailDuplicate = async (email: string): Promise<boolean> => {
    // 이메일 형식 검증
    if (!validateEmailFormat(email)) {
      setErrors(prev => ({ ...prev, email: '이메일 형식이 올바르지 않아요.' }));
      return false;
    }

    try {
      const response = await apiClient.get(
        `/user/onboarding/email-duplicate-check?email=${encodeURIComponent(email)}`
      );

      if (response.data.result === 'SUCCESS') {
        setErrors(prev => ({ ...prev, email: '' }));
        return true;
      } else if (response.data.result === 'FAILED') {
        setErrors(prev => ({ ...prev, email: response.data.error?.message || '이미 사용 중인 이메일이에요.' }));
        return false;
      }

      return false;
    } catch (error: any) {
      const errorMessage = error?.response?.data?.error?.message || '이메일 중복 검사에 실패했습니다.';
      setErrors(prev => ({ ...prev, email: errorMessage }));
      return false;
    }
  };

  const handleNicknameChange = (value: string) => {
    setFormData(prev => ({ ...prev, nickname: value }));
    const validation = validateNicknameFormat(value);
    setErrors(prev => ({ ...prev, nickname: validation.error }));
  };

  const handleEmailChange = (value: string) => {
    setFormData(prev => ({ ...prev, email: value }));
    if (value && !validateEmailFormat(value)) {
      setErrors(prev => ({ ...prev, email: '이메일 형식이 올바르지 않아요.' }));
    } else {
      setErrors(prev => ({ ...prev, email: '' }));
    }
  };

  const handleIntroductionChange = (value: string) => {
    setFormData(prev => ({ ...prev, introduction: value }));
    if (!value.trim()) {
      setErrors(prev => ({ ...prev, introduction: '프로필 완성을 위해 소개를 입력해주세요' }));
    } else if (value.length > 500) {
      setErrors(prev => ({ ...prev, introduction: '소개글은 최대 500자까지 입력할 수 있어요' }));
    } else {
      setErrors(prev => ({ ...prev, introduction: '' }));
    }
  };

  const handleKeywordsChange = (value: string | string[]) => {
    setFormData(prev => {
      const keywords = Array.isArray(value) ? value : [value];
      // 이전보다 개수가 줄어드는 경우(해제)는 항상 허용
      const isDeselecting = keywords.length < prev.keywords.length;

      if (keywords.length > 3 && !isDeselecting) {
        setErrors(prevErrors => ({ ...prevErrors, keywords: '최대 3개까지 선택할 수 있어요' }));
        return prev;
      }
      setErrors(prevErrors => ({ ...prevErrors, keywords: keywords.length > 3 ? '최대 3개까지 선택할 수 있어요' : '' }));
      return { ...prev, keywords };
    });
  };

  const handleAddLink = () => {
    let hasError = false;
    const newErrors = { ...errors };

    if (!newLink.label.trim()) {
      newErrors.linkLabel = '링크 제목을 입력해주세요';
      hasError = true;
    } else {
      newErrors.linkLabel = '';
    }

    if (!newLink.url.trim()) {
      newErrors.linkUrl = 'https:// 또는 www로 시작하는 URL을 입력해주세요';
      hasError = true;
    } else if (!validateUrlFormat(newLink.url)) {
      newErrors.linkUrl = 'https:// 또는 www로 시작하는 URL을 입력해주세요';
      hasError = true;
    } else {
      newErrors.linkUrl = '';
    }

    setErrors(newErrors);

    if (!hasError) {
      setLinks([...links, { ...newLink }]);
      setNewLink({ label: '', url: '' });
    }
  };

  const handleRemoveLink = (index: number) => {
    setLinks(links.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    if (isSaving) return;

    // Validate required fields
    const newErrors = { ...errors };
    let hasError = false;

    // Nickname validation
    if (!formData.nickname.trim()) {
      newErrors.nickname = '닉네임은 필수 입력 항목입니다.';
      hasError = true;
    } else {
      const validation = validateNicknameFormat(formData.nickname);
      if (!validation.isValid) {
        newErrors.nickname = validation.error;
        hasError = true;
      } else {
        newErrors.nickname = '';
      }
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = '이메일은 필수 입력 항목입니다.';
      hasError = true;
    } else if (!validateEmailFormat(formData.email)) {
      newErrors.email = '이메일 형식이 올바르지 않아요.';
      hasError = true;
    } else {
      newErrors.email = '';
    }

    // Introduction validation
    if (!formData.introduction.trim()) {
      newErrors.introduction = '프로필 완성을 위해 소개를 입력해주세요';
      hasError = true;
    } else if (formData.introduction.length > 500) {
      newErrors.introduction = '소개글은 최대 500자까지 입력할 수 있어요';
      hasError = true;
    } else {
      newErrors.introduction = '';
    }

    // Keywords validation
    if (formData.keywords.length === 0) {
      newErrors.keywords = '키워드는 최소 1개 이상 선택해주세요.';
      hasError = true;
    } else if (formData.keywords.length > 3) {
      newErrors.keywords = '최대 3개까지 선택할 수 있어요';
      hasError = true;
    } else {
      newErrors.keywords = '';
    }

    setErrors(newErrors);

    if (hasError) {
      return;
    }

    // 닉네임이 변경된 경우 중복 검사
    if (formData.nickname !== originalNickname) {
      const isNicknameAvailable = await checkNicknameDuplicate(formData.nickname);
      if (!isNicknameAvailable) {
        return;
      }
    }

    // 이메일이 변경된 경우 중복 검사
    if (formData.email !== originalEmail) {
      const isEmailAvailable = await checkEmailDuplicate(formData.email);
      if (!isEmailAvailable) {
        return;
      }
    }

    setIsSaving(true);
    try {
      // 키워드 이름을 UUID로 변환
      const keywordUuidList = formData.keywords
        .map(name => keywordList.find(k => k.name === name)?.uuid)
        .filter((uuid): uuid is string => !!uuid);

      // 스킬 문자열을 배열로 변환
      const skillsArray = formData.skill
        .split(',')
        .map(s => s.trim())
        .filter(s => s.length > 0)
        .map((title, index) => ({
          title,
          orderNum: index + 1,
        }));

      // 링크 배열 변환
      const linksArray = links.map((link, index) => ({
        title: link.label,
        url: link.url,
        orderNum: index + 1,
      }));

      const updateData = {
        nickname: formData.nickname,
        description: formData.introduction,
        experience: experienceMap[formData.experience],
        position: positionMap[formData.job],
        province: formData.location1,
        district: formData.location2,
        email: formData.email,
        keywordUuidList,
        affiliation: formData.company || undefined,
        skills: skillsArray,
        links: linksArray,
        profileImage: profileImageFile || undefined,
      };

      await profileAPI.updateProfile(updateData);

      // auth store 업데이트하여 헤더 프로필 이미지 반영
      const updatedProfile = await profileAPI.getMyProfile();
      updateUser({
        nickname: updatedProfile.nickname,
        profileImage: updatedProfile.profileImage,
      });

      router.push('/mypage');
    } catch {
      alert('프로필 저장에 실패했습니다.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    router.push('/mypage');
  };

  const handleProfileImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImageFile(file);
      // 미리보기용 URL 생성
      const previewUrl = URL.createObjectURL(file);
      setProfileImage(previewUrl);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-[var(--bg-canvas)]">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <p className="text-[18px] text-[var(--text-tertiary)]">로딩 중...</p>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-canvas)] pb-[124px]">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="max-w-[1440px] mx-auto w-full flex flex-col gap-[40px] items-center mt-[24px]">
        {/* Title Section */}
        <div className="w-full flex items-center gap-[24px]">
          <button
            onClick={handleCancel}
            className="p-[4px] flex items-center"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
             <path d="M15.5312 18.9698C15.6009 19.0395 15.6562 19.1222 15.6939 19.2132C15.7316 19.3043 15.751 19.4019 15.751 19.5004C15.751 19.599 15.7316 19.6965 15.6939 19.7876C15.6562 19.8786 15.6009 19.9614 15.5312 20.031C15.4615 20.1007 15.3788 20.156 15.2878 20.1937C15.1967 20.2314 15.0991 20.2508 15.0006 20.2508C14.902 20.2508 14.8045 20.2314 14.7134 20.1937C14.6224 20.156 14.5396 20.1007 14.47 20.031L6.96996 12.531C6.90023 12.4614 6.84491 12.3787 6.80717 12.2876C6.76943 12.1966 6.75 12.099 6.75 12.0004C6.75 11.9019 6.76943 11.8043 6.80717 11.7132C6.84491 11.6222 6.90023 11.5394 6.96996 11.4698L14.47 3.96979C14.6107 3.82906 14.8016 3.75 15.0006 3.75C15.1996 3.75 15.3905 3.82906 15.5312 3.96979C15.6719 4.11052 15.751 4.30139 15.751 4.50042C15.751 4.69944 15.6719 4.89031 15.5312 5.03104L8.5609 12.0004L15.5312 18.9698Z" fill="#121212"/>
            </svg>
          </button>
          <h1 className="text-[28px] font-bold leading-[34px] text-[var(--text-primary)]">
            프로필 편집
          </h1>
        </div>

        {/* Content */}
        <div className="w-full flex flex-col gap-[50px]">
          {/* Profile Section */}
          <section className="w-full bg-[var(--bg-section)] rounded-[20px] p-[40px] pb-[60px] flex flex-col gap-[40px]">
            <h2 className="text-[24px] font-semibold leading-[30px] text-[var(--text-primary)]">
              프로필
            </h2>

            <div className="w-full flex gap-[20px] items-start">
              {/* Profile Image */}
              <div className="px-[60px] flex items-center justify-center">
                <div className="relative w-[140px] h-[140px]">
                  <UserProfile
                      size="large"
                      imageUrl={profileImage}
                      nickname={formData.nickname}
                  />
                  {/* Edit Button */}
                  <button
                    type="button"
                    onClick={handleProfileImageClick}
                    className="absolute bottom-0 right-0 w-[40px] h-[40px] rounded-full bg-[var(--bg-section)] border border-[#999] flex items-center justify-center"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M21.3103 6.87915L17.1216 2.68946C16.9823 2.55014 16.8169 2.43962 16.6349 2.36421C16.4529 2.28881 16.2578 2.25 16.0608 2.25C15.8638 2.25 15.6687 2.28881 15.4867 2.36421C15.3047 2.43962 15.1393 2.55014 15 2.68946L3.43969 14.2507C3.2998 14.3895 3.18889 14.5547 3.11341 14.7367C3.03792 14.9188 2.99938 15.114 3.00001 15.311V19.5007C3.00001 19.8985 3.15804 20.2801 3.43935 20.5614C3.72065 20.8427 4.10218 21.0007 4.50001 21.0007H8.6897C8.88675 21.0013 9.08197 20.9628 9.26399 20.8873C9.44602 20.8118 9.61122 20.7009 9.75001 20.561L21.3103 9.00071C21.4496 8.86142 21.5602 8.69604 21.6356 8.51403C21.711 8.33202 21.7498 8.13694 21.7498 7.93993C21.7498 7.74292 21.711 7.54784 21.6356 7.36582C21.5602 7.18381 21.4496 7.01844 21.3103 6.87915ZM18 10.1895L13.8103 6.00071L16.0603 3.75071L20.25 7.93946L18 10.1895Z" fill="#666666"/>
                    </svg>
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </div>
              </div>

              {/* Profile Form */}
              <div className="flex-1 flex flex-col gap-[20px]">
                {/* Nickname */}
                <InputField
                  label="닉네임"
                  required
                  placeholder="닉네임을 입력해주세요"
                  value={formData.nickname}
                  onChange={handleNicknameChange}
                  error={errors.nickname}
                />

                {/* Introduction */}
                <div className="flex flex-col gap-[8px]">
                  <div className="flex flex-col gap-[12px]">
                    <div className="flex items-start gap-[2px]">
                      <h3 className="text-[22px] font-semibold text-[var(--text-secondary)]">
                        소개
                      </h3>
                      <div className="w-[6px] h-[6px] rounded-full bg-[var(--border-error)]" aria-label="required" />
                    </div>
                    <textarea
                      value={formData.introduction}
                      onChange={(e) => handleIntroductionChange(e.target.value)}
                      placeholder="자유롭게 자신을 소개해 주세요. (최대 500자)"
                      className={`w-full h-[131px] p-[20px] bg-[var(--bg-canvas)]
                      border ${errors.introduction ? 'border-[var(--border-error)]' : 'border-[var(--border-default)]'} rounded-[18px]
                      text-[18px] leading-[24px] text-[var(--text-primary)]
                      placeholder:text-[var(--text-tertiary)] resize-none
                      focus:outline-none`}
                    />
                  </div>
                  {errors.introduction && (
                    <p className="px-[12px] text-[18px] leading-[24px] text-[var(--text-error)]">
                      {errors.introduction}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* Basic Info Section */}
          <section className="w-full bg-[var(--bg-section)] rounded-[20px] p-[40px] flex flex-col gap-[40px]">
            <h2 className="text-[24px] font-semibold leading-[30px] text-[var(--text-primary)]">
              기본 정보
            </h2>

            <div className="w-full flex gap-[40px]">
              {/* Left Column */}
              <div className="flex-1 flex flex-col gap-[20px]">
                <SelectField
                  label="경력"
                  required
                  placeholder="경력을 선택해주세요"
                  value={formData.experience}
                  options1={experienceOptions}
                  onSelect1={(value) => {
                    setFormData({ ...formData, experience: Array.isArray(value) ? value[0] : value });
                  }}
                />
                <SelectField
                  label="지역"
                  layout='double'
                  required
                  searchable2
                  placeholder="시/도"
                  value={formData.location1}
                  options1={['서울특별시']}
                  onSelect1={(value) => {
                    setFormData({ ...formData, location1: Array.isArray(value) ? value[0] : value });
                  }}
                  placeholder2='시/구'
                  value2={formData.location2}
                  options2={['강남구', '강동구', '강북구', '강서구', '관악구', '광진구', '구로구', '금천구', '노원구', '도봉구', '동대문구', '동작구', '마포구', '서대문구', '서초구', '성동구', '성북구', '송파구', '양천구', '영등포구', '용산구', '은평구', '종로구', '중구', '중랑구']}
                  onSelect2={(value) => {
                    setFormData({ ...formData, location2: Array.isArray(value) ? value[0] : value });
                  }}
                />
                <InputField
                  label="Email"
                  required
                  placeholder="이메일을 입력해주세요"
                  value={formData.email}
                  onChange={handleEmailChange}
                  error={errors.email}
                />
              </div>

              {/* Right Column */}
              <div className="flex-1 flex flex-col gap-[20px]">
                <SelectField
                  label="직군"
                  required
                  placeholder="직군을 선택해주세요"
                  value={formData.job}
                  options1={positionOptions}
                  onSelect1={(value) => {
                    setFormData({ ...formData, job: Array.isArray(value) ? value[0] : value });
                  }}
                />
                <SelectField
                  label="키워드"
                  required
                  multiple
                  placeholder="키워드를 선택해주세요"
                  value={formData.keywords}
                  options1={keywordList.map((keyword) => keyword.name)}
                  onSelect1={handleKeywordsChange}
                  error={errors.keywords}
                />
                <InputField
                  label='소속'
                  placeholder='소속을 입력해주세요'
                  required={false}
                  value={formData.company}
                  onChange={(value) => setFormData({ ...formData, company: value })}
                />
              </div>
            </div>
          </section>

          {/* Skill Section */}
          <section className="w-full bg-[var(--bg-section)] rounded-[20px] p-[40px] flex flex-col gap-[40px]">
            <h2 className="text-[24px] font-semibold leading-[30px] text-[var(--text-primary)]">
              스킬 정보
            </h2>

            <div className="w-full">
              <InputField
                label="스킬"
                required={false}
                placeholder="스킬을 ,로 구분하여 입력해주세요"
                value={formData.skill}
                onChange={(value) => setFormData({ ...formData, skill: value })}
              />
            </div>
          </section>

          {/* Contact & Link Section */}
          <section className="w-full bg-[var(--bg-section)] rounded-[20px] p-[40px] flex flex-col gap-[40px]">
            <h2 className="text-[24px] font-semibold leading-[30px] text-[var(--text-primary)]">
              링크
            </h2>

            {/* Links */}
            <div className="w-full flex flex-col gap-[20px]">
              {/* Add Link Form */}
              <div className="w-full flex gap-[40px] justify-center items-center">
                <div className="flex-1">
                  <InputField
                    label="링크"
                    layout="double"
                    required={false}
                    placeholder="링크 제목 입력"
                    value={newLink.label}
                    onChange={(value) => {
                      setNewLink({ ...newLink, label: value });
                      setErrors({ ...errors, linkLabel: '' });
                    }}
                    placeholder2="URL 입력"
                    value2={newLink.url}
                    onChange2={(value) => {
                      setNewLink({ ...newLink, url: value });
                      setErrors({ ...errors, linkUrl: '' });
                    }}
                    error={errors.linkLabel}
                    error2={errors.linkUrl}
                  />
                </div>
                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleAddLink}
                >
                  추가
                </Button>
              </div>

              {/* Link List */}
              {links.length > 0 && (
                <div className="w-full flex flex-col">
                  {links.map((link, index) => (
                    <div key={index} className="w-full flex flex-col">
                      <div className="w-full flex items-center justify-between py-[28px]">
                        <div className="flex gap-[20px] items-center">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.5 6C7.5 5.80109 7.57902 5.61032 7.71967 5.46967C7.86032 5.32902 8.05109 5.25 8.25 5.25H20.25C20.4489 5.25 20.6397 5.32902 20.7803 5.46967C20.921 5.61032 21 5.80109 21 6C21 6.19891 20.921 6.38968 20.7803 6.53033C20.6397 6.67098 20.4489 6.75 20.25 6.75H8.25C8.05109 6.75 7.86032 6.67098 7.71967 6.53033C7.57902 6.38968 7.5 6.19891 7.5 6ZM20.25 11.25H8.25C8.05109 11.25 7.86032 11.329 7.71967 11.4697C7.57902 11.6103 7.5 11.8011 7.5 12C7.5 12.1989 7.57902 12.3897 7.71967 12.5303C7.86032 12.671 8.05109 12.75 8.25 12.75H20.25C20.4489 12.75 20.6397 12.671 20.7803 12.5303C20.921 12.3897 21 12.1989 21 12C21 11.8011 20.921 11.6103 20.7803 11.4697C20.6397 11.329 20.4489 11.25 20.25 11.25ZM20.25 17.25H8.25C8.05109 17.25 7.86032 17.329 7.71967 17.4697C7.57902 17.6103 7.5 17.8011 7.5 18C7.5 18.1989 7.57902 18.3897 7.71967 18.5303C7.86032 18.671 8.05109 18.75 8.25 18.75H20.25C20.4489 18.75 20.6397 18.671 20.7803 18.5303C20.921 18.3897 21 18.1989 21 18C21 17.8011 20.921 17.6103 20.7803 17.4697C20.6397 17.329 20.4489 17.25 20.25 17.25ZM4.125 4.875C3.9025 4.875 3.68499 4.94098 3.49998 5.0646C3.31498 5.18821 3.17078 5.36391 3.08564 5.56948C3.00049 5.77505 2.97821 6.00125 3.02162 6.21948C3.06503 6.43771 3.17217 6.63816 3.32951 6.7955C3.48684 6.95283 3.6873 7.05998 3.90552 7.10338C4.12375 7.14679 4.34995 7.12451 4.55552 7.03936C4.76109 6.95422 4.93679 6.81002 5.0604 6.62502C5.18402 6.44001 5.25 6.2225 5.25 6C5.25 5.70163 5.13147 5.41548 4.9205 5.2045C4.70952 4.99353 4.42337 4.875 4.125 4.875ZM4.125 10.875C3.9025 10.875 3.68499 10.941 3.49998 11.0646C3.31498 11.1882 3.17078 11.3639 3.08564 11.5695C3.00049 11.775 2.97821 12.0012 3.02162 12.2195C3.06503 12.4377 3.17217 12.6382 3.32951 12.7955C3.48684 12.9528 3.6873 13.06 3.90552 13.1034C4.12375 13.1468 4.34995 13.1245 4.55552 13.0394C4.76109 12.9542 4.93679 12.81 5.0604 12.625C5.18402 12.44 5.25 12.2225 5.25 12C5.25 11.7016 5.13147 11.4155 4.9205 11.2045C4.70952 10.9935 4.42337 10.875 4.125 10.875ZM4.125 16.875C3.9025 16.875 3.68499 16.941 3.49998 17.0646C3.31498 17.1882 3.17078 17.3639 3.08564 17.5695C3.00049 17.775 2.97821 18.0012 3.02162 18.2195C3.06503 18.4377 3.17217 18.6382 3.32951 18.7955C3.48684 18.9528 3.6873 19.06 3.90552 19.1034C4.12375 19.1468 4.34995 19.1245 4.55552 19.0394C4.76109 18.9542 4.93679 18.81 5.0604 18.625C5.18402 18.44 5.25 18.2225 5.25 18C5.25 17.7016 5.13147 17.4155 4.9205 17.2045C4.70952 16.9935 4.42337 16.875 4.125 16.875Z" fill="#666666"/>
                          </svg>
                          <span className="text-[18px] leading-[24px] text-[var(--text-secondary)]">
                            {link.label}
                          </span>
                        </div>
                        <div className="flex gap-[20px] items-center">
                          <span className="text-[18px] leading-[24px] text-[var(--text-secondary)]">
                            {link.url}
                          </span>
                          <button onClick={() => handleRemoveLink(index)}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M19.281 18.2198C19.3507 18.2895 19.406 18.3722 19.4437 18.4632C19.4814 18.5543 19.5008 18.6519 19.5008 18.7504C19.5008 18.849 19.4814 18.9465 19.4437 19.0376C19.406 19.1286 19.3507 19.2114 19.281 19.281C19.2114 19.3507 19.1286 19.406 19.0376 19.4437C18.9465 19.4814 18.849 19.5008 18.7504 19.5008C18.6519 19.5008 18.5543 19.4814 18.4632 19.4437C18.3722 19.406 18.2895 19.3507 18.2198 19.281L12.0004 13.0607L5.78104 19.281C5.64031 19.4218 5.44944 19.5008 5.25042 19.5008C5.05139 19.5008 4.86052 19.4218 4.71979 19.281C4.57906 19.1403 4.5 18.9494 4.5 18.7504C4.5 18.5514 4.57906 18.3605 4.71979 18.2198L10.9401 12.0004L4.71979 5.78104C4.57906 5.64031 4.5 5.44944 4.5 5.25042C4.5 5.05139 4.57906 4.86052 4.71979 4.71979C4.86052 4.57906 5.05139 4.5 5.25042 4.5C5.44944 4.5 5.64031 4.57906 5.78104 4.71979L12.0004 10.9401L18.2198 4.71979C18.3605 4.57906 18.5514 4.5 18.7504 4.5C18.9494 4.5 19.1403 4.57906 19.281 4.71979C19.4218 4.86052 19.5008 5.05139 19.5008 5.25042C19.5008 5.44944 19.4218 5.64031 19.281 5.78104L13.0607 12.0004L19.281 18.2198Z" fill="#666666"/>
                            </svg>
                          </button>
                        </div>
                      </div>
                      <div className="w-full h-[2px] bg-[#eaeaea]" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-[30px] items-center justify-center">
          <Button
            variant="secondary"
            size="lg"
            onClick={handleCancel}
            className='w-[300px]'
          >
            취소
          </Button>
          <Button
            variant="primary"
            size="lg"
            onClick={handleSave}
            className='w-[300px]'
            disabled={isSaving}
          >
            {isSaving ? '저장 중...' : '저장하기'}
          </Button>
        </div>
      </main>
    </div>
  );
}
