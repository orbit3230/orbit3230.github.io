---
layout: post
title: "[데일리 백준] 1306"
excerpt: "1 Platinum"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-09-11
last_modified_at: 2024-09-11
---
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