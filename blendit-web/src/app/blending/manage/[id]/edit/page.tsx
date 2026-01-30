import { NetworkingEditClient } from './NetworkingEditClient';

interface EditPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditPage({ params }: EditPageProps) {
  const { id } = await params;
  return <NetworkingEditClient id={id} />;
}
