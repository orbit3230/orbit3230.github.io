---
layout: post
title: "[연구실] github 포스팅 내 인라인 코드 블록 색상 변경"
excerpt: "Inline Code Block의 배경색 & 폰트색은 어떻게 바꿀까?"

tags:
  - [연구실, theme]

toc: true

date: 2024-02-14
last_modified_at: 2024-02-14
---
## 인라인 코드 블럭이 안보여!
- 이상하게 내 블로그 jekyll theme에서는 남들처럼  
*인라인 코드 블럭(Inline Code Block)의 색상이 뒷 배경과 똑같아서*  
도대체 이게 쓴건지 안 쓴건지 구분이 안되었다.  
<br>

- 인라인 코드 블럭이란, `a = 1`, `"야호~"`, `finallyFoundIt()` 과 같은 Markdown, HTML 문법을 말한다.

### 1. 인라인 코드 블럭 색상 변경
- 수 시간동안 구글링으로 찾고 또 찾았으나, 내가 쓰는 `NOT PURE POOLE` 테마에 대한 정보가 많지 않아서  
`_sass` 폴더 내 `.scss` 파일을 모조리 뒤적이며 이것저것 값을 바꾸어 보았으나, 찾지 못하였다.  
<br>

- 그러다가, 결국 구글링의 도움을 받아 찾아냈다!

```scss
.highlighter-rouge {
  color: #ffffff;
  background-color: #282828;
}
```

- `_code.scss` 파일에 해당 코드를 **새로 삽입** 함으로서 해결하였다.

- 이로써 `#000000` 자리에 색상코드를 이것저것 넣으면서 내 입맛대로 인라인 코드블럭 색상을 바꿀 수 있게 되었다.  
<br>

- 참고로 나는 색상코드를 선정할 때,  
[해당 사이트][def] 를 애용하고, 때로는 그림판에서 직접 색을 추출하여 사용한다.

[def]: https://httpk.tistory.com/entry/%EC%83%89%EC%83%81%ED%91%9C-%EC%BD%94%EB%93%9C%EC%BB%AC%EB%9F%AC%EC%9D%B4%EB%A6%84%EC%98%81%EB%AC%B8%ED%95%9C%EA%B8%80