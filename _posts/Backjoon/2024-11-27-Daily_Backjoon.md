---
layout: post
title: "[데일리 백준] 14725"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-11-27
last_modified_at: 2024-11-27
---
## Gold
### [14725][def]

```c++
#include <iostream>
#include <set>
using namespace std;

typedef struct Node {
    string name = "";
    set<Node> children;
    bool operator<(const Node& other) const {
        return this->name < other.name;
    }
} Node;

void dfs(const Node& tree, int depth) {
    for(int i = 1 ; i < depth ; i++) cout << "--";
    if(depth != 0) cout << tree.name << '\n';
    set<Node>::iterator iterator = tree.children.begin();
    while(iterator != tree.children.end()) {
        dfs((*iterator), depth+1);
        iterator++;
    }
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    int n;
    cin >> n;
    Node tree;
    Node* current;
    while(n--) {
        int k;
        cin >> k;
        string name;
        current = &tree;
        while(k--) {
            cin >> name;
            Node temp;
            temp.name = name;
            set<Node>::iterator iterator = current->children.find(temp);
            if(iterator == current->children.end()) {  // new Node
                current->children.insert(temp);
                iterator = current->children.find(temp);
            }
            current = const_cast<Node*>(&(*iterator));  // non-safe but ...
        }
    }
    dfs(tree, 0);
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 트라이 활용 문제.

- set 자료구조를 자주 사용하지는 않았더니, iterator에 다소 미숙했다.  

- iteartor를 역참조하면 `const` 타입으로 감싸져 들어있다!
  - `const`를 제거하려면 `const_cast`를 통해 강제 형변환 해주어야 한다.  

</div>
</details>

[def]: https://www.acmicpc.net/problem/14725