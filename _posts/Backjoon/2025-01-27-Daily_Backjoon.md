---
layout: post
title: "[데일리 백준] 14567"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-01-27
last_modified_at: 2025-01-27
---
## Gold
### [14567][def]

```c++
#include <iostream>
#include <vector>
#include <queue>
using namespace std;

typedef struct Node {
    int degree = 0;
    int order;
    vector<Node*> nexts;
} Node;

void topological_sort(queue<Node*>& q) {
    while(!q.empty()) {
        Node* n = q.front();
        q.pop();
        for(Node* next : n->nexts) {
            next->degree--;
            if(!next->degree) {
                next->order = n->order+1;
                q.push(next);
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
    vector<Node> nodes(n);
    int from, to;
    while(m--) {
        cin >> from >> to;
        from--; to--;  // 0-based index
        nodes[from].nexts.push_back(&nodes[to]);
        nodes[to].degree++;
    }
    queue<Node*> q;
    for(Node& n : nodes) {
        if(!n.degree) {
            n.order = 1;
            q.push(&n);
        }
    }
    topological_sort(q);
    for(Node& n : nodes) cout << n.order << ' ';
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 위상 정렬 remind

</div>
</details>

[def]: https://www.acmicpc.net/problem/14567