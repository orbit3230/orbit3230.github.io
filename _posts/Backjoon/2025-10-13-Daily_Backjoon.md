---
layout: post
title: "[데일리 백준] 2583"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-10-13
last_modified_at: 2025-10-13
---
## Silver
### [2583][def]

```c++
#include <iostream>
#include <vector>
#include <algorithm>
#include <queue>
using namespace std;

int getArea(vector<vector<bool>>& map, int i , int j , int n , int m) {
    queue<pair<int, int>> q;
    q.push({i, j});
    map[i][j] = true;
    int area = 0;
    while(!q.empty()) {
        int x = q.front().first;
        int y = q.front().second;
        q.pop();
        area++;
        if(x+1 < n && !map[x+1][y]) { q.push({x+1, y}); map[x+1][y] = true; }
        if(x-1 >= 0 && !map[x-1][y]) { q.push({x-1, y}); map[x-1][y] = true; }
        if(y+1 < m && !map[x][y+1]) { q.push({x, y+1}); map[x][y+1] = true; }
        if(y-1 >= 0 && !map[x][y-1]) { q.push({x, y-1}); map[x][y-1] = true; }
    }
    return area;
}

int main() {
    int n, m, k;
    cin >> n >> m >> k;
    vector<vector<bool>> map(n, vector<bool>(m, false));
    int x_from, y_from, x_to, y_to;
    while(cin >> y_from >> x_from >> y_to >> x_to) {
        for(int i = x_from ; i < x_to ; i++) {
            for(int j = y_from ; j < y_to ; j++) map[i][j] = true;
        }
    }
    int area;
    vector<int> areas;
    for(int i = 0 ; i < n ; i++) {
        for(int j = 0 ; j < m ; j++) {
            if(!map[i][j]) {
                area = getArea(map, i, j, n, m);
                areas.push_back(area);
            }
        }
    }
    sort(areas.begin(), areas.end());
    cout << areas.size() << '\n';
    for(int area : areas) cout << area << ' ';
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- BFS

</div>
</details>

[def]: https://www.acmicpc.net/problem/2583