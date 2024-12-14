---
layout: post
title: "[데일리 백준] 17404"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-12-14
last_modified_at: 2024-12-14
---
## Gold
### [17404][def]

```c++
#include <iostream>
#include <vector>
#define INF INT32_MAX
using namespace std;

int dp(vector<vector<vector<pair<int, bool>>>>& rgb, int n, int row, int col, const int start) {
    if(row == n-1) {
        if(col == start) return INF;
        return rgb[row][col][start].first;
    }
    if(rgb[row][col][start].second) return rgb[row][col][start].first;
    switch(col) {
        case 0:
            rgb[row][col][start].first += min(dp(rgb, n, row+1, 1, start), dp(rgb, n, row+1, 2, start));
            break;
        case 1:
            rgb[row][col][start].first += min(dp(rgb, n, row+1, 0, start), dp(rgb, n, row+1, 2, start));
            break;
        case 2:
            rgb[row][col][start].first += min(dp(rgb, n, row+1, 0, start), dp(rgb, n, row+1, 1, start));
            break;
    }
    rgb[row][col][start].second = true;
    return rgb[row][col][start].first;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);

    int n;
    cin >> n;
    vector<vector<vector<pair<int, bool>>>> rgb(n, vector<vector<pair<int, bool>>>(3, vector<pair<int, bool>>(3, {0, false})));
    int r, g, b;
    for(int i = 0 ; i < n ; i++) {
        cin >> r >> g >> b;
        rgb[i][0][0].first = rgb[i][0][1].first = rgb[i][0][2].first = r;
        rgb[i][1][0].first = rgb[i][1][1].first = rgb[i][1][2].first = g;
        rgb[i][2][0].first = rgb[i][2][1].first = rgb[i][2][2].first = b;
    }
    
    for(int i = 0 ; i < 3 ; i++) {
        dp(rgb, n, 0, i, i);
    }
    int min = INF;
    for(int i = 0 ; i < 3 ; i++) min = std::min(min, rgb[0][i][i].first);
    cout << min;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- Dynamic Programming,

- 3-coloring problem, 그런데 제약이 추가된.  

- 제약이 추가됨으로서 각 열에서 시작하는 DP를 돌릴 때 마다 DP 테이블을 독립적으로 사용해야한다.  
나는 이 방식이 시간초과가 날 줄 알았는데, 통과했다.  

</div>
</details>

[def]: https://www.acmicpc.net/problem/17404