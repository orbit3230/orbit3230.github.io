---
layout: post
title: "[데일리 백준] 1854"
excerpt: "1 Platinum"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-03-11
last_modified_at: 2025-03-11
---
## Platinum
### [1854][def]

```c++
#include <iostream>
#include <vector>
#include <queue>
#define INF INT32_MAX>>1
using namespace std;

typedef struct Edge {
    int from;
    int to;
    int weight;
} Edge;
typedef struct Node {
    int index;
    priority_queue<int> paths;
    vector<Edge*> nexts;
} Node;

void dijkstra(vector<Node>& nodes, int k) {
    // {weight, destination}
    priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> pq;
    nodes[0].paths.push(0);
    pq.push({nodes[0].index, 0});
    while(!pq.empty()) {
        int weight = pq.top().first;
        int destination = pq.top().second;
        pq.pop();
        Node node = nodes[destination];
        for(Edge* next : node.nexts) {
            int newPath = weight + next->weight;
            if(nodes[next->to].paths.size() < k) {
                nodes[next->to].paths.push(newPath);
                pq.push({newPath, next->to});
                continue;
            }
            if(newPath < nodes[next->to].paths.top()) {
                nodes[next->to].paths.pop();
                nodes[next->to].paths.push(newPath);
                pq.push({newPath, next->to});
            }
        }
    }
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    int n, m, k;
    cin >> n >> m >> k;
    vector<Node> nodes(n);
    for(int i = 0 ; i < n ; i++) {
        nodes[i].index = i;
        nodes[i].paths.push(INF);
    }
    int from, to, weight;
    for(int i = 0 ; i < m ; i++) {
        cin >> from >> to >> weight;
        from--; to--;  // 0-based index
        Edge* edge = new Edge({from, to, weight});
        nodes[from].nexts.push_back(edge);
    }
    dijkstra(nodes, k);
    for(Node& node : nodes) {
        if(node.index == 0 && k == 1) {  // special case
            cout << "0\n";
            continue;
        }
        if(node.paths.size() < k) {
            cout << "-1\n";
            continue;
        }
        // reversed order (greater first)
        cout << (node.paths.top() == INF ? -1 : node.paths.top()) << '\n';
    }
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- Dijkstra

- 단순 최단 경로가 아닌, priority_queue에 k개가 쌓일 때 까지 distance를 모두 기록해나가는 특이한 형태의 Dijkstra

</div>
</details>

[def]: https://www.acmicpc.net/problem/1854