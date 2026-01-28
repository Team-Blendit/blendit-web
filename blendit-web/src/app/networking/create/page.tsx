'use client';

import { useState } from 'react';
import { SelectField } from '@/components/common/SelectField';
import { InputField } from '@/components/common/InputField';
import { QuillEditor } from '@/components/common/QuillEditor';
import { Button } from '@/components/common/Button';
import { Header } from '@/components/layout/Header';

// Back Arrow Icon
const CaretLeftIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15.5312 18.9693C15.6009 19.039 15.6562 19.1217 15.6939 19.2128C15.7316 19.3038 15.751 19.4014 15.751 19.4999C15.751 19.5985 15.7316 19.6961 15.6939 19.7871C15.6562 19.8781 15.6009 19.9609 15.5312 20.0306C15.4615 20.1002 15.3788 20.1555 15.2878 20.1932C15.1967 20.2309 15.0991 20.2503 15.0006 20.2503C14.902 20.2503 14.8045 20.2309 14.7134 20.1932C14.6224 20.1555 14.5396 20.1002 14.47 20.0306L6.96996 12.5306C6.90023 12.4609 6.84491 12.3782 6.80717 12.2871C6.76943 12.1961 6.75 12.0985 6.75 11.9999C6.75 11.9014 6.76943 11.8038 6.80717 11.7127C6.84491 11.6217 6.90023 11.539 6.96996 11.4693L14.47 3.9693C14.6107 3.82857 14.8016 3.74951 15.0006 3.74951C15.1996 3.74951 15.3905 3.82857 15.5312 3.9693C15.6719 4.11003 15.751 4.30091 15.751 4.49993C15.751 4.69895 15.6719 4.88982 15.5312 5.03055L8.5609 11.9999L15.5312 18.9693Z" fill="#121212"/>
  </svg>
);

export default function NetworkingCreatePage() {
  const [formData, setFormData] = useState({
    jobCategory: '',
    keyword: '',
    region: '',
    year: '',
    month: '',
    day: '',
    participants: '',
    openChatLink: '',
    title: '',
    content: '',
    autoApproval: false,
  });

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
  };

  const isFormValid = 
    formData.jobCategory &&
    formData.keyword &&
    formData.region &&
    formData.participants &&
    formData.title &&
    formData.content;

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
        <div className="flex items-center gap-[40px] self-stretch">
          {/* Left Column */}
          <div className="flex-1 flex flex-col items-end gap-[30px]">
            {/* 직군 */}
            <SelectField
              label="직군"
              required
              placeholder="직군을 선택해주세요"
              options1={['프론트엔드', '백엔드', 'PM', '디자인', '마케팅']}
              onSelect1={(value: string) => setFormData({ ...formData, jobCategory: value })}
            />

            {/* 지역 */}
            <SelectField
              label="지역"
              required
              placeholder="지역을 선택해주세요"
              options1={['서울', '경기', '인천', '부산', '대구', '광주', '대전']}
              onSelect1={(value: string) => setFormData({ ...formData, region: value })}
            />

            {/* 인원 with 자동승인 toggle */}
            <SelectField
              label="인원"
              required
              placeholder="인원을 선택해주세요"
              options1={['2명', '3명', '4명', '5명', '6명', '7명', '8명']}
              onSelect1={(value: string) => setFormData({ ...formData, participants: value })}
              showAutoApproval={true}
              autoApprovalEnabled={formData.autoApproval}
              onAutoApprovalChange={(enabled) => setFormData({ ...formData, autoApproval: enabled })}
            />
          </div>

          {/* Right Column */}
          <div className="flex-1 flex flex-col gap-[30px]">
            {/* 키워드 */}
            <SelectField
              label="키워드"
              required
              placeholder="키워드를 선택해주세요"
              options1={['React', 'Vue', 'Angular', 'Next.js', 'Nuxt.js']}
              onSelect1={(value: string) => setFormData({ ...formData, keyword: value })}
            />

            {/* 일정 */}
            <SelectField
              label="일정"
              required
              layout="triple"
              placeholder="년"
              placeholder2="월"
              placeholder3="일"
              options1={['2024', '2025', '2026']}
              options2={Array.from({ length: 12 }, (_, i) => `${i + 1}월`)}
              options3={Array.from({ length: 31 }, (_, i) => `${i + 1}일`)}
              onSelect1={(value: string) => setFormData({ ...formData, year: value })}
              onSelect2={(value: string) => setFormData({ ...formData, month: value })}
              onSelect3={(value: string) => setFormData({ ...formData, day: value })}
            />

            {/* 오픈채팅 */}
            <InputField
              label="오픈채팅"
              placeholder="내용을 입력해주세요"
              value={formData.openChatLink}
              onChange={(value: string) => setFormData({ ...formData, openChatLink: value })}
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
                onChange={(value: string) => setFormData({ ...formData, title: value })}
            />
            </div>

            {/* Content Section with Quill Editor */}
            <div className="flex flex-col w-full self-stretch">
            <QuillEditor
                value={formData.content}
                onChange={(value: string) => setFormData({ ...formData, content: value })}
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
