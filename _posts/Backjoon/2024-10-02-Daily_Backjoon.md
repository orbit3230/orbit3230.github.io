---
layout: post
title: "[데일리 백준] 1987"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-10-02
last_modified_at: 2024-10-02
---
## Gold
### [1987][def]

```c++
#include <iostream>
#include <vector>
using namespace std;

int max_step = 0;

void dfs_search(vector<vector<char>>& board, int r, int c, int r_, int c_, int visited, int step) {
    max_step = max(max_step, step);
    // 방문 확인 방법 : 비트마스킹, 0이면 아직 방문하지 않은 새로운 알파벳
    if(r_ - 1 >= 0) {
        int up = visited & (1 << (board[r_-1][c_] - 'A'));
        if(!up) dfs_search(board, r, c, r_-1, c_, visited | (1 << (board[r_-1][c_] - 'A')), step+1);
    }
    if(r_ + 1 < r) {
        int down = visited & (1 << (board[r_+1][c_] - 'A'));
        if(!down) dfs_search(board, r, c, r_+1, c_, visited | (1 << (board[r_+1][c_] - 'A')), step+1);
    }
    if(c_ - 1 >= 0) {
        int left = visited & (1 << (board[r_][c_-1] - 'A'));
        if(!left) dfs_search(board, r, c, r_, c_-1, visited | (1 << (board[r_][c_-1] - 'A')), step+1);
    }
    if(c_ + 1 < c) {
        int right = visited & (1 << (board[r_][c_+1] - 'A'));
        if(!right) dfs_search(board, r, c, r_, c_+1, visited | (1 << (board[r_][c_+1] - 'A')), step+1);
    }
}

int main() {
    int r, c;
    cin >> r >> c;
    vector<vector<char>> board(r, vector<char>(c));
    for(int i = 0 ; i < r ; i++) {
        string line;
        cin >> line;
        for(int j = 0 ; j < c ; j++) board[i][j] = line[j];
    }
    dfs_search(board, r, c, 0, 0, (1 << board[0][0] - 'A'), 1);
    cout << max_step;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 간단한 dfs + 백트래킹 문제.

- 중복을 체크하는 방식으로 비트마스킹을 사용해보았다.  

</div>
</details>

[def]: https://www.acmicpc.net/problem/1987