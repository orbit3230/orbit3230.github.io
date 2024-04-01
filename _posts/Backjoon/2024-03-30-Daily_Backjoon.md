---
layout: post
title: "[데일리 백준] 2420"
excerpt: "1 Bronze"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-03-30
last_modified_at: 2024-03-30
---
## Bronze
### [2420][def]

```c++
#include <iostream>

int main() {
    long a, b;
    std::cin >> a;
    std::cin >> b;
    long abs = (a-b > 0) ? a-b : b-a;
    std::cout << abs;
}
```

- 시간 상 날먹 하겠습니다.

[def]: https://www.acmicpc.net/problem/2420