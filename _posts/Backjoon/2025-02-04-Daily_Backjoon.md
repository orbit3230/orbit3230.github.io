---
layout: post
title: "[데일리 백준] 2225"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-02-04
last_modified_at: 2025-02-04
---
## Gold
### [2225][def]

```c++
#include <iostream>
#include <vector>
#define DIV 1000000000
using namespace std;

int main() {
    int n, k;
    cin >> n >> k;
    vector<vector<int>> dpTable(k+1, vector<int>(n+1, 1));
    for(int count = 2 ; count <= k ; count++) {  // 행 - 개수
        int sum = dpTable[count-1][0];  // 1
        for(int value = 1 ; value <= n ; value++) {  // 열 - 값
            dpTable[count][value] = (sum = (sum + dpTable[count-1][value]) % DIV);
        }
    }
    cout << dpTable[k][n];
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- Dynamic Programming

</div>
</details>

[def]: https://www.acmicpc.net/problem/2225