import NetworkingDetailClient from './NetworkingDetailClient';

// 정적 빌드를 위해 미리 생성할 페이지 ID 목록
export async function generateStaticParams() {
  // TODO: 실제 API 연동 시 동적으로 ID 목록을 가져오도록 수정
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
  ];
}

export default async function NetworkingDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <NetworkingDetailClient id={id} />;
}
