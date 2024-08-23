---
layout: post
title: "[데일리 백준] 1448"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-08-23
last_modified_at: 2024-08-23
---
## Silver
### [1448][def]

```c++
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    int n;
    cin >> n;
    vector<int> sticks(n);
    for(int i = 0 ; i < n ; i++) {
        cin >> sticks[i];
    }
    sort(sticks.begin(), sticks.end(), greater<int>());
    for(int i = 0 ; i < n-2 ; i++) {
        if(sticks[i] < sticks[i+1] + sticks[i+2]) {  // 삼각형의 조건
            cout << sticks[i] + sticks[i+1] + sticks[i+2];
            return 0;
        }
    }
    cout << -1;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 쉬어가는 날.

</div>
</details>

[def]: https://www.acmicpc.net/problem/1448