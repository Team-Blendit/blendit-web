import { Header } from '@/components/layout/Header';
import { NetworkingManageClient } from './NetworkingManageClient';

// Mock data interfaces
interface ApplicantUser {
  id: number;
  name: string;
  age: number;
  job: string;
  experience: string;
  region: string;
  keywords: string[];
  profileImage?: string;
}

interface ParticipantUser {
  id: number;
  name: string;
  job: string;
  experience: string;
  region: string;
  keywords: string[];
  profileImage?: string;
}

interface Comment {
  id: number;
  userName: string;
  userImage?: string;
  timeAgo: string;
  content: string;
}

interface NetworkingDetail {
  id: number;
  title: string;
  status: '모집중' | '모집완료';
  userName: string;
  userDate: string;
  job: string;
  location: string;
  date: string;
  keywords: string[];
  currentMembers: number;
  totalMembers: number;
  chatLink: string;
  description: string;
}

// Generate static params for static export
export function generateStaticParams() {
  // TODO: Fetch actual networking IDs from API
  // Return at least one dummy path for static export compatibility
  return [
    { id: '1' }
  ];
}

export default function NetworkingManagePage() {
  // TODO: Fetch data based on params.id
  // const data = await fetchNetworkingData(params.id);

  // Mock data
  const networkingDetail: NetworkingDetail = {
    id: 1,
    title: '네카라쿠배 디자이너가 알려주는 실무 팁 40가지 분해를 해보기 미션 주마다 이뤄집니다!!',
    status: '모집중',
    userName: 'Name',
    userDate: '0000.00.00',
    job: 'Badge',
    location: '서울 강남구',
    date: '2026.02.03',
    keywords: ['Badge', 'Badge', 'Badge'],
    currentMembers: 4,
    totalMembers: 5,
    chatLink: 'http://openchat.com',
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
  };

  const applicants: ApplicantUser[] = [
    {
      id: 1,
      name: '김개발',
      age: 32.5,
      job: '디자인',
      experience: '미들 (4~6년)',
      region: '활동 지역',
      keywords: ['Badge', 'Badge', 'Badge'],
    },
  ];

  const participants: ParticipantUser[] = [
    {
      id: 1,
      name: '김개발',
      job: '디자인',
      experience: '미들 (4~6년)',
      region: '활동 지역',
      keywords: ['Badge', 'Badge', 'Badge'],
    },
    {
      id: 2,
      name: '김개발',
      job: '디자인',
      experience: '미들 (4~6년)',
      region: '활동 지역',
      keywords: ['Badge', 'Badge', 'Badge'],
    },
    {
      id: 3,
      name: '김개발',
      job: '디자인',
      experience: '미들 (4~6년)',
      region: '활동 지역',
      keywords: ['Badge', 'Badge', 'Badge'],
    },
    {
      id: 4,
      name: '김개발',
      job: '디자인',
      experience: '미들 (4~6년)',
      region: '활동 지역',
      keywords: ['Badge', 'Badge', 'Badge'],
    },
  ];

  const comments: Comment[] = [
    {
      id: 1,
      userName: 'Name',
      timeAgo: 'Num',
      content: 'Text',
    },
    {
      id: 2,
      userName: 'Name',
      timeAgo: 'Num',
      content: 'Text',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col gap-[30px] px-auto pb-[94px]">
      <Header />

      {/* Main Content */}
      <div className="max-w-[1440px] mx-auto gap-[24px] flex flex-col">
        <NetworkingManageClient
          networkingDetail={networkingDetail}
          applicants={applicants}
          participants={participants}
          comments={comments}
        />
      </div>
    </div>
  );
}
