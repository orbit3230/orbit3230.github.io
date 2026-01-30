---
layout: post
title: "[데일리 백준] 2644"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2026-01-30
last_modified_at: 2026-01-30
---
## Silver
### [2644][def]

```c++
#include <iostream>
#include <vector>
#include <queue>
using namespace std;

struct Person {
    int index;
    vector<Person*> relatives;
};

int bfs(vector<Person>& people, int n, int a, int b) {
    vector<bool> visited(n, false);
    queue<pair<Person*, int>> q;
    q.push({&people[a], 0});
    visited[a] = true;
    while(!q.empty()) {
        Person* p = q.front().first;
        int depth = q.front().second;
        q.pop();
        if(p->index == b) return depth;
        for(Person* relative : p->relatives) {
            if(!visited[relative->index]) {
                visited[relative->index] = true;
                q.push({relative, depth+1});
            }
        }
    }
    return -1;
}

int main() {
    int n;
    cin >> n;
    int a, b;
    cin >> a >> b;
    int m;
    cin >> m;
    vector<Person> people(n);
    for(int i = 0 ; i < n ; i++) people[i].index = i;
    int parent, child;
    for(int i = 0 ; i < m ; i++) {
        cin >> parent >> child;
        parent--; child--;  // 0-based index
        people[parent].relatives.push_back(&people[child]);
        people[child].relatives.push_back(&people[parent]);
    }
    int fromA = bfs(people, n, a-1, b-1);
    int fromB = bfs(people, n, b-1, a-1);
    cout << max(fromA, fromB);
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- BFS

</div>
</details>

[def]: https://www.acmicpc.net/problem/2644