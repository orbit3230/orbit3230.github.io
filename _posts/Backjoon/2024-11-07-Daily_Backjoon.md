---
layout: post
title: "[데일리 백준] 1238"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-11-07
last_modified_at: 2024-11-07
---
## Gold
### [1238][def]

```c++
#include <iostream>
#include <vector>
#include <queue>
#define INF INT32_MAX
using namespace std;

typedef struct Edge {
    short from;
    short to;
    short weight;
} Edge;
typedef struct Node {
    int distanceGo = 0;          // BFS
    int distanceBack = INF;  // Dijkstra
    vector<Edge*> nexts;
} Node;

void bfs(vector<Node>& nodes, int start, int destination, int n) {
    if(start == destination) return;
    vector<bool> visited(n+1, false);
    int distance = -1;
    // {total_weight, next_dest}
    priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> pq;
    pq.push({0, start});
    while(!pq.empty()) {
        int total_weight = pq.top().first;
        int to = pq.top().second;
        pq.pop();
        visited[to] = true;
        if(to == destination) {
            distance = total_weight;
            break;
        }
        for(Edge* next : nodes[to].nexts) {
            if(!visited[next->to]) {
                pq.push({total_weight + next->weight, next->to});
            }
        }
    }
    nodes[start].distanceGo = distance;
    return;
}
void dijkstra(vector<Node>& nodes, int x) {
    // {weight, dest}
    priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> pq;
    pq.push({0, x});
    while(!pq.empty()) {
        int weight = pq.top().first;
        int index = pq.top().second;
        pq.pop();
        if(weight > nodes[index].distanceBack) continue;
        for(Edge* next : nodes[index].nexts) {
            int origin_weight = nodes[next->to].distanceBack;
            int new_weight = nodes[index].distanceBack + next->weight;
            if(origin_weight > new_weight) {
                nodes[next->to].distanceBack = new_weight;
                pq.push({new_weight, next->to});
            }
        }
    }
}

// (1) 각 노드에서 X번 파티장으로 가는 비용 : BFS
// (2) X번 파티장에서 각 노드로 돌아가는 비용 : Dijkstra
int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);

    int n, m, x;
    cin >> n >> m >> x;
    vector<Edge> edges(m);
    vector<Node> nodes(n+1);
    for(int i = 0 ; i < m ; i++) {
        cin >> edges[i].from >> edges[i].to >> edges[i].weight;
        nodes[edges[i].from].nexts.push_back(&edges[i]);
    }
    for(int i = 1 ; i <= n ; i++) {
        bfs(nodes, i, x, n);
    }
    nodes[x].distanceBack = 0;
    dijkstra(nodes, x);
    int max = 0;
    for(int i = 1 ; i <= n ; i++) {
        max = std::max(max, nodes[i].distanceBack + nodes[i].distanceGo);
    }
    cout << max;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- BFS + Dijkstra

- 각 노드들에서 X번 목적지로 가는 것은 각각에 대하여 BFS를 적용하여 구했다.  
반대로 X번 노드에서 각 노드들로 돌아가는 것은 Dijkstra를 적용하여 구했다.  
  - 사실 조금 비효율적임...
  - Dijkstra만 n번 돌려도 된다.  
  - Floyd-Warshall 로도 해결 가능하다.  

</div>
</details>

[def]: https://www.acmicpc.net/problem/1238