# 베이비로그 (Baby Log)

삐요로그(PiyoLog) 스타일의 가족 전용 육아 기록 PWA. Next.js 15 + Supabase + Tailwind.

## 주요 기능

- **타임라인**: 수유(모유 좌/우 타이머·분유·유축), 기저귀, 수면(진행중 타이머), 이유식, 간식, 약, 체온, 건강, 사진 일기
- **요약**: 일간(수유량/횟수, 수면 시간, 기저귀 횟수) + 주간 그래프
- **성장 곡선**: 키/몸무게/머리둘레, WHO 표준 백분위 오버레이
- **실시간 동기화**: 같은 공유 코드를 가진 모든 디바이스가 즉시 갱신 (Supabase Realtime)
- **공유 코드 로그인**: 가족 비번 한 개로 입장 (개별 계정 불필요)
- **PWA**: 모바일 홈 화면에 추가, 다크 모드, 오프라인에서 마지막 화면 열람

## 셋업

### 1. Supabase 프로젝트 준비

1. https://supabase.com 에서 프로젝트 생성 (리전: Northeast Asia 권장)
2. SQL Editor에서 `supabase/migrations/0001_init.sql` → `0002_rls.sql` → `0003_functions.sql` 순서로 실행
3. (선택) `supabase/seed.sql` 로 첫 household 생성 및 baby 등록
4. Storage에서 `baby-photos` 버킷이 생성됐는지 확인 (0002 마이그레이션이 자동 생성)

### 2. 환경 변수

```bash
cp .env.local.example .env.local
```

`.env.local`을 채웁니다:

```
NEXT_PUBLIC_SUPABASE_URL=https://YOUR-PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
SESSION_SECRET=        # 32바이트 이상 랜덤 (openssl rand -base64 32)
APP_BASE_URL=http://localhost:3000
```

### 3. 실행

```bash
npm install
npm run dev
```

http://localhost:3000 접속 → 시드한 공유 코드(`우리집비번123` 등)로 로그인.

### 4. 배포 (Vercel)

1. GitHub에 푸시
2. Vercel에 import, 환경 변수 4개 설정
3. 리전: `icn1` (서울) 권장
4. 배포 후 도메인을 모바일에서 열고 "홈 화면에 추가"

## 디렉터리

- `app/` Next.js App Router 페이지 + API 라우트
- `components/` UI / 타임라인 / 차트 / 폼
- `lib/` Supabase 클라이언트, 인증, 쿼리, 시간 유틸, WHO LMS 데이터
- `supabase/migrations/` DB 마이그레이션
- `public/` PWA manifest, 서비스 워커, 아이콘

## 보안 모델

- 공유 비번은 bcrypt(`crypt + gen_salt('bf', 10)`)로 해시 저장
- 로그인 시 `verify_share_code` RPC가 검증 → JWT(HS256, `SESSION_SECRET` 서명) 발급
- JWT는 httpOnly 쿠키 `BABY_SESSION`, household uuid는 별도 쿠키 `BABY_HID`
- 모든 DB 요청에 `x-household-id` 헤더 첨부 → RLS가 행 필터링
- 공유 코드를 아는 사람은 해당 household 데이터를 모두 보고 쓸 수 있음 (가족 비번 모델의 의도된 동작)

## 라이선스 / 출처

- WHO Child Growth Standards LMS 값은 공공 도메인. 출처: https://www.who.int/tools/child-growth-standards/standards
- 영감: [삐요로그(PiyoLog)](https://piyolog.com/) — 본 프로젝트는 비영리 가족 사용 목적의 독립 구현입니다.
