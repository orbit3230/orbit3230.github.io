---
layout: post
title: "[데일리 백준] 1312"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-06-17
last_modified_at: 2025-06-17
---
## Silver
### [1312][def]

```c++
#include <iostream>
using namespace std;

int main() {
    long long a, b, n;
    cin >> a >> b >> n;
    for(int i = 0 ; i < n ; i++) {
        a %= b;
        a *= 10;
    }
    cout << a / b;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 수학 (날먹)

</div>
</details>

[def]: https://www.acmicpc.net/problem/1312