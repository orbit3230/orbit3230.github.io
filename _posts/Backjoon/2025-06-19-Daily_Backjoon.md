---
layout: post
title: "[데일리 백준] 15736"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-06-19
last_modified_at: 2025-06-19
---
## Silver
### [15736][def]

```c++
#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    long long base = 1;
    while(base * base <= n) base++;
    cout << base-1;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 정수론 (날먹)

</div>
</details>

[def]: https://www.acmicpc.net/problem/15736