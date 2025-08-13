## MeanWhile Global Gamer Hub

글로벌 게이머 커뮤니티의 목소리를 한 곳에 모으는 랜딩/프리뷰 웹앱입니다. 다양한 커뮤니티의 데이터를 AI가 요약·번역하여 Discord에서 공유하는 MeanWhile의 핵심 가치를 소개합니다.

- 서비스 URL: https://meanwhile.games

## 주요 기능

- 다국어 지원: `ko | en | ja | zh | es` 자동 감지 및 수동 전환 (`localStorage`에 선호 언어 저장)
- 반응형 UI: Tailwind 기반 현대적 테마/애니메이션, 네온/그라데이션 스타일
- 섹션 구성: `Hero`, `Community`, `Problem`, `Solution`, `VideoExample`, `Report`, `Benefits`, `Partner`, `Footer`
- Discord 연동: `.env`의 초대 링크로 이동하는 CTA 버튼
- 라우팅: `react-router-dom` 기반 `/`와 `*`(404) 라우트
- 상태/툴링: `@tanstack/react-query` Provider 세팅, `shadcn-ui` + `radix-ui` 컴포넌트 사용
- 유틸리티: 클래스 병합(`clsx`, `tailwind-merge`), 숫자 포맷팅 유틸

## 기술 스택

- React 18, TypeScript, Vite 5
- React Router, TanStack Query
- Tailwind CSS, shadcn-ui, Radix UI, lucide-react 아이콘
- 기타: recharts, date-fns 등

## 폴더 구조와 역할

```text
meanwhile-global-gamer-hub/
  index.html                  # 앱 마운트 및 메타 태그
  vite.config.ts              # Vite 설정(포트 8080, host "::", 경로 별칭 '@')
  tailwind.config.ts          # Tailwind 테마/애니메이션 확장
  tsconfig*.json              # TS 설정(경로 '@/*' → './src/*')
  components.json             # shadcn-ui 설정 및 경로 별칭
  package.json                # 스크립트/의존성

  src/
    main.tsx                 # React 루트 렌더링
    App.tsx                  # 전역 Provider/라우터/토스트 래핑
    index.css                # 디자인 토큰(색상/그라데이션/그림자/애니메이션) 및 Tailwind 레이어
    App.css                  # 추가 전역 스타일(필요 시)

    pages/
      Index.tsx             # 랜딩 페이지, 섹션 조립
      NotFound.tsx          # 404 페이지

    components/
      Hero.tsx              # 히어로 섹션 + 언어 선택 + CTA
      CommunitySection.tsx  # 커뮤니티 미리보기/통계(모의 데이터 기반)
      ProblemSection.tsx    # 문제 정의 섹션
      SolutionSection.tsx   # 솔루션 소개 섹션
      VideoExampleSection.tsx # 동영상 요약 예시
      ReportSection.tsx     # 인사이트 리포트 예시
      BenefitsSection.tsx   # 사용자 혜택
      PartnerSection.tsx    # 파트너/게임사 대상 가치
      Footer.tsx            # 푸터(Discord CTA)
      LanguageSelector.tsx  # 언어 드롭다운

      ui/                   # shadcn-ui 기반 공용 UI 컴포넌트
        button.tsx, dialog.tsx, ...

    contexts/
      LanguageContext.tsx   # 언어 상태, 브라우저 언어 감지, 번역 리소스 관리

    hooks/
      use-mobile.tsx        # 모바일 뷰포트 판별 훅

    data/
      en.posts.json, ja.posts.json, ko.posts.json, stats.json # 데모용 데이터

    assets/                 # 이미지/정적 자원
      hero-gaming.jpg, ...

    lib/
      utils.ts              # 숫자 포맷팅, 클래스 병합(`cn`)

    types/
      post.ts               # 커뮤니티 포스트 타입 정의
```

## 환경 변수

Discord 버튼 링크는 아래 키를 통해 주입됩니다.

```env
# .env (루트)
VITE_DISCORD_INVITE_LINK="https://discord.gg/your-invite"
```

`Hero`와 `Footer`의 CTA에서 `import.meta.env.VITE_DISCORD_INVITE_LINK`를 사용합니다.

## 스크립트

- 개발 서버: `npm run dev` (기본 포트 8080)
- 프로덕션 빌드: `npm run build`
- 개발 모드 빌드: `npm run build:dev`
- 미리보기: `npm run preview`
- 린트: `npm run lint`

## 로컬 개발 가이드

사전 요구사항: Node.js 18+ (Vite 5 권장 사양)

```bash
git clone <REPO_URL>
cd meanwhile-global-gamer-hub
npm i

# 환경 변수 설정 (.env 생성)
echo 'VITE_DISCORD_INVITE_LINK="https://discord.gg/your-invite"' > .env

npm run dev
# http://localhost:8080 에서 확인
```

## 라우팅 구조

- `/` → `Index` (랜딩/소개)
- `*` → `NotFound` (404)

## i18n(다국어) 동작 방식

- `contexts/LanguageContext.tsx`에서 언어 상태 및 번역 리소스 관리
  - 초기 언어: `localStorage('preferred-language')` → 없으면 브라우저 언어 추론
  - 수동 변경: `LanguageSelector`에서 변경 시 `localStorage`에 저장
- 번역 키 사용: 섹션 컴포넌트에서 `const { t } = useLanguage();`로 접근하여 `t('hero.title')` 형태로 사용

언어 추가 시 체크리스트:

1) `Language` 타입에 언어 코드 추가
2) `translations` 객체에 해당 언어 리소스 추가
3) `LanguageSelector.tsx`의 `languages` 맵에 라벨/깃발 추가

## 스타일과 테마

- `src/index.css`에 HSL 기반 디자인 토큰 정의(색상/그라데이션/그림자/애니메이션 등)
- `tailwind.config.ts`에서 컨테이너/애니메이션/컬러 토큰 확장 및 `content` 스캔 경로 설정
- `shadcn-ui` 컴포넌트는 `components/ui`에 위치하며 Tailwind 토큰과 연동됨

## 경로 별칭

- `@` → `./src` (Vite/TS 설정에 동일하게 반영)
- 예: `import Hero from "@/components/Hero"`

## 배포

정적 번들(Vite)로 빌드된 산출물을 어느 정적 호스팅(예: Vercel, Netlify, Cloudflare Pages, S3+CloudFront 등)에도 배포할 수 있습니다.

```bash
npm run build
# dist/ 폴더를 호스팅에 업로드
```

## 유지보수 팁

- 새로운 섹션 추가: `components/YourSection.tsx` 작성 → `pages/Index.tsx`에 임포트/배치
- UI 일관성: `components/ui/*`와 Tailwind 토큰(`index.css`) 재사용
- 데이터 연결: 실제 백엔드/데이터 연동 시 `@tanstack/react-query`를 `App.tsx`의 Provider 하에서 사용

## 라이선스

조직 정책에 맞게 설정하세요.(예: MIT)
