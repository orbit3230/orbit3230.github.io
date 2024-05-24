---
layout: post
title: "[데일리 백준] 11659"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-05-24
last_modified_at: 2024-05-24
---
## Silver
### [11659][def]

```c++
#include <iostream>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
	cin.tie(NULL);
	cout.tie(NULL);

    int n, m;
    cin >> n >> m;

    int *num = new int[n];
    for(int i = 0; i < n; i++) {
        cin >> num[i];
        if(i != 0)
            num[i] += num[i-1];  // 누적하며 저장
    }

    // from ~ to 까지의 누적합 : (0 ~ to) - (0 ~ from-1)
    for(int i = 0; i < m; i++) {
        int from, to;
        cin >> from >> to;
        from--; to--;
        if(from == 0)
            cout << num[to] << '\n';
        else
            cout << num[to] - num[from-1] << '\n';
    }
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 2차원 배열에 부분합 시작 - 행번호 / 끝 - 열번호로 하여  
결과값을 미리 저장해두고 접근하는 방식은 나쁘지 않았다.  
다만 메모리 사용량이 과도하게 많았다.  

- 시간적으로도, 공간적으로도 아름다운 알고리즘이 있다.  
`from` ~ `to` 까지의 누적합은,  
[(`0` ~ `to`) 까지의 누적합] - [(`0` ~ `from-1`) 까지의 누적합] 차이와 같다.  
이건 마치 99 + 99 라는 연산을 (100 - 1) + (100 - 1) 처럼 생각하는 vibe라고 해야하나?  
아무튼 아름다운 접근 방식이다.  

- 추가적으로,  
입출력이 매우 많은 BOJ 문제에서는 꼭  
이 세 줄의 코드를 추가하자...

```c++
ios::sync_with_stdio(false);
cin.tie(NULL);
cout.tie(NULL);
```

</div>
</details>

[def]: https://www.acmicpc.net/problem/11659