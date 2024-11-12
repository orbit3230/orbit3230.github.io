---
layout: post
title: "[데일리 백준] 1865, 1976"
excerpt: "2 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-11-12
last_modified_at: 2024-11-12
---
## Gold
### [1865][def]

```c++
#include <iostream>
#include <vector>
#define INF INT32_MAX/2
using namespace std;

typedef struct Edge {
    short from;
    short to;
    short weight;
} Edge;

void bellman_ford(vector<int>& distance, vector<Edge>& edges, int n) {
    for(int i = 0 ; i < n-1 ; i++) {
        for(Edge edge : edges) {
            int from = edge.from;
            int to = edge.to;
            distance[to] = min(distance[to], distance[from] + edge.weight);
        }
    }
}
bool minus_cycle_check(vector<int>& distance, vector<Edge>& edges, int n) {
    for(int i = 0 ; i < n-1 ; i++) {
        for(Edge edge : edges) {
            int from = edge.from;
            int to = edge.to;
            if(distance[to] > distance[from] + edge.weight) return true;  // found cycle
        }
    }
    return false;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    int tc;
    cin >> tc;
    for(int t = 0 ; t < tc ; t++) {
        int n, m, w;
        cin >> n >> m >> w;
        vector<int> distance(n, INF);
        distance[0] = 0;
        int e = 2*m+w;
        vector<Edge> edges(e);
        for(int i = 0 ; i < 2*m ; i++) {
            if(i % 2 == 0) {
                cin >> edges[i].from >> edges[i].to >> edges[i].weight;
                edges[i].from--; edges[i].to--;  // 0-based index
                continue;
            }
            edges[i].from = edges[i-1].to;
            edges[i].to = edges[i-1].from;
            edges[i].weight = edges[i-1].weight;
        }
        for(int i = 2*m ; i < e ; i++) {
            cin >> edges[i].from >> edges[i].to >> edges[i].weight;
            edges[i].from--; edges[i].to--;  // 0-based index
            edges[i].weight *= -1;  // wormhole
        }
        bellman_ford(distance, edges, n);
        cout << (minus_cycle_check(distance, edges, n) ? "YES\n" : "NO\n");
    }
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- Bellman-Ford Algorithm

- `if(distance[from] == INF && distance[to] == INF) continue;`  
  - 이 문장의 근본적인 필요 이유는,  
  특정 노드에서 출발했을 때 절대로 도달할 수 없는, 즉 엣지가 존재하지 않는 경우를 배제하는 것이다.  

  - 하지만 현재 문제의 경우 시작 노드를 특정하지 않았으며, 단순 음수 사이클을 찾는 것이 목표이기 때문에  
  이 문장의 필요 이유는 사라진다.  

</div>
</details>

### [1976][def2]

```c++
#include <iostream>
#include <vector>
using namespace std;

int find(vector<int>& cities, int index) {
    if(cities[index] == index) return index;
    return cities[index] = find(cities, cities[index]);
}

void unions(vector<int>& cities, int from, int to) {
    int root1 = find(cities, from);
    int root2 = find(cities, to);
    if(root1 != root2) {
        cities[root2] = cities[root1];
    }
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);

    int n, m;
    cin >> n >> m;
    vector<int> cities(n);
    for(int i = 0 ; i < n ; i++) cities[i] = i;  // root is itself
    bool connected;
    for(int i = 0 ; i < n ; i++) {
        for(int j = 0 ; j < n ; j++) {
            cin >> connected;
            if(i > j) continue;
            if(connected) unions(cities, i, j);
        }
    }
    int from, to;
    for(int i = 0 ; i < m ; i++) {
        from = to;
        cin >> to;
        to--;  // 0-based index
        if(i == 0) continue;
        if(find(cities, from) != find(cities, to)) {
            cout << "NO";
            return 0;
        }
    }
    cout << "YES";
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- Union-Find Algorithm

- union 시에 인덱스를 direct로 지정해 주는 것이 아니라  
root를 찾아서 할당해 주어야 한다는 사실을 잊지 말자.  

</div>
</details>

[def]: https://www.acmicpc.net/problem/1865
[def2]: https://www.acmicpc.net/problem/1976