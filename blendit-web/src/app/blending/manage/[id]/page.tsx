import { NetworkingManageClient } from './NetworkingManageClient';

export default async function NetworkingManagePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <NetworkingManageClient id={id} />;
}
