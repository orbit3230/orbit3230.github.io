---
layout: post
title: "[데일리 백준] 17135"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-03-24
last_modified_at: 2025-03-24
---
## Gold
### [17135][def]

```c++
#include <iostream>
#include <vector>
#include <queue>
#define WEST 0b0001
#define NORTH 0b0010
#define EAST 0b0100
#define SOUTH 0b1000
using namespace std;

typedef struct Room {
    int x;
    int y;
    int walls;
    int area = 1;
    int group_index;
    bool visited = false;
} Room;

int bfs(vector<vector<Room>>& board, int x, int y, int group_index) {
    queue<Room*> q;
    queue<Room*> track;
    q.push(&board[x][y]);
    board[x][y].visited = true;
    int area = 0;
    while(!q.empty()) {
        Room* current = q.front();
        track.push(current);
        area++;
        q.pop();
        if(!(current->walls & WEST) && !board[current->x][current->y-1].visited) {
            q.push(&board[current->x][current->y-1]);
            board[current->x][current->y-1].visited = true;
        }
        if(!(current->walls & NORTH) && !board[current->x-1][current->y].visited) {
            q.push(&board[current->x-1][current->y]);
            board[current->x-1][current->y].visited = true;
        }
        if(!(current->walls & EAST) && !board[current->x][current->y+1].visited) {
            q.push(&board[current->x][current->y+1]);
            board[current->x][current->y+1].visited = true;
        }
        if(!(current->walls & SOUTH) && !board[current->x+1][current->y].visited) {
            q.push(&board[current->x+1][current->y]);
            board[current->x+1][current->y].visited = true;
        }
    }
    while(!track.empty()) {
        Room* current = track.front();
        current->area = area;
        current->group_index = group_index;
        track.pop();
    }
    return area;
}
int find_best_neighbor(vector<vector<Room>>& board, int x, int y, int m, int n) {
    int best = 0;
    int group_index = board[x][y].group_index;
    if(y > 0 && board[x][y-1].group_index != group_index) {
        best = max(best, board[x][y-1].area);
    }
    if(x > 0 && board[x-1][y].group_index != group_index) {
        best = max(best, board[x-1][y].area);
    }
    if(y < n-1 && board[x][y+1].group_index != group_index) {
        best = max(best, board[x][y+1].area);
    }
    if(x < m-1 && board[x+1][y].group_index != group_index) {
        best = max(best, board[x+1][y].area);
    }
    return best;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);

    int n, m;
    cin >> n >> m;
    vector<vector<Room>> map(m, vector<Room>(n));
    for(int i = 0 ; i < m ; i++) {
        for(int j = 0 ; j < n ; j++) {
            map[i][j].x = i;
            map[i][j].y = j;
            cin >> map[i][j].walls;
        }
    }
    int room_count = 0;
    int max_area = 0;
    int group_index = 0;
    for(int i = 0 ; i < m ; i++) {
        for(int j = 0 ; j < n ; j++) {
            if(map[i][j].visited) continue;
            max_area = max(max_area, bfs(map, i, j, group_index));
            group_index++;
            room_count++;
        }
    }
    cout << room_count << '\n' << max_area << '\n';
    max_area = 0;
    for(int i = 0 ; i < m ; i++) {
        for(int j = 0 ; j < n ; j++) {
            int area = map[i][j].area;
            int best_neighbor = find_best_neighbor(map, i, j, m, n);
            max_area = max(max_area, area + best_neighbor);
        }
    }
    cout << max_area;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- bfs  

</div>
</details>

[def]: https://www.acmicpc.net/problem/17135