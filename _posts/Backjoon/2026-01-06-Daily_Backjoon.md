---
layout: post
title: "[데일리 백준] 1326"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2026-01-06
last_modified_at: 2026-01-06
---
## Silver
### [1326][def]

```c++
#include <iostream>
#include <vector>
#include <queue>
#define INF INT32_MAX >> 1
using namespace std;

struct Stone {
    int index;
    int multiple;
    int step = INF;
};

void bfs(vector<Stone>& stones, int n, int start, int end) {
    queue<Stone*> q;
    q.push(&stones[start]);
    stones[start].step = 0;
    while(!q.empty()) {
        Stone* stone = q.front();
        q.pop();
        if(stone->index == end) return;
        // backward
        for(int i = stone->index ; i >= 0 ; i -= stone->multiple) {
            Stone* next = &stones[i];
            if(stone->step+1 < next->step) {
                next->step = stone->step+1;
                q.push(next);
            }
        }
        // forward
        for(int i = stone->index ; i < n ; i += stone->multiple) {
            Stone* next = &stones[i];
            if(stone->step+1 < next->step) {
                next->step = stone->step+1;
                q.push(next);
            }
        }
    }
}

int main() {
    int n;
    cin >> n;
    vector<Stone> stones(n);
    for(int i = 0 ; i < n ; i++) {
        stones[i].index = i;
        cin >> stones[i].multiple;
    }
    int a, b;
    cin >> a >> b;
    a--; b--;  // 0-based index
    bfs(stones, n, a, b);
    cout << (stones[b].step == INF ? -1 : stones[b].step);
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- BFS

</div>
</details>

[def]: https://www.acmicpc.net/problem/1326