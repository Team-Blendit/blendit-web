import { Suspense } from 'react';
import HomeClient from './HomeClient';

export default function HomePage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">로딩 중...</div>}>
      <HomeClient />
    </Suspense>
  );
}
