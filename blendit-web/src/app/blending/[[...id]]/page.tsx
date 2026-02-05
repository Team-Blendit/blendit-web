import NetworkingDetailClient from './NetworkingDetailClient';

export async function generateStaticParams() {
  return [{ id: [] }];
}

export default async function NetworkingDetailPage({ params }: { params: Promise<{ id?: string[] }> }) {
  const { id } = await params;
  const blendingId = id?.[0] || '';
  return <NetworkingDetailClient id={blendingId} />;
}
