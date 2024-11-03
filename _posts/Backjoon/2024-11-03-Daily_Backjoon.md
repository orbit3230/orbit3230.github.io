---
layout: post
title: "[데일리 백준] 1931"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-11-03
last_modified_at: 2024-11-03
---
## Silver
### [1931][def]

```c++
#include <iostream>
#include <queue>
using namespace std;

typedef struct Meeting {
    int start;
    int end;
    bool operator<(const Meeting& other) const {
        if(this->end == other.end) return this->start > other.start;
        return this->end > other.end;
    }
} Meeting;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);

    int n;
    cin >> n;
    priority_queue<Meeting> pq;
    for(int i = 0 ; i < n ; i++) {
        Meeting m;
        cin >> m.start >> m.end;
        pq.push(m);
    }
    int time = INT32_MIN;
    int count = 0;
    while(!pq.empty()) {
        Meeting m = pq.top();
        pq.pop();
        if(m.start >= time) {
            count++;
            time = m.end;
        }
    }
    cout << count;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 그리디 알고리즘.

- 정렬의 기준을 회의의 끝 시간으로 해야한다는 점에서 발상이 독특하다.  

</div>
</details>

[def]: https://www.acmicpc.net/problem/1931