---
layout: post
title: "[데일리 백준] 1106"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-07-09
last_modified_at: 2025-07-09
---
## Gold
### [1106][def]

```c++
#include <iostream>
#include <vector>
using namespace std;

typedef struct AD {
    int cost;
    int value;
} AD;

int main()  {
    int c, n;
    cin >> c >> n;
    vector<AD> ads(n);
    for(int i = 0 ; i < n ; i++) cin >> ads[i].cost >> ads[i].value;
    vector<vector<int>> dp(n, vector<int>(c+1, INT32_MAX));
    for(int j = 1 ; j <= c ; j++) {
        dp[0][j] = ((j-1)/ads[0].value+1)* ads[0].cost;
    }
    for(int i = 1 ; i < n ; i++) {
        for(int j = 1 ; j <= c ; j++) {
            int prev = (j - ads[i].value <= 0) ? 0 : dp[i][j-ads[i].value];
            dp[i][j] = min(dp[i-1][j], prev + ads[i].cost);
        }
    }
    cout << dp[n-1][c];
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- Dynamic Programming (Knapsack Problem)

</div>
</details>

[def]: https://www.acmicpc.net/problem/1106