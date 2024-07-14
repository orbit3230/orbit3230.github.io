---
layout: post
title: "[데일리 백준] 11725"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-07-13
last_modified_at: 2024-07-13
---
## Silver
### [11725][def]

```c++
#include <iostream>
#include <queue>
#include <vector>
using namespace std;

typedef struct Node {
    Node* parent;
    int index;
    bool visited;
    vector<Node*> neighbors;
} Node;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    int n;
    cin >> n;
    vector<Node*> nodes(n+1);
    for(int i = 1 ; i <= n ; i++) {
        nodes[i] = new Node();
        nodes[i]->index = i;
        nodes[i]->visited = false;
    }
    for(int i = 1 ; i <= n ; i++) {
        int a, b;
        cin >> a >> b;
        nodes[a]->neighbors.push_back(nodes[b]);
        nodes[b]->neighbors.push_back(nodes[a]);
    }

    // nodes[1] 은 루트 노드이다. 아래로 계속 내려가면서 부모 노드를 설정한다.
    queue<Node*> q;
    q.push(nodes[1]);
    while(!q.empty()) {
        Node* current = q.front();
        q.pop();
        for(Node* neighbor : current->neighbors) {
            if(neighbor->visited) continue;
            neighbor->visited = true;
            neighbor->parent = current;
            q.push(neighbor);
        }
    }

    // 이제 2번 노드부터 마지막 노드까지의 부모 노드를 출력
    for(int i = 2 ; i <= n ; i++) {
        cout << nodes[i]->parent->index << '\n';
    }
}
```

[def]: https://www.acmicpc.net/problem/11725