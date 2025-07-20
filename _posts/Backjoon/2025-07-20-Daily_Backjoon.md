---
layout: post
title: "[데일리 백준] 14728"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-07-20
last_modified_at: 2025-07-20
---
## Gold
### [14728][def]

```c++
#include <iostream>
#include <vector>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);

    int n, t;
    cin >> n >> t;
    vector<vector<int>> dp(n, vector<int>(t+1, 0));
    int k, s;
    cin >> k >> s;
    for(int i = k ; i <= t ; i++) {
        if(t < i) break;
        dp[0][i] = s;
    }
    for(int i = 1 ; i < n ; i++) {
        cin >> k >> s;
        for(int j = 0 ; j <= t ; j++) {
            if(j < k) {
                dp[i][j] = dp[i-1][j];
                continue;
            }
            dp[i][j] = max(dp[i-1][j], dp[i-1][j-k] + s);
        }
    }
    cout << dp[n-1][t];
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- Dynamic Programming (Knapsack Problem)

</div>
</details>

[def]: https://www.acmicpc.net/problem/14728