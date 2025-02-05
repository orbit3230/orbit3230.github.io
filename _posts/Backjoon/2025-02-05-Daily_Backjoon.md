---
layout: post
title: "[데일리 백준] 10216"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-02-05
last_modified_at: 2025-02-05
---
## Gold
### [10216][def]

```c++
#include <iostream>
#include <vector>
using namespace std;

typedef struct Tower {
    int parent;
    int index;
    int x;
    int y;
    int r;
} Tower;

int distance(Tower& t1, Tower& t2) {
    return (t1.x - t2.x) * (t1.x - t2.x) + (t1.y - t2.y) * (t1.y - t2.y);  // power of Distance
}
bool isIntersect(Tower& t1, Tower& t2) {
    return distance(t1, t2) <= (t1.r + t2.r) * (t1.r + t2.r);
}
int find(vector<Tower>& towers, Tower& t) {
    if(t.parent == t.index) return t.index;
    return t.parent = find(towers, towers[t.parent]);
}
void unionFind(vector<Tower>& towers, int rootA, int rootB) {
    towers[rootB].parent = rootA;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    int t;
    cin >> t;
    while(t--) {
        int n;
        cin >> n;
        vector<Tower> towers(n);
        for(int i = 0 ; i < n ; i++) {
            towers[i].parent = towers[i].index = i;
            cin >> towers[i].x >> towers[i].y >> towers[i].r;
        }
        for(int i = 0 ; i < n ; i++) {
            for(int j = i+1 ; j < n ; j++) {
                int rootA = find(towers, towers[i]);
                int rootB = find(towers, towers[j]);
                if(rootA == rootB) continue;
                if(isIntersect(towers[i], towers[j])) unionFind(towers, rootA, rootB);
            }
        }
        int count = 0;
        for(Tower& tower : towers) if(tower.parent == tower.index) count++;
        cout << count << '\n';
    }
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 기하학 + Union Find

</div>
</details>

[def]: https://www.acmicpc.net/problem/10216