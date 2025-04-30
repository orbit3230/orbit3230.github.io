---
layout: post
title: "[데일리 백준] 5014"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-04-30
last_modified_at: 2025-04-30
---
## Silver
### [5014][def]

```c++
#include <iostream>
#include <vector>
#include <queue>
using namespace std;

int bfs(vector<int>& visited, int size, int start, int dest, int up, int down) {
    visited[start] = 0;
    // {floor, step}
    queue<pair<int, int>> q;
    q.push({start, 0});
    while(!q.empty()) {
        int floor = q.front().first;
        int step = q.front().second;
        q.pop();
        if(floor == dest) return step;
        int going_up = floor+up;
        if((going_up) <= size && visited[going_up] == -1) {
            visited[going_up] = step+1;
            q.push({going_up, step+1});
        }
        int going_down = floor-down;
        if((going_down) > 0 && visited[going_down] == -1) {
            visited[going_down] = step+1;
            q.push({going_down, step+1});
        }
    }
    return -1;
}

int main() {
    int f, s, g, u, d;
    cin >> f >> s >> g >> u >> d;
    vector<int> visited(f+1, -1);  // -1 : not visiited
    int step = bfs(visited, f, s, g, u, d);
    cout << (step == -1 ? "use the stairs" : to_string(step));
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- BFS (날먹)

</div>
</details>

[def]: https://www.acmicpc.net/problem/5014