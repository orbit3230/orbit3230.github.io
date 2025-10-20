---
layout: post
title: "[데일리 백준] 13424"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-10-20
last_modified_at: 2025-10-20
---
## Gold
### [13424][def]

```c++
#include <iostream>
#include <vector>
#include <queue>
#define INF INT32_MAX >> 1
using namespace std;

struct Edge {
    int from;
    int to;
    int cost;
};
struct Node {
    int index;
    int path = INF;
    vector<Edge*> edges;
};

void initPath(vector<Node>& nodes) {
    for(Node& node : nodes) node.path = INF;
}

void dijkstra(vector<Node>& nodes, Node& node) {
    // {cost, destination}
    priority_queue<pair<int, int>> pq;
    pq.push({node.path, node.index});
    while(!pq.empty()) {
        int cost = pq.top().first;
        int destination = pq.top().second;
        pq.pop();
        if(nodes[destination].path < cost) continue;
        for(Edge* edge : nodes[destination].edges) {
            int originPath = nodes[edge->to].path;
            int newPath = nodes[destination].path + edge->cost;
            if(newPath < originPath) {
                nodes[edge->to].path = newPath;
                pq.push({newPath, edge->to});
            }
        }
    }
}

int main() {
    int t;
    cin >> t;
    while(t--) {
        int n, m;
        cin >> n >> m;
        vector<Node> nodes(n);
        for(int i = 0 ; i < n ; i++) nodes[i].index = i;
        int from, to, cost;
        while(m--) {
            cin >> from >> to >> cost;
            from--; to--;  // 0-based index
            Edge* edge1 = new Edge({from, to, cost});
            nodes[from].edges.push_back(edge1);
            Edge* edge2 = new Edge({to, from, cost});
            nodes[to].edges.push_back(edge2);
        }
        int p_count;
        cin >> p_count;
        vector<int> participants(p_count);
        for(int i = 0 ; i < p_count ; i++) {
            cin >> participants[i];
            participants[i]--;  // 0-based index;
        }
        vector<vector<int>> distance(p_count, vector<int>(n, 0));  // 각 참가자 별 path 기록
        for(int i = 0 ; i < p_count ; i++) {
            int participant = participants[i];
            Node& node = nodes[participant];
            node.path = 0;
            dijkstra(nodes, node);
            for(int j = 0 ; j < n ; j++) distance[i][j] = nodes[j].path;
            initPath(nodes);
        }
        int min = INT32_MAX;
        int min_dest = 0;
        int sum;
        for(int i = 0 ; i < n ; i++) {
            sum = 0;
            for(int j = 0 ; j < p_count ; j++) sum += distance[j][i];
            if(sum < min) {
                min = sum;
                min_dest = i;
            }
        }
        cout << min_dest+1 << '\n';
    }
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- (Multiple) Dijkstra
  - It can be solved by Floyd-Warshall as well

</div>
</details>

[def]: https://www.acmicpc.net/problem/13424