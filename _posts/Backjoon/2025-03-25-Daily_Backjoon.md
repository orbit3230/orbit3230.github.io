---
layout: post
title: "[데일리 백준] 15486"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-03-25
last_modified_at: 2025-03-25
---
## Gold
### [15486][def]

```c++
#include <iostream>
#include <vector>
using namespace std;

typedef struct Task {
    int time;
    int value;
} Task;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);

    int n;
    cin >> n;
    vector<int> dpTable(n+1, 0);
    for(int time = 0 ; time < n ; time++) {
        Task task;
        cin >> task.time >> task.value;
        dpTable[time] = max((time > 0 ? dpTable[time-1] : 0), dpTable[time]);
        if(time + task.time > n) continue;
        dpTable[time + task.time] = max(dpTable[time + task.time], dpTable[time] + task.value);
    }
    dpTable[n] = max(dpTable[n], dpTable[n-1]);
    cout << dpTable[n];
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- Dynamic Programming

</div>
</details>

[def]: https://www.acmicpc.net/problem/15486