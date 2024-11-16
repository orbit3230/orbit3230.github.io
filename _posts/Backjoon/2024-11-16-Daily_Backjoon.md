---
layout: post
title: "[데일리 백준] 11437, 11438"
excerpt: "1 Platinum, 1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-11-16
last_modified_at: 2024-11-16
---
## Gold, Platinum
### [11437][def], [11438][def2]

```c++
#include <iostream>
#include <vector>
using namespace std;

typedef struct Node {
    int index;
    int depth;
    Node* parent;
    vector<Node*> connected;
    bool visited = false;
} Node;

void makeTree(Node& n, int& max_depth) {
    n.visited = true;
    max_depth = max(max_depth, n.depth);
    for(Node* child : n.connected) {
        if(child->visited) continue;
        child->depth = n.depth + 1;
        child->parent = &n;
        makeTree(*child, max_depth);
    }
}
void fillSparse(vector<Node>& tree, vector<vector<int>>& sparse, int k, int n) {
    for(int i = 1 ; i < n ; i++) sparse[0][i] = tree[i].parent->index;
    for(int i = 1 ; i < k ; i++) {
        for(int j = 0 ; j < n ; j++) {
            sparse[i][j] = sparse[i-1][sparse[i-1][j]];
        }
    }
}
int findLCA(vector<Node>& tree, vector<vector<int>>& sparse, int a, int b, int k, int n) {
    if(tree[a].depth < tree[b].depth) swap(a, b);  // 항상 a의 depth가 bigger
    int diff = tree[a].depth - tree[b].depth;
    for(int i = 0 ; i < k ; i++) {  // depth를 빠르게 맞추는 방법
        if(diff & (1 << i)) a = sparse[i][a];
    }
    for(int i = k-1 ; i >= 0 ; i--) {  // LCA를 빠르게 찾는 방법
        if(sparse[i][a] != sparse[i][b]) {
            a = sparse[i][a];
            b = sparse[i][b];
        }
    }
    return (a == b) ? a : tree[a].parent->index;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    int n;
    cin >> n;
    vector<Node> tree(n);
    for(int i = 0 ; i < n ; i++) tree[i].index = i;
    tree[0].depth = 0;
    tree[0].parent = nullptr;
    int a, b;
    for(int i = 0 ; i < n-1; i++) {
        cin >> a >> b;
        a--; b--;  // 0-based index
        tree[a].connected.push_back(&tree[b]);
        tree[b].connected.push_back(&tree[a]);
    }
    int max_depth = 0;
    makeTree(tree[0], max_depth);
    int k = 0;
    while((1 << k) < max_depth) k++;
    vector<vector<int>> sparse(k, vector<int>(n, -1));
    fillSparse(tree, sparse, k, n);
    int m;
    cin >> m;
    for(int i = 0 ; i < m ; i++) {
        cin >> a >> b;
        a--; b--;  // 0-based index
        cout << findLCA(tree, sparse, a, b, k, n)+1 << '\n';
    }
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 최소 공통 조상(LCA) 문제 - `O(NlogN + MlogN)` 풀이

  - 핵심 1 : 희소 행렬(Sparse Table) 생성으로 2^n 번째 부모만 저장

  - 핵심 2 : 두 노드의 depth를 맞출 때 depth의 차이를 이용하여 빠르게 맞추기

  - 핵심 3 : LCA를 찾을 때 희소행렬을 이용하여 건너뛰면서 logN 만큼 빠르게 찾기 

</div>
</details>

[def]: https://www.acmicpc.net/problem/11437
[def2]: https://www.acmicpc.net/problem/11438