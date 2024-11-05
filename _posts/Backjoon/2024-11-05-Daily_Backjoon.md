---
layout: post
title: "[데일리 백준] 1520"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-11-05
last_modified_at: 2024-11-05
---
## Gold
### [1520][def]

```c++
#include <iostream>
#include <vector>
using namespace std;

int dfs_dp(vector<vector<short>>& map, vector<vector<int>>& dpTable, short x, short y, int m, int n) {
    if(x == m-1 && y == n-1) return 1;
    if(dpTable[x][y] != -1) return dpTable[x][y];
    dpTable[x][y] = 0;
    if(x > 0 && map[x][y] > map[x-1][y]) dpTable[x][y] += dfs_dp(map, dpTable, x-1, y, m, n);
    if(x < m-1 && map[x][y] > map[x+1][y]) dpTable[x][y] += dfs_dp(map, dpTable, x+1, y, m, n);
    if(y > 0 && map[x][y] > map[x][y-1]) dpTable[x][y] += dfs_dp(map, dpTable, x, y-1, m, n);
    if(y < n-1 && map[x][y] > map[x][y+1]) dpTable[x][y] += dfs_dp(map, dpTable, x, y+1, m, n);
    return dpTable[x][y];
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);

    int m, n;
    cin >> m >> n;
    vector<vector<short>> map(m, vector<short>(n));
    vector<vector<int>> dpTable(m, vector<int>(n, -1));
    for(int i = 0 ; i < m ; i++) {
        for(int j = 0 ; j < n ; j++) {
            cin >> map[i][j];
        }
    }
    cout << dfs_dp(map, dpTable, 0, 0, m, n);
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- DFS + DP

- 중복되는 DFS 탐색을 줄여주는 Dynamic Programming  

</div>
</details>

[def]: https://www.acmicpc.net/problem/1520