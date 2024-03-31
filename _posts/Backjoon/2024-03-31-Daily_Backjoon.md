---
layout: post
title: "[데일리 백준] 10872"
excerpt: "1 Bronze"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-03-31
last_modified_at: 2024-03-31
---
## Bronze
### [10872][def]

```java
#include <iostream>
int main() {
    int n;
    int fac = 1;
    std::cin >> n;
    for(int i = n ; i >= 1 ; i--) {
        fac *= i;
    }
    std::cout << fac;
}
```

- 시간 상 날먹 하겠습니다.

[def]: https://www.acmicpc.net/problem/10872