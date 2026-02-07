'use client';

import { Suspense } from 'react';
import { usePathname } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import ManageListClient from '../ManageListClient';
import { NetworkingManageClient } from './NetworkingManageClient';
import { NetworkingEditClient } from './edit/NetworkingEditClient';

export default function ManageRouteClient() {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);
  const manageId = segments[2] || '';
  const action = segments[3] || '';

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

  return null;
}
