---
layout: post
title: "[데일리 백준] 2468"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-10-12
last_modified_at: 2024-10-12
---
## Silver
### [2468][def]

```c++
#include <iostream>
#include <vector>
#include <queue>
using namespace std;

typedef struct Area {
    int x;
    int y;
    int height;
    bool visited;
} Area;

void flood(vector<vector<Area>>& area, int rain, int n) {
    for(int i = 0 ; i < n ; i++) {
        for(int j = 0 ; j < n ; j++) {
            if(area[i][j].height <= rain) area[i][j].visited = true;
        }
    }
}
void initialize(vector<vector<Area>>& area, int n) {
    for(int i = 0 ; i < n ; i++) {
        for(int j = 0 ; j < n ; j++) {
            area[i][j].visited = false;
        }
    }
}
void bfs_search(vector<vector<Area>>& area, int x, int y, int n) {
    queue<Area> q;
    area[x][y].visited = true;
    q.push(area[x][y]);
    int x_, y_;
    Area a;
    while(!q.empty()) {
        a = q.front();
        q.pop();
        x_ = a.x;
        y_ = a.y;
        if(x_ > 0 && !area[x_-1][y_].visited) {
            area[x_-1][y_].visited = true;
            q.push(area[x_-1][y_]);
        }
        if(y_ > 0 && !area[x_][y_-1].visited) {
            area[x_][y_-1].visited = true;
            q.push(area[x_][y_-1]);
        }
        if(x_ < n-1 && !area[x_+1][y_].visited) {
            area[x_+1][y_].visited = true;
            q.push(area[x_+1][y_]);
        }
        if(y_ < n-1 && !area[x_][y_+1].visited) {
            area[x_][y_+1].visited = true;
            q.push(area[x_][y_+1]);
        }
    }
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);

    int n;
    cin >> n;
    vector<vector<Area>> area(n, vector<Area>(n));
    int min = INT32_MAX;
    int max = INT32_MIN;
    for(int i = 0 ; i < n ; i++) {
        for(int j = 0 ; j < n ; j++) {
            area[i][j].x = i;
            area[i][j].y = j;
            cin >> area[i][j].height;
            area[i][j].visited = false;
            min = std::min(min, area[i][j].height);
            max = std::max(max, area[i][j].height);
        }
    }
    int max_count = 1;
    for(int rain = min ; rain <= max ; rain++) {
        flood(area, rain, n);
        int count = 0;
        for(int i = 0 ; i < n ; i++) {
            for(int j = 0 ; j < n ; j++) {
                if(!area[i][j].visited) {
                    count++;
                    bfs_search(area, i, j, n);
                }
            }
        }
        max_count = std::max(max_count, count);
        initialize(area, n);
    }
    cout << max_count;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 브루트포스 + BFS

</div>
</details>

[def]: https://www.acmicpc.net/problem/2468