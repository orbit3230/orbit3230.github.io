---
layout: post
title: "[데일리 백준] 1922"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-10-24
last_modified_at: 2024-10-24
---
## Gold
### [1922][def]

```c++
#include <iostream>
#include <queue>
using namespace std;

typedef struct Edge;
typedef struct Computer {
    bool connected = false;
    vector<Edge*> edges;
} Computer;
typedef struct Edge {
    Computer* from;
    Computer* to;
    short value;
    bool used = false;
    bool operator<(const Edge& other) const {
        return this->value > other.value;
    }
} Edge;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);

    int n, m;
    cin >> n >> m;
    vector<Computer> computers(n);
    for(int i = 0 ; i < m ; i++) {
        Edge* e = new Edge();
        int a, b;
        cin >> a >> b >> e->value;
        a--; b--;  // 0-based index
        e->from = &computers[a];
        e->to = &computers[b];
        computers[a].edges.push_back(e);
        computers[b].edges.push_back(e);
    }
    // Prim's Algorithm practice
    priority_queue<Edge> pq;
    for(Edge* e : computers[0].edges) pq.push(*e);
    computers[0].connected = true;
    int edgeCount = 0;
    int valueSum = 0;
    while(edgeCount != n-1) {
        Edge e = pq.top();
        pq.pop();
        if(e.from->connected && e.to->connected) continue;
        if(e.from->connected) {
            for(Edge* e : e.to->edges) {
                if(!e->used) {
                    e->used = true;
                    pq.push(*e);
                }
            }
            e.to->connected = true;
        }
        else {
            for(Edge* e : e.from->edges) {
                if(!e->used) {
                    e->used = true;
                    pq.push(*e);
                }
            }
            e.from->connected = true;
        }
        edgeCount++;
        valueSum += e.value;
    }
    cout << valueSum;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 최소 스패닝 트리.

- Prim's Algorithm을 연습하기 위해 풀었다.

</div>
</details>

[def]: https://www.acmicpc.net/problem/1922