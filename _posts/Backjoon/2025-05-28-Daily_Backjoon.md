---
layout: post
title: "[데일리 백준] 13699"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-05-28
last_modified_at: 2025-05-28
---
## Gold
### [13699][def]

```c++
#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<long long> dp(n+1, 0);
    dp[0] = 1;
    for(int i = 1 ; i <= n ; i++) {
        for(int j = 0 ; j < i ; j++) {
            dp[i] += dp[j] * dp[i - 1 - j];
        }
    }
    cout << dp[n];
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 점화식 (날먹)

</div>
</details>

[def]: https://www.acmicpc.net/problem/13699