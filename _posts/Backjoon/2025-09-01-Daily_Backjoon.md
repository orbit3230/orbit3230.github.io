---
layout: post
title: "[데일리 백준] 18223"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-09-01
last_modified_at: 2025-09-01
---
## Gold
### [18223][def]

```c++
#include <iostream>
#include <vector>
#include <queue>
#define INF INT32_MAX>>1
using namespace std;

struct Edge {
    int from;
    int to;
    int weight;
};
struct Node {
    int index;
    int path = INF;
    vector<Edge*> nexts;
};

void dijkstra(vector<Node>& nodes, int start) {
    // {weight, destination}
    priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> pq;
    pq.push({0, start});
    while(!pq.empty()) {
        int weight = pq.top().first;
        int dest = pq.top().second;
        pq.pop();
        Node node = nodes[dest];
        if(node.path < weight) continue;
        for(Edge* next : node.nexts) {
            int originPath = nodes[next->to].path;
            int newPath = node.path + next->weight;
            if(newPath <= originPath) {
                nodes[next->to].path = newPath;
                pq.push({newPath, next->to});
            }
        }
    }
}
void initPath(vector<Node>& nodes) {
    for(Node& node : nodes) node.path = INF;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);

    int n, e, p;
    cin >> n >> e >> p;
    p--;  // 0-based index
    vector<Node> nodes(n);
    for(int i = 0 ; i < n ; i++) nodes[i].index = i;
    int from, to, weight;
    for(int i = 0 ; i < e ; i++) {
        cin >> from >> to >> weight;
        from--; to--;  // 0-based index
        Edge* e1 = new Edge{from, to, weight};
        Edge* e2 = new Edge{to, from, weight};
        nodes[from].nexts.push_back(e1);
        nodes[to].nexts.push_back(e2);
    }
    nodes[0].path = 0;
    dijkstra(nodes, 0);
    int path1 = nodes[n-1].path;  // 1 -> n
    int path2 = nodes[p].path;  // 1 -> p
    initPath(nodes);
    nodes[p].path = 0;
    dijkstra(nodes, p);
    int path3 = nodes[n-1].path;  // p -> n
    if(path1 == path2 + path3) {  // (1 -> n) == (1 -> p -> n)
        cout << "SAVE HIM";
        return 0;
    }
    cout << "GOOD BYE";
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- Dijkstra

</div>
</details>

[def]: https://www.acmicpc.net/problem/18223