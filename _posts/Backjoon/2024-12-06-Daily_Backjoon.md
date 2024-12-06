---
layout: post
title: "[데일리 백준] 3584"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-12-06
last_modified_at: 2024-12-06
---
## Gold
### [3584][def]

```c++
#include <iostream>
#include <vector>
using namespace std;

typedef struct Node {
    int parent = 0;
    int depth;
    vector<Node*> children;
} Node;

void setDepth(Node* node, int& maxDepth) {
    maxDepth = max(maxDepth, node->depth);
    for(Node* child : node->children) {
        child->depth = node->depth + 1;
        setDepth(child, maxDepth);
    }
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    int t;
    cin >> t;
    while(t--) {
        int n;
        cin >> n;
        vector<Node> tree(n+1);
        int from, to;
        for(int i = 0 ; i < n-1 ; i++) {
            cin >> from >> to;
            tree[to].parent = from;
            tree[from].children.push_back(&tree[to]);
        }
        // root 찾기 & depth 계산
        Node* root;
        for(int i = 1 ; i <= n ; i++) {
            if(!tree[i].parent) {
                root = &tree[i];
                break;
            }
        }
        root->depth = 0;
        int maxDepth = 0;
        setDepth(root, maxDepth);
        // get LCA
        int a, b;
        cin >> a >> b;
        if(tree[a].depth < tree[b].depth) swap(a, b);  // a is deeper
        while(tree[a].depth != tree[b].depth) a = tree[a].parent;
        while(a != b) {
            a = tree[a].parent;
            b = tree[b].parent;
        }
        cout << a << '\n';
    }
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- LCA (Lowest Common Ancestor) 문제.  

- 노드 개수가 많지 않기 때문에 희소행렬 구현까지 갈 필요는 없다.  

</div>
</details>

[def]: https://www.acmicpc.net/problem/3584