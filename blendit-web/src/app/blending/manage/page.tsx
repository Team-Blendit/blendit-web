import { Suspense } from 'react';
import { Header } from '@/components/layout/Header';
import ManageListClient from './ManageListClient';

export default function ManagePage() {
  return (
    <div className="min-h-screen bg-[var(--bg-canvas)]">
      <Header />
      <Suspense>
        <ManageListClient />
      </Suspense>
    </div>
  );
}
