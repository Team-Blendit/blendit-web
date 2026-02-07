import { Suspense } from 'react';
import { Header } from '@/components/layout/Header';
import ManageListClient from '../ManageListClient';
import { NetworkingManageClient } from './NetworkingManageClient';
import { NetworkingEditClient } from './edit/NetworkingEditClient';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  return [{ id: [] }];
}

export default async function NetworkingManagePage({ params }: { params: Promise<{ id?: string[] }> }) {
  const { id } = await params;
  const segments = id || [];
  const manageId = segments[0] || '';
  const action = segments[1];

  if (!manageId) {
    return (
      <div className="min-h-screen bg-[var(--bg-canvas)]">
        <Header />
        <Suspense>
          <ManageListClient />
        </Suspense>
      </div>
    );
  }

  if (!action) {
    return <NetworkingManageClient id={manageId} />;
  }

  if (action === 'edit') {
    return <NetworkingEditClient id={manageId} />;
  }

  notFound();
}
