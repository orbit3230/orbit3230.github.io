---
layout: post
title: "[데일리 백준] 1260"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-06-10
last_modified_at: 2024-06-10
---
## Silver
### [1260][def]

```c++
#include <iostream>
#include <queue>
using namespace std;

void dfs_search(bool **graph, bool* visited, int v, int n) {
    visited[v] = true;
    cout << v+1 << " ";
    for(int i = 0 ; i < n ; i++) {
        if((graph[v][i]) && (!visited[i])) {
            visited[i] = true;
            dfs_search(graph, visited, i, n);
        }
    }
}

void bfs_search(bool **graph, bool* visited, int v, int n) {
    visited[v] = true;
    queue<int> vertice;
    vertice.push(v);
    while(!vertice.empty()) {
        v = vertice.front();
        cout << v+1 << " ";
        vertice.pop();
        for(int i = 0 ; i < n ; i++) {
            if((graph[v][i]) && (!visited[i])) {
                visited[i] = true;
                vertice.push(i);
            }
        }
    }
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    int n, m, v;
    cin >> n >> m >> v;

    bool **graph = new bool*[n];
    for(int i = 0 ; i < n ; i++) {
        graph[i] = new bool[n];
        for(int j = 0 ; j < n ; j++) {
            graph[i][j] = false;
        }
    }
    int x, y;
    for(int i = 0 ; i < m ; i++) {
        cin >> x >> y;
        x--; y--;
        graph[x][y] = true;
        graph[y][x] = true;
    }

    bool *visited = new bool[n];

    v--; // vertex index from ZERO(0)
    dfs_search(graph, visited, v, n);
    cout << '\n';
    // visited initialization
    for(int i = 0 ; i < n ; i++) {
        visited[i] = false;
    }
    bfs_search(graph, visited, v, n);
}
```

[def]: https://www.acmicpc.net/problem/1260