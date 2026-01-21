# BlendIT Web

IT 전문가들을 위한 네트워킹 서비스

## 기술 스택

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Zustand + TanStack Query

## 개발환경 세팅

```bash
cd blendit-web
npm install
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 결과를 확인하세요.

## 빌드 및 배포

### CI/CD 명령어

```bash
cd blendit-web
npm ci --legacy-peer-deps && npm run build && npm run lint && npx tsc --noEmit
```

| 명령어 | 설명 |
|--------|------|
| `npm ci --legacy-peer-deps` | 의존성 클린 설치 (CI 환경용) |
| `npm run build` | Next.js 정적 빌드 (out/ 폴더 생성) |
| `npm run lint` | ESLint 코드 검사 |
| `npx tsc --noEmit` | TypeScript 타입 검사 |

### 정적 배포 (nginx)

이 프로젝트는 `output: 'export'` 설정으로 정적 HTML을 생성합니다.

- **빌드 결과물**: `blendit-web/out/` 폴더
- **Node.js 서버 불필요**: `next start` 필요 없음
- **nginx 설정 예시**:

```nginx
server {
    listen 80;
    root /path/to/out;
    index index.html;

    location / {
        try_files $uri $uri.html $uri/ /index.html;
    }
}
```
