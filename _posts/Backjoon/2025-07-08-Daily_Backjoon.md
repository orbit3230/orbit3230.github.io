---
layout: post
title: "[데일리 백준] 2240"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-07-08
last_modified_at: 2025-07-08
---
## Gold
### [2240][def]

```c++
#include <iostream>
#include <vector>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);

    int t, w;
    cin >> t >> w;
    vector<int> seq(t);
    for(int i = 0 ; i < t ; i++) cin >> seq[i];

    vector<vector<int>> dp(t, vector<int>(w+1));
    for(int i = 0 ; i <= w ; i++) dp[0][i] = (seq[0] == i%2+1);
    for(int i = 1 ; i < t ; i++) {
        dp[i][0] = dp[i-1][0] + (seq[i] == 1);
        for(int j = 1 ; j <= w ; j++) {
            dp[i][j] = max(dp[i-1][j-1], dp[i-1][j]) + (seq[i] == (j%2 + 1));
        }
    }
    int max = 0;
    int last = t-1;
    for(int i = 0 ; i <= w ; i++) max = std::max(max, dp[last][i]);
    cout << max;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- Dynamic Programming

</div>
</details>

[def]: https://www.acmicpc.net/problem/2240