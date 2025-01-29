---
layout: post
title: "[데일리 백준] 1374"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-01-29
last_modified_at: 2025-01-29
---
## Gold
### [1374][def]

```c++
#include <iostream>
#include <queue>
using namespace std;

typedef struct Lecture {
    int index;
    int from;
    int to;
    bool operator<(const Lecture& other) const {
        return this->from > other.from;
    }
} Lecture;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);

    int n;
    cin >> n;
    priority_queue<Lecture> lectures;
    while(n--) {
        Lecture l;
        cin >> l.index >> l.from >> l.to;
        lectures.push(l);
    }
    int max_count = 0;
    priority_queue<int, vector<int>, greater<int>> endTimeQueue;
    while(!lectures.empty()) {
        Lecture lecture = lectures.top();
        lectures.pop();
        endTimeQueue.push(lecture.to);
        while(!endTimeQueue.empty() && endTimeQueue.top() <= lecture.from) {
            endTimeQueue.pop();
        }
        max_count = max(max_count, (int)endTimeQueue.size());
    }
    cout << max_count;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 그리디 알고리즘

</div>
</details>

[def]: https://www.acmicpc.net/problem/1374