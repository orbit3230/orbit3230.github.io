---
layout: post
title: "[데일리 백준] 12869"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-07-11
last_modified_at: 2025-07-11
---
## Gold
### [12869][def]

```c++
#include <iostream>
#include <vector>
#include <queue>
using namespace std;

typedef struct SCVS {
    int a = 0;
    int b = 0;
    int c = 0;
} SCVS;

int search(SCVS& scvs) {
    vector<vector<vector<bool>>> visited(scvs.a+1, vector<vector<bool>>(scvs.b+1, vector<bool>(scvs.c+1, false)));
    queue<pair<SCVS, int>> q;
    q.push({scvs, 0});
    visited[scvs.a][scvs.b][scvs.c] = true;
    while(!q.empty()) {
        SCVS current = q.front().first;
        SCVS next;
        int step = q.front().second;
        q.pop();
        if(current.a <= 0 && current.b <= 0 && current.c <= 0) return step;
        // 1
        next = {current.a - 9, current.b - 3, current.c - 1};
        next.a = max(next.a, 0); next.b = max(next.b, 0); next.c = max(next.c, 0);
        if(!visited[next.a][next.b][next.c]) {
            visited[next.a][next.b][next.c] = true;
            q.push({next, step+1});
        }
        // 2
        next = {current.a - 9, current.b - 1, current.c - 3};
        next.a = max(next.a, 0); next.b = max(next.b, 0); next.c = max(next.c, 0);
        if(!visited[next.a][next.b][next.c]) {
            visited[next.a][next.b][next.c] = true;
            q.push({next, step+1});
        }
        // 3
        next = {current.a - 3, current.b - 9, current.c - 1};
        next.a = max(next.a, 0); next.b = max(next.b, 0); next.c = max(next.c, 0);
        if(!visited[next.a][next.b][next.c]) {
            visited[next.a][next.b][next.c] = true;
            q.push({next, step+1});
        }
        // 4
        next = {current.a - 3, current.b - 1, current.c - 9};
        next.a = max(next.a, 0); next.b = max(next.b, 0); next.c = max(next.c, 0);
        if(!visited[next.a][next.b][next.c]) {
            visited[next.a][next.b][next.c] = true;
            q.push({next, step+1});
        }
        // 5
        next = {current.a - 1, current.b - 9, current.c - 3};
        next.a = max(next.a, 0); next.b = max(next.b, 0); next.c = max(next.c, 0);
        if(!visited[next.a][next.b][next.c]) {
            visited[next.a][next.b][next.c] = true;
            q.push({next, step+1});
        }
        // 6
        next = {current.a - 1, current.b - 3, current.c - 9};
        next.a = max(next.a, 0); next.b = max(next.b, 0); next.c = max(next.c, 0);
        if(!visited[next.a][next.b][next.c]) {
            visited[next.a][next.b][next.c] = true;
            q.push({next, step+1});
        }
    }
}

int main() {
    int n;
    cin >> n;
    SCVS scvs;
    for(int i = 0 ; i < n ; i++) cin >> scvs.a >> scvs.b >> scvs.c;
    cout << search(scvs);
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- BFS

</div>
</details>

[def]: https://www.acmicpc.net/problem/12869