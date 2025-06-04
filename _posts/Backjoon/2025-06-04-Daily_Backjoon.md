---
layout: post
title: "[데일리 백준] 13909"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-06-04
last_modified_at: 2025-06-04
---
## Silver
### [13909][def]

```c++
#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    int base = 1;
    while(base * base <= n) base++;
    base--;
    cout << base;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- Math

</div>
</details>

[def]: https://www.acmicpc.net/problem/13909