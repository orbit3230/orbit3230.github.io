---
layout: post
title: "[데일리 백준] 13975"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-01-23
last_modified_at: 2025-01-23
---
## Gold
### [13975][def]

```c++
#include <iostream>
#include <queue>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    int t;
    cin >> t;
    while(t--) {
        int k;
        cin >> k;
        priority_queue<long long, vector<long long>, greater<long long>> pq;
        int input;
        while(k--) {
            cin >> input;
            pq.push(input);
        }
        long long sum = 0;
        long long next;
        while(pq.size() != 1) {
            next = pq.top();
            pq.pop();
            next += pq.top();
            pq.pop();
            sum += next;
            pq.push(next);
        }
        cout << sum << '\n';
    }
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 쉬운 그리디 + 우선순위 큐 문제

</div>
</details>

[def]: https://www.acmicpc.net/problem/13975