---
layout: post
title: "[데일리 백준] 2457"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-03-09
last_modified_at: 2025-03-09
---
## Gold
### [2457][def]

```c++
#include <iostream>
#include <queue>
using namespace std;

typedef struct Flower {
    int start;
    int end;
    bool operator<(const Flower& other) const {
        return this->start > other.start;
    }
} Flower;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);

    int n;
    cin >> n;
    priority_queue<Flower> pq;
    int m1, d1, m2, d2;
    Flower flower;
    for(int i = 0 ; i < n ; i++) {
        cin >> m1 >> d1 >> m2 >> d2;
        flower.start = m1 * 100 + d1;
        flower.end = m2 * 100 + d2;
        pq.push(flower);
    }
    int time = 301;
    int longest = 0;
    int count = 0;
    while(!pq.empty()) {
        Flower f = pq.top();
        if(f.start > time) {
            if(longest == 0) break;
            time = longest;
            count++;
            if(time > 1130) break;
            longest = 0;
            continue;
        }
        pq.pop();
        longest = max(longest, f.end);
        if(pq.empty()) {
            time = longest;
            count++;
        }
    }
    cout << (time > 1130 ? count : 0);
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- Greedy + Priority Queue

</div>
</details>

[def]: https://www.acmicpc.net/problem/2457