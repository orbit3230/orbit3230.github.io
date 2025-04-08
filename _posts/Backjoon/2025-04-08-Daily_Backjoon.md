---
layout: post
title: "[데일리 백준] 16964"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-04-08
last_modified_at: 2025-04-08
---
## Gold
### [16964][def]

```c++
#include <iostream>
#include <vector>
#include <unordered_set>
#include <algorithm>
using namespace std;

typedef unordered_set<int> Node;

bool dfs_verify(vector<Node>& nodes, vector<int>& order, int& order_index, int n, vector<bool>& visited) {
    Node* current = &nodes[order[order_index]];
    // delete visited
    for(auto it = current->begin() ; it != current->end() ; ) {
        if(visited[*it]) {
            it = current->erase(it);
            continue;
        }
        it++;
    }
    while(!current->empty()) {
        if(++order_index == n) return true;
        int next = order[order_index];
        if(current->find(next) == current->end()) return false;
        visited[next] = true;
        current->erase(next);
        if(!dfs_verify(nodes, order, order_index, n, visited)) return false;
    }
    return true;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    
    int n;
    cin >> n;
    vector<Node> nodes(n);
    int from, to;
    for(int i = 0 ; i < n-1 ; i++) {
        cin >> from >> to;
        from--; to--;  // 0-based index
        nodes[from].insert(to);
        nodes[to].insert(from);
    }
    vector<int> order(n);
    for(int i = 0 ; i < n ; i++) {
        cin >> order[i];
        order[i]--;  // 0-based index
    }
    vector<bool> visited(n, false);
    int order_index = 0;
    visited[order[order_index]] = true;
    cout << (order[order_index] != 0 ? false : dfs_verify(nodes, order, order_index, n, visited));
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- [백준 16940](https://www.acmicpc.net/problem/16940) 문제의 DFS 버전

</div>
</details>

[def]: https://www.acmicpc.net/problem/16964