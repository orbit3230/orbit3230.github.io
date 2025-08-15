---
layout: post
title: "[데일리 백준] 2617"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-07-25
last_modified_at: 2025-07-25
---
## Gold
### [2617][def]

```c++
#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<long long> dp(n, 0);
    if(n <= 6) {
        cout << n;
        return 0;
    }
    for(int i = 0 ; i < 6 ; i++) dp[i] = i+1;
    for(int i = 6 ; i < n ; i++) {
        for(int j = 3 ; j <= 5 ; j++) 
        dp[i] = max(dp[i], dp[i-j] * (j-1));
    }
    cout << dp[n-1];
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- Dynamic Programming

- 현재 클립보드의 상태를 기억해야 하는 줄 알고 어렵게 생각했던 문제

- 세 동작을 한 세트로 적용하면 `2`배, 그리고 붙여넣기를 한 번 더하면 `2`+`1` = `3`배로 간단하게 생각하면 되는 문제였다.  

</div>
</details>

[def]: https://www.acmicpc.net/problem/2617