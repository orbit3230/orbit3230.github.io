---
layout: post
title: "[데일리 백준] 1781"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-12-13
last_modified_at: 2024-12-13
---
## Gold
### [1781][def]

```c++
#include <iostream>
#include <vector>
#include <queue>
#include <algorithm>
using namespace std;

typedef struct Task {
    int deadline;
    int bonus;
    bool operator<(const Task& other) const {
        return this->bonus > other.bonus;
    }
} Task;

bool compare(const Task& t1, const Task& t2) {
    if(t1.deadline == t2.deadline) return t1.bonus > t2.bonus;
    return t1.deadline < t2.deadline;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);

    int n;
    cin >> n;
    vector<Task> tasks(n);
    Task t;
    for(int i = 0 ; i < n ; i++) cin >> tasks[i].deadline >> tasks[i].bonus;
    sort(tasks.begin(), tasks.end(), compare);

    priority_queue<Task> selected;
    Task* task = &tasks[0];
    selected.push(*task);
    int time = 1;  // 선택한 Task의 개수 카운팅
    int sum = task->bonus;
    for(int i = 1 ; i < n ; i++) {
        t = *(task+i);
        // 수행 가능.
        int newBonus = t.bonus;
        if(time < t.deadline) {
            selected.push(t);
            sum += newBonus;
            time++;
            continue;
        }
        // 수행 불가능. 덜 쓸모있는 Task 탐색
        int minBonus = selected.top().bonus;
        if(minBonus < newBonus) {
            sum += (newBonus - minBonus);
            selected.pop();
            selected.push(t);
        }
    }
    cout << sum;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- Greedy Algorithm.

- 데드라인이 가까우면서 밸류가 높은 Task를 Greedy하게 선택하되,  
탐색을 진행하며 다른 Task를 선택하는 것이 더 효율적이라면 이를 우선순위 큐를 사용해 빼주는 것이 핵심이었다.  

</div>
</details>

[def]: https://www.acmicpc.net/problem/1781