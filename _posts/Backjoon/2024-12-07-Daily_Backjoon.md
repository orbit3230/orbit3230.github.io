---
layout: post
title: "[데일리 백준] 14501"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-12-07
last_modified_at: 2024-12-07
---
## Silver
### [14501][def]

```c++
#include <iostream>
#include <vector>
using namespace std;

typedef struct Task {
    int time;
    int money;
} Task;

int makeDP(vector<Task>& tasks, vector<int>& dpTable, int index, int n) {
    if(dpTable[index] != -1) return dpTable[index];
    Task t = tasks[index];
    if(index + t.time > n) return dpTable[index] = makeDP(tasks, dpTable, index+1, n);
    return dpTable[index] = max(makeDP(tasks, dpTable, index+1, n), makeDP(tasks, dpTable, index+t.time, n) + t.money);
}

int main() {
    int n;
    cin >> n;
    vector<Task> tasks(n);
    for(int i = 0 ; i < n ; i++) cin >> tasks[i].time >> tasks[i].money;
    vector<int> dpTable(n+1, -1);
    dpTable[n] = 0;
    makeDP(tasks, dpTable, 0, n);
    cout << dpTable[0];
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- Dynamic Programming

- 무난한 Top-Down 방식

</div>
</details>

[def]: https://www.acmicpc.net/problem/14501