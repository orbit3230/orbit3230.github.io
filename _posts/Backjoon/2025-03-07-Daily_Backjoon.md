---
layout: post
title: "[데일리 백준] 13904"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-03-07
last_modified_at: 2025-03-07
---
## Gold
### [13904][def]

```c++
#include <iostream>
#include <queue>
#include <vector>
using namespace std;

typedef struct Task {
    int deadline;
    int value;
    bool operator<(const Task& t) const {
        return this->value < t.value;
    }
} Task;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);

    int n;
    cin >> n;
    priority_queue<Task> pq;
    while(n--) {
        Task t;
        cin >>  t.deadline >> t.value;
        pq.push(t);
    }
    vector<int> task_plans(1001, 0);  // 1-based index
    while(!pq.empty()) {
        Task t = pq.top();
        pq.pop();
        for(int i = t.deadline ; i > 0 ; i--) {
            if(!task_plans[i]) {
                task_plans[i] = t.value;
                break;
            }
        }
    }
    int sum = 0;
    for(int task_plan : task_plans) sum += task_plan;
    cout << sum;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- Greedy Algorithm - Deadline Scheduling Remind

- Value 순으로 정렬 후 날짜 vector를 사용하여 가능한 뒷 인덱스 부터 부여하는 아이디어 기억하기  

</div>
</details>

[def]: https://www.acmicpc.net/problem/13904