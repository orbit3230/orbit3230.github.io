---
layout: post
title: "[데일리 백준] 2161"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-05-04
last_modified_at: 2025-05-04
---
## Silver
### [2161][def]

```c++
#include <iostream>
#include <queue>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cout.tie(NULL);

    int n;
    cin >> n;
    queue<int> q;
    for(int i = 1 ; i <= n ; i++) q.push(i);
    while(true) {
        cout << q.front() << ' ';
        q.pop();
        if(q.empty()) break;
        q.push(q.front());
        q.pop();
    }
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 큐 (날먹)

</div>
</details>

[def]: https://www.acmicpc.net/problem/2161