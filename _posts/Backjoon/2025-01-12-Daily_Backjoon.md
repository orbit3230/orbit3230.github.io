---
layout: post
title: "[데일리 백준] 14621"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-01-12
last_modified_at: 2025-01-12
---
## Gold
### [14621][def]

```c++
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

typedef struct Node {
    int index;
    int parent;
    char type;
} Node;
typedef struct Edge {
    int from;
    int to;
    int weight;
} Edge;

bool compare(const Edge& e1, const Edge& e2) {
    return e1.weight < e2.weight;
}

int find(vector<Node>& nodes, Node& a) {
    if(a.index == a.parent) return a.index;
    return a.parent = find(nodes, nodes[a.parent]);
}
bool unionFind(vector<Node>& nodes, int a, int b) {
    int rootA = find(nodes, nodes[a]);
    int rootB = find(nodes, nodes[b]);
    if(rootA == rootB) return false;
    nodes[rootB].parent = rootA;
    return true;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);

    int n, m;
    cin >> n >> m;
    vector<Node> nodes(n);
    char type;
    for(int i = 0 ; i < n ; i++) {
        cin >> type;
        nodes[i].index = nodes[i].parent = i;
        nodes[i].type = type;
    }
    vector<Edge> edges;
    int from, to, weight;
    for(int i = 0 ; i < m ; i++) {
        cin >> from >> to >> weight;
        from--; to--;  // 0-based index
        if(nodes[from].type == nodes[to].type) continue;
        edges.push_back({from, to, weight});  
    }
    sort(edges.begin(), edges.end(), compare);
    int distanceSum = 0;
    int count = 0;
    int index = 0;
    int size = edges.size();
    while(count != n-1 && index != size) {
        Edge edge = edges[index++];
        if(unionFind(nodes, edge.from, edge.to)) {
            distanceSum += edge.weight;
            count++;
        }
    }
    cout << (count != n-1 ? -1 : distanceSum);
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 무난한 MST 연습 문제

</div>
</details>

[def]: https://www.acmicpc.net/problem/14621