---
layout: post
title: "[데일리 백준] 13116"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-04-17
last_modified_at: 2025-04-17
---
## Silver
### [13116][def]

```c++
#include <iostream>
#include <vector>
using namespace std;

typedef struct Node {
    int index;
    int depth;
    Node* parent;
} Node;

int lca(Node a, Node b) {
    // a is always deeper
    if(a.depth < b.depth) swap(a, b);
    while(a.depth != b.depth) a = *a.parent;
    while(a.index != b.index) {
        a = *a.parent;
        b = *b.parent;
    }
    return a.index;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    int t;
    cin >> t;
    vector<Node> tree(1024);
    int depth = 0;
    int base = 1;
    for(int i = 1 ; i < 1024 ; i++) {
        tree[i].index = i;
        if(base <= i) {
            depth++;
            base <<= 1;
        }
        tree[i].depth = depth;
        tree[i].parent = &tree[i>>1];
    }
    while(t--) {
        int a, b;
        cin >> a >> b;
        cout << lca(tree[a], tree[b])*10 << '\n';
    }
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- LCA (easy)

</div>
</details>

[def]: https://www.acmicpc.net/problem/13116