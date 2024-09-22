---
layout: post
title: "[데일리 백준] 17612"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-09-22
last_modified_at: 2024-09-22
---
## Gold
### [17612][def]

```c++
#include <iostream>
#include <queue>
#include <vector>
using namespace std;

typedef struct Member {
    int id;
    int w;
} Member;

typedef struct Employee {
    int index;
    Member current;
    int time;
    bool operator<(const Employee& other) const {
        if (this->time == other.time) {
            return this->index < other.index;
        }
        return this->time > other.time;
    }
} Employee;

typedef struct EndedMember {
    int id;
    int employee_index;
    int ended_time;
    bool operator<(const EndedMember& other) const {
        if (this->ended_time == other.ended_time) {
            return this->employee_index > other.employee_index;
        }
        return this->ended_time > other.ended_time;
    }
} EndedMember;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    int n, k;
    cin >> n >> k;
    priority_queue<Employee> pq;
    priority_queue<EndedMember> ended;
    for (int i = 0; i < k; i++) {  // 빈 계산대 먼저 세팅
        Employee e;
        e.index = i;
        e.current = {0, 0};
        e.time = 0;
        pq.push(e);
    }
    // 투입 시작
    for (int i = 0; i < n; i++) {
        Member m;
        cin >> m.id >> m.w;
        Employee e = pq.top();
        pq.pop();
        if (e.current.id != 0) {  // 계산 완료한 사람 정보 저장
            EndedMember em;
            em.id = e.current.id;
            em.employee_index = e.index;
            em.ended_time = e.time;
            ended.push(em);
        }
        e.current = m;
        e.time += m.w;
        pq.push(e);
    }
    // 계산대 별 마지막 계산
    while (!pq.empty()) {  // 계산 완료한 사람 정보 저장
        Employee e = pq.top();
        pq.pop();
        if (e.current.id != 0) {
            EndedMember em;
            em.id = e.current.id;
            em.employee_index = e.index;
            em.ended_time = e.time;
            ended.push(em);
        }
    }
    // 투입 종료, 결과 정산
    long long result = 0;
    int index = 1;
    while (!ended.empty()) {
        EndedMember em = ended.top();
        ended.pop();
        result += (long long)em.id * index;
        index++;
    }
    cout << result;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 우선순위 큐를 적절히 사용하는 문제.

- 구현이 꽤나 빡셌다.

</div>
</details>

[def]: https://www.acmicpc.net/problem/17612