---
layout: post
title: "[데일리 백준] 1956"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-11-10
last_modified_at: 2024-11-10
---
## Gold
### [1956][def]

```c++
#include <iostream>
#include <vector>
#define INF INT32_MAX/2
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);

    int v, e;
    cin >> v >> e;
    vector<vector<int>> graph(v, vector<int>(v, INF));
    int from, to, cost;
    for(int i = 0 ; i < e ; i++) {
        cin >> from >> to >> cost;
        from--; to--; // 0-based index
        graph[from][to] = cost;
    }
    // floyd-warshall
    for(int k = 0 ; k < v ; k++) {
        for(int i = 0 ; i < v ; i++) {
            for(int j = 0 ; j < v ; j++) {
                graph[i][j] = min(graph[i][j], graph[i][k] + graph[k][j]);
            }
        }
    }
    int min = INF;
    for(int i = 0 ; i < v ; i++) min = std::min(min, graph[i][i]);
    cout << ((min == INF) ? -1 : min);
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 플로이드-워셜 알고리즘.

- 모든 경우에 대하여 플로이드-워셜 알고리즘을 적용하고, `graph[i][i]` 중 최솟값을 찾으면 사이클의 최소 비용을 구할 수 있다.  

</div>
</details>

[def]: https://www.acmicpc.net/problem/1956