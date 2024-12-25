---
layout: post
title: "[데일리 백준] 16398"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-12-25
last_modified_at: 2024-12-25
---
## Gold
### [16398][def]

```c++
#include <iostream>
#include <vector>
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

bool compare(const Edge& e1, const Edge& e2) {
    return e1.cost < e2.cost;
}

int find(vector<Node>& nodes, Node& n) {
    if(n.index == n.parent) return n.index;
    return n.parent = find(nodes, nodes[n.parent]);
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

    int n;
    cin >> n;
    vector<Node> nodes(n);
    for(int i = 0 ; i < n ; i++) nodes[i].index = nodes[i].parent = i;
    vector<Edge> edges;
    int cost;
    for(int from = 0 ; from < n ; from++) {
        for(int to = 0 ; to < n ; to++) {
            cin >> cost;
            if(from <= to) continue;
            edges.push_back({from, to, cost});
        }
    }
    sort(edges.begin(), edges.end(), compare);

    int index = 0;
    int count = 0;
    int sum = 0;
    int size = edges.size();
    while(index < size && count != n-1) {
        Edge e = edges[index++];
        if(!unionFind(nodes, e.from, e.to)) {
            count++;
            sum += e.cost;
        }
    }
    cout << sum;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- MST (Minimum Spanning Tree)

</div>
</details>

[def]: https://www.acmicpc.net/problem/16398