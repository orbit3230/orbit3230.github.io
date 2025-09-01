---
layout: post
title: "[데일리 백준] 2589"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-08-22
last_modified_at: 2025-08-22
---
## Gold
### [2589][def]

```c++
#include <iostream>
#include <vector>
#include <queue>
using namespace std;

struct Point {
    int x;
    int y;
    bool visited;
    int step = 0;
};

int bfs(Point* p, vector<vector<Point>>& map, int n, int m) {
    queue<Point*> q;
    q.push(p);
    p->visited = true;
    int step = 0;
    int x, y;
    while(!q.empty()) {
        p = q.front();
        q.pop();
        step = p->step;
        x = p->x; y = p->y;
        if(x > 0 && !map[x-1][y].visited) {
            map[x-1][y].visited = true;
            map[x-1][y].step = step+1;
            q.push(&map[x-1][y]);
        }
        if(x < n-1 && !map[x+1][y].visited) {
            map[x+1][y].visited = true;
            map[x+1][y].step = step+1;
            q.push(&map[x+1][y]);
        }
        if(y > 0 && !map[x][y-1].visited) {
            map[x][y-1].visited = true;
            map[x][y-1].step = step+1;
            q.push(&map[x][y-1]);
        }
        if(y < m-1 && !map[x][y+1].visited) {
            map[x][y+1].visited = true;
            map[x][y+1].step = step+1;
            q.push(&map[x][y+1]);
        }
    }
    return step;
}
void visitInit(vector<Point*>& lands) {
    for(Point* land : lands) {
        land->visited = false;
        land->step = 0;
    }
}
int main() {
    int n, m;
    cin >> n >> m;
    vector<vector<Point>> map(n, vector<Point>(m));
    vector<Point*> lands;
    char input;
    for(int i = 0 ; i < n ; i++) {
        for(int j = 0 ; j < m ; j++) {
            map[i][j].x = i; map[i][j].y = j;
            cin >> input;
            map[i][j].visited = (input == 'W');
            if(!map[i][j].visited) lands.push_back(&map[i][j]);
        }
    }
    int max = 0;
    for(Point* land : lands) {
        max = std::max(max, bfs(land, map, n, m));
        visitInit(lands);
    }
    cout << max;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- BFS + Brute-force

</div>
</details>

[def]: https://www.acmicpc.net/problem/2589