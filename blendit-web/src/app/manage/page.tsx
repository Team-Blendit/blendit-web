import { Header } from '@/components/layout/Header';
import ManageListClient from './ManageListClient';

export default function ManagePage() {
  return (
    <div className="min-h-screen bg-[var(--bg-canvas)]">
      <Header />
      <ManageListClient />
    </div>
  );
}
