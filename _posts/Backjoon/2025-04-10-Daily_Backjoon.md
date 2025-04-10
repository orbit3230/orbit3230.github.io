---
layout: post
title: "[데일리 백준] 2109"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-04-10
last_modified_at: 2025-04-10
---
## Gold
### [2109][def]

```c++
#include <iostream>
#include <vector>
#include <queue>
using namespace std;

typedef struct Task {
    int value;
    int deadline;
    bool operator<(const Task& other) const {
        if(this->value == other.value) return this->deadline < other.deadline;
        return this->value < other.value;
    }
} Task;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);

    int n;
    cin >> n;
    priority_queue<Task> pq;
    while(n--) {
        Task task;
        cin >> task.value >> task.deadline;
        pq.push(task);
    }
    vector<bool> available(10001, true);
    int sum = 0;
    while(!pq.empty()) {
        Task task = pq.top();
        pq.pop();
        int time = task.deadline;
        while(time > 0) {
            if(available[time]) {
                available[time] = false;
                sum += task.value;
                break;
            }
            time--;
        }
    }
    cout << sum;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- Greedy Algorithm & Priority Queue

</div>
</details>

[def]: https://www.acmicpc.net/problem/2109