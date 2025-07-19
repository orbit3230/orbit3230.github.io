---
layout: post
title: "[데일리 백준] 21758"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-07-19
last_modified_at: 2025-07-19
---
## Gold
### [21758][def]

```c++
#include <iostream>
#include <vector>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);

    int n;
    cin >> n;
    vector<int> list(n+1);
    vector<int> sum(n+1, 0);
    for(int i = 1 ; i <= n ; i++) {
        cin >> list[i];
        sum[i] = sum[i-1] + list[i];
    }
    // case 1 - 가운데로 모이기
    int max = 0;
    int result;
    for(int i = 2 ; i < n ; i++) {
        result = sum[i] - sum[1];
        result += sum[n-1] - sum[i-1];
        max = std::max(max, result);
    }
    // case 2 - << 방향
    for(int i = n-1 ; i > 1 ; i--) {
        result = sum[n-1];
        result -= list[i];
        result += sum[i-1];
        max = std::max(max, result);
    }
    // case 3 - >> 방향
    for(int i = 2 ; i < n ; i++) {
        result = sum[n] - sum[1];
        result -= list[i];
        result += sum[n] - sum[i];
        max = std::max(max, result);
    }
    cout << max;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- Prefix Sum

</div>
</details>

[def]: https://www.acmicpc.net/problem/21758