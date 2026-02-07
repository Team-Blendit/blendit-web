'use client';

import { useRouter, useParams, usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Header } from '@/components/layout/Header';
import { Card } from '@/components/common/Card';
import { profileAPI } from '@/lib/api/profile';
import { OtherUserProfile, Position, Experience } from '@/lib/types/profile';
import { PostDescription } from '@/components/common/PostDescription';
import { useAuthStore } from '@/stores/authStore';
import { useAuthGuard } from '@/hooks/useAuthGuard';
import { LoginModal } from '@/components/common/LoginModal/LoginModal';

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

interface UserProfileClientProps {
  id: string;
}

export default function UserProfileClient({ id }: UserProfileClientProps) {
  const params = useParams();
  const pathname = usePathname();
  const paramId = Array.isArray(params.id) ? params.id[0] : params.id;
  const pathId = pathname.startsWith('/profile/') ? pathname.split('/')[2] || '' : '';
  const userUuid = id || paramId || pathId || '';
  const router = useRouter();
  const { user } = useAuthStore();
  const isMyProfile = user?.id === userUuid;
  const { requireAuth, showLoginModal, closeLoginModal } = useAuthGuard();

  const [profile, setProfile] = useState<OtherUserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await profileAPI.getUserProfile(userUuid);
        setProfile(data);
        setIsBookmarked(data.isBookmarked);
      } catch (error) {
        console.error('Failed to fetch profile:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (userUuid) {
      fetchProfile();
    }
  }, [userUuid]);

  const handleBookmarkClick = () => {
    requireAuth(async () => {
      try {
        if (isBookmarked) {
          await profileAPI.removeBookmark(userUuid);
        } else {
          await profileAPI.addBookmark(userUuid);
        }
        setIsBookmarked(!isBookmarked);
      } catch (error) {
        console.error('북마크 처리 실패:', error);
      }
    });
  };

  const getLocation = () => {
    if (!profile?.province) return undefined;
    return profile.district ? `${profile.province} ${profile.district}` : profile.province;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="max-w-[1440px] mx-auto w-full px-[30px] py-[32px] flex items-center justify-center">
          <p className="text-[var(--text-tertiary)]">로딩 중...</p>
        </main>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="max-w-[1440px] mx-auto w-full px-[30px] py-[32px] flex items-center justify-center">
          <p className="text-[var(--text-tertiary)]">프로필을 찾을 수 없습니다.</p>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="max-w-[1440px] mx-auto w-full flex flex-col mt-[56px]">
        
        <div className='flex justify-start items-center gap-[24px]'>
          <button
            onClick={() => router.back()} 
            className='flex p-[4px] items-center gap-[8px]'>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15.5312 18.9698C15.6009 19.0395 15.6562 19.1222 15.6939 19.2132C15.7316 19.3043 15.751 19.4019 15.751 19.5004C15.751 19.599 15.7316 19.6965 15.6939 19.7876C15.6562 19.8786 15.6009 19.9614 15.5312 20.031C15.4615 20.1007 15.3788 20.156 15.2878 20.1937C15.1967 20.2314 15.0991 20.2508 15.0006 20.2508C14.902 20.2508 14.8045 20.2314 14.7134 20.1937C14.6224 20.156 14.5396 20.1007 14.47 20.031L6.96996 12.531C6.90023 12.4614 6.84491 12.3787 6.80717 12.2876C6.76943 12.1966 6.75 12.099 6.75 12.0004C6.75 11.9019 6.76943 11.8043 6.80717 11.7132C6.84491 11.6222 6.90023 11.5394 6.96996 11.4698L14.47 3.96979C14.6107 3.82906 14.8016 3.75 15.0006 3.75C15.1996 3.75 15.3905 3.82906 15.5312 3.96979C15.6719 4.11052 15.751 4.30139 15.751 4.50042C15.751 4.69944 15.6719 4.89031 15.5312 5.03104L8.5609 12.0004L15.5312 18.9698Z" fill="#121212"/>
            </svg>
          </button>
          <h1 className="text-[28px] font-bold leading-[34px] text-[#0a0a0a]">
          프로필
          </h1>
        </div>
        
        <div className="flex gap-[60px] items-start mt-[30px]">
          {/* Profile Card */}
          <Card
            variant="userProfile"
            userName={profile.nickname}
            userJob={positionLabels[profile.position]}
            userCareer={experienceLabels[profile.experience]}
            userCompany={profile.affiliation || undefined}
            userLocation={getLocation()}
            keywords={profile.keywordList || []}
            skills={profile.skills || []}
            profileImage={profile.profileImage}
            isBookmarked={isBookmarked}
            hideBookmark={isMyProfile}
            onBookmarkClick={handleBookmarkClick}
          />

          {/* Profile Content */}
          <div className="flex-1 flex flex-col gap-[40px] items-start">
            {/* 소개 섹션 */}
            {profile.description && (
              <PostDescription title='소개' content={profile.description} className='w-full' />
            )}

            {/* 연락처 및 링크 섹션 */}
            {(profile.email || (profile.links && profile.links.length > 0)) && (
              <div className="w-full flex flex-col gap-[16px]">
                <h2 className="text-[22px] font-semibold leading-[28px] text-[var(--text-primary)]">
                  연락처 및 링크
                </h2>
                <div className="w-full flex flex-col gap-[10px]">
                  {/* Email */}
                  {profile.email && (
                    <div className="flex gap-[12px] items-center">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21 4.5H3C2.80109 4.5 2.61032 4.57902 2.46967 4.71967C2.32902 4.86032 2.25 5.05109 2.25 5.25V18C2.25 18.3978 2.40804 18.7794 2.68934 19.0607C2.97064 19.342 3.35218 19.5 3.75 19.5H20.25C20.6478 19.5 21.0294 19.342 21.3107 19.0607C21.592 18.7794 21.75 18.3978 21.75 18V5.25C21.75 5.05109 21.671 4.86032 21.5303 4.71967C21.3897 4.57902 21.1989 4.5 21 4.5ZM19.0716 6L12 12.4828L4.92844 6H19.0716ZM20.25 18H3.75V6.95531L11.4928 14.0531C11.6312 14.1801 11.8122 14.2506 12 14.2506C12.1878 14.2506 12.3688 14.1801 12.5072 14.0531L20.25 6.95531V18Z" fill="#666666"/>
                      </svg>
                      <span className="text-[18px] leading-[24px] text-[var(--text-secondary)]">
                        {profile.email}
                      </span>
                    </div>
                  )}
                  {/* Links */}
                  {profile.links && profile.links.map((link, index) => (
                    <div key={index} className="flex gap-[12px] items-center">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.5309 8.46975C15.6006 8.53941 15.6559 8.62213 15.6937 8.71317C15.7314 8.80422 15.7509 8.90182 15.7509 9.00038C15.7509 9.09894 15.7314 9.19654 15.6937 9.28758C15.6559 9.37863 15.6006 9.46135 15.5309 9.531L9.53089 15.531C9.46121 15.6007 9.37848 15.656 9.28744 15.6937C9.19639 15.7314 9.09881 15.7508 9.00027 15.7508C8.90172 15.7508 8.80414 15.7314 8.7131 15.6937C8.62205 15.656 8.53932 15.6007 8.46964 15.531C8.39996 15.4613 8.34469 15.3786 8.30697 15.2876C8.26926 15.1965 8.24985 15.0989 8.24985 15.0004C8.24985 14.9018 8.26926 14.8043 8.30697 14.7132C8.34469 14.6222 8.39996 14.5394 8.46964 14.4698L14.4696 8.46975C14.5393 8.40002 14.622 8.3447 14.7131 8.30696C14.8041 8.26922 14.9017 8.24979 15.0003 8.24979C15.0988 8.24979 15.1964 8.26922 15.2875 8.30696C15.3785 8.3447 15.4612 8.40002 15.5309 8.46975ZM20.2128 3.78788C19.7253 3.30031 19.1465 2.91355 18.5095 2.64968C17.8725 2.38581 17.1898 2.25 16.5003 2.25C15.8108 2.25 15.128 2.38581 14.4911 2.64968C13.8541 2.91355 13.2753 3.30031 12.7878 3.78788L9.96964 6.60507C9.82891 6.7458 9.74985 6.93667 9.74985 7.13569C9.74985 7.33471 9.82891 7.52559 9.96964 7.66632C10.1104 7.80705 10.3012 7.88611 10.5003 7.88611C10.6993 7.88611 10.8902 7.80705 11.0309 7.66632L13.849 4.85382C14.5548 4.16349 15.5044 3.77936 16.4917 3.7848C17.479 3.79024 18.4243 4.1848 19.1225 4.88286C19.8207 5.58092 20.2154 6.52615 20.221 7.51343C20.2266 8.50071 19.8427 9.45037 19.1525 10.1563L16.3334 12.9744C16.1927 13.115 16.1136 13.3058 16.1135 13.5047C16.1134 13.7037 16.1923 13.8945 16.3329 14.0352C16.4735 14.176 16.6643 14.2551 16.8632 14.2552C17.0622 14.2552 17.253 14.1763 17.3937 14.0357L20.2128 11.2129C20.7003 10.7254 21.0871 10.1466 21.351 9.50959C21.6148 8.8726 21.7506 8.18986 21.7506 7.50038C21.7506 6.81089 21.6148 6.12816 21.351 5.49117C21.0871 4.85417 20.7003 4.27539 20.2128 3.78788ZM12.9696 16.3335L10.1515 19.1516C9.80472 19.5062 9.39102 19.7885 8.93438 19.9821C8.47774 20.1757 7.98722 20.2768 7.49124 20.2795C6.99526 20.2823 6.50367 20.1866 6.04492 19.998C5.58617 19.8094 5.16939 19.5317 4.81871 19.181C4.46802 18.8302 4.1904 18.4134 4.00192 17.9546C3.81343 17.4959 3.71783 17.0042 3.72065 16.5083C3.72347 16.0123 3.82465 15.5218 4.01834 15.0652C4.21203 14.6086 4.49437 14.1949 4.84902 13.8482L7.6662 11.031C7.80694 10.8903 7.886 10.6994 7.886 10.5004C7.886 10.3014 7.80694 10.1105 7.6662 9.96975C7.52547 9.82902 7.3346 9.74996 7.13558 9.74996C6.93656 9.74996 6.74569 9.82902 6.60496 9.96975L3.78777 12.7879C2.80315 13.7725 2.25 15.1079 2.25 16.5004C2.25 17.8928 2.80315 19.2283 3.78777 20.2129C4.77238 21.1975 6.10781 21.7506 7.50027 21.7506C8.89273 21.7506 10.2282 21.1975 11.2128 20.2129L14.0309 17.3938C14.1715 17.2531 14.2504 17.0623 14.2504 16.8633C14.2503 16.6644 14.1712 16.4736 14.0304 16.333C13.8897 16.1924 13.6989 16.1135 13.4999 16.1136C13.301 16.1137 13.1102 16.1928 12.9696 16.3335Z" fill="#666666"/>
                      </svg>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[18px] leading-[24px] text-[var(--text-secondary)] hover:text-[var(--accent-primary-default)] transition-colors"
                      >
                        {link.title}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Login Modal */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={closeLoginModal}
        onKakaoLogin={() => {
          window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/oauth2/authorization/kakao`;
        }}
        onGoogleLogin={() => {
          window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/oauth2/authorization/google`;
        }}
      />
    </div>
  );
}
