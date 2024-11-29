---
layout: post
title: "[데일리 백준] 11051"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-11-29
last_modified_at: 2024-11-29
---
## Silver
### [11051][def]

```c++
#include <iostream>
#include <vector>
using namespace std;

void binomialCoefficient(vector<vector<int>>& dp, int n) {
    for(int i = 2 ; i <= n ; i++) {
        for(int j = 1 ; j < i ; j++) {
            dp[i][j] = (dp[i-1][j-1] + dp[i-1][j]) % 10007;
        }
    }
}

int main() {
    int n, k;
    cin >> n >> k;
    vector<vector<int>> dp(n+1, vector<int>(n+1, 1));
    binomialCoefficient(dp, n);
    cout << dp[n][k];
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- Dynamic Programming + 조합론

</div>
</details>

[def]: https://www.acmicpc.net/problem/11051