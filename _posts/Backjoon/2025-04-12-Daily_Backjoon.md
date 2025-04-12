---
layout: post
title: "[데일리 백준] 19598"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-04-12
last_modified_at: 2025-04-12
---
## Gold
### [19598][def]

```c++
#include <iostream>
#include <queue>
using namespace std;

typedef struct Meeting {
    int start;
    int end;
} Meeting;

typedef struct CompareStart {
    bool operator()(const Meeting* m1, const Meeting* m2) {
        return m1->start > m2->start;
    }
} CompareStart;
typedef struct CompareEnd {
    bool operator()(const Meeting* m1, const Meeting* m2) {
        return m1->end > m2->end;
    }
} CompareEnd;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);

    int n;
    cin >> n;

    priority_queue<Meeting*, vector<Meeting*>, CompareStart> startQ;
    priority_queue<Meeting*, vector<Meeting*>, CompareEnd> endQ;
    while(n--) {
        Meeting* meeting = new Meeting;
        cin >> meeting->start >> meeting->end;
        startQ.push(meeting);
    }
    int max = 0;
    while(!startQ.empty()) {
        Meeting* meeting = startQ.top();
        startQ.pop();
        endQ.push(meeting);
        while(!endQ.empty() && endQ.top()->end <= meeting->start) endQ.pop();
        max = std::max(max, (int)endQ.size());
    }
    cout << max;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- Greedy + Priority Queue + Sweeping

</div>
</details>

[def]: https://www.acmicpc.net/problem/19598