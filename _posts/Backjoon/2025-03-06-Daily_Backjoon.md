---
layout: post
title: "[데일리 백준] 2638"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-03-06
last_modified_at: 2025-03-06
---
## Gold
### [2638][def]

```c++
#include <iostream>
#include <vector>
#include <queue>
using namespace std;

typedef struct Place {
    int x;
    int y;
    int nearby = 0;  // 근처 infected airs의 개수
    bool isCheese;
    bool isInfectedAir = false;
} Place;

void bfs_air(vector<vector<Place>>& board, int n, int m) {
    queue<Place*> airs;
    airs.push(&board[0][0]);
    vector<vector<bool>> visited(n, vector<bool>(m, false));
    board[0][0].isInfectedAir = true;
    visited[0][0] = true;
    while(!airs.empty()) {
        Place* air = airs.front();
        airs.pop();
        if(air->x > 0 && !board[air->x-1][air->y].isCheese && !visited[air->x-1][air->y]) {
            board[air->x-1][air->y].isInfectedAir = true;
            visited[air->x-1][air->y] = true;
            airs.push(&board[air->x-1][air->y]);
        }
        if(air->x < n-1 && !board[air->x+1][air->y].isCheese && !visited[air->x+1][air->y]) {
            board[air->x+1][air->y].isInfectedAir = true;
            visited[air->x+1][air->y] = true;
            airs.push(&board[air->x+1][air->y]);
        }
        if(air->y > 0 && !board[air->x][air->y-1].isCheese && !visited[air->x][air->y-1]) {
            board[air->x][air->y-1].isInfectedAir = true;
            visited[air->x][air->y-1] = true;
            airs.push(&board[air->x][air->y-1]);
        }
        if(air->y < m-1 && !board[air->x][air->y+1].isCheese && !visited[air->x][air->y+1]) {
            board[air->x][air->y+1].isInfectedAir = true;
            visited[air->x][air->y+1] = true;
            airs.push(&board[air->x][air->y+1]);
        }
    }
}
void calculate(vector<vector<Place>>& board, int n, int m, queue<Place*>& cheeses) {
    size_t size = cheeses.size();
    for(size_t i = 0 ; i < size ; i++) {
        Place* cheese = cheeses.front();
        cheeses.pop();
        cheese->nearby = 0;
        if(cheese->x > 0 && board[cheese->x-1][cheese->y].isInfectedAir) cheese->nearby++;
        if(cheese->x < n-1 && board[cheese->x+1][cheese->y].isInfectedAir) cheese->nearby++;
        if(cheese->y > 0 && board[cheese->x][cheese->y-1].isInfectedAir) cheese->nearby++;
        if(cheese->y < m-1 && board[cheese->x][cheese->y+1].isInfectedAir) cheese->nearby++;
        cheeses.push(cheese);
    }
}
void simulate(vector<vector<Place>>& board, int n, int m, queue<Place*>& cheeses, int& time) {
    if(cheeses.empty()) return;
    bfs_air(board, n, m);
    calculate(board, n, m, cheeses);
    queue<Place*> temp;
    while(!cheeses.empty()) {
        Place* cheese = cheeses.front();
        cheeses.pop();
        if(cheese->nearby >= 2) {
            cheese->isCheese = false;
            continue;
        }
        temp.push(cheese);
    }
    swap(cheeses, temp);
    time++;
    simulate(board, n, m, cheeses, time);
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);

    int n, m;
    cin >> n >> m;
    vector<vector<Place>> board(n, vector<Place>(m));
    queue<Place*> cheeses;
    for(int i = 0 ; i < n ; i++) {
        for(int j = 0 ; j < m ; j++) {
            cin >> board[i][j].isCheese;
            board[i][j].x = i;
            board[i][j].y = j;
            if(board[i][j].isCheese) cheeses.push(&board[i][j]);
        }
    }
    int time = 0;
    simulate(board, n, m, cheeses, time);
    cout << time;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- BFS + Simulation

</div>
</details>

[def]: https://www.acmicpc.net/problem/2638