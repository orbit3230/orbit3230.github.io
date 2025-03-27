---
layout: post
title: "[데일리 백준] 11780"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-03-27
last_modified_at: 2025-03-27
---
## Gold
### [11780][def]

```c++
#include <iostream>
#include <vector>
#define INF INT32_MAX >> 1
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    int n, m;
    cin >> n >> m;
    vector<vector<int>> adjacency(n, vector<int>(n, INF));
    for(int i = 0 ; i < n ; i++) adjacency[i][i] = 0;
    vector<vector<vector<int>>> path(n, vector<vector<int>>(n));
    int from, to, weight;
    for(int i = 0 ; i < m ; i++) {
        cin >> from >> to >> weight;
        from--; to--;  // 0-based index
        if(adjacency[from][to] > weight) {
            adjacency[from][to] = weight;
            path[from][to].clear();
            path[from][to].push_back(from);
            path[from][to].push_back(to);
        }
    }
    for(int k = 0 ; k < n ; k++) {
        for(int i = 0 ; i < n ; i++) {
            for(int j = 0 ; j < n ; j++) {
                if(i == j) continue;
                if(adjacency[i][j] > adjacency[i][k] + adjacency[k][j]) {
                    adjacency[i][j] = adjacency[i][k] + adjacency[k][j];
                    path[i][j].clear();
                    for(int route : path[i][k]) path[i][j].push_back(route);
                    for(int route : path[k][j]) {
                        if(route == k) continue;
                        path[i][j].push_back(route);
                    }
                }
            }
        }
    }
    for(int i = 0 ; i < n ; i++) {
        for(int j = 0 ; j < n ; j++) {
            cout << (adjacency[i][j] == INF ? 0 : adjacency[i][j]) << ' ';
        }
        cout << '\n';
    }
    for(int i = 0 ; i < n ; i++) {
        for(int j = 0 ; j < n ; j++) {
            if(path[i][j].empty()) {
                cout << 0 << '\n';
                continue;
            }
            cout << path[i][j].size() << ' ';
            for(int route : path[i][j]) cout << route+1 << ' ';  // 1-based index
            cout << '\n';
        }
    }
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- Floyd-Warshall + Traceback

</div>
</details>

[def]: https://www.acmicpc.net/problem/11780