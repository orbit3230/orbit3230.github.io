---
layout: post
title: "[데일리 백준] 11724"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-06-01
last_modified_at: 2024-06-01
---
## Silver
### [11724][def]

```c++
#include <iostream>
using namespace std;

// 모든 정점을 방문했는지 확인
// 아직 방문하지 않은 정점을 발견했다면, **해당 인덱스를 반환**
int allVisited(bool *visited, int n) {
    int i;
    for(i = 0 ; i < n ; i++) {
        if(!visited[i])
            break;
    }
    return i;
}

void dfs(int **graph, bool *visited, int n, int start) {
    visited[start] = true;
    for(int i = 0 ; i < n ; i++) {
        if(graph[start][i] == 1 && !visited[i]) {
            dfs(graph, visited, n, i);
        }
    }
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    int n, m;
    cin >> n >> m;

    // adjacency matrix creation
    int **graph = new int*[n];
    for(int i = 0 ; i < n ; i++) {
        graph[i] = new int[n];
        for(int j = 0 ; j < n ; j++) {
            graph[i][j] = 0;
        }
    }
    for(int i = 0 ; i < m ; i++) {
        int u, v;
        cin >> u >> v;
        u--; v--;
        graph[u][v] = 1;
        graph[v][u] = 1;
    }

    bool *visited = new bool[n];
    for(int i = 0 ; i < n ; i++) {
        visited[i] = false;
    }

    int count = 0;
    int start = 0;
    do {
        count++;
        dfs(graph, visited, n, start);
    } while((start = allVisited(visited, n)) != n);  // start = n 이면 모든 정점 방문 완료

    cout << count;
}
```

[def]: https://www.acmicpc.net/problem/11724