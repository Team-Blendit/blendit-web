import { NetworkingManageClient } from './NetworkingManageClient';

export async function generateStaticParams() {
  return [{ id: '1' }, { id: '2' }, { id: '3' }];
}

export default async function NetworkingManagePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <NetworkingManageClient id={id} />;
}
