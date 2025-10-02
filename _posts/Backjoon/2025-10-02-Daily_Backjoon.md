---
layout: post
title: "[데일리 백준] 15990"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-10-02
last_modified_at: 2025-10-02
---
## Silver
### [15990][def]

```c++
#include <iostream>
#include <vector>
#define DIV 1000000009
#define SIZE 100000
using namespace std;

void fill_table(vector<vector<int>>& dp) {
    dp[0][0] = 1;
    dp[1][1] = 1;
    dp[0][2] = 1; dp[1][2] = 1; dp[2][2] = 1;
    for(int i = 3 ; i <= SIZE ; i++) {
        dp[0][i] = (dp[1][i-1] + dp[2][i-1]) % DIV;
        dp[1][i] = (dp[0][i-2] + dp[2][i-2]) % DIV;
        dp[2][i] = (dp[0][i-3] + dp[1][i-3]) % DIV;
    }
}

int main() {
    int t;
    cin >> t;
    vector<vector<int>> dp(3, vector<int>(SIZE+1, 0));
    fill_table(dp);
    while(t--) {
        int n;
        cin >> n;
        long long sum = 0;
        sum += dp[0][n-1] % DIV;
        sum += dp[1][n-1] % DIV;
        sum += dp[2][n-1] % DIV;
        sum %= DIV;
        cout << sum << '\n';
    }
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- Dynamic Programming
  - End with `row #`+`1`

</div>
</details>

[def]: https://www.acmicpc.net/problem/15990