---
layout: post
title: "[데일리 백준] 2667"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-07-20
last_modified_at: 2024-07-20
---
## Silver
### [2667][def]

```c++
#include <iostream>
#include <vector>
#include <queue>
#include <algorithm>
using namespace std;

typedef struct Place {
    int x;
    int y;
    bool visited;
} Place;

Place* isDone(vector<vector<Place>>& map, int n) {
    for(int i = 0 ; i < n ; i++) {
        for(int j = 0 ; j < n ; j++) {
            if(!map[i][j].visited) return &map[i][j];
        }
    }
    return nullptr;
}

int bfs_search(vector<vector<Place>>& map, int n, Place& start) {
    int size = 0;
    queue<Place> q;
    q.push(start);
    start.visited = true;
    size++;

    Place p;
    int x_;
    int y_;
    while(!q.empty()) {
        p = q.front();
        q.pop();
        x_ = p.x;
        y_ = p.y;
        if(x_ > 0 && !map[x_ - 1][y_].visited) {
            q.push(map[x_ - 1][y_]);
            map[x_ - 1][y_].visited = true;
            size++;
        }
        if(x_ < n - 1 && !map[x_ + 1][y_].visited) {
            q.push(map[x_ + 1][y_]);
            map[x_ + 1][y_].visited = true;
            size++;
        }
        if(y_ > 0 && !map[x_][y_ - 1].visited) {
            q.push(map[x_][y_ - 1]);
            map[x_][y_ - 1].visited = true;
            size++;
        }
        if(y_ < n - 1 && !map[x_][y_ + 1].visited) {
            q.push(map[x_][y_ + 1]);
            map[x_][y_ + 1].visited = true;
            size++;
        }
    }
    return size;
}

int main() {
    int n;
    cin >> n;
    vector<vector<Place>> map(n, vector<Place>(n));
    string input;
    for(int i = 0 ; i < n ; i++) {
        cin >> input;
        for(int j = 0 ; j < n ; j++) {
            map[i][j] = {i, j, !(input[j] - '0')};
        }
    }

    Place* coordi;
    vector<int> result;
    while((coordi = isDone(map, n)) != nullptr) {
        result.push_back(bfs_search(map, n, *coordi));
    }

    sort(result.begin(), result.end());
    cout << result.size() << '\n';
    for(int i = 0 ; i < result.size() ; i++) {
        cout << result[i] << '\n';
    }
}
```

[def]: https://www.acmicpc.net/problem/2667