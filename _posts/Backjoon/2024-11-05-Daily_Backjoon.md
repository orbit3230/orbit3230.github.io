---
layout: post
title: "[데일리 백준] 1520, 1753"
excerpt: "2 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-11-05
last_modified_at: 2024-11-05
---
## Gold
### [1520][def]

```c++
#include <iostream>
#include <vector>
using namespace std;

int dfs_dp(vector<vector<short>>& map, vector<vector<int>>& dpTable, short x, short y, int m, int n) {
    if(x == m-1 && y == n-1) return 1;
    if(dpTable[x][y] != -1) return dpTable[x][y];
    dpTable[x][y] = 0;
    if(x > 0 && map[x][y] > map[x-1][y]) dpTable[x][y] += dfs_dp(map, dpTable, x-1, y, m, n);
    if(x < m-1 && map[x][y] > map[x+1][y]) dpTable[x][y] += dfs_dp(map, dpTable, x+1, y, m, n);
    if(y > 0 && map[x][y] > map[x][y-1]) dpTable[x][y] += dfs_dp(map, dpTable, x, y-1, m, n);
    if(y < n-1 && map[x][y] > map[x][y+1]) dpTable[x][y] += dfs_dp(map, dpTable, x, y+1, m, n);
    return dpTable[x][y];
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);

    int m, n;
    cin >> m >> n;
    vector<vector<short>> map(m, vector<short>(n));
    vector<vector<int>> dpTable(m, vector<int>(n, -1));
    for(int i = 0 ; i < m ; i++) {
        for(int j = 0 ; j < n ; j++) {
            cin >> map[i][j];
        }
    }
    cout << dfs_dp(map, dpTable, 0, 0, m, n);
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- DFS + DP

- 중복되는 DFS 탐색을 줄여주는 Dynamic Programming  

</div>
</details>

### [1753][def2]

```c++
#include <iostream>
#include <vector>
#include <queue>
#define INF INT32_MAX
using namespace std;

typedef struct Edge {
    short from;
    short to;
    short weight;
} Edge;

typedef struct Node {
    int path = INF;
    vector<Edge*> nexts;
} Node;

void dijkstra(vector<Node>& nodes, int start) {
    // {weight, destination}
    priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> pq;
    pq.push({nodes[start].path, start});
    while(!pq.empty()) {
        int index = pq.top().second;
        pq.pop();
        for(Edge* e : nodes[index].nexts) {
            int next = e->to;
            int origin_path = nodes[next].path;
            int new_path = nodes[index].path + e->weight;
            if(new_path < origin_path) {
                nodes[next].path = new_path;
                pq.push({new_path, next});
            }
        }
    }
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);

    int v, e;
    cin >> v >> e;
    int start;
    cin >> start;
    vector<Edge> edges(e);
    vector<Node> nodes(v+1);
    for(int i = 0 ; i < e ; i++) {
        cin >> edges[i].from >> edges[i].to >> edges[i].weight;
        nodes[edges[i].from].nexts.push_back(&edges[i]);
    }
    nodes[start].path = 0;
    dijkstra(nodes, start);
    for(int i = 1 ; i <= v ; i++) {
        if(nodes[i].path == INF) cout << "INF\n";
        else cout << nodes[i].path << '\n';
    }
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- Dijkstra Algorithm

- 배운 점
  - priority_queue의 기준은 최댓값 우선임을 기억하자.  
  - visited는 꼭 필요하지는 않다.  
  - 큐에 집어 넣는 것은 값이 갱신되었을 때만 해당된다.  

</div>
</details>

[def]: https://www.acmicpc.net/problem/1520
[def2]: https://www.acmicpc.net/problem/1753