---
layout: post
title: "[데일리 백준] 14284"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-04-23
last_modified_at: 2025-04-23
---
## Gold
### [14284][def]

```c++
#include <iostream>
#include <vector>
#include <queue>
#define INF INT32_MAX>>1
using namespace std;

typedef struct Edge {
    int from;
    int to;
    int weight;
} Edge;
typedef struct Node {
    int index;
    int path = INF;
    vector<Edge*> edges;
} Node;

void dijkstra(vector<Node>& nodes, int start) {
    // {weight, destination}
    priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> pq;
    pq.push({nodes[start].path, start});
    while(!pq.empty()) {
        int weight = pq.top().first;
        int current = pq.top().second;
        pq.pop();
        if(weight > nodes[current].path) continue;
        for(Edge* edge : nodes[current].edges) {
            int originPath = nodes[edge->to].path;
            int newPath = nodes[current].path + edge->weight;
            if(newPath < originPath) {
                nodes[edge->to].path = newPath;
                pq.push({newPath, edge->to});
            }
        }
    }
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);

    int n, m;
    cin >> n >> m;
    vector<Node> nodes(n);
    int from, to, weight;
    for(int i = 0 ; i < m ; i++) {
        cin >> from >> to >> weight;
        from--; to--;  // 0-based index
        Edge* edge_1 = new Edge{from, to, weight};
        nodes[from].edges.push_back(edge_1);
        Edge* edge_2 = new Edge{to, from, weight};
        nodes[to].edges.push_back(edge_2);
    }
    int s, t;
    cin >> s >> t;
    s--; t--;  // 0-based index
    nodes[s].path = 0;
    dijkstra(nodes, s);
    cout << nodes[t].path;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- Dijkstra (remind)

</div>
</details>

[def]: https://www.acmicpc.net/problem/14284