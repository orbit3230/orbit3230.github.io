---
layout: post
title: "[데일리 백준] 4650"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-02-01
last_modified_at: 2025-02-01
---
## Gold
### [4650][def]

```c++
#include <iostream>
#include <vector>
#include <queue>
#include <algorithm>
using namespace std;

typedef struct Node {
    int parent;
    int index;
} Node;
typedef struct Edge {
    int from;
    int to;
    int weight;
} Edge;

bool compare(const Edge& e1, const Edge& e2) {
    return e1.weight < e2.weight;
}

int find(vector<Node>& nodes, Node& n) {
    if(n.parent == n.index) return n.index;
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

    int n;
    while(cin >> n) {
        if(!n) break;
        vector<Node> nodes(n);
        for(int i = 0 ; i < n ; i++) nodes[i].parent = nodes[i].index = i;
        vector<Edge> edges;
        char from;
        int numOfEdges;
        char to;
        int weight;
        for(int i = 0 ; i < n-1 ; i++) {
            cin >> from >> numOfEdges;
            for(int j = 0 ; j < numOfEdges ; j++) {
                cin >> to >> weight;
                edges.push_back({from-'A', to-'A', weight});
            }
        }
        sort(edges.begin(), edges.end(), compare);
        int size = edges.size();
        int index = 0;
        int count = 0;
        int sum = 0;
        while((index < size) && (count != n-1)) {
            Edge edge = edges[index++];
            if(unionFind(nodes, edge.from, edge.to)) {
                count++;
                sum += edge.weight;
            }
        }
        cout << sum << '\n';
    }
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 최소 스패닝 트리 (MST)

</div>
</details>

[def]: https://www.acmicpc.net/problem/4650