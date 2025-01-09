---
layout: post
title: "[데일리 백준] 5719"
excerpt: "1 Platinum"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-01-09
last_modified_at: 2025-01-09
---
## Platinum
### [5719][def]

```c++
#include <iostream>
#include <vector>
#include <queue>
#define INF INT32_MAX/2
using namespace std;

typedef struct Edge {
    int from;
    int to;
    int weight;
    bool disabled = false;
} Edge;
typedef struct Node {
    int path = INF;
    vector<Edge*> nexts;
    vector<Edge*> inputs;
} Node;

void dijkstra(vector<Node>& nodes, int start) {
    // {path, destination}
    priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> pq;
    pq.push({0, start});
    while(!pq.empty()) {
        int path = pq.top().first;
        int dest = pq.top().second;
        pq.pop();
        if(path > nodes[dest].path) continue;
        for(Edge* next : nodes[dest].nexts) {
            if(next->disabled) continue;
            int originPath = nodes[next->to].path;
            int newPath = path + next->weight;
            if(newPath < originPath) {
                nodes[next->to].path = newPath;
                pq.push({newPath, next->to});
            }
        }
    }
}
void dfs(vector<Node>& nodes, int index, const int shortest, int weight) {
    for(Edge* input : nodes[index].inputs) {
        if(input->disabled) continue;
        if(nodes[input->from].path+(weight+input->weight) == shortest) {
            input->disabled = true;
            dfs(nodes, input->from, shortest, (weight+input->weight));
        }
    }
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    int n, m;
    while(cin >> n >> m) {
        if(!(n || m)) break;
        int start, to;
        cin >> start >> to;
        vector<Node> nodes(n);
        vector<Edge> edges(m);
        for(int i = 0 ; i < m ; i++) {
            cin >> edges[i].from >> edges[i].to >> edges[i].weight;
            nodes[edges[i].from].nexts.push_back(&edges[i]);
            nodes[edges[i].to].inputs.push_back(&edges[i]);
        }
        // Dijkstra [1]
        nodes[start].path = 0;
        dijkstra(nodes, start);
        int shortest = nodes[to].path;
        // Remove Shortest path edges (by DFS reversely)
        dfs(nodes, to, shortest, 0);
        // Initialize
        for(int i = 0 ; i < n ; i++) nodes[i].path = INF;
        // Dijkstra [2]
        nodes[start].path = 0;
        dijkstra(nodes, start);
        int almost_shortest = nodes[to].path;
        cout << (almost_shortest == INF ? -1 : almost_shortest) << '\n';
    }
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- Dijkstra + DFS

- 다익스트라로 찾은 최단 경로를 역으로 추적하는 좋은 방법을 깨달았다.  

  - 도착 지점부터 역으로 그래프 탐색 하였을 때,  

  - 지금까지의 Edge weight 합 + 다음 Edge weight + 다음 노드에 저장된 최단 경로 == Shortest Path **인 경우에만** 해당 Edge가 최단 경로에 포함될 것을 보장한다.  

  - otherwise, 절대 최단 경로에 포함되지 않는다.  

</div>
</details>

[def]: https://www.acmicpc.net/problem/5719