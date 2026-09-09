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

아래 명령은 이 `comment-service` 폴더에서 실행합니다. `wrangler.toml`에는 현재 연결된 Worker·DB 식별자가 들어 있습니다. 식별자는 인증 비밀값이 아니므로 소스와 함께 관리합니다. `RATE_SALT`와 `PASSWORD_PEPPER`는 Cloudflare Secret에만 저장합니다. 비밀번호, API 토큰, secret을 블로그 설정이나 프론트엔드 코드에 넣지 않습니다.

1. Node.js가 설치된 환경에서 `npx wrangler login`으로 소유자가 Cloudflare에 로그인합니다. 브라우저에 나타나는 계정 접근 권한을 확인합니다.
2. `npx wrangler d1 create orbit-blog-comments`로 새 댓글 DB를 생성합니다. 기존 동명의 DB가 있다면 재사용 여부를 확인하며 삭제하지 않습니다.
3. `wrangler.toml.example`을 `wrangler.toml`로 복사하고 `database_id`에 생성된 DB ID를 넣습니다. `ALLOWED_ORIGINS`에는 실제 블로그 출처만 지정합니다. 현재 예제는 공개 블로그 및 로컬 미리보기 주소를 포함합니다. 운영 시 로컬 주소를 제거해도 됩니다.
4. `npx wrangler d1 execute orbit-blog-comments --remote --file=./schema.sql`로 테이블과 인덱스를 생성합니다. 스키마는 기존 테이블과 댓글을 삭제하지 않습니다.
5. `npx wrangler d1 migrations apply orbit-blog-comments --remote`로 추가 기능의 마이그레이션을 적용합니다. 기존 댓글 데이터는 유지됩니다.
6. `npx wrangler secret put RATE_SALT`를 실행하고 무작위로 생성한 32자 이상의 비밀값을 입력합니다. 이 값은 Cloudflare secret으로만 보관합니다. 블로그에 넣지 않습니다.
7. `npx wrangler secret put PASSWORD_PEPPER`로 별도의 무작위 32자 이상 secret을 추가합니다. 이 값은 기존 댓글 비밀번호 검증에 필요하므로 임의로 교체하지 않습니다.
8. `npx wrangler deploy`로 서버를 배포합니다. 출력된 `https://orbit-blog-comments.<계정>.workers.dev` 주소 뒤에 `/comments`를 붙여 블로그 `_config.yml`에 설정합니다.

```yaml
comments:
  enabled: true
  api_url: "https://orbit-blog-comments.<계정>.workers.dev/comments"
```

9. Jekyll을 다시 빌드하고 소스를 배포합니다. 서로 다른 브라우저로 같은 글에 접속해 한쪽에서 작성한 댓글이 다른 쪽 새로고침에도 보이는지 확인합니다. 공개 환경에 테스트 댓글을 작성할 때는 소유자가 직접 수행하거나 사전에 허용합니다.

실제 Worker URL과 DB ID를 연결하기 전까지 블로그에는 준비 중 안내가 표시됩니다. 가짜 로컬 댓글을 저장 성공으로 표시하지 않습니다.

