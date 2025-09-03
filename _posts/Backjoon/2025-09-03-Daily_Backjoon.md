---
layout: post
title: "[데일리 백준] 13460"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-09-03
last_modified_at: 2025-09-03
---
## Gold
### [13460][def]

```c++
#include <iostream>
#include <vector>
#include <queue>
using namespace std;

struct Point {
    int x;
    int y;
    bool isWall;
    bool isRed = false;
    bool isBlue = false;
    bool isFinish = false;
};
struct State {
    vector<vector<Point>> board;
    Point red;
    Point blue;
    int step;
    int state;
};

// for debugging
bool printBoard(const vector<vector<Point>>& board) {
    for(int i = 0 ; i < board.size() ; i++) {
        for(int j = 0 ; j < board[0].size() ; j++) {
            if(board[i][j].isWall) cout << '#';
            else if(board[i][j].isRed) cout << 'R';
            else if(board[i][j].isBlue) cout << 'B';
            else if(board[i][j].isFinish) cout << 'O';
            else cout << '.';
        }
        cout << '\n';
    }
    cout << '\n';
    return true;
}
// state
// -1 : fail (blue in finish)
// 0 : nothing
// 1 : red in finish
State moveLeft(vector<vector<Point>> board, Point red, Point blue, int step) {
    bool redFirst = (red.x == blue.x && red.y < blue.y);
    // blue move
    bool blueStop = (board[blue.x][blue.y-1].isWall);
    while(!blueStop) {
        board[blue.x][blue.y].isBlue = false;
        blue.y -= 1;
        board[blue.x][blue.y].isBlue = true;
        if(board[blue.x][blue.y].isFinish) return {board, red, blue, step+1, -1};
        if(board[blue.x][blue.y-1].isWall) blueStop = true;
    }
    // red move
    bool redStop = (board[red.x][red.y-1].isWall);
    while(!redStop) {
        board[red.x][red.y].isRed = false;
        red.y -= 1;
        board[red.x][red.y].isRed = true;
        if(board[red.x][red.y].isFinish) return {board, red, blue, step+1, 1};
        if(board[red.x][red.y-1].isWall) redStop = true;
    }
    // if blue & red are in same place
    if(blue.x == red.x && blue.y == red.y) {
        if(redFirst) {
            board[blue.x][blue.y].isBlue = false;
            blue.y += 1;
            board[blue.x][blue.y].isBlue = true;
        }
        else {
            board[red.x][red.y].isRed = false;
            red.y += 1;
            board[red.x][red.y].isRed = true;
        }
    }
    return {board, red, blue, step+1, 0};
}
State moveRight(vector<vector<Point>> board, Point red, Point blue, int step) {
    bool redFirst = (red.x == blue.x && red.y > blue.y);
    // blue move
    bool blueStop = (board[blue.x][blue.y+1].isWall);
    while(!blueStop) {
        board[blue.x][blue.y].isBlue = false;
        blue.y += 1;
        board[blue.x][blue.y].isBlue = true;
        if(board[blue.x][blue.y].isFinish) return {board, red, blue, step+1, -1};
        if(board[blue.x][blue.y+1].isWall) blueStop = true;
    }
    // red move
    bool redStop = (board[red.x][red.y+1].isWall);
    while(!redStop) {
        board[red.x][red.y].isRed = false;
        red.y += 1;
        board[red.x][red.y].isRed = true;
        if(board[red.x][red.y].isFinish) return {board, red, blue, step+1, 1};
        if(board[red.x][red.y+1].isWall) redStop = true;
    }
    // if blue & red are in same place
    if(blue.x == red.x && blue.y == red.y) {
        if(redFirst) {
            board[blue.x][blue.y].isBlue = false;
            blue.y -= 1;
            board[blue.x][blue.y].isBlue = true;
        }
        else {
            board[red.x][red.y].isRed = false;
            red.y -= 1;
            board[red.x][red.y].isRed = true;
        }
    }
    return {board, red, blue, step+1, 0};
}
State moveUp(vector<vector<Point>> board, Point red, Point blue, int step) {
    bool redFirst = (red.x < blue.x && red.y == blue.y);
    // blue move
    bool blueStop = (board[blue.x-1][blue.y].isWall);
    while(!blueStop) {
        board[blue.x][blue.y].isBlue = false;
        blue.x -= 1;
        board[blue.x][blue.y].isBlue = true;
        if(board[blue.x][blue.y].isFinish) return {board, red, blue, step+1, -1};
        if(board[blue.x-1][blue.y].isWall) blueStop = true;
    }
    // red move
    bool redStop = (board[red.x-1][red.y].isWall);
    while(!redStop) {
        board[red.x][red.y].isRed = false;
        red.x -= 1;
        board[red.x][red.y].isRed = true;
        if(board[red.x][red.y].isFinish) return {board, red, blue, step+1, 1};
        if(board[red.x-1][red.y].isWall) redStop = true;
    }
    // if blue & red are in same place
    if(blue.x == red.x && blue.y == red.y) {
        if(redFirst) {
            board[blue.x][blue.y].isBlue = false;
            blue.x += 1;
            board[blue.x][blue.y].isBlue = true;
        }
        else {
            board[red.x][red.y].isRed = false;
            red.x += 1;
            board[red.x][red.y].isRed = true;
        }
    }
    return {board, red, blue, step+1, 0};
}
State moveDown(vector<vector<Point>> board, Point red, Point blue, int step) {
    bool redFirst = (red.x > blue.x && red.y == blue.y);
    // blue move
    bool blueStop = (board[blue.x+1][blue.y].isWall);
    while(!blueStop) {
        board[blue.x][blue.y].isBlue = false;
        blue.x += 1;
        board[blue.x][blue.y].isBlue = true;
        if(board[blue.x][blue.y].isFinish) return {board, red, blue, step+1, -1};
        if(board[blue.x+1][blue.y].isWall) blueStop = true;
    }
    // red move
    bool redStop = (board[red.x+1][red.y].isWall);
    while(!redStop) {
        board[red.x][red.y].isRed = false;
        red.x += 1;
        board[red.x][red.y].isRed = true;
        if(board[red.x][red.y].isFinish) return {board, red, blue, step+1, 1};
        if(board[red.x+1][red.y].isWall) redStop = true;
    }
    // if blue & red are in same place
    if(blue.x == red.x && blue.y == red.y) {
        if(redFirst) {
            board[blue.x][blue.y].isBlue = false;
            blue.x -= 1;
            board[blue.x][blue.y].isBlue = true;
        }
        else {
            board[red.x][red.y].isRed = false;
            red.x -= 1;
            board[red.x][red.y].isRed = true;
        }
    }
    return {board, red, blue, step+1, 0};
}

int bfs(vector<vector<Point>>& board, Point* red, Point* blue, Point* finish, vector<bool>& visited) {
    queue<State> q;
    q.push({board, *red, *blue, 0, 0});
    int index = red->x*1000 + red->y*100 + blue->x*10 + blue->y;
    visited[index] = true;
    State state;
    while(!q.empty()) {
        state = q.front();
        q.pop();
        if(state.step > 10) break;
        State left = moveLeft(state.board, state.red, state.blue, state.step);
        index = left.red.x*1000 + left.red.y*100 + left.blue.x*10 + left.blue.y;
        if(left.state == 1) return left.step;
        if(left.state == 0 && !visited[index]) {
            visited[index] = true;
            q.push(left);
        }
        State right = moveRight(state.board, state.red, state.blue, state.step);
        index = right.red.x*1000 + right.red.y*100 + right.blue.x*10 + right.blue.y;
        if(right.state == 1) return right.step;
        if(right.state == 0 && !visited[index]) {
            visited[index] = true;
            q.push(right);
        }
        State up = moveUp(state.board, state.red, state.blue, state.step);
        index = up.red.x*1000 + up.red.y*100 + up.blue.x*10 + up.blue.y;
        if(up.state == 1) return up.step;
        if(up.state == 0 && !visited[index]) {
            visited[index] = true;
            q.push(up);
        }
        State down = moveDown(state.board, state.red, state.blue, state.step);
        index = down.red.x*1000 + down.red.y*100 + down.blue.x*10 + down.blue.y;
        if(down.state == 1) return down.step;
        if(down.state == 0 && !visited[index]) {
            visited[index] = true;
            q.push(down);
        }
    }
    return -1;
}

int main() {
    int n, m;
    cin >> n >> m;
    vector<vector<Point>> board(n, vector<Point>(m));
    // (RxRyBxBy) -> 네 자리 수
    vector<bool> visited(10000, false);
    Point* red;
    Point* blue;
    Point* finish;
    char input;
    for(int i = 0 ; i < n ; i++) {
        for(int j = 0 ; j < m ; j++) {
            board[i][j].x = i;
            board[i][j].y = j;
            cin >> input;
            board[i][j].isWall = (input == '#');
            if(input == 'R') {
                red = &board[i][j];
                board[i][j].isRed = true;
                continue;
            }
            if(input == 'B') {
                blue = &board[i][j];
                board[i][j].isBlue = true;
                continue;
            }
            if(input == 'O') {
                finish = &board[i][j];
                board[i][j].isFinish = true;
                continue;
            }
        }
    }
    int steps = bfs(board, red, blue, finish, visited);
    cout << (steps > 10 ? -1 : steps);
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- BFS + Simulation

</div>
</details>

[def]: https://www.acmicpc.net/problem/13460