---
layout: post
title: "[데일리 백준] 15558"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-05-06
last_modified_at: 2025-05-06
---
## Gold
### [15558][def]

```c++
#include <iostream>
#include <vector>
#include <queue>
using namespace std;

bool bfs(vector<vector<bool>>& board, int n, int k) {
    // {{x, y}, time}
    queue<pair<pair<int, int>, int>> q;
    q.push({{0, 0}, 0});
    board[0][0] = false;
    while(!q.empty()) {
        int x = q.front().first.first;
        int y = q.front().first.second;
        int time = q.front().second;
        q.pop();
        if(y+1 >= n) return true;
        if(board[x][y+1]) {
            q.push({{x, y+1}, time+1});
            board[x][y+1] = false;
        }
        if(y > 0 && y-1 > time && board[x][y-1]) {
            q.push({{x, y-1}, time+1});
            board[x][y-1] = false;
        }
        if(y+k >= n) return true;
        x ^= 1;
        if(board[x][y+k]) {
            q.push({{x, y+k}, time+1});
            board[x][y+k] = false;
        }
    }
    return false;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);

    int n, k;
    cin >> n >> k;
    vector<vector<bool>> board(2, vector<bool>(n, true));
    string input;
    for(int i = 0 ; i < 2 ; i++) {
        cin >> input;
        for(int j = 0 ; j < n ; j++) if(input[j] == '0') board[i][j] = false;
    }
    cout << (bfs(board, n, k) ? 1 : 0);
}

```

<details>
<summary>코멘트</summary>
<div markdown="1">

- BFS

</div>
</details>

[def]: https://www.acmicpc.net/problem/15558