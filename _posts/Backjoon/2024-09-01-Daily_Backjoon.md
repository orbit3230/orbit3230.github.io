---
layout: post
title: "[데일리 백준] 1197"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-09-01
last_modified_at: 2024-09-01
---
## Gold
### [1197][def]

- [최소 스패닝 트리][def2]와 [크루스칼 알고리즘][def3]에 대하여 공부하였다.

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
    int n1;
    int n2;
    int weight;
} Edge;

bool compare(const Edge& e1, const Edge& e2) {
    return e1.weight < e2.weight;
}

int find(vector<Node>& nodes, Node& n) {
    if(n.index == n.parent) return n.parent;
    else return n.parent = find(nodes, nodes[n.parent]);
}
// 같은 집합이면 false, 다른 집합이면 union 후 true를 반환
bool unionFind(vector<Node>& nodes, Edge& edge) {
    int root1 = find(nodes, nodes[edge.n1]);
    int root2 = find(nodes, nodes[edge.n2]);
    if(root1 == root2) return false;
    nodes[root2].parent = root1;
    return true;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    int v, e;
    cin >> v >> e;
    vector<Node> nodes(v);
    for(int i = 0 ; i < v ; i++) {
        nodes[i].index = i;
        nodes[i].parent = i;
    }
    vector<Edge> edges;
    for(int i = 0 ; i < e ; i++) {
        Edge edge;
        cin >> edge.n1 >> edge.n2 >> edge.weight;
        edge.n1--; edge.n2--;  // 0-based index
        edges.push_back(edge);
    }

    // kruskal-algorithm
    sort(edges.begin(), edges.end(), compare);
    int count = 0;
    int sum = 0;
    int index = 0;
    while(count != v-1) {
        Edge edge = edges[index];
        if(unionFind(nodes, edge)) {
            count++;
            sum += edge.weight;
        }
        index++;
    }
    cout << sum;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 최소 스패닝 트리 with 크루스칼 알고리즘.

- Union-Find 또한 복습하며 부족한 지식을 채웠다.  

</div>
</details>

[def]: https://www.acmicpc.net/problem/1197
[def2]: https://gmlwjd9405.github.io/2018/08/28/algorithm-mst.html
[def3]: https://4legs-study.tistory.com/111