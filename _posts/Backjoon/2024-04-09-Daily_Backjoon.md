---
layout: post
title: "[데일리 백준] 2292"
excerpt: "1 Bronze"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-04-09
last_modified_at: 2024-04-09
---
## Bronze
### [2292][def]

```c++
#include <iostream>

int main() {
    int n;
    std::cin >> n;
    int range = 1;
    int i;
    for(i = 0 ; range+6*i < n ; i++) range += 6*i;
    std::cout << i+1;
}
```

[def]: https://www.acmicpc.net/problem/2292