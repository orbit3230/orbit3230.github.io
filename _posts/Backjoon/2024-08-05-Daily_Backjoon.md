---
layout: post
title: "[데일리 백준] 2252, 1359"
excerpt: "1 Gold, 1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-08-05
last_modified_at: 2024-08-05
---
## Gold
### [2252][def]

- 위상 정렬에 대하여 공부하였음.

```c++
#include <iostream>
#include <vector>
#include <queue>
#include <algorithm>
using namespace std;

typedef struct Node {
    int id;
    vector<Node*> towards;
    int inputDegree;
} Node;

void topological_sort(vector<Node*> nodes) {
    queue<Node*> q;
    for(int i = 0 ; i < nodes.size() ; i++) {  // 진입 차수가 처음부터 0인 루트들을 큐에 삽입
        if(nodes[i]->inputDegree == 0) {
            q.push(nodes[i]);
        }
    }
    while(!q.empty()) {
        Node* node = q.front();
        q.pop();
        cout << node->id << " ";
        for(int i = 0 ; i < node->towards.size() ; i++) {  // 연결을 끊음
            node->towards[i]->inputDegree--;
            if(node->towards[i]->inputDegree == 0) {  // 연결이 모두 끊어진 노드는 즉시 큐에 삽입
                q.push(node->towards[i]);
            }
        }
    }
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    int n, m;
    cin >> n >> m;
    vector<Node*> nodes;
    for(int i = 0 ; i < n ; i++) {
        Node* node = new Node();
        node->id = i + 1;
        node->inputDegree = 0;
        nodes.push_back(node);
    }
    // input
    int from, to;
    for(int i = 0 ; i < m ; i++) {
        cin >> from >> to;
        from--; to--;  // 0-based index
        nodes[from]->towards.push_back(nodes[to]);
        nodes[to]->inputDegree++;
    }

    topological_sort(nodes);
}
```

<br>

## Silver
### [1359][def2]

- 보너스 문제

```c++
#include <iostream>
#include <iomanip>
using namespace std;

// nCm
double combination(double n, double m) {
    double upper = 1.0;
    double lower = 1.0;
    for(int i = n ; i > n - m ; i--) {
        upper *= i;
    }
    for(int i = m ; i > 0 ; i--) {
        lower *= i;
    }
    return upper / lower;
}

int main() {
    double n, m, k;
    cin >> n >> m >> k;
    double upper = 0.0;
    double lower = 0.0;
    for(int i = k ; i <= m ; i++) {
        upper += combination(m, i) * combination(n - m, m - i);
    }
    lower = combination(n, m);
    cout << fixed << setprecision(16) << upper / lower;
}
```

[def]: https://www.acmicpc.net/problem/2252
[def2]: https://www.acmicpc.net/problem/1359