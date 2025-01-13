---
layout: post
title: "[데일리 백준] 2887"
excerpt: "1 Platinum"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-01-13
last_modified_at: 2025-01-13
---
## Platinum
### [2887][def]

```c++
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

typedef struct Node {
    int index;
    int parent;
    int x;
    int y;
    int z;
} Node;
typedef struct Edge {
    int from;
    int to;
    int weight;
} Edge;

bool compareX(const Node& n1, const Node& n2) {
    return n1.x < n2.x;
}
bool compareY(const Node& n1, const Node& n2) {
    return n1.y < n2.y;
}
bool compareZ(const Node& n1, const Node& n2) {
    return n1.z < n2.z;
}
bool compare(const Edge& e1, const Edge& e2) {
    return e1.weight < e2.weight;
}

int find(vector<Node>& nodes, Node& n) {
    if(n.index == n.parent) return n.parent;
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

    int n;
    cin >> n;
    vector<Node> nodes(n);
    vector<Node> sortByX(n);
    vector<Node> sortByY(n);
    vector<Node> sortByZ(n);
    for(int i = 0 ; i < n ; i++) {
        nodes[i].index = nodes[i].parent = i;
        cin >> nodes[i].x >> nodes[i].y >> nodes[i].z;
        sortByX[i] = sortByY[i] = sortByZ[i] = nodes[i];
    }
    sort(sortByX.begin(), sortByX.end(), compareX);
    sort(sortByY.begin(), sortByY.end(), compareY);
    sort(sortByZ.begin(), sortByZ.end(), compareZ);
    vector<Edge> edges;
    for(int i = 0 ; i < n-1 ; i++) {
        edges.push_back({sortByX[i].index, sortByX[i+1].index, abs(sortByX[i].x-sortByX[i+1].x)});
        edges.push_back({sortByY[i].index, sortByY[i+1].index, abs(sortByY[i].y-sortByY[i+1].y)});
        edges.push_back({sortByZ[i].index, sortByZ[i+1].index, abs(sortByZ[i].z-sortByZ[i+1].z)});
    }
    sort(edges.begin(), edges.end(), compare);
    int size = edges.size();
    int index = 0;
    int count = 0;
    long long distanceSum = 0;
    while(count != n-1 && index < size) {
        Edge edge = edges[index++];
        if(unionFind(nodes, edge.from, edge.to)) {
            count++;
            distanceSum += edge.weight;
        }
    }
    cout << distanceSum;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 최소 스패닝 트리 (MST) in 3차원 공간

- 모든 Edge 경우를 다 고려할 필요 없이, 어느 축을 기준으로든 가장 가까운 노드 끼리의 Edge만 고려하면 된다는 점.

  - 가령 모든 노드가 같은 y축, z축에 놓여 서로 다른 x값만 가지고 있다고 가정한다면,  
  즉 하나의 일직선 상에 놓인다면,  
  이들 간 모든 Edge를 고려할 필요 없이 가장 가까운 점 끼리의 Edge만 고려하면 될 것이다. (추상화)  

- x, y, z 축이 모두 가까운 두 점의 경우 해당 Edge에 대한 정보가 중복으로 들어갈 텐데,  
어차피 Union-Find 단계에서 걸러지므로 따로 고려할 필요 없다.  

</div>
</details>

[def]: https://www.acmicpc.net/problem/2887