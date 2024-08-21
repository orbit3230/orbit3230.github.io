---
layout: post
title: "[데일리 백준] 16932"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-08-21
last_modified_at: 2024-08-21
---
## Gold
### [16932][def]

```c++
#include <iostream>
#include <vector>
#include <queue>
using namespace std;

int groupIdentifier = 1;

typedef struct Position {
    int x;
    int y;
    bool visited;
    int area;   // 벽일 때 사용
    int groupIdentifier;  // 벽일 때 사용
} Position;

void updateArea(vector<vector<Position>>& graph, vector<Position*> walls, int n, int m) {
    for(Position* wall : walls) {
        if(wall->visited) continue;
        queue<Position*> q;
        vector<Position*> trace;  // 자취를 기록
        int area = 0;
        q.push(wall);
        wall->visited = true;
        area++;
        Position* current;
        int x_, y_;
        while(!q.empty()) {
            current = q.front();
            q.pop();
            trace.push_back(current);
            x_ = current->x;
            y_ = current->y;
            if(x_ > 0 && !graph[x_ - 1][y_].visited) {
                q.push(&graph[x_ - 1][y_]);
                graph[x_ - 1][y_].visited = true;
                area++;
            }
            if(x_ + 1 < n && !graph[x_ + 1][y_].visited) {
                q.push(&graph[x_ + 1][y_]);
                graph[x_ + 1][y_].visited = true;
                area++;
            }
            if(y_ > 0 && !graph[x_][y_ - 1].visited) {
                q.push(&graph[x_][y_ - 1]);
                graph[x_][y_ - 1].visited = true;
                area++;
            }
            if(y_ + 1 < m && !graph[x_][y_ + 1].visited) {
                q.push(&graph[x_][y_ + 1]);
                graph[x_][y_ + 1].visited = true;
                area++;
            }
        }
        // group Update
        for(Position* p : trace) {
            p->area = area;
            p->groupIdentifier = groupIdentifier;
        }
        groupIdentifier++;
    }
}

bool check(vector<int>& identifiers, int identifier) {
    for(int i : identifiers)  // 중복된 식별자가 있는 지 확인
        if(i == identifier) return false;
    return true;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    int n, m;
    cin >> n >> m;

    vector<vector<Position>> graph(n, vector<Position>(m));
    vector<Position*> holes;
    vector<Position*> walls;
    for(int i = 0 ; i < n ; i++) {
        for(int j = 0 ; j < m ; j++) {
            cin >> graph[i][j].visited;
            graph[i][j].x = i;
            graph[i][j].y = j;
            graph[i][j].visited = !graph[i][j].visited;
            graph[i][j].area = 0;
            graph[i][j].groupIdentifier = 0;
            if(graph[i][j].visited) holes.push_back(&graph[i][j]);
            else walls.push_back(&graph[i][j]);
        }
    }

    updateArea(graph, walls, n, m);

    int maxArea = 0;
    int area;
    int x_, y_;
    for(Position* hole : holes) {
        vector<int> identifiers;
        // 상 하 좌 우를 확인하며 면적을 계산
        area = 1;
        x_ = hole->x;
        y_ = hole->y;
        if(x_ > 0) {
            if(graph[x_ - 1][y_].groupIdentifier != 0 && check(identifiers, graph[x_ - 1][y_].groupIdentifier)) {
                area += graph[x_ - 1][y_].area;
                identifiers.push_back(graph[x_ - 1][y_].groupIdentifier);
            }
        }
        if(x_ + 1 < n) {
            if(graph[x_ + 1][y_].groupIdentifier != 0 && check(identifiers, graph[x_ + 1][y_].groupIdentifier)) {
                area += graph[x_ + 1][y_].area;
                identifiers.push_back(graph[x_ + 1][y_].groupIdentifier);
            }
        }
        if(y_ > 0) {
            if(graph[x_][y_ - 1].groupIdentifier != 0 && check(identifiers, graph[x_][y_ - 1].groupIdentifier)) {
                area += graph[x_][y_ - 1].area;
                identifiers.push_back(graph[x_][y_ - 1].groupIdentifier);
            }
        }
        if(y_ + 1 < m) {
            if(graph[x_][y_ + 1].groupIdentifier != 0 && check(identifiers, graph[x_][y_ + 1].groupIdentifier)) {
                area += graph[x_][y_ + 1].area;
                identifiers.push_back(graph[x_][y_ + 1].groupIdentifier);
            }
        }
        if(area > maxArea) maxArea = area;
    }
    cout << maxArea;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 무난한 그래프문제, [16946][def2] 문제와 매우 유사하다.

</div>
</details>

[def]: https://www.acmicpc.net/problem/16932
[def2]: https://www.acmicpc.net/problem/16946