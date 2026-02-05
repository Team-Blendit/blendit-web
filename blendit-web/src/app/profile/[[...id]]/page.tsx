import UserProfileClient from './UserProfileClient';

export async function generateStaticParams() {
  return [{ id: [] }];
}

export default async function UserProfilePage({ params }: { params: Promise<{ id?: string[] }> }) {
  const { id } = await params;
  const userId = id?.[0] || '';
  return <UserProfileClient id={userId} />;
}
