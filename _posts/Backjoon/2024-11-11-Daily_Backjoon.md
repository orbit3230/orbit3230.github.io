---
layout: post
title: "[데일리 백준] 1504"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-11-11
last_modified_at: 2024-11-11
---
## Gold
### [1504][def]

```c++
#include <iostream>
#include <vector>
#include <queue>
#define INF INT32_MAX/4
using namespace std;

typedef struct Edge {
    short from;
    short to;
    short weight;
} Edge;
typedef struct Node {
    int cost = INF;
    vector<Edge*> nexts;
} Node;

vector<Node> dijkstra(vector<Node> nodes, short start) {
    // {weight, index}
    priority_queue<pair<int, short>, vector<pair<int, short>>, greater<pair<int, short>>> pq;
    nodes[start].cost = 0;
    pq.push({0, start});
    while(!pq.empty()) {
        int cost = pq.top().first;
        short index = pq.top().second;
        pq.pop();
        if(cost > nodes[index].cost) continue;
        for(Edge* e : nodes[index].nexts) {
            int origin_cost = nodes[e->to].cost;
            int new_cost = nodes[index].cost + e->weight;
            if(new_cost < origin_cost) {
                nodes[e->to].cost = new_cost;
                pq.push({new_cost, e->to});
            }
        }
    }
    return nodes;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);

    int n, e;
    cin >> n >> e;
    vector<Node> nodes(n+1);
    vector<vector<Edge>> edges(e, vector<Edge>(2));
    short from, to, weight;
    for(int i = 0 ; i < e ; i++) {
        cin >> edges[i][0].from >> edges[i][0].to >> edges[i][0].weight;
        edges[i][1].from = edges[i][0].to;
        edges[i][1].to = edges[i][0].from;
        edges[i][1].weight = edges[i][0].weight;
        nodes[edges[i][0].from].nexts.push_back(&edges[i][0]);
        nodes[edges[i][1].from].nexts.push_back(&edges[i][1]);
    }
    short check1, check2;
    cin >> check1 >> check2;
    // (방법 1) 1 -> check1 -> check2 -> n
    // (방법 2) 1 -> check2 -> check1 -> n
    vector<Node> fromOne = dijkstra(nodes, 1);
    vector<Node> fromCheck1 = dijkstra(nodes, check1);
    vector<Node> fromCheck2 = dijkstra(nodes, check2);
    int way1 = fromOne[check1].cost + fromCheck1[check2].cost + fromCheck2[n].cost;
    int way2 = fromOne[check2].cost + fromCheck2[check1].cost + fromCheck1[n].cost;
    int result = min(way1, way2);
    cout << (result >= INF ? -1 : result);
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 다익스트라 알고리즘.

- 특정 노드를 거쳐가는 최단 경로를 구하는 문제.
  - s -> v1 -> v2 -> d
  - s -> v2 -> v1 -> d
  - 이렇게 두 가지의 경우가 존재한다.  

</div>
</details>

[def]: https://www.acmicpc.net/problem/1504