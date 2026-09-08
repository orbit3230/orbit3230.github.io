# 저장소 · orbit3230.github.io

컴퓨터공학 학부 과정에서 공부한 내용을 정리하는 개인 블로그입니다.

[블로그 바로가기](https://orbit3230.github.io)

## 화면과 기능

- **최근 글**: 최신 포스트 목록
- **연도별 탐색**: 연도 선택과 제목·태그 검색
- **태그별 탐색**: 태그와 연도를 함께 선택해 포스트 검색
- **페이지 탐색**: 기본 5개, 5·10·20·50개씩 표시, 최대 10개 페이지 번호, 첫·마지막 페이지 및 번호 입력 이동
- **글 읽기**: 다크 테마, 반응형 메뉴, 목차, 코드 강조, 관련 글
- **전체 검색**: 제목·태그·본문 검색

페이지 번호, 표시 개수, 필터는 URL에 반영되어 새로고침하거나 주소를 공유해도 복원됩니다. 최근 글의 기존 `/page2/` 같은 주소도 유지합니다.

## 로컬 실행

Ruby와 Bundler가 설치된 환경에서 이 저장소 폴더를 열고 실행합니다. 현재 잠금 파일은 Windows의 Ruby 3.3 환경에서 사용하고 있습니다.

```powershell
bundle install
bundle exec jekyll serve
```

브라우저에서 [로컬 미리보기](http://127.0.0.1:4000/)를 엽니다. 종료는 터미널에서 `Ctrl+C`를 누릅니다. `_config.yml`을 변경했다면 서버를 다시 시작해야 합니다.

배포용 결과물만 생성하려면 다음 명령을 사용합니다.

```powershell
$env:JEKYLL_ENV = 'production'
bundle exec jekyll build
```

생성 결과는 `_site/`에 저장됩니다. `_site/`, 캐시, 로컬 편집기 설정은 Git에 포함하지 않습니다. 의존성이 변경되지 않았다면 기존 `Gemfile.lock`을 유지합니다.

## 글 작성

`_posts/`의 주제별 폴더에 `YYYY-MM-DD-제목.md` 형식으로 파일을 추가합니다. 파일 상단에는 다음과 같은 Front Matter를 작성합니다.

```yaml
---
layout: post
title: "[주제] 포스트 제목"
excerpt: "목록에 표시할 간단한 소개"
tags:
  - 주제 이름
toc: true
date: 2026-09-08
last_modified_at: 2026-09-08
---
```

그 아래에 Markdown으로 본문을 작성합니다. `toc: true`는 목차를 표시하며, 수식 렌더링이 필요한 글에는 `math: true`를 추가할 수 있습니다. 태그와 검색 목록은 빌드할 때 자동으로 생성되므로 따로 목록 파일을 편집할 필요가 없습니다.

기존 글의 파일명, 날짜, 카테고리를 바꾸면 글 주소가 달라질 수 있습니다. 본문을 수정할 때에는 기존 주소와 이미지 경로가 유지되는지 확인합니다. 현재 설정은 `future: true`이므로 미래 날짜의 포스트도 포함됩니다.

## 수정할 파일

| 목적 | 파일 |
| --- | --- |
| 사이트 이름·설명·기본 설정 | `_config.yml` |
| 색상·글꼴·간격·모바일 화면 | `assets/styles.scss` |
| 페이지 이동·필터·검색 동작 | `assets/site.js` |
| 로고·주 메뉴·프로필 | `_includes/sidebar-left.html` |
| 글 목록 위 탐색 메뉴 | `_includes/home-header.html` |
| 최근 글 제목·부제·레이아웃 | `_layouts/home.html` |
| 연도·태그 탐색 화면 | `_includes/archive-browser.html` |
| 표시 개수 선택·페이지 번호 UI | `_includes/list-options.html`, `_includes/list-pagination.html` |
| 글 카드 | `_includes/post-card.html` |
| 본문·목차 | `_layouts/post.html`, `_includes/sidebar-right.html` |
| 이메일·GitHub 링크 | `_data/social.yml` |
| 소개 페이지 | `about.md` |
| 메인 로고 이미지 | `assets/pogohead.png` |
| 브라우저·기기별 아이콘 | 루트의 `favicon*`, `apple-touch-icon.png`, `android-chrome-*.png`, `site.webmanifest` |

스타일은 `assets/styles.scss` 한 곳에서 관리하며 별도의 `_sass/` 파일을 불러오지 않습니다. 메뉴는 위의 두 include 파일에서 관리합니다.

## 검색과 페이지 목록

- `post-index.json`: 최근 글의 표시 개수와 페이지 이동에 사용하는 목록 데이터. 본문 전체는 포함하지 않습니다.
- `search.json`: 전체 검색에 사용하는 제목·태그·본문 데이터.
- `dates.md`, `tags.md`, `categories.md`: 각 탐색 화면의 주소와 레이아웃 설정.

두 JSON 파일은 Jekyll 템플릿입니다. 데이터는 `_posts/`에서 자동 생성하므로 글 정보를 직접 중복 작성하지 않습니다. 목록과 검색의 상호작용에는 JavaScript가 필요합니다. 최근 글은 데이터 로딩에 실패해도 기본 목록과 기존 이전·다음 링크를 표시하고 재시도를 제공합니다.

## 의존성과 배포

Jekyll과 Liquid로 정적 페이지를 생성합니다. 현재 `Gemfile`은 기존 `not-pure-poole` gem을 통해 Jekyll 및 관련 의존성을 유지하며, 실제 화면은 이 저장소의 `_layouts/`, `_includes/`, `assets/`에서 관리합니다. 해당 gem은 `_config.yml`의 `plugins`에 추가하지 않습니다.

`scripts/`에는 Jekyll Compose를 사용하는 초안 작성·발행과 미리보기용 셸 스크립트가 있습니다. Windows PowerShell에서는 위의 Bundler 명령을 직접 사용할 수 있습니다.

GitHub Pages 배포 설정은 저장소의 **Settings → Pages**에서 관리합니다. 로컬 빌드만으로 공개 블로그가 갱신되지는 않습니다. 확인한 소스 변경을 해당 저장소에 커밋·푸시해야 합니다.

## 라이선스

기존 테마 코드의 라이선스 고지는 [LICENSE.md](LICENSE.md)에 보존합니다. 페이지 하단에 테마 문구를 표시하지 않더라도 이 파일은 유지합니다.
