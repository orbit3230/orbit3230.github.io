---
layout: post
title: "[데일리 백준] 6497"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-02-22
last_modified_at: 2025-02-22
---
## Gold
### [6497][def]

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
    int weight;
} Edge;

bool compare(const Edge& a, const Edge& b) {
    return a.weight < b.weight;
}

int find(vector<Node>& nodes, Node& n) {
    if(n.index == n.parent) return n.index;
    return n.parent = find(nodes, nodes[n.parent]);
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
    cout.tie(NULL);
    
    int m, n;
    while(cin >> m >> n) {
        if(!m && !n) break;
        vector<Node> nodes(m);
        for(int i = 0 ; i < m ; i++) nodes[i].index = nodes[i].parent = i;
        vector<Edge> edges(n);
        int electricity = 0;
        for(int i = 0 ; i < n ; i++) {
            cin >> edges[i].from >> edges[i].to >> edges[i].weight;
            electricity += edges[i].weight;
        }
        sort(edges.begin(), edges.end(), compare);

        int count = 0;
        int sum = 0;
        int index = 0;
        while(index != n && count != m-1) {
            Edge e = edges[index++];
            if(unionFind(nodes, e.from, e.to)) {
                sum += e.weight;
                count++;
            }
        }
        cout << electricity - sum << '\n';
    }
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- MST

</div>
</details>

[def]: https://www.acmicpc.net/problem/6497