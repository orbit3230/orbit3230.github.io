---
layout: post
title: "[데일리 백준] 13023"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-10-09
last_modified_at: 2024-10-09
---
## Gold
### [13023][def]

```c++
#include <iostream>
#include <vector>
using namespace std;

typedef struct Node {
    vector<int> neighbors;
    bool visited = false;
} Node;

bool reach5(vector<Node>& nodes, int i, int step) {
    if(step == 5) return true;
    Node& node = nodes[i];
    node.visited = true;
    for(int neighbor : node.neighbors) {
        if(!nodes[neighbor].visited) {
            if(reach5(nodes, neighbor, step+1)) return true;
        }
    }
    node.visited = false;
    return false;
}
void visitReset(vector<Node>& nodes) {
    for(Node& node : nodes) {
        node.visited = false;
    }
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);

    int n, m;
    cin >> n >> m;
    vector<Node> nodes(n);
    int from, to;
    for(int i = 0 ; i < m ; i++) {
        cin >> from >> to;
        nodes[from].neighbors.push_back(to);
        nodes[to].neighbors.push_back(from);
    }
    for(int i = 0 ; i < n ; i++) {
        if(reach5(nodes, i, 1)) {
            cout << 1;
            return 0;
        }
        visitReset(nodes);
    }
    cout << 0;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- DFS + 백트래킹

- DFS에서 리턴값을 정하는 일은 언제나 헷갈린다.  

- 파라미터 복사보다는, 레퍼런스 + 백트래킹.

</div>
</details>

[def]: https://www.acmicpc.net/problem/13023