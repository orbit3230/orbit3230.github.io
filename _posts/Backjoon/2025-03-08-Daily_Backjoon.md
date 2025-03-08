---
layout: post
title: "[데일리 백준] 3109"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-03-08
last_modified_at: 2025-03-08
---
## Gold
### [3109][def]

```c++
#include <iostream>
#include <vector>
using namespace std;

typedef struct Location {
    int x;
    int y;
    bool visited;
} Location;

bool dfs(vector<vector<Location>>& board, int x, int y, int r, int c) {
    if(y == c - 1) return true;
    board[x][y].visited = true;
    if(x - 1 >= 0 && !board[x - 1][y + 1].visited) {  // / 방향
        if(dfs(board, x - 1, y + 1, r, c)) return true;
    }
    if(!board[x][y + 1].visited) {  // - 방향
        if(dfs(board, x, y + 1, r, c)) return true;
    }
    if(x + 1 < r && !board[x + 1][y + 1].visited) {  // \ 방향
        if(dfs(board, x + 1, y + 1, r, c)) return true;
    }
    return false;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);

    int r, c;
    cin >> r >> c;
    vector<vector<Location>> board(r, vector<Location>(c));
    string input;
    for(int i = 0 ; i < r ; i++) {
        cin >> input;
        for(int j = 0 ; j < c ; j++) {
            board[i][j].x = i;
            board[i][j].y = j;
            board[i][j].visited = (input[j] == 'x');
        }
    }
    int count = 0;
    for(int i = 0 ; i < r ; i++) {
        if(dfs(board, i, 0, r, c)) count++;
    }
    cout << count << endl;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- DFS

- DFS에서 우선적으로 진행할 방향의 순서는 중요하다.  

</div>
</details>

[def]: https://www.acmicpc.net/problem/3109