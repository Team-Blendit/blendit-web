'use client';

import { use, useState } from 'react';
import { Header } from '@/components/common/Header';
import { Badge } from '@/components/common/Badge';
import { Button } from '@/components/common/Button';
import { PostDescription } from '@/components/common/PostDescription';
import { UserProfile } from '@/components/common/UserProfile';
import { BlendingScoreBadge } from '@/components/common/BlendingScoreBadge';

// Back Arrow Icon
const CaretLeftIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15.5312 18.9693C15.6009 19.039 15.6562 19.1217 15.6939 19.2128C15.7316 19.3038 15.751 19.4014 15.751 19.4999C15.751 19.5985 15.7316 19.6961 15.6939 19.7871C15.6562 19.8781 15.6009 19.9609 15.5312 20.0306C15.4615 20.1002 15.3788 20.1555 15.2878 20.1932C15.1967 20.2309 15.0991 20.2503 15.0006 20.2503C14.902 20.2503 14.8045 20.2309 14.7134 20.1932C14.6224 20.1555 14.5396 20.1002 14.47 20.0306L6.96996 12.5306C6.90023 12.4609 6.84491 12.3782 6.80717 12.2871C6.76943 12.1961 6.75 12.0985 6.75 11.9999C6.75 11.9014 6.76943 11.8038 6.80717 11.7127C6.84491 11.6217 6.90023 11.539 6.96996 11.4693L14.47 3.9693C14.6107 3.82857 14.8016 3.74951 15.0006 3.74951C15.1996 3.74951 15.3905 3.82857 15.5312 3.9693C15.6719 4.11003 15.751 4.30091 15.751 4.49993C15.751 4.69895 15.6719 4.88982 15.5312 5.03055L8.5609 11.9999L15.5312 18.9693Z" fill="#121212"/>
  </svg>
);

// Bookmark Icon
const BookmarkIcon = ({ filled = false }: { filled?: boolean }) => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8.0625 26.1931V5.27383C8.0625 4.94246 8.33113 4.67383 8.6625 4.67383H23.3352C23.6666 4.67383 23.9352 4.94246 23.9352 5.27383V26.183C23.9352 26.6666 23.3924 26.9515 22.9944 26.6768L16.3992 22.1249C16.1954 21.9842 15.9261 21.9832 15.7212 22.1224L8.9997 26.6894C8.60134 26.9601 8.0625 26.6747 8.0625 26.1931Z" stroke="#999999" stroke-width="2"/>
  </svg>
);

// Location Icon
const LocationIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M10 2C7.24 2 5 4.24 5 7C5 10.5 10 17 10 17C10 17 15 10.5 15 7C15 4.24 12.76 2 10 2ZM10 9C8.9 9 8 8.1 8 7C8 5.9 8.9 5 10 5C11.1 5 12 5.9 12 7C12 8.1 11.1 9 10 9Z" 
      fill="#999999"
    />
  </svg>
);

