---
layout: post
title: "[데일리 백준] 2491"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-05-02
last_modified_at: 2025-05-02
---
## Silver
### [2491][def]

```c++
#include <iostream>
#include <vector>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);

    int n;
    cin >> n;
    vector<vector<int>> dp(2, vector<int>(n));
    // row 0 : increasing / row 1 : decreasing
    int input, prev;
    int max = 1;
    cin >> input;
    dp[0][0] = 1;
    dp[1][0] = 1;
    prev = input;
    for(int i = 1 ; i < n ; i++) {
        cin >> input;
        if(input > prev) {
            dp[0][i] = dp[0][i-1]+1;
            dp[1][i] = 1;
            goto Next;
        }
        if(input < prev) {
            dp[0][i] = 1;
            dp[1][i] = dp[1][i-1]+1;
            goto Next;
        }
        dp[0][i] = dp[0][i-1]+1;
        dp[1][i] = dp[1][i-1]+1;
        Next:
        prev = input;
        max = std::max(max, std::max(dp[0][i], dp[1][i]));
    }
    cout << max;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- DP (날먹)

</div>
</details>

[def]: https://www.acmicpc.net/problem/2491