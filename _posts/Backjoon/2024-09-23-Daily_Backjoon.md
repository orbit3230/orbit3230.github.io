---
layout: post
title: "[데일리 백준] 2579"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-09-23
last_modified_at: 2024-09-23
---
## Gold
### [2579][def]

```c++
#include <iostream>
#include <vector>
using namespace std;

void dp(vector<vector<int>>& dpTable, int n) {
    dpTable[0][2] = dpTable[0][1] = dpTable[0][0];
    if(n > 1) {
        dpTable[1][1] = dpTable[1][0];
        dpTable[1][2] = dpTable[1][0] + dpTable[0][0];
    }
    for(int i = 2 ; i < n ; i++) {
        dpTable[i][1] = dpTable[i][0] + max(dpTable[i-2][1], dpTable[i-2][2]);
        dpTable[i][2] = dpTable[i][0] + dpTable[i-1][1];
    }
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);

    int n;
    cin >> n;
    // column
    // 0 : base
    // 1 : sequence 1
    // 2 : sequence 2
    vector<vector<int>> dpTable(n, vector<int>(3, 0));
    for(int i = 0 ; i < n ; i++) {
        cin >> dpTable[i][0];
    }
    dp(dpTable, n);
    cout << max(dpTable[n-1][1], dpTable[n-1][2]);
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- DP를 연습해 보았다.

</div>
</details>

[def]: https://www.acmicpc.net/problem/2579