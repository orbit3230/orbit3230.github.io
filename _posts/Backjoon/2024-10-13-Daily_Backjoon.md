---
layout: post
title: "[데일리 백준] 1926"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-10-13
last_modified_at: 2024-10-13
---
## Silver
### [1926][def]

```c++
#include <iostream>
#include <vector>
#include <queue>
using namespace std;

typedef struct Canvas {
    int x;
    int y;
    bool visited;
} Canvas;

int bfs_search(vector<vector<Canvas>>& canvas, int x, int y, int n, int m) {
    int area = 0;
    queue<Canvas> q;
    canvas[x][y].visited = true;
    q.push(canvas[x][y]);
    int x_, y_;
    Canvas a;
    while(!q.empty()) {
        a = q.front();
        q.pop();
        area++;
        x_ = a.x;
        y_ = a.y;
        if(x_ > 0 && !canvas[x_-1][y_].visited) {
            canvas[x_-1][y_].visited = true;
            q.push(canvas[x_-1][y_]);
        }
        if(y_ > 0 && !canvas[x_][y_-1].visited) {
            canvas[x_][y_-1].visited = true;
            q.push(canvas[x_][y_-1]);
        }
        if(x_ < n-1 && !canvas[x_+1][y_].visited) {
            canvas[x_+1][y_].visited = true;
            q.push(canvas[x_+1][y_]);
        }
        if(y_ < m-1 && !canvas[x_][y_+1].visited) {
            canvas[x_][y_+1].visited = true;
            q.push(canvas[x_][y_+1]);
        }
    }
    return area;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);

    int n, m;
    cin >> n >> m;
    vector<vector<Canvas>> canvas(n, vector<Canvas>(m));
    for(int i = 0 ; i < n ; i++) {
        for(int j = 0 ; j < m ; j++) {
            canvas[i][j].x = i;
            canvas[i][j].y = j;
            cin >> canvas[i][j].visited;
            canvas[i][j].visited = !canvas[i][j].visited;
        }
    }
    int drawings = 0;
    int max_area = 0;
    for(int i = 0 ; i < n ; i++) {
        for(int j = 0 ; j < m ; j++) {
            if(!canvas[i][j].visited) {
                drawings++;
                int area = bfs_search(canvas, i, j, n, m);
                max_area = max(max_area, area);
            }
        }
    }
    cout << drawings << '\n' << max_area;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 매우 가벼운 그래프 탐색 문제.

</div>
</details>

[def]: https://www.acmicpc.net/problem/1926