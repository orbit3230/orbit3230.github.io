---
layout: post
title: "[데일리 백준] 18110"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-04-10
last_modified_at: 2024-04-10
---
## Silver
### [18110][def]

```c++
#include <iostream>
#include <vector>
#include <algorithm>
#include <math.h>

int main() {
    int n;
    std::cin >> n;
    if (n == 0) {
        std::cout << 0;
        return 0;
    }

    std::vector<int> scores(n);
    for(int i = 0 ; i < n ; i++) {
        std::cin >> scores[i];
    }
    std::sort(scores.begin(), scores.end());

    int exclusion = round(n * 0.15);
    int sum = 0;
    for(int i = exclusion ; i < n - exclusion ; i++) {
        sum += scores[i];
    }

    std::cout << round((double)sum / (n - 2 * exclusion));
}
```

[def]: https://www.acmicpc.net/problem/18110