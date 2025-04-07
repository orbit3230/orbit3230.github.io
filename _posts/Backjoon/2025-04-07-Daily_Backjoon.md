---
layout: post
title: "[데일리 백준] 2696"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-04-06
last_modified_at: 2025-04-06
---
## Gold
### [2696][def]

```c++
#include <iostream>
#include <queue>
using namespace std;

void swapTop(priority_queue<int, vector<int>, greater<int>>& minHeap, priority_queue<int>& maxHeap) {
    minHeap.push(maxHeap.top());
    maxHeap.push(minHeap.top());
    minHeap.pop();
    maxHeap.pop();
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    int t;
    cin >> t;
    while(t--) {
        int m;
        cin >> m;
        cout << ((m+1)>>1) << '\n';
        priority_queue<int, vector<int>, greater<int>> minHeap;
        priority_queue<int> maxHeap;
        int next;
        for(int i = 0; i < m; i++) {
            cin >> next;
            minHeap.push(next);
            maxHeap.push(next);
            if(minHeap.top() < maxHeap.top()) swapTop(minHeap, maxHeap);
            if(i && (i % 20 == 0)) cout << '\n';
            if(i % 2 == 0) cout << minHeap.top() << ' ';
        }
        cout << '\n';
    }
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- Priority Queue

</div>
</details>

[def]: https://www.acmicpc.net/problem/2696