---
layout: post
title: "[데일리 백준] 2206"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon, HappyBirthday]

toc: true

date: 2024-07-22
last_modified_at: 2024-07-22
---
## Gold
### [2206][def]

```c++
#include <iostream>
#include <vector>
#include <queue>
using namespace std;

typedef struct Position {
    int x;
    int y;
    int z;
    bool wall; // can't move
    int step;
} Position;

int bfs_search(vector<vector<vector<Position>>> map, int n, int m) {
    queue<Position> q;
    q.push(map[0][0][0]);
    map[0][0][0].wall = true;

    Position p;
    int x_;
    int y_;
    while(!q.empty()) {
        p = q.front();
        q.pop();
        x_ = p.x;
        y_ = p.y;
        // 종료 조건 확인
        if(x_ == n-1 && y_ == m-1) return p.step;
        // 탐색
        if(y_ + 1 < m && !map[x_][y_ + 1][0].wall) {
            map[x_][y_ + 1][0].wall = true;
            map[x_][y_ + 1][0].step = p.step + 1;
            q.push(map[x_][y_ + 1][0]);
        }
        if(x_ + 1 < n && !map[x_ + 1][y_][0].wall) {
            map[x_ + 1][y_][0].wall = true;
            map[x_ + 1][y_][0].step = p.step + 1;
            q.push(map[x_ + 1][y_][0]);
        }
        if(y_ - 1 >= 0 && !map[x_][y_ - 1][0].wall) {
            map[x_][y_ - 1][0].wall = true;
            map[x_][y_ - 1][0].step = p.step + 1;
            q.push(map[x_][y_ - 1][0]);
        }
        if(x_ - 1 >= 0 && !map[x_ - 1][y_][0].wall) {
            map[x_ - 1][y_][0].wall = true;
            map[x_ - 1][y_][0].step = p.step + 1;
            q.push(map[x_ - 1][y_][0]);
        }
    }
    // 출구 탐색 실패
    return 100000000;
}

int bfs_search_break(vector<vector<vector<Position>>>& map, int n, int m, int startX, int startY) {
    queue<Position> q;
    q.push(map[startX][startY][0]);
    map[startX][startY][0].wall = true;

    Position p;
    int x_;
    int y_;
    int z_;
    while(!q.empty()) {
        p = q.front();
        q.pop();
        x_ = p.x;
        y_ = p.y;
        z_ = p.z;  // z_ == 1 : 벽을 한 번 부수고 들어간 형태
        // 종료 조건 확인
        if(startX == 0 && startY == 0 && x_ == n-1 && y_ == m-1) return p.step;
        if(startX == n-1 && startY == m-1 && x_ == 0 && y_ == 0) return p.step;
        // 탐색
        if(y_ + 1 < m && (!map[x_][y_ + 1][z_].wall || z_ == 0)) {
            if(map[x_][y_ + 1][z_].wall && z_ == 0) {
                map[x_][y_ + 1][1].wall = true;
                map[x_][y_ + 1][1].step = p.step + 1;
                q.push(map[x_][y_ + 1][1]);
            }
            else {
                map[x_][y_ + 1][z_].wall = true;
                map[x_][y_ + 1][z_].step = p.step + 1;
                q.push(map[x_][y_ + 1][z_]);
            }
        }
        if(x_ + 1 < n && (!map[x_ + 1][y_][z_].wall || z_ == 0)) {
            if(map[x_ + 1][y_][z_].wall && z_ == 0) {
                map[x_ + 1][y_][1].wall = true;
                map[x_ + 1][y_][1].step = p.step + 1;
                q.push(map[x_ + 1][y_][1]);
            }
            else {
                map[x_ + 1][y_][z_].wall = true;
                map[x_ + 1][y_][z_].step = p.step + 1;
                q.push(map[x_ + 1][y_][z_]);
            }
        }
        if(y_ - 1 >= 0 && (!map[x_][y_ - 1][z_].wall || z_ == 0)) {
            if(map[x_][y_ - 1][z_].wall && z_ == 0) {
                map[x_][y_ - 1][1].wall = true;
                map[x_][y_ - 1][1].step = p.step + 1;
                q.push(map[x_][y_ - 1][1]);
            }
            else {
                map[x_][y_ - 1][z_].wall = true;
                map[x_][y_ - 1][z_].step = p.step + 1;
                q.push(map[x_][y_ - 1][z_]);
            }
        }
        if(x_ - 1 >= 0 && (!map[x_ - 1][y_][z_].wall || z_ == 0)) {
            if(map[x_ - 1][y_][z_].wall && z_ == 0) {
                map[x_ - 1][y_][1].wall = true;
                map[x_ - 1][y_][1].step = p.step + 1;
                q.push(map[x_ - 1][y_][1]);
            }
            else {
                map[x_ - 1][y_][z_].wall = true;
                map[x_ - 1][y_][z_].step = p.step + 1;
                q.push(map[x_ - 1][y_][z_]);
            }
        }
    }
    // 출구 탐색 실패
    return 100000000;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    int n, m;
    cin >> n >> m;
    vector<vector<vector<Position>>> map(n, vector<vector<Position>>(m, vector<Position>(2)));
    string input;
    for(int i = 0 ; i < n ; i++) {
        cin >> input;
        for(int j = 0 ; j < m ; j++) {
            for(int k = 0 ; k < 2 ; k++) {
                map[i][j][k].wall = input[j] - '0';
                map[i][j][k].x = i;
                map[i][j][k].y = j;
                map[i][j][k].z = k;  // 1 : 벽을 한 번 부수고 들어간 형태
                map[i][j][k].step = 1;
            }
        }
    }

    int minStep1 = bfs_search(map, n, m);
    int minStep2 = bfs_search_break(map, n, m, 0, 0);
    int minStep3 = bfs_search_break(map, n, m, n-1, m-1);
    int minStep = min(min(minStep1, minStep2), minStep3);
    cout << ((minStep == 100000000) ? -1 : minStep);
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 쓰레기 값을 줄 때는 확실하게 크게 주자.  

- BFS를 시작지점과 끝지점에서 각각 돌리는 것은 다른 효과를 줄 수도 있다.  

- 다이나믹 프로그래밍을 사용하지 않고도,  
3차원 배열을 사용한 그래프 탐색을 통하여 `Z축`이라는 새로운 축을 통해,  
각 경우에 대한 다른 경우를 체크할 수도 있다.  

</div>
</details>

[def]: https://www.acmicpc.net/problem/2206