---
layout: post
title: "[데일리 백준] 11404"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-11-09
last_modified_at: 2024-11-09
---
## Gold
### [11404][def]

```c++
#include <iostream>
#include <vector>
#define INF INT32_MAX/2
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    int n, m;
    cin >> n >> m;
    vector<vector<int>> graph(n, vector<int>(n, INF));  // adjacency graph
    int from, to, cost;
    for(int i = 0 ; i < m ; i++) {
        cin >> from >> to >> cost;
        from--; to--;  // 0-based index
        graph[from][to] = min(graph[from][to], cost);
    }
    // floyd-warshall
    for(int k = 0 ; k < n ; k++) {
        for(int i = 0 ; i < n ; i++) {
            for(int j = 0 ; j < n ; j++) {
                if(i == j) continue;
                graph[i][j] = min(graph[i][j], graph[i][k] + graph[k][j]);
            }
        }
    }
    for(int i = 0 ; i < n ; i++) {
        for(int j = 0 ; j < n ; j++) {
            cout << (graph[i][j] == INF ? 0 : graph[i][j]) << ' ';
        }
        cout << '\n';
    }
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 플로이드-워셜 알고리즘.

</div>
</details>

[def]: https://www.acmicpc.net/problem/11404