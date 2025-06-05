---
layout: post
title: "[데일리 백준] 13909"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-06-05
last_modified_at: 2025-06-05
---
## Gold
### [13909][def]

```c++
#include <iostream>
#include <vector>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);

    int n;
    cin >> n;
    vector<int> list(n);
    for(int i = 0 ; i < n ; i++) cin >> list[i];
    vector<int> dp(n, 0);
    int max, min, min_max, dp_max = 0;
    for(int i = 1 ; i < n ; i++) {
        max = min = list[i];
        for(int j = i ; j >= 0 ; j--) {
            max = std::max(max, list[j]);
            min = std::min(min, list[j]);
            min_max = abs(max - min);
            dp_max = std::max(dp_max, (j-1 < 0 ? 0 : dp[j-1]) + min_max);
        }
        dp[i] = dp_max;
    }
    cout << dp[n-1];
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- Dynamic Programming  

</div>
</details>

[def]: https://www.acmicpc.net/problem/13909