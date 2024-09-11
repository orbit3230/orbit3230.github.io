---
layout: post
title: "[데일리 백준] 17298, 1306"
excerpt: "1 Gold, 1 Platinum"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-09-11
last_modified_at: 2024-09-11
---
## Gold
### [17298][def3]

```c++
#include <iostream>
#include <stack>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    int n;
    cin >> n;
    stack<int> inputs;  // 입력을 담는 보조 스택
    stack<int> s;            // 계산을 위한 주 스택
    stack<int> result;   // 결과를 담는 보조 스택
    int input;
    for(int i = 0 ; i < n ; i++) {
        cin >> input;
        inputs.push(input);
    }
    // 결과 생성
    int next;
    while(!inputs.empty()) {
        next = inputs.top();
        inputs.pop();
        while(!s.empty() && next >= s.top()) {
            s.pop();
        }
        if(s.empty()) result.push(-1);
        else result.push(s.top());
        s.push(next);
    }
    // 출력
    while(!result.empty()) {
        cout << result.top() << ' ';
        result.pop();
    }
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 스택을 활용한 신박한 문제.  

- 입력을 거꾸로 처리해야하는 발상을 떠올리는 게 어려웠다.  

- [옥상 문제][def4]와 로직이 매우 유사하다.  
해당 문제에서 힌트를 크게 얻었다고도 볼 수 있겠다.  

  - [해당 문제에 대한 포스팅][def5]

</div>
</details>

<br>

## Platinum
### [1306][def]

```c++
#include <iostream>
#include <queue>
using namespace std;

typedef struct AD {
    int brightness;
    int order;
    bool operator<(const AD& other) const {
        return this->brightness < other.brightness;
    }
} AD;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    int n, m;
    cin >> n >> m;
    priority_queue<AD> ads;
    // initialize
    int i;
    for(i = 0 ; i < 2*m-1 ; i++) {
        AD ad;
        cin >> ad.brightness;
        ad.order = i;
        ads.push(ad);
    }
    cout << ads.top().brightness << ' ';

    for(; i < n ; i++) {
        AD ad;
        cin >> ad.brightness;
        ad.order = i;
        ads.push(ad);
        while(ads.top().order <= (i - (2*m-1))) {
            ads.pop();
        }
        cout << ads.top().brightness << ' ';
    }
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 슬라이딩 윈도우 문제.

- [최솟값 찾기][def2] 문제와 거의 비슷한 문제이다.  
유사한 방식으로 이 문제 또란 우선순위 큐로 해결하였다.  

</div>
</details>

[def]: https://www.acmicpc.net/problem/1306
[def2]: https://www.acmicpc.net/problem/11003
[def3]: https://www.acmicpc.net/problem/17298
[def4]: https://www.acmicpc.net/problem/6198
[def5]: https://orbit3230.github.io/2024/08/28/Daily_Backjoon/