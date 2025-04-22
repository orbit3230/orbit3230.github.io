---
layout: post
title: "[데일리 백준] 1094"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-04-19
last_modified_at: 2025-04-19
---
## Silver
### [1094][def]

```c++
#include <iostream>
using namespace std;

int main() {
    int x;
    cin >> x;
    int mask = 64;
    int count = 0;
    while(mask > 0) {
        count += (x & mask) ? 1 : 0;
        mask >>= 1;
    }
    cout << count;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 비트마스킹 (날먹)

</div>
</details>

[def]: https://www.acmicpc.net/problem/1094