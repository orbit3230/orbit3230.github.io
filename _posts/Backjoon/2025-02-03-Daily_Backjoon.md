---
layout: post
title: "[데일리 백준] 16956"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-02-03
last_modified_at: 2025-02-03
---
## Silver
### [16956][def]

```c++
#include <iostream>
#include <vector>
using namespace std;

typedef struct Point {
    int x;
    int y;
} Point;

bool fill(vector<vector<char>>& board, int r, int c, vector<Point>& sheeps) {
    for(Point& sheep : sheeps) {
        if(sheep.x > 0) {
            if(board[sheep.x-1][sheep.y] == 'W') return false;
            if(board[sheep.x-1][sheep.y] == '.') board[sheep.x-1][sheep.y] = 'D';
        }
        if(sheep.x < r-1) {
            if(board[sheep.x+1][sheep.y] == 'W') return false;
            if(board[sheep.x+1][sheep.y] == '.') board[sheep.x+1][sheep.y] = 'D';
        }
        if(sheep.y > 0) {
            if(board[sheep.x][sheep.y-1] == 'W') return false;
            if(board[sheep.x][sheep.y-1] == '.') board[sheep.x][sheep.y-1] = 'D';
        }
        if(sheep.y < c-1) {
            if(board[sheep.x][sheep.y+1] == 'W') return false;
            if(board[sheep.x][sheep.y+1] == '.') board[sheep.x][sheep.y+1] = 'D';
        }
    }
    return true;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    int r, c;
    cin >> r >> c;
    vector<vector<char>> board(r, vector<char>(c));
    vector<Point> sheeps;  // 양들을 싹다 가둬버릴거임
    for(int i = 0 ; i < r ; i++) {
        for(int j = 0 ; j < c ; j++) {
            cin >> board[i][j];
            if(board[i][j] == 'S') sheeps.push_back({i, j});
        }
    }
    if(!fill(board, r, c, sheeps)) {
        cout << 0;
        return 0;
    }
    cout << 1 << '\n';
    for(int i = 0 ; i < r ; i++) {
        for(int j = 0 ; j < c ; j++) cout << board[i][j];
        cout << '\n';
    }
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 재미있는 애드 혹 문제 !!

</div>
</details>

[def]: https://www.acmicpc.net/problem/16956