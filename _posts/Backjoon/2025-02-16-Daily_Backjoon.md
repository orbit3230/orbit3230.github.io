---
layout: post
title: "[데일리 백준] 2665"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-02-16
last_modified_at: 2025-02-16
---
## Gold
### [2665][def]

```c++
#include <iostream>
#include <vector>
#include <queue>
#define INF INT32_MAX
using namespace std;

typedef struct Place {
    int path = INF;
    bool isWall;
} Place;

void dijkstra(vector<vector<Place>>& board, int n, int startX, int startY) {
    board[startX][startY].path = 0;
    // {weight, destination}
    priority_queue<pair<int, pair<int, int>>, vector<pair<int, pair<int, int>>>, greater<pair<int, pair<int, int>>> > pq;
    pq.push({0, {startX, startY}});
    while(!pq.empty()) {
        int weight = pq.top().first;
        pair<int, int> destination = pq.top().second;
        int x = destination.first;
        int y = destination.second;
        pq.pop();
        if(board[x][y].path < weight) continue;
        int originPath, newPath;
        if(x > 0) {
            originPath = board[x-1][y].path;
            newPath = board[x][y].path + board[x-1][y].isWall;
            if(newPath < originPath) {
                board[x-1][y].path = newPath;
                pq.push({newPath, {x-1, y}});
            }
        }
        if(x < n-1) {
            originPath = board[x+1][y].path;
            newPath = board[x][y].path + board[x+1][y].isWall;
            if(newPath < originPath) {
                board[x+1][y].path = newPath;
                pq.push({newPath, {x+1, y}});
            }
        }
        if(y > 0) {
            originPath = board[x][y-1].path;
            newPath = board[x][y].path + board[x][y-1].isWall;
            if(newPath < originPath) {
                board[x][y-1].path = newPath;
                pq.push({newPath, {x, y-1}});
            }
        }
        if(y < n-1) {
            originPath = board[x][y+1].path;
            newPath = board[x][y].path + board[x][y+1].isWall;
            if(newPath < originPath) {
                board[x][y+1].path = newPath;
                pq.push({newPath, {x, y+1}});
            }
        }
    }
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);

    int n;
    cin >> n;
    vector<vector<Place>> board(n, vector<Place>(n));
    string input;
    for(int i = 0 ; i < n ; i++) {
        cin >> input;
        for(int j = 0 ; j < n ; j++) {
            board[i][j].isWall = !(input[j]-'0');
        }
    }
    dijkstra(board, n, 0, 0);
    cout << board[n-1][n-1].path;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- Dijkstra with 2D array

</div>
</details>

[def]: https://www.acmicpc.net/problem/2665