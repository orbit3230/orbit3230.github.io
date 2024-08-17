---
layout: post
title: "[데일리 백준] 15681"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-08-17
last_modified_at: 2024-08-17
---
## Gold
### [15681][def]

```c++
#include <iostream>
#include <vector>
using namespace std;

typedef struct Node {
    int index;
    bool visited;
    vector<Node*> neighbors;
    vector<Node*> children;
    int children_size;
} Node;

int dfs_search(Node* parent) {
    parent->visited = true;
    vector<Node*> children;
    int children_size = 1;
    for(Node* neighbor : parent->neighbors) {
        if(neighbor->visited) continue;
        parent->children.push_back(neighbor);
        children_size += dfs_search(neighbor);
    }
    parent->children_size = children_size;
    return children_size;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    int n, r, q;
    cin >> n >> r >> q;
    vector<Node*> nodes;
    for(int i = 0 ; i < n ; i++) {
        Node* node = new Node();
        node->index = i;  // 0-based index
        node->visited = false;
        nodes.push_back(node);
    }
    int u, v;
    for(int i = 0 ; i < n-1 ; i++) {
        cin >> u >> v;
        u--; v--;  // 0-based index
        nodes[u]->neighbors.push_back(nodes[v]);
        nodes[v]->neighbors.push_back(nodes[u]);
    }

    // re-calculate children based on root node
    r--;  // 0-based index
    dfs_search(nodes[r]);

    for(int i = 0 ; i < q ; i++) {
        int u;
        cin >> u;
        u--;  // 0-based index
        cout << nodes[u]->children_size << '\n';
    }
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 벡터를 재귀함수 리턴값으로 넘기는건 너무 무모한 짓 . . .

</div>
</details>

[def]: https://www.acmicpc.net/problem/15681