---
layout: post
title: "[데일리 백준] 15889"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-02-11
last_modified_at: 2025-02-11
---
## Silver
### [15889][def]

```c++
#include <iostream>
#include <vector>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);

    int n;
    cin >> n;
    vector<int> location(n);
    int max_right = 0;
    for(int i = 0 ; i < n ; i++) {
        cin >> location[i];
        max_right = max(max_right, location[i]);
    }
    int range;
    int current = 0;
    for(int i = 0 ; i < n ; i++) {
        if(current < location[i]) {
            cout << "엄마 나 전역 늦어질 것 같아";
            return 0;
        }
        cin >> range;
        current = max(current, location[i]+range);
    }
    cout << "권병장님, 중대장님이 찾으십니다";
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 스위핑 + 그리디 알고리즘

</div>
</details>

[def]: https://www.acmicpc.net/problem/15889