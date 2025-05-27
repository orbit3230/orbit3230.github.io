---
layout: post
title: "[데일리 백준] 14923"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-05-27
last_modified_at: 2025-05-27
---
## Gold
### [14923][def]

```c++
#include <iostream>
#include <vector>
#include <queue>
using namespace std;

typedef struct Point {
    int x;
    int y;
    int z;
} Point;

void bfs(vector<vector<vector<int>>>& map, Point& start, Point& end, int n, int m) {
    queue<Point> q;
    q.push(start);
    while(!q.empty()) {
        Point p = q.front();
        q.pop();
        if(p.x == end.x && p.y == end.y) continue;
        // normal
        if(p.x > 0 && !map[p.x-1][p.y][p.z]) {
            map[p.x-1][p.y][p.z] = map[p.x][p.y][p.z] + 1;
            Point next = {p.x-1, p.y, p.z};
            q.push(next);
        }
        if(p.x < n-1 && !map[p.x+1][p.y][p.z]) {
            map[p.x+1][p.y][p.z] = map[p.x][p.y][p.z] + 1;
            Point next = {p.x+1, p.y, p.z};
            q.push(next);
        }
        if(p.y > 0 && !map[p.x][p.y-1][p.z]) {
            map[p.x][p.y-1][p.z] = map[p.x][p.y][p.z] + 1;
            Point next = {p.x, p.y-1, p.z};
            q.push(next);
        }
        if(p.y < m-1 && !map[p.x][p.y+1][p.z]) {
            map[p.x][p.y+1][p.z] = map[p.x][p.y][p.z] + 1;
            Point next = {p.x, p.y+1, p.z};
            q.push(next);
        }
        // break wall
        if(p.z == 0) {
            if(p.x > 0 && map[p.x-1][p.y][1] < 0) {
                map[p.x-1][p.y][1] = map[p.x][p.y][0] + 1;
                Point next = {p.x-1, p.y, 1};
                q.push(next);
            }
            if(p.x < n-1 && map[p.x+1][p.y][1] < 0) {
                map[p.x+1][p.y][1] = map[p.x][p.y][0] + 1;
                Point next = {p.x+1, p.y, 1};
                q.push(next);
            }
            if(p.y > 0 && map[p.x][p.y-1][1] < 0) {
                map[p.x][p.y-1][1] = map[p.x][p.y][0] + 1;
                Point next = {p.x, p.y-1, 1};
                q.push(next);
            }
            if(p.y < m-1 && map[p.x][p.y+1][1] < 0) {
                map[p.x][p.y+1][1] = map[p.x][p.y][0] + 1;
                Point next = {p.x, p.y+1, 1};
                q.push(next);
            }
        }
    }
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);

    int n, m;
    cin >> n >> m;
    vector<vector<vector<int>>> map(n, vector<vector<int>>(m, vector<int>(2, 0)));
    Point start, end;
    cin >> start.x >> start.y >> end.x >> end.y;
    start.z = end.z = 0;
    start.x--; start.y--; end.x--; end.y--;  // 0-based index
    int input;
    for(int i = 0 ; i < n ; i++) {
        for(int j = 0 ; j < m ; j++) {
            cin >> input;
            map[i][j][0] = map[i][j][1] = input*-1;
        }
    }
    bfs(map, start, end, n, m);
    if(map[end.x][end.y][0] <= 0 && map[end.x][end.y][1] <= 0) {
        cout << -1;
        return 0;
    }
    cout << min(map[end.x][end.y][0], map[end.x][end.y][1]);
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- BFS (3d)

</div>
</details>

[def]: https://www.acmicpc.net/problem/14923