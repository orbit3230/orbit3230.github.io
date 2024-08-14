---
layout: post
title: "[데일리 백준] 20040"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-08-14
last_modified_at: 2024-08-14
---
## Gold
### [20040][def]

```c++
#include <iostream>
#include <vector>
using namespace std;

typedef struct Node {
    int setParent;
} Node;

int find(vector<Node*>&nodes, Node* n, int index) {
    if(n->setParent == index)  // 대표값은 setParent가 자기 자신이다.
        return index;
    else
        return find(nodes, nodes[n->setParent], n->setParent);
}

bool unionFind(vector<Node*>&nodes, Node* a, int a_index, Node* b, int b_index) {
    int a_set = find(nodes, a, a_index);  // a가 속한 집합의 대표값
    int b_set = find(nodes, b, b_index);  // b가 속한 집합의 대표값
    if(a_set == b_set) {  // 같은 집합에 속해있는 경우, 사이클이 완성된다는 의미이다.
        return true;
    }
    else {  // 두 집합이 이제부터 같은 집합이 되도록(Union), b 집합의 대표값을 a로 설정하여 합병한다.
        nodes[b_set]->setParent = a_set;
        return false;
    }
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    int n, m;
    cin >> n >> m;
    vector<Node*> nodes;
    for(int i = 0 ; i < n ; i++) {
        Node* node = new Node();
        node->setParent = i;
        nodes.push_back(node);
    }
    int from, to;
    for(int i = 0 ; i < m ; i++) {
        cin >> from >> to;
        if(unionFind(nodes, nodes[from], from, nodes[to], to)) {
            cout << i + 1;
            return 0;
        }
    }
    cout << 0;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 분리 집합에 대하여 제대로 공부해보았고, 내 나름대로의 코드로 재구성해보았다.  

- 분리 집합의 정석이며 나름대로 똑똑한 응용이 필요한 좋은 문제 같다.

</div>
</details>

[def]: https://www.acmicpc.net/problem/20040