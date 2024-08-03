---
layout: post
title: "[데일리 백준] 11403"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-08-03
last_modified_at: 2024-08-03
---
## Silver
### [11403][def]

```c++
#include <iostream>
#include <vector>
#include <queue>
using namespace std;

typedef struct Node {
    int index;
    int step;
    bool visited;
    vector<Node*> forward;
} Node;

void bfs_search(Node* from, Node* to) {
    queue<Node*> q;
    q.push(from);
    Node* current;
    while(!q.empty()) {
        current = q.front();
        q.pop();
        if(current->step != 0 && current->index == to->index) {
            cout << 1;
            return;
        }
        for(Node* next : current->forward) {
            if(next->visited == false) {
                next->step = current->step + 1;
                next->visited = true;
                q.push(next);
            }
        }
    }
    cout << 0;
}

void initialize(vector<Node*>& nodes) {
    for(int i = 0 ; i < nodes.size() ; i++) {
        nodes[i]->step = 0;
        nodes[i]->visited = false;
    }
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    int n;
    cin >> n;
    vector<Node*> nodes(n);
    for(int i = 0 ; i < n ; i++) {
        Node* node = new Node;
        node->index = i;
        node->step = 0;
        node->visited = false;
        nodes[i] = node;
    }
    for(int i = 0 ; i < n ; i++) {
        for(int j = 0 ; j < n ; j++) {
            int way;
            cin >> way;
            if(way == 1) {
                nodes[i]->forward.push_back(nodes[j]);
            }
        }
    }
    for(int i = 0 ; i < n ; i++) {
        Node* from = nodes[i];
        for(int j = 0 ; j < n ; j++) {
            Node* to = nodes[j];
            bfs_search(from, to);
            initialize(nodes);
            cout << ' ';
        }
        cout << '\n';
    }
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 생각보다 BFS도 빠르구나.  

- 전형적인 플로이드-워셜 문제의 표본이라는데, 차후에 기회되면 다시 풀어 볼 생각.

</div>
</details>

[def]: https://www.acmicpc.net/problem/11403