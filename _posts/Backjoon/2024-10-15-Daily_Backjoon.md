---
layout: post
title: "[데일리 백준] 1325, 1707"
excerpt: "1 Silver, 1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-10-15
last_modified_at: 2024-10-15
---
## Silver
### [1325][def]

```c++
#include <iostream>
#include <vector>
using namespace std;

typedef struct Computer {
    vector<Computer*> connected;
    bool hacked = false;
} Computer;

void hacking(Computer* current, int& count) {
    count++;
    current->hacked = true;
    for(Computer* next : current->connected) {
        if(!next->hacked) hacking(next, count);
    }
    return;
}
void initialize(vector<Computer>& network) {
    for(Computer& c : network) c.hacked = false;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    int n, m;
    cin >> n >> m;
    vector<Computer> network(n);
    int a, b;
    for(int i = 0 ; i < m ; i++) {
        cin >> a >> b;
        a--; b--;  // 0-based index
        network[b].connected.push_back(&network[a]);
    }
    int max_count = 0;
    vector<int> best;
    for(int i = 0 ; i < n ; i++) {
        int count = 0;
        hacking(&network[i], count);
        initialize(network);
        if(max_count <= count) {
            if(max_count == count) {
                best.push_back(i+1);
                continue;
            }
            max_count = count;
            best.clear();
            best.push_back(i+1);
        }
    }
    for(int i : best) cout << i << ' ';
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 무난한 그래프 탐색 문제.

- 가장 긴 그래프 연결을 찾는 브루트포스 문제.

</div>
</details>

<br>

## Gold
### [1707][def2]

```c++
#include <iostream>
#include <vector>
#include <queue>
using namespace std;

typedef struct Node {
    vector<Node*> neighbors;
    bool visited = false;
    int step = 0;  // 몇 번째 스텝에 방문했는 지
} Node;

bool hasCycle(vector<Node>& nodes, int start) {
    Node* n = &nodes[start];
    n->visited = true;
    queue<Node*> q;
    q.push(n);
    while(!q.empty()) {
        n = q.front();
        q.pop();
        for(Node* neighbor : n->neighbors) {
            if(neighbor->visited) {
                // 바로 직전 노드 : OK
                // 동시에 도착하는 것 : OK
                if(neighbor->step != n->step-1 && neighbor->step != n->step+1) return true;
                continue;
            }
            neighbor->visited = true;
            neighbor->step = n->step+1;
            q.push(neighbor);
        }
    }
    return false;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    int k;
    cin >> k;
    for(int t = 0 ; t < k ; t++) {
        int V, E;
        cin >> V >> E;
        vector<Node> nodes(V);
        for(int i = 0 ; i < E ; i++) {
            int u, v;
            cin >> u >> v;
            u--; v--;  // 0-based index
            nodes[u].neighbors.push_back(&nodes[v]);
            nodes[v].neighbors.push_back(&nodes[u]);
        }
        bool cycle = false;
        for(int i = 0 ; i < V ; i++) {
            if(nodes[i].visited) continue;
            if(hasCycle(nodes, i)) {
                cycle = true;
                break;
            }
        }
        if(cycle) cout << "NO\n";
        else cout << "YES\n";
    }
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 이분 그래프 : 그래프를 두 개의 집합으로 나누는데, 같은 집합에 들어있는 노드들끼리는 서로 인접하지 않도록 나눌 수 있는 그래프.  

- 내가 깨달은 이분 그래프의 특성
  - (1) 기본적으로 사이클이 존재하면 안된다.  
  - (2) 단, 사이클이 존재하더라도 BFS 기준 같은 시간에 도착 한다면 이분 그래프가 될 수도 있다.   

</div>
</details>


[def]: https://www.acmicpc.net/problem/1325
[def2]: https://www.acmicpc.net/problem/1707