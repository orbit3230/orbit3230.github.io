---
layout: post
title: "[데일리 백준] 1932"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-11-01
last_modified_at: 2024-11-01
---
## Silver
### [1932][def]

```c++
#include <iostream>
#include <vector>
using namespace std;

int dp(vector<vector<int>>& triangle, vector<vector<int>>& dpTable, int row, int col, int n) {
    if(row == n-1) return triangle[row][col];
    if(dpTable[row][col] != 0) return dpTable[row][col];  // already optimized
    return dpTable[row][col] = triangle[row][col] + max(dp(triangle, dpTable, row+1, col, n), dp(triangle, dpTable, row+1, col+1, n));
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);

    int n;
    cin >> n;
    vector<vector<int>> triangle(n, vector<int>(n));
    for(int i = 0 ; i < n ; i++) {
        for(int j = 0 ; j <= i ; j++) {
            cin >> triangle[i][j];
        }
    }
    vector<vector<int>> dpTable(n, vector<int>(n, 0));
    cout << dp(triangle, dpTable, 0, 0, n);
    
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 다이나믹 프로그래밍.

- 간단한 Top-Down 방식.

</div>
</details>

[def]: https://www.acmicpc.net/problem/1932