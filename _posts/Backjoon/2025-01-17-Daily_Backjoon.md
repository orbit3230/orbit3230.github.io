---
layout: post
title: "[데일리 백준] 1240"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-01-17
last_modified_at: 2025-01-17
---
## Gold
### [1240][def]

```c++
#include <iostream>
#include <vector>
#include <queue>
using namespace std;

typedef struct Edge {
    int to;
    int weight;
} Edge;
typedef struct Node {
    vector<Edge*> edges;
    int index;
    bool visited = false;
} Node;

int bfs(vector<Node>& nodes, int from, int to) {
    // {node, distance}
    queue<pair<Node&, int>> q;
    q.push({nodes[from], 0});
    nodes[from].visited = true;
    while(!q.empty()) {
        Node& current = q.front().first;
        int distance = q.front().second;
        q.pop();
        if(current.index == to) return distance;
        for(Edge* e : current.edges) {
            if(!nodes[e->to].visited) {
                q.push({nodes[e->to], distance + e->weight});
                nodes[e->to].visited = true;
            }
        }
    }
    return -1;
}
void initialize(vector<Node>& nodes) {
    for(Node& n : nodes) n.visited = false;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    int n, m;
    cin >> n >> m;
    vector<Node> nodes(n);
    for(int i = 0 ; i < n ; i++) nodes[i].index = i;
    int from, to, weight;
    for(int i = 0 ; i < n-1 ; i++) {
        cin >> from >> to >> weight;
        from--; to--;  // 0-based index
        Edge* e1 = new Edge{to, weight};
        Edge* e2 = new Edge{from, weight};
        nodes[from].edges.push_back(e1);
        nodes[to].edges.push_back(e2);
    }
    int a, b;
    while(m--) {
        cin >> a >> b;
        a--; b--;  // 0-based index
        cout << bfs(nodes, a, b) << '\n';
        initialize(nodes);
    }
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 그래프(트리) 날먹 문제  

</div>
</details>

[def]: https://www.acmicpc.net/problem/1240