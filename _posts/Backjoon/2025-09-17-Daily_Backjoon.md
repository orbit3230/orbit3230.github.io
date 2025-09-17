---
layout: post
title: "[데일리 백준] 7562"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-09-17
last_modified_at: 2025-09-17
---
## Silver
### [7562][def]

```c++
#include <iostream>
#include <vector>
#include <queue>
using namespace std;

struct Point {
    int x;
    int y;
};

int bfs(Point& start, Point& end, int l, vector<vector<bool>>& visited) {
    vector<pair<int, int>> movements(8);
    movements[0] = {1, 2}; movements[1] = {2, 1};
    movements[2] = {2, -1}; movements[3] = {1, -2};
    movements[4] = {-1, -2}; movements[5] = {-2, -1};
    movements[6] = {-2, 1}; movements[7] = {-1, 2};
    queue<pair<Point, int>> q;
    q.push({start, 0});
    visited[start.x][start.y] = true;
    while(!q.empty()) {
        Point p = q.front().first;
        int step = q.front().second;
        q.pop();
        if(p.x == end.x && p.y == end.y) return step;
        for(pair<int, int>& movement : movements) {
            Point next = {p.x + movement.first, p.y + movement.second};
            if(next.x < 0 || next.x >= l || next.y < 0 || next.y >= l) continue;
            if(visited[next.x][next.y]) continue;
            visited[next.x][next.y] = true;
            q.push({next, step+1});
        }
    }
    return -1;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    int t;
    cin >> t;
    while(t--) {
        int l;
        cin >> l;
        vector<vector<bool>> visited(l, vector<bool>(l, false));
        Point start, end;
        cin >> start.x >> start.y >> end.x >> end.y;
        cout << bfs(start, end, l, visited) << '\n';
    }
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- BFS

</div>
</details>

[def]: https://www.acmicpc.net/problem/7562