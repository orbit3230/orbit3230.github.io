---
layout: post
title: "[데일리 백준] 15964"
excerpt: "1 Bronze"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-04-07
last_modified_at: 2024-04-07
---
## Bronze
### [15964][def]

```c++
#include <iostream>
int main() {
    long a, b;
    std::cin >> a;
    std::cin >> b;
    long sum = (a+b)*(a-b);
    std::cout << sum;
}
```

- 날먹(시간 부족)

[def]: https://www.acmicpc.net/problem/15964