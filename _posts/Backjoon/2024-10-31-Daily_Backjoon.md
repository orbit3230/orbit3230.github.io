---
layout: post
title: "[데일리 백준] 2193"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-10-31
last_modified_at: 2024-10-31
---
## Silver
### [2193][def]

```c++
#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<long long> dp(n+1);
    dp[1] = 1;
    dp[2] = 1;
    for(int i = 3 ; i <= n ; i++) dp[i] = dp[i-1] + dp[i-2];
    cout << dp[n] << '\n';
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 다이나믹 프로그래밍.

- 점화식을 바로 찾았다. (피보나치 수열)

</div>
</details>

[def]: https://www.acmicpc.net/problem/2193