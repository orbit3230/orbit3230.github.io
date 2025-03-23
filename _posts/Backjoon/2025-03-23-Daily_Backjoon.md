---
layout: post
title: "[데일리 백준] 17396"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-03-23
last_modified_at: 2025-03-23
---
## Gold
### [17396][def]

```c++
#include <iostream>
#include <vector>
#include <queue>
#include <climits>
#define INF LLONG_MAX >> 1
using namespace std;

typedef struct Edge {
    int from;
    int to;
    int weight;
} Edge;
typedef struct Node {
    int index;
    long long path;
    bool isWard;
    vector<Edge*> nexts;
} Node;

void dijkstra(vector<Node>& nodes) {
    int nexus = nodes.size()-1;
    // {weight, destination}
    priority_queue<pair<long long, int>, vector<pair<long long, int>>, greater<pair<long long, int>>> pq;
    pq.push({nodes[0].path, nodes[0].index});
    while(!pq.empty()) {
        long long weight = pq.top().first;
        int index = pq.top().second;
        pq.pop();
        if(nodes[index].path < weight) continue;
        for(Edge* edge : nodes[index].nexts) {
            if(nodes[edge->to].isWard && nodes[edge->to].index != nexus) continue;
            long long originPath = nodes[edge->to].path;
            long long newPath = weight + edge->weight;
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
    for(int i = 0 ; i < n ; i++) {
        nodes[i].index = i;
        nodes[i].path = INF;
        cin >> nodes[i].isWard;
    }
    int from, to, weight;
    for(int i = 0 ; i < m ; i++) {
        cin >> from >> to >> weight;
        Edge* edge1 = new Edge({from, to, weight});
        nodes[from].nexts.push_back(edge1);
        Edge* edge2 = new Edge({to, from, weight});
        nodes[to].nexts.push_back(edge2);
    }
    nodes[0].path = 0;
    dijkstra(nodes);
    cout << (nodes[n-1].path == INF ? -1 : nodes[n-1].path);
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 다익스트라  

</div>
</details>

[def]: https://www.acmicpc.net/problem/17396