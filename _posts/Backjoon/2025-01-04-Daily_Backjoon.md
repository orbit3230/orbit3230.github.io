---
layout: post
title: "[데일리 백준] 16724"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-01-04
last_modified_at: 2025-01-04
---
## Gold
### [16724][def]

```c++
#include <iostream>
#include <vector>
using namespace std;

typedef struct Element {
    int index;
    int parent;
    int x;
    int y;
    int moveX;
    int moveY;
    bool visited = false;
} Element;

int next(vector<vector<Element>>& board, Element& e) {
    e.visited = true;
    int x_ = e.x + e.moveX;
    int y_ = e.y + e.moveY;
    if(board[x_][y_].visited) return e.parent = board[x_][y_].parent;
    return e.parent = next(board, board[x_][y_]);
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);

    int n, m;
    cin >> n >> m;
    vector<vector<Element>> board(n, vector<Element>(m));
    string input;
    int index = 0;
    for(int i = 0 ; i < n ; i++) {
        cin >> input;
        for(int j = 0 ; j < m ; j++) {
            board[i][j].index = board[i][j].parent = index++;
            board[i][j].x = i; board[i][j].y = j;
            switch(input[j]) {
                case 'U': board[i][j].moveX = -1; board[i][j].moveY = 0; break;
                case 'D': board[i][j].moveX = 1; board[i][j].moveY = 0; break;
                case 'L': board[i][j].moveX = 0; board[i][j].moveY = -1; break;
                case 'R': board[i][j].moveX = 0; board[i][j].moveY = 1; break;
            }
        }
    }
    for(vector<Element>& row : board) {
        for(Element& e : row) {
            if(e.visited) continue;
            next(board, e);
        }
    }
    int safe_zones = 0;
    for(vector<Element>& row : board) {
        for(Element& e : row) {
            if(e.index == e.parent) safe_zones++;
        }
    }
    cout << safe_zones;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 그래프 탐색 + 약간의 유니온 파인드 아이디어

</div>
</details>

[def]: https://www.acmicpc.net/problem/16724