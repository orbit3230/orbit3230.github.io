# 익명 댓글 서버

Cloudflare Workers는 댓글의 조회·작성을 처리하고 D1은 댓글을 영구 저장합니다. 블로그는 GitHub Pages에 그대로 둡니다. 방문자는 외부 사이트로 이동하거나 로그인하지 않습니다. 소유자는 처음 연결할 때 Cloudflare 계정이 필요합니다.

## 비용

2026-09-09 공식 문서 기준 Workers Free는 하루 100,000 요청, D1 Free는 하루 5,000,000행 읽기·100,000행 쓰기, 계정 전체 5GB 저장 공간을 포함합니다. 인덱스 작업과 조회도 사용량에 포함되므로 댓글 개수와 과금 단위가 일치하지는 않습니다. 무료 한도 도달 시 요청/저장이 제한되며 유료 요금제로 자동 전환하는 코드는 없습니다. **Cloudflare 계정에서 Workers Free인지 확인하고 유료 업그레이드를 선택하지 않습니다.** 이미 Paid 계정이면 해당 계정의 유료 요금 규칙이 적용됩니다.

별도 도메인은 필요 없으며 제공되는 `workers.dev` 주소를 사용합니다. 이 서비스에는 유료 애드온이나 외부 분석 서비스를 사용하지 않습니다.

- [Workers 요금](https://developers.cloudflare.com/workers/platform/pricing/)
- [D1 요금 및 무료 한도 초과 동작](https://developers.cloudflare.com/d1/platform/pricing/)

## 현재 운영 연결

- Worker: `orbit-blog-comments`
- 댓글 API: `https://orbit-blog-comments.orbit3230.workers.dev/comments`
- D1: `orbit-blog-comments` (APAC)
- 검증: 실제 서버의 작성·조회·재시도·CORS를 점검했고, 독립 점검 경로의 임시 데이터는 제거했습니다.
- 코드 변경 시 이 폴더에서 `npx wrangler deploy`를 실행합니다. 기존 Secret은 다시 입력하지 않아도 유지됩니다. 블로그 화면 변경은 GitHub Pages에 별도로 배포합니다.

## 새 환경에서 최초 연결

아래 명령은 이 `comment-service` 폴더에서 실행합니다. `wrangler.toml`에는 현재 연결된 Worker·DB 식별자가 들어 있습니다. 식별자는 인증 비밀값이 아니므로 소스와 함께 관리합니다. `RATE_SALT`는 Cloudflare Secret에만 저장되어 있습니다. 비밀번호, API 토큰, secret을 블로그 설정이나 프론트엔드 코드에 넣지 않습니다.

1. Node.js가 설치된 환경에서 `npx wrangler login`으로 소유자가 Cloudflare에 로그인합니다. 브라우저에 나타나는 계정 접근 권한을 확인합니다.
2. `npx wrangler d1 create orbit-blog-comments`로 새 댓글 DB를 생성합니다. 기존 동명의 DB가 있다면 재사용 여부를 확인하며 삭제하지 않습니다.
3. `wrangler.toml.example`을 `wrangler.toml`로 복사하고 `database_id`에 생성된 DB ID를 넣습니다. `ALLOWED_ORIGINS`에는 실제 블로그 출처만 지정합니다. 현재 예제는 공개 블로그 및 로컬 미리보기 주소를 포함합니다. 운영 시 로컬 주소를 제거해도 됩니다.
4. `npx wrangler d1 execute orbit-blog-comments --remote --file=./schema.sql`로 테이블과 인덱스를 생성합니다. 스키마는 기존 테이블과 댓글을 삭제하지 않습니다.
5. `npx wrangler secret put RATE_SALT`를 실행하고 무작위로 생성한 32자 이상의 비밀값을 입력합니다. 이 값은 Cloudflare secret으로만 보관합니다. 블로그에 넣지 않습니다.
6. `npx wrangler deploy`로 서버를 배포합니다. 출력된 `https://orbit-blog-comments.<계정>.workers.dev` 주소 뒤에 `/comments`를 붙여 블로그 `_config.yml`에 설정합니다.

```yaml
comments:
  enabled: true
  api_url: "https://orbit-blog-comments.<계정>.workers.dev/comments"
```

7. Jekyll을 다시 빌드하고 소스를 배포합니다. 서로 다른 브라우저로 같은 글에 접속해 한쪽에서 작성한 댓글이 다른 쪽 새로고침에도 보이는지 확인합니다. 공개 환경에 테스트 댓글을 작성할 때는 소유자가 직접 수행하거나 사전에 허용합니다.

실제 Worker URL과 DB ID를 연결하기 전까지 블로그에는 준비 중 안내가 표시됩니다. 가짜 로컬 댓글을 저장 성공으로 표시하지 않습니다.

공식 절차: [D1 시작하기](https://developers.cloudflare.com/d1/get-started/), [Worker secrets](https://developers.cloudflare.com/workers/configuration/secrets/).

## 관리와 제한

- D1 콘솔의 `comments` 테이블에서 댓글을 확인합니다. 삭제가 필요하면 해당 행의 `id`, `post`, `body`를 확인한 뒤 해당 행만 삭제합니다. 테이블 전체를 지우지 않습니다.
- API는 공개 읽기·작성만 제공하고 삭제·관리 API는 공개하지 않습니다. 관리자 권한은 Cloudflare 계정에서 관리합니다.
- 이름 40자, 댓글 2,000자, 요청 본문 16KB 상한을 서버에서 검사합니다. SQL은 바인딩 매개변수를 사용합니다. 프론트엔드는 일반 텍스트로 표시합니다.
- 같은 네트워크에서 30초 간격·시간당 10개 작성을 허용합니다. 일별 식별자가 바뀌는 UTC 자정에는 제한이 초기화됩니다. 공유 네트워크 사용자는 제한을 공유하며, IP 변경을 통한 우회까지 차단하지는 않습니다.
- 도배 방지 식별자는 원본 IP와 secret으로 생성한 일별 HMAC입니다. 식별자는 공개 API에서 반환하지 않으며, 2일 지난 값은 매일 실행되는 작업으로 비웁니다. 댓글 본문은 유지합니다. Cloudflare 자체의 네트워크 데이터 처리는 해당 서비스 정책을 따릅니다.
- 출처 허용 목록은 브라우저의 교차 출처 요청을 제한하지만 인증 또는 완전한 봇 방어는 아닙니다. 초기 규모의 익명 댓글용 구성으로, 도배가 심해지면 Turnstile 또는 승인 기능을 별도 도입할 수 있습니다.
- 같은 요청 ID의 재시도는 중복 댓글을 만들지 않습니다. 조회는 20개 단위의 ID 커서를 사용합니다. 최신 댓글은 새로고침으로 조회합니다.
- 기존 GitHub Issues는 삭제·수정하지 않으며 새 DB에 자동 이관되지 않습니다.

## 로컬 검사

Node.js 24 이상에서 `node test.mjs`로 실제 SQLite를 사용하는 서버 검사를 실행합니다. 원격 DB나 사용자 댓글에 접근하지 않습니다.
