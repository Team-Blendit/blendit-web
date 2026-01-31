import { Suspense } from 'react';
import MyPageClient from './MyPageClient';

export default function MyPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">로딩 중...</div>}>
      <MyPageClient />
    </Suspense>
  );
}
