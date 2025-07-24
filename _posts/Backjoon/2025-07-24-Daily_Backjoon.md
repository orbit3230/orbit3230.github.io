---
layout: post
title: "[데일리 백준] 2617"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-07-24
last_modified_at: 2025-07-24
---
## Gold
### [2617][def]

```c++
#include <iostream>
#include <vector>
#include <queue>
using namespace std;

typedef struct Bead {
    int from = 0;
    int to = 0;
    bool visited = false;
    vector<Bead*> nexts;
} Bead;

void visitInit(vector<Bead>& beads) {
    for(Bead& bead : beads) bead.visited = false;
}

void bfs(Bead& bead) {
    queue<Bead*> q;
    q.push(&bead);
    bead.visited = true;
    while(!q.empty()) {
        Bead* current = q.front();
        q.pop();
        for(Bead* next : current->nexts) {
            if(next->visited) continue;
            next->visited = true;
            next->from++;
            bead.to++;
            q.push(next);
        }
    }
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);

    int n, m;
    cin >> n >> m;
    vector<Bead> beads(n);
    int heavier, lighter;
    for(int i = 0 ; i < m ; i++) {
        cin >> heavier >> lighter;
        heavier--; lighter--;  // 0-based index
        beads[lighter].nexts.push_back(&beads[heavier]);
    }
    for(Bead& bead : beads) {
        bfs(bead);
        visitInit(beads);
    }
    int count = 0;
    int threshold = (n+1)>>1;
    for(Bead& bead : beads) {
        if(bead.from >= threshold || bead.to >= threshold) count++;
    }
    cout << count;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- BFS

</div>
</details>

[def]: https://www.acmicpc.net/problem/2617