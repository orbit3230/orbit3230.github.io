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
    return n.parent = find(nodes, nodes[n.parent]);
}
bool unionFind(vector<Node>& nodes, Edge& edge) {
    int root1 = find(nodes, nodes[edge.n1]);
    int root2 = find(nodes, nodes[edge.n2]);
    if(root1 == root2) return false;
    nodes[root2].parent = nodes[root1].parent;
    return true;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    int n, m;
    cin >> n >> m;
    vector<Node> nodes;
    for(int i = 0 ; i < n ; i++) {
        Node node;
        node.index = i;
        node.parent = i;
        nodes.push_back(node);
    }
    vector<Edge> edges;
    for(int i = 0 ; i < m ; i++) {
        Edge edge;
        cin >> edge.n1 >> edge.n2 >> edge.weight;
        edge.n1--; edge.n2--;  // 0-based index
        edges.push_back(edge);
    }
    sort(edges.begin(), edges.end(), compare);

    int count = 0;  // 엣지 개수
    int sum = 0;
    int weight = 0;
    int index = 0;
    while(count < n-1) {
        Edge edge = edges[index++];
        if(unionFind(nodes, edge)) {
            count++;
            weight = edge.weight;
            sum += weight;
        }
    }
    sum -= weight;  // 도시를 두 개로 분할하기 위하여 마지막으로 사용된 가장 높은 가중치의 간선 제거
    cout << sum;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 최소 스패닝 트리 with 크루스칼 알고리즘 두 번째 문제.

</div>
</details>

[def]: https://www.acmicpc.net/problem/1197
[def2]: https://gmlwjd9405.github.io/2018/08/28/algorithm-mst.html
[def3]: https://4legs-study.tistory.com/111