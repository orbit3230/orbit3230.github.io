---
layout: post
title: "[데일리 백준] 1890"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-09-22
last_modified_at: 2025-09-22
---
## Silver
### [1890][def]

```c++
#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<vector<int>> map(n, vector<int>(n));
    for(int i = 0 ; i < n ; i++) for(int j = 0 ; j < n ; j++) cin >> map[i][j];
    vector<vector<long long>> dpTable(n, vector<long long>(n, 0));
    dpTable[0][0] = 1;
    for(int i = 0 ; i < n ; i++) {
        for(int j = 0 ; j < n ; j++) {
            if(map[i][j] == 0) continue;
            int jump = map[i][j];
            if(i + jump < n) dpTable[i + jump][j] += dpTable[i][j];
            if(j + jump < n) dpTable[i][j + jump] += dpTable[i][j];
        }
    }
    cout << dpTable[n-1][n-1];
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- Dynamic Programming

</div>
</details>

[def]: https://www.acmicpc.net/problem/1890