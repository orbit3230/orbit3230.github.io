---
layout: post
title: "[연구실] Build with jekyll 실패"
excerpt: "Liquid Exception: Liquid syntax error"

tags:
  - [연구실, Jekyll]

toc: true

date: 2024-09-02
last_modified_at: 2024-09-02
---
## 문제 발견
- 포스팅이 안 올라가고 있는 것을 뒤늦게 발견하였다.  

![jekyll_1][def2]

- `page build and deployment`가 실패하고 있었고, 세부 단계 진행상황을 보았더니 `Build with Jekyll` 단계에서 빌드를 실패하고 있었다.  

- 처음에는 Jekyll 버전의 호환성 문제인가 싶어서 이런저런 시도를 해보았으나 실패하여,  
다시 탐색해보다가 해결 방안을 구글에서 발견하였다.  
[참조 페이지][def]  

<br>

## 해결 방안
- 문제는 Jekyll에서 사용하는 Liquid 언어의 문법 중에서 `{% raw %}{{`와 `}}{% endraw %}`가 이스케이프 문자라서 발생하는 문제였다.  

![jekyll_2][def3]  

- 실제로 에러 메세지를 따라서 가본 해당 포스팅의 34번째 줄에서 해당 문자 조합을 사용하고 있었고,  
빌드에 실패하기 시작한 시점 또한 해당 포스팅을 업로드한 시점과 일치했다.  

![jekyll_3][def4]  

- 따라서 해당 `{% raw %}{{`와 `}}{% endraw %}` 이전, 이후에 각각 `{``% raw %}`와 `{% endraw %``}`를 추가하여 문제를 해결하였다.  

![jekyll_4][def5]

- 빌드가 정상적으로 완료되었다.  

![jekyll_5][def6]

[def]: https://iamheesoo.github.io/blog//gitblog-sol-jekyll02
[def2]: https://i.imgur.com/r9IdfQV.png
[def3]: https://i.imgur.com/2kWYAFG.png
[def4]: https://i.imgur.com/cttZ6ro.png
[def5]: https://i.imgur.com/Bh2fg2B.png
[def6]: https://i.imgur.com/zOO05qq.png