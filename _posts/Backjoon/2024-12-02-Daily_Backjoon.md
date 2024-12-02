---
layout: post
title: "[데일리 백준] 17069"
excerpt: "2 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-12-02
last_modified_at: 2024-12-02
---
## Gold
### [17069][def], [17070][def2]

```c++
#include <iostream>
#include <vector>
using namespace std;

typedef struct Pipe {
    // {x, y}
    pair<short, short> from;
    pair<short, short> to;
    short type;  // 0: 가로, 1: 세로, 2: 대각선
} Pipe;

long long dfs(const vector<vector<bool>>& house, Pipe& p, vector<vector<vector<long long>>>& dpTable, const int n) {
    short fromX, fromY, toX, toY, type;
    fromX = p.from.first; fromY = p.from.second; toX = p.to.first; toY = p.to.second; type = p.type;
    if(toX == n && toY == n) return 1;
    if(dpTable[toX][toY][type] != -1) return dpTable[toX][toY][type];
    dpTable[toX][toY][type] = 0;
    if(type == 0) {  // 가로
        // (1) 수평 이동
        p.from.second++; p.to.second++;
        if(p.to.first <= n && p.to.second <= n && house[p.to.first][p.to.second])
            dpTable[toX][toY][type] += dfs(house, p, dpTable, n);
        p.from.second--; p.to.second--;
        // (2) 대각선 이동
        p.from.second++; p.to.first++; p.to.second++; p.type = 2;
        // 절대 벽을 긁지 마
        if(p.to.first <= n && p.to.second <= n && house[p.to.first][p.to.second] && house[p.to.first][p.to.second-1] && house[p.to.first-1][p.to.second])
            dpTable[toX][toY][type] += dfs(house, p, dpTable, n);
        p.from.second--; p.to.first--; p.to.second--; p.type = type;
        return dpTable[toX][toY][type];
    }
    if(type == 1) {  // 세로
        // (1) 수직 이동
        p.from.first++; p.to.first++;
        if(p.to.first <= n && p.to.second <= n && house[p.to.first][p.to.second])
            dpTable[toX][toY][type] += dfs(house, p, dpTable, n);
        p.from.first--; p.to.first--;
        // (2) 대각선 이동
        p.from.first++; p.to.first++; p.to.second++; p.type = 2;
        // 절대 벽을 긁지 마
        if(p.to.first <= n && p.to.second <= n && house[p.to.first][p.to.second] && house[p.to.first][p.to.second-1] && house[p.to.first-1][p.to.second])
            dpTable[toX][toY][type] += dfs(house, p, dpTable, n);
        p.from.first--; p.to.first--; p.to.second--; p.type = type;
        return dpTable[toX][toY][type];
    }
    // 대각선
    // (1) 수평 이동
    p.from.first++; p.from.second++; p.to.second++; p.type = 0;
    if(p.to.first <= n && p.to.second <= n && house[p.to.first][p.to.second])
        dpTable[toX][toY][type] += dfs(house, p, dpTable, n);
    p.from.second--; p.to.second--; p.type = type;
    // (2) 수직 이동
    p.from.first++; p.from.second++; p.to.first++; p.type = 1;
    if(p.to.first <= n && p.to.second <= n && house[p.to.first][p.to.second])
        dpTable[toX][toY][type] += dfs(house, p, dpTable, n);
    p.from.first--; p.to.first--; p.type = type;
    // (3) 대각선 이동
    p.from.first++; p.from.second++; p.to.first++; p.to.second++;
    // 절대 벽을 긁지 마
    if(p.to.first <= n && p.to.second <= n && house[p.to.first][p.to.second] && house[p.to.first][p.to.second-1] && house[p.to.first-1][p.to.second])
        dpTable[toX][toY][type] += dfs(house, p, dpTable, n);
    p.from.first--; p.to.first--; p.to.second--;
    return dpTable[toX][toY][type];
}

int main() {
    int n;
    cin >> n;
    vector<vector<bool>> house(n, vector<bool>(n));
    int input;
    for(int i = 0 ; i < n ; i++) {
        for(int j = 0 ; j < n ; j++) {
            cin >> input;
            house[i][j] = !input;
        }
    }
    Pipe p;
    p.from = {0, 0};
    p.to = {0, 1};
    p.type = 0;
    vector<vector<vector<long long>>> dpTable(n, vector<vector<long long>>(n, vector<long long>(3, -1)));
    dfs(house, p, dpTable, n-1);
    cout << dpTable[0][1][0];
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 그래프 탐색 + 다이나믹 프로그래밍.

- 같은 위치라도 현재 바라보는 방향(모양)이 다르면 다른 경우로 취급하여 메모이제이션 하는 것이 포인트 !

</div>
</details>

[def]: https://www.acmicpc.net/problem/17069
[def2]: https://www.acmicpc.net/problem/17070