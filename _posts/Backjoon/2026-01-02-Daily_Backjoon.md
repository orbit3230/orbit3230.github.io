---
layout: post
title: "[데일리 백준] 1446"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2026-01-02
last_modified_at: 2026-01-02
---
## Silver
### [1446][def]

```c++
#include <iostream>
#include <vector>
#include <queue>
#define INF INT32_MAX >> 1
using namespace std;

struct Shortcut {
    int from;
    int to;
    int distance;
};
struct Position {
    vector<Shortcut*> sideways;
    int index;
    int step = INF;
};

void bfs(vector<Position>& highway, int d) {
    queue<Position*> q;
    q.push(&highway[0]);
    highway[0].step = 0;
    while(!q.empty()) {
        Position* p = q.front();
        q.pop();
        if(p->index == d) continue;
        Position* next = &highway[p->index+1];
        if(p->step+1 < next->step) {
            next->step = p->step+1;
            q.push(next);
        }
        for(Shortcut* sideway : p->sideways) {
            Position* next = &highway[sideway->to];
            if(p->step+sideway->distance < next->step) {
                next->step = p->step+sideway->distance;
                q.push(next);
            }
        }
    }
}

int main() {
    int n, d;
    cin >> n >> d;
    vector<Position> highway(d+1);
    for(int i = 0 ; i <= d ; i++) highway[i].index = i;
    vector<Shortcut> shortcuts(n);
    for(int i = 0 ; i < n ; i++) {
        cin >> shortcuts[i].from >> shortcuts[i].to >> shortcuts[i].distance;
        if(shortcuts[i].to > d || shortcuts[i].from > d) continue;
        highway[shortcuts[i].from].sideways.push_back(&shortcuts[i]);
    }
    bfs(highway, d);
    cout << highway[d].step;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- BFS

</div>
</details>

[def]: https://www.acmicpc.net/problem/1446