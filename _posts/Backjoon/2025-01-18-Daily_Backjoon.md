---
layout: post
title: "[데일리 백준] 10282"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-01-18
last_modified_at: 2025-01-18
---
## Gold
### [10282][def]

```c++
#include <iostream>
#include <vector>
#include <queue>
#define INF INT32_MAX>>1
using namespace std;

typedef struct Edge {
    int to;
    int weight;
} Edge;
typedef struct Node {
    int path = INF;
    vector<Edge*> nexts;
} Node;

void dijkstra(vector<Node>& nodes, int start) {
    // {weight, destination}
    priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> pq;
    pq.push({0, start});
    while(!pq.empty()) {
        int weight = pq.top().first;
        int index = pq.top().second;
        pq.pop();
        if(weight > nodes[index].path) continue;
        for(Edge* edge : nodes[index].nexts) {
            int destination = edge->to;
            int originPath = nodes[destination].path;
            int newPath = nodes[index].path + edge->weight;
            if(originPath > newPath) {
                nodes[destination].path = newPath;
                pq.push({newPath, destination});
            }
        }
    }
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    int t;
    cin >> t;
    while(t--) {
        int n, d, c;
        cin >> n >> d >> c;
        c--;  // 0-based index
        vector<Node> nodes(n);
        int a, b, s;
        while(d--) {
            cin >> a >> b >> s;
            a--; b--;  // 0-based index
            Edge* e = new Edge({a, s});
            nodes[b].nexts.push_back(e);
        }
        nodes[c].path = 0;
        dijkstra(nodes, c);
        int count = 0;
        int maxTime = 0;
        for(Node& node : nodes) {
            if(node.path != INF) {
                count++;
                maxTime = max(maxTime, node.path);
            }
        }
        cout << count << ' ' << maxTime << '\n';
    }
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 다익스트라 리마인드

</div>
</details>

[def]: https://www.acmicpc.net/problem/10282