---
layout: post
title: "[데일리 백준] 2156"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-09-15
last_modified_at: 2025-09-15
---
## Silver
### [2156][def]

```c++
#include <iostream>
#include <vector>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);

    int n;
    cin >> n;
    vector<int> wine(n);
    for(int i = 0 ; i < n ; i++) cin >> wine[i];
    vector<vector<int>> dpTable(3, vector<int>(n, 0));
    dpTable[1][0] = wine[0];
    for(int i = 1; i < n ; i++) {
        dpTable[0][i] = max(dpTable[0][i-1], max(dpTable[1][i-1], dpTable[2][i-1]));
        dpTable[1][i] = dpTable[0][i-1] + wine[i];
        dpTable[2][i] = dpTable[1][i-1] + wine[i];
    }
    cout << max(dpTable[0][n-1], max(dpTable[1][n-1], dpTable[2][n-1]));
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- Dynamic Programming

</div>
</details>

[def]: https://www.acmicpc.net/problem/2156