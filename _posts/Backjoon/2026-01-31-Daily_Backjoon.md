---
layout: post
title: "[데일리 백준] 1057"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2026-01-31
last_modified_at: 2026-01-31
---
## Silver
### [1057][def]

```c++
#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n, a, b;
    cin >> n >> a >> b;
    int round = 0;
    while(a != b) {
        a = (a+1) >> 1;
        b = (b+1) >> 1;
        round++;
    }
    cout << round;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- BruteForce

</div>
</details>

[def]: https://www.acmicpc.net/problem/1057