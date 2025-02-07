---
layout: post
title: "[데일리 백준] 5972"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-02-07
last_modified_at: 2025-02-07
---
## Gold
### [5972][def]

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
    int path = INF;
    vector<Edge*> edges;
} Node;

void dijkstra(vector<Node>& nodes, int start) {
    // {weight, destination}
    priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> pq;
    pq.push({nodes[start].path, start});
    int weight;
    int destination;
    while(!pq.empty()) {
        weight = pq.top().first;
        destination = pq.top().second;
        pq.pop();
        if(weight > nodes[destination].path) continue;
        for(Edge* edge : nodes[destination].edges) {
            int originPath = nodes[edge->to].path;
            int newPath = nodes[destination].path + edge->weight;
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
    while(m--) {
        cin >> from >> to >> weight;
        from--; to--;  // 0-based index
        Edge* edgeA = new Edge({from, to, weight});
        nodes[from].edges.push_back(edgeA);
        Edge* edgeB = new Edge({to, from, weight});
        nodes[to].edges.push_back(edgeB);
    }
    int start = 0;
    int end = n-1;
    nodes[start].path = 0;
    dijkstra(nodes, start);
    cout << nodes[end].path;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- Dijkstra

</div>
</details>

[def]: https://www.acmicpc.net/problem/5972