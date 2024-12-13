---
layout: post
title: "[데일리 백준] 1261"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-12-12
last_modified_at: 2024-12-12
---
## Gold
### [1261][def]

```c++
#include <iostream>
#include <vector>
#include <queue>
#define INF INT16_MAX
using namespace std;

typedef struct Point {
    int x;
    int y;
    bool operator<(const Point& other) const {
        this->x < other.x;  // 상관 없음
    }
} Point;
typedef struct Block {
    bool isWall;
    short path;
} Block;

void dijkstra(vector<vector<Block>>& board, int n, int m) {
    priority_queue<pair<short, Point>, vector<pair<short, Point>>, greater<pair<short, Point>>> pq;
    pq.push({board[0][0].path, {0, 0}});
    while(!pq.empty()) {
        short path = pq.top().first;
        Point p = pq.top().second;
        int x = p.x; int y = p.y;
        pq.pop();
        if(board[x][y].path < path) continue;
        if(x > 0) {
            Point p_ = {x-1, y};
            short origin_path = board[p_.x][p_.y].path;
            short new_path = board[x][y].path + board[p_.x][p_.y].isWall;
            if(new_path < origin_path) {
                board[p_.x][p_.y].path = new_path;
                pq.push({new_path, {p_.x, p_.y}});
            }
        }
        if(x < m-1) {
            Point p_ = {x+1, y};
            short origin_path = board[p_.x][p_.y].path;
            short new_path = board[x][y].path + board[p_.x][p_.y].isWall;
            if(new_path < origin_path) {
                board[p_.x][p_.y].path = new_path;
                pq.push({new_path, {p_.x, p_.y}});
            }
        }
        if(y > 0) {
            Point p_ = {x, y-1};
            short origin_path = board[p_.x][p_.y].path;
            short new_path = board[x][y].path + board[p_.x][p_.y].isWall;
            if(new_path < origin_path) {
                board[p_.x][p_.y].path = new_path;
                pq.push({new_path, {p_.x, p_.y}});
            }
        }
        if(y < n-1) {
            Point p_ = {x, y+1};
            short origin_path = board[p_.x][p_.y].path;
            short new_path = board[x][y].path + board[p_.x][p_.y].isWall;
            if(new_path < origin_path) {
                board[p_.x][p_.y].path = new_path;
                pq.push({new_path, {p_.x, p_.y}});
            }
        }
    }
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);

    int n, m;
    cin >> n >> m;
    vector<vector<Block>> board(m, vector<Block>(n));
    string input;
    for(int i = 0 ; i < m ; i++) {
        cin >> input;
        for(int j = 0 ; j < n ; j++) {
            board[i][j].isWall = input[j] - '0';
            board[i][j].path = INF;
        }
    }
    board[0][0].path = 0;
    dijkstra(board, n, m);
    cout << board[m-1][n-1].path;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- Dijkstra 알고리즘.

- 보통 다익스트라는 노드와 엣지 정보를 제공하는데, 이 문제는 미로 배열로 입력이 주어짐.  
하지만 조금만 생각해보면 다익스트라임을 알 수 있다.  

</div>
</details>

[def]: https://www.acmicpc.net/problem/1261