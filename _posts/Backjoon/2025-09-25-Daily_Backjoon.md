---
layout: post
title: "[데일리 백준] 1309"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-09-25
last_modified_at: 2025-09-25
---
## Silver
### [1309][def]

```c++
#include <iostream>
#include <vector>
#define DIV 9901
using namespace std;

int main() {
    int n;
    cin >> n;
    int dp_past_past = 3;
    if(n == 1) {
        cout << dp_past_past;
        return 0;
    }
    int dp_past = 7;
    if(n == 2) {
        cout << dp_past;
        return 0;
    }

    int dp;
    for(int dp_count = 3 ; dp_count <= n ; dp_count++) {
        dp = 0;
        dp += 1;
        dp += (dp_past_past + dp_past + (dp_past - 1 - 2)) % DIV;
        dp += 2;
        dp_past_past = dp_past;
        dp_past = dp;
    }
    cout << dp;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- Dynamic Programming

</div>
</details>

[def]: https://www.acmicpc.net/problem/1309