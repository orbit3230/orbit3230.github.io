---
layout: post
title: "[데일리 백준] 21924"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-05-13
last_modified_at: 2025-05-13
---
## Gold
### [21924][def]

```c++
#include <iostream>
#include <vector>
#include <queue>
#include <algorithm>
using namespace std;

typedef struct Node {
    int index;
    int parent;
} Node;
typedef struct Edge {
    int from;
    int to;
    int cost;
} Edge;

bool compare(const Edge& a, const Edge& b) {
    return a.cost < b.cost;
}

int find(vector<Node>& nodes, Node& node) {
    if(node.parent == node.index) return node.index;
    return node.parent = find(nodes, nodes[node.parent]);
}
bool unionFind(vector<Node>& nodes, int a, int b) {
    int rootA = find(nodes, nodes[a]);
    int rootB = find(nodes, nodes[b]);
    if(rootA == rootB) return true;
    nodes[rootB].parent = rootA;
    return false;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);

    int n, m;
    cin >> n >> m;
    vector<Node> nodes(n);
    for(int i = 0 ; i < n ; i++) nodes[i].index = nodes[i].parent = i;
    vector<Edge> edges(m);
    long long cost_sum = 0;
    for(int i = 0 ; i < m ; i++) {
        cin >> edges[i].from >> edges[i].to >> edges[i].cost;
        edges[i].from--; edges[i].to--;  // 0-based index
        cost_sum += edges[i].cost;
    }
    sort(edges.begin(), edges.end(), compare);
    int index = 0;
    int count = 0;
    long long sum = 0;
    while(index < m && count < n-1) {
        Edge& edge = edges[index++];
        if(!unionFind(nodes, edge.from, edge.to)) {
            count++;
            sum += edge.cost;
        }
    }
    cout << (count != n-1 ? -1 : cost_sum - sum);
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- MST (Kruskal's Algorithm)

</div>
</details>

[def]: https://www.acmicpc.net/problem/21924