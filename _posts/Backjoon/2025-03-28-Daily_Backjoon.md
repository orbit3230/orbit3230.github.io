---
layout: post
title: "[데일리 백준] 16940"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-03-28
last_modified_at: 2025-03-28
---
## Gold
### [16940][def]

```c++
#include <iostream>
#include <vector>
#include <unordered_set>
#include <queue>
#include <algorithm>
using namespace std;

typedef unordered_set<int> Node;

bool bfs_verify(vector<Node>& nodes, vector<int>& order, int n) {
    if(order[0] != 0) return false;
    queue<Node*> q;
    q.push(&nodes[order[0]]);
    vector<bool> visited(n, false);
    visited[order[0]] = true;
    int index = 0;
    int next = order[++index];
    while(!q.empty()) {
        Node* current = q.front();
        q.pop();
        // delete visited
        for(auto it = current->begin() ; it != current->end() ; ) {
            if(visited[*it]) {
                it = current->erase(it);
                continue;
            }
            it++;
        }
        while(!current->empty()) {
            if(current->find(next) == current->end()) return false;
            q.push(&nodes[next]);
            visited[next] = true;
            current->erase(next);
            if(++index == n) return true;
            next = order[index];
        }
    }
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
    cout << bfs_verify(nodes, order, n);
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- BFS Verification

- Interesting problem.

- `iterator`를 사용하여 순회하며 `erase` 하는 방법
  - `erase` 시 : `iterator`를 `erase` 함수의 리턴 값으로 갱신
  - not `erase` 시 : `iterator` 증가  

</div>
</details>

[def]: https://www.acmicpc.net/problem/16940