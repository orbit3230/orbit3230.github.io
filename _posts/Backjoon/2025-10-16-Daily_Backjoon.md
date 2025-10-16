---
layout: post
title: "[데일리 백준] 1743"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-10-16
last_modified_at: 2025-10-16
---
## Silver
### [1743][def]

```c++
#include <iostream>
#include <vector>
#include <queue>
using namespace std;

struct Point {
    int x;
    int y;
};

int bfs(vector<vector<bool>>& board, int i, int j, int n, int m) {
    queue<Point> q;
    q.push({i, j});
    board[i][j] = false;
    int area = 0;
    while(!q.empty()) {
        int x = q.front().x;
        int y = q.front().y;
        q.pop();
        area++;
        if(x+1 < n && board[x+1][y]) { board[x+1][y] = false; q.push({x+1, y}); }
        if(x-1 >= 0 && board[x-1][y]) { board[x-1][y] = false; q.push({x-1, y}); }
        if(y+1 < m && board[x][y+1]) { board[x][y+1] = false; q.push({x, y+1}); }
        if(y-1 >= 0 && board[x][y-1]) {board[x][y-1] = false; q.push({x, y-1}); }
    }
    return area;
}

int main() {
    int n, m, k;
    cin >> n >> m >> k;
    vector<vector<bool>> board(n, vector<bool>(m, false));
    int x, y;
    while(k--) {
        cin >> x >> y;
        x--; y--;  // 0-based index
        board[x][y] = true;
    }
    int max = 0;
    int area;
    for(int i = 0 ; i < n ; i++) {
        for(int j = 0 ; j < m ; j++) {
            if(board[i][j]) {
                area = bfs(board, i, j, n, m);
                max = std::max(max, area);
            }
        }
    }
    cout << max;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- BFS

</div>
</details>

[def]: https://www.acmicpc.net/problem/1743