export default function NetworkingDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [comment, setComment] = useState('');

  // Mock data - 실제로는 API에서 가져올 데이터
  // id로 게시물 데이터를 가져올 수 있습니다
  console.log('Post ID:', id);
  const postData = {
    title: '네카라쿠배 디자이너가 알려주는 실무 팁 40가지 분해를 해보기 미션 주마다 이뤄집니다!!',
    status: '모집중',
    author: '네카라쿠배당토디자이너임',
    date: '2026.01.20',
    jobCategory: '디자인',
    region: '서울 강남구',
    schedule: '2026.02.03',
    keywords: ['실무', '멘토링', '이직'],
    currentMembers: 4,
    maxMembers: 5,
    openChatLink: 'http://openchat.com',
    description: `AI 기반 사주·타로 서비스 풀리의 초기 멤버로서 함께할 [디자이너] 를 찾고 있습니다. 런칭 ※2주 만에 빠른 수익화※가 진행중이며, 지금은 작지만 빠른 실행력으로 글로벌 확장을 준비 중인 팀입니다. 아시아, 미국 시장을 타깃으로 미국 법인 설립과 본격적인 글로벌 진출을 앞두고 있습니다.

💜이런 분을 찾고 있어요 (디자이너(UI/UX))
• Figma로 실제 서비스 UXUI 디자인이 가능하신 분, 또는
• 브랜딩을 적용/응용한 화면 디자인이 가능하신 분, 또는
• 마케팅 아이디어를 컨텐츠로 시각화하고 발행 가능하신 분

가파르게 성장 중인 팀에서 "실제 시장에 적용되는 디자인 실무"를 경험해보고 싶으신 분 환영합니다🤗

👥 팀 구성: Google 출신 1인 / 실리콘밸리 본사 Amazon 출신 1인 / 서울대 출신 1인

🌎 글로벌 시장을 전제로, 🚀 속도감 있게 실행합니다.

가벼운 커피챗도 환영합니다!! 관심 있으신 분들은 편하게 연락 주세요 :)
성지유 010-0000-0000`,
    participants: [
      { name: '김개발', score: 78.5, job: '디자인', experience: '미들 (4~6년)', region: '활동 지역', badges: ['Badge', 'Badge', 'Badge'] },
      { name: '김개발', score: 78.5, job: '디자인', experience: '미들 (4~6년)', region: '활동 지역', badges: ['Badge', 'Badge', 'Badge'] },
      { name: '김개발', score: 78.5, job: '디자인', experience: '미들 (4~6년)', region: '활동 지역', badges: ['Badge', 'Badge', 'Badge'] },
      { name: '김개발', score: 78.5, job: '디자인', experience: '미들 (4~6년)', region: '활동 지역', badges: ['Badge', 'Badge', 'Badge'] },
    ],
    comments: [
      { author: '블린', time: '5분 전', content: '스터디 정보 부탁드립니다. 어떤 스택 사용하시나요 ?' },
      { author: '트렌드디자인', time: '1시간 전', content: '신청합니다 ! 좋은 시간 보냈으면 좋겠어요.' },
    ]
  };

  const handleSubmitComment = () => {
    if (comment.trim()) {
      console.log('Comment submitted:', comment);
      setComment('');
    }
  };

  return (
    <div className="min-h-screen flex flex-col gap-[30px] px-auto pb-[94px]">
      {/* Header */}
      <Header />

      <div className="max-w-[1440px] mx-auto gap-[24px] flex flex-col">
        {/* Top Section */}
        <div className="flex items-center justify-between self-stretch">
          <div className="flex items-center gap-[24px] flex-1">
            <button className="flex p-[4px] items-center gap-[8px]">
              <CaretLeftIcon />
            </button>
            <div className="flex items-center gap-2.5">
              <h1 className="font-bold text-[28px] leading-[34px] text-[var(--text-primary)]">
                {postData.title}
              </h1>
              <Badge color="red" style="solid" text={postData.status} />
            </div>
          </div>
          <button 
            className="p-[8px]"
            onClick={() => setIsBookmarked(!isBookmarked)}
          >
            <BookmarkIcon filled={isBookmarked} />
          </button>
        </div>

        {/* Body Section */}
        <div className="flex items-start gap-[60px] self-stretch">
          {/* Left: Info Card */}
          <div className="w-[440px] shrink-0">
            <div className="bg-white border border-[#DBDBDB] rounded-[20px] p-[30px] flex flex-col gap-6">
              {/* Author Info */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <UserProfile size="small" />
                  <p className="font-normal text-[18px] leading-[24px] text-[var(--text-primary)]">
                    {postData.author}
                  </p>
                </div>
              </div>
              <div className="bg-[#EFEFEF] h-px w-full" />
              <p className="font-normal text-[18px] leading-[24px] text-[var(--text-tertiary)]">
                {postData.date}
              </p>

              {/* Post Details */}
              <div className="flex flex-col gap-4">
                {/* 직군 */}
                <div className="flex items-center gap-5">
                  <p className="font-normal text-[18px] leading-[24px] text-[var(--text-tertiary)] w-[60px]">
                    직군
                  </p>
                  <Badge color="blue" style="outline" text={postData.jobCategory} />
                </div>

                {/* 지역 */}
                <div className="flex items-center gap-5">
                  <p className="font-normal text-[18px] leading-[24px] text-[var(--text-tertiary)] w-[60px]">
                    지역
                  </p>
                  <p className="font-normal text-[18px] leading-[24px] text-[var(--text-primary)]">
                    {postData.region}
                  </p>
                </div>

                {/* 일정 */}
                <div className="flex items-center gap-5">
                  <p className="font-normal text-[18px] leading-[24px] text-[var(--text-tertiary)] w-[60px]">
                    일정
                  </p>
                  <p className="font-normal text-[18px] leading-[24px] text-[var(--text-primary)]">
                    {postData.schedule}
                  </p>
                </div>

                {/* 키워드 */}
                <div className="flex items-center gap-5">
                  <p className="font-normal text-[18px] leading-[24px] text-[var(--text-tertiary)] w-[60px]">
                    키워드
                  </p>
                  <div className="flex gap-2">
                    {postData.keywords.map((keyword, idx) => (
                      <Badge key={idx} color="blue" style="solid" text={keyword} />
                    ))}
                  </div>
                </div>

                {/* 인원수 */}
                <div className="flex items-center gap-5">
                  <p className="font-normal text-[18px] leading-[24px] text-[var(--text-tertiary)] w-[60px]">
                    인원수
                  </p>
                  <p className="font-normal text-[18px] leading-[24px]">
                    <span className="text-[var(--text-primary)]">{postData.currentMembers}명</span>
                    <span className="text-[var(--text-tertiary)]"> / {postData.maxMembers}명</span>
                  </p>
                </div>

                {/* 오픈채팅 */}
                <div className="flex items-center gap-5">
                  <p className="font-normal text-[18px] leading-[24px] text-[var(--text-tertiary)] w-[60px]">
                    오픈채팅
                  </p>
                  <a 
                    href={postData.openChatLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="font-normal text-[18px] leading-[24px] text-[#006FE5]"
                  >
                    {postData.openChatLink}
                  </a>
                </div>
              </div>

              {/* Apply Button */}
              <Button 
                variant="primary" 
                size="lg"
                className="w-full"
                onClick={() => console.log('Apply clicked')}
              >
                네트워킹 신청하기
              </Button>
            </div>
          </div>

          {/* Right: Content */}
          <div className="flex-1 flex flex-col gap-[50px]">
            {/* Description Section */}
            <PostDescription 
              title="소개"
              content={postData.description}
            />

            {/* Participants Section */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <h2 className="font-semibold text-[22px] leading-[28px] text-[var(--text-primary)]">
                  참여 인원
                </h2>
                <span className="font-medium text-[22px] leading-[28px] text-[var(--text-tertiary)]">
                  {postData.participants.length}
                </span>
              </div>
              <div className="flex gap-4 overflow-x-auto">
                {postData.participants.map((participant, idx) => (
                  <div 
                    key={idx}
                    className="bg-white border border-[#DBDBDB] rounded-[12px] p-6 flex flex-col gap-4 min-w-[280px]"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <p className="font-semibold text-[22px] leading-[28px] text-[#121212]">
                          {participant.name}
                        </p>
                        <BlendingScoreBadge value={participant.score.toString()} />
                      </div>
                      <button>
                        <BookmarkIcon />
                      </button>
                    </div>
                    <div className="flex gap-4 items-center">
                      <UserProfile size="medium" />
                      <div className="flex flex-col gap-1.5">
                        <Badge color="blue" style="outline" text={participant.job} />
                        <p className="font-normal text-[18px] leading-[1.5] text-[var(--text-tertiary)]">
                          {participant.experience}
                        </p>
                        <div className="flex items-center gap-1.5">
                          <LocationIcon />
                          <p className="font-normal text-[18px] leading-[1.5] text-[var(--text-tertiary)]">
                            {participant.region}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {participant.badges.map((badge, badgeIdx) => (
                        <Badge key={badgeIdx} color="blue" style="solid" text={badge} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Comments Section */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <h2 className="font-semibold text-[22px] leading-[28px] text-[var(--text-primary)]">
                  댓글
                </h2>
                <span className="font-medium text-[22px] leading-[28px] text-[var(--text-tertiary)]">
                  {postData.comments.length}
                </span>
              </div>

              {/* Comment List */}
              <div className="flex flex-col gap-1">
                {postData.comments.map((commentItem, idx) => (
                  <div key={idx}>
                    <div className="h-px bg-[#F2F2F3]" />
                    <div className="rounded-[18px] p-5 flex flex-col gap-2.5">
                      <div className="flex items-center gap-2 h-[34px]">
                        <UserProfile size="small" />
                        <p className="font-medium text-[18px] leading-[24px] text-[var(--text-primary)]">
                          {commentItem.author}
                        </p>
                        <div className="bg-[#EFEFEF] h-[18px] w-px" />
                        <p className="font-normal text-[18px] leading-[24px] text-[var(--text-tertiary)]">
                          {commentItem.time}
                        </p>
                      </div>
                      <p className="font-normal text-[18px] leading-[24px] text-[var(--text-primary)]">
                        {commentItem.content}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Comment Input */}
              <div className="bg-white border border-[#DBDBDB] rounded-[18px] p-5 min-h-[131px] relative">
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="댓글을 작성해주세요"
                  className="w-full h-[51px] font-normal text-[18px] leading-[24px] text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] resize-none outline-none"
                />
                <button
                  onClick={handleSubmitComment}
                  disabled={!comment.trim()}
                  className="absolute bottom-[19.5px] right-[19px] bg-[var(--accent-secondary-default)] px-[18px] py-[15px] rounded-[8px] h-[48px] disabled:opacity-50"
                >
                  <span className="font-medium text-[18px] leading-[24px] text-[var(--text-secondary)]">
                    입력
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
