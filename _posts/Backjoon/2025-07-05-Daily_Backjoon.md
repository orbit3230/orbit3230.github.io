---
layout: post
title: "[데일리 백준] 3190"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-07-05
last_modified_at: 2025-07-05
---
## Gold
### [3190][def]

```c++
#include <iostream>
#include <vector>
#include <queue>
using namespace std;

typedef struct Place {
    bool isSnake = false;
    bool isApple = false;
} Place;

typedef struct Snake {
    int moveX = 0;
    int moveY = 1;
    char direction = 'E';
} Snake;
void changeDirection(Snake& s, char turn) {
    if(s.direction == 'N' && turn == 'L') { s.moveX = 0; s.moveY = -1; s.direction = 'W'; return; }
    if(s.direction == 'N' && turn == 'D') { s.moveX = 0; s.moveY = 1; s.direction = 'E'; return; }
    if(s.direction == 'S' && turn == 'L') { s.moveX = 0; s.moveY = 1; s.direction = 'E'; return; }
    if(s.direction == 'S' && turn == 'D') { s.moveX = 0; s.moveY = -1; s.direction = 'W'; return; }
    if(s.direction == 'E' && turn == 'L') { s.moveX = -1; s.moveY = 0; s.direction = 'N'; return; }
    if(s.direction == 'E' && turn == 'D') { s.moveX = 1; s.moveY = 0; s.direction = 'S'; return; }
    if(s.direction == 'W' && turn == 'L') { s.moveX = 1; s.moveY = 0; s.direction = 'S'; return; }
    if(s.direction == 'W' && turn == 'D') { s.moveX = -1; s.moveY = 0; s.direction = 'N'; return; }
}

int simulate(vector<vector<Place>>& board, queue<pair<int, char>>& inputs, int n) {
    int time = 0;
    Snake s;
    queue<pair<int, int>> snake;
    board[0][0].isSnake = true;
    snake.push({0, 0});
    int x = 0;
    int y = 0;
    while(true) {
        x += s.moveX;
        y += s.moveY;
        time++;
        if(time == inputs.front().first) {
            changeDirection(s, inputs.front().second);
            inputs.pop();
        }
        if(x < 0 || x >= n || y < 0 || y >= n || board[x][y].isSnake) return time;
        snake.push({x, y});
        if(!board[x][y].isApple) {
            board[snake.front().first][snake.front().second].isSnake = false;
            snake.pop();
            board[x][y].isSnake = true;
            continue;
        }
        board[x][y].isApple = false;
        board[x][y].isSnake = true;
    }
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);

    int n, k;
    cin >> n >> k;
    vector<vector<Place>> board(n, vector<Place>(n));
    int x, y;
    while(k--) {
        cin >> x >> y;
        x--; y--;  // 0-based index
        board[x][y].isApple = true;
    }
    queue<pair<int, char>> inputs;
    int l;
    cin >> l;
    int time; char c;
    while(l--) {
        cin >> time >> c;
        inputs.push({time, c});
    }
    int end = simulate(board, inputs, n);
    cout << end;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 큐 & 시뮬레이션

</div>
</details>

[def]: https://www.acmicpc.net/problem/3190