공식 절차: [D1 시작하기](https://developers.cloudflare.com/d1/get-started/), [Worker secrets](https://developers.cloudflare.com/workers/configuration/secrets/).

## 기능과 보관 정보

관리자 로그인 화면 대신 공개 **최근 대화가 있는 글** 패널을 사용합니다. 글별 마지막 댓글 ID와 댓글 수를 `post_activity`에 유지하여 전체 댓글을 반복 스캔하지 않고 5개씩 조회합니다. 목록의 글 제목은 블로그 `post-index.json`에서 가져옵니다. 새 댓글·답글이 기준이며 내용 수정만으로 순서를 올리지 않습니다. 새 대화가 생기면 새로고침으로 확인합니다.

원댓글은 `root_id = NULL`, 답글은 원댓글의 `root_id`와 직접 답하는 `reply_to`를 갖습니다. 삭제 시 본문·이름을 대체하고 연결은 남깁니다. 운영자가 D1 콘솔에서 예외적으로 삭제할 때도 직접 행을 지우는 대신 대상 ID를 확인해 `deleted=1`, `body='삭제된 댓글입니다.'`, `name='삭제된 댓글'`, `revision=revision+1`로 갱신합니다. 그래야 답글 연결과 최근 대화 집계가 유지됩니다.

비밀번호는 브라우저에서 개별 salt와 PBKDF2-SHA256 600,000회로 처리한 뒤 HTTPS로 검증값을 전송합니다. 서버는 별도 `PASSWORD_PEPPER`로 HMAC-SHA256 처리한 값만 저장하고 상수 시간 검증 API를 사용합니다. 원문 비밀번호는 서버로 보내거나 DB·localStorage에 저장하지 않습니다. 이 방식은 브라우저에서 반복 해시를 처리해 Workers Free의 CPU 예산을 절약합니다. 검증값도 비밀번호와 동일하게 취급하여 로그에 기록하지 않습니다. `PASSWORD_PEPPER`가 없어지거나 바뀌면 기존 비밀번호를 검증할 수 없습니다.

알림용 별도 256비트 무작위 키를 브라우저에 저장하고 DB에는 그 해시만 저장합니다. 알림 API는 키로 소유권이 확인된 댓글에 직접 달린 답글만 반환합니다. 키로 댓글을 수정·삭제할 수는 없습니다. 같은 브라우저에서 소유한 댓글 간의 자기 답글은 알리지 않습니다. 브라우저별 최근 200개 댓글을 연결하며, 다른 기기·저장소 초기화 후의 복구나 기존 댓글 자동 연결은 제공하지 않습니다. 이메일과 외부 메시징 연동은 없습니다.

## 요청과 제한

- `GET /comments`: 원댓글 20개, `thread`와 `after`로 답글 20개, `focus`로 특정 대화 조회.
- `POST /comments`: 비밀번호 검증값·알림 키를 포함한 새 댓글 또는 답글. 같은 요청 ID의 재시도는 중복 저장하지 않습니다. 이전 프론트엔드의 비밀번호 없는 작성은 거절하므로 블로그 화면도 함께 갱신합니다.
- `POST /comments/{id}/edit`, `/delete`: 비밀번호 검증과 revision 확인 후 변경. 초기 댓글에는 비밀번호를 임의로 설정하거나 소유권을 가져오는 기능을 제공하지 않습니다.
- `GET /activity`: 서로 다른 글 5개씩 최신 댓글 ID 커서로 조회. 새로운 대화가 생기는 동안에는 목록이 달라질 수 있습니다.
- `POST /notifications`: 최대 200개 소유권 키 검증 후 알림 20개씩 조회. 키·비밀번호 해시·도배 방지 식별자는 공개 응답에 포함하지 않습니다.
- 댓글은 2,000자, 이름은 40자, 일반 요청은 16KB, 알림 요청은 64KB 이내입니다. 비밀번호 8~128자는 브라우저에서 검사합니다. SQL 매개변수 바인딩과 일반 텍스트 렌더링을 사용합니다.
- 작성은 같은 네트워크에서 30초 간격·시간당 10개, 생성 요청은 분당 12회, 비밀번호 검증은 15분당 20회, 알림 확인은 분당 30회로 제한합니다. 공유 네트워크는 제한을 공유합니다. 일별 IP HMAC과 고정 시간 구간을 사용하므로 구간 경계에서는 제한이 초기화됩니다.
- 원본 IP는 앱 DB에 저장하지 않습니다. 일별 HMAC 식별자와 만료된 요청 제한은 예약 작업으로 정리합니다. Cloudflare의 네트워크 데이터 처리는 해당 서비스 정책을 따릅니다.
- 출처 허용 목록과 요청 제한은 완전한 봇 방어가 아닙니다. 대규모 도배 시 Turnstile 등을 별도로 검토합니다. GitHub Issues의 이전 데이터는 건드리지 않습니다.

## 기존 서버 업데이트

`schema.sql`은 기존 기본 스키마입니다. 이미 운영 중인 DB는 초기화하지 않고 `npx wrangler d1 migrations apply orbit-blog-comments --remote`만 실행합니다. Wrangler가 적용한 마이그레이션을 기록하여 재실행을 방지합니다. 먼저 DB를 백업하고, 기존 댓글을 보존하는 `0001_conversations.sql`을 적용한 다음 `PASSWORD_PEPPER` Secret과 새 Worker를 배포합니다. 현재 Secret을 교체하는 작업은 일반 업데이트에 포함하지 않습니다.

## 로컬 검사

Node.js 24 이상에서 `node test.mjs`로 실제 SQLite를 사용하는 서버 검사를 실행합니다. 원격 DB나 사용자 댓글에 접근하지 않습니다.
