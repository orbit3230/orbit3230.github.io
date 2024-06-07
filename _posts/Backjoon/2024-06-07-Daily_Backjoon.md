---
layout: post
title: "[데일리 백준] 11726"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-06-07
last_modified_at: 2024-06-07
---
## Silver
### [11726][def]

```c++
#include <iostream>
using namespace std;

// 이 문제가 결국 왜 피보나치일까?
int fibonacci(int n) {
    int nMinus2 = 1;
    int nMinus1 = 1;
    int nextFibo = 1;
    for(int i = 2 ; i <= n ; i++) {
        nextFibo = (nMinus2 + nMinus1) % 10007;
        nMinus2 = nMinus1;
        nMinus1 = nextFibo;
    }
    return nextFibo;
}

int main() {
    int n;
    cin >> n;

    cout << fibonacci(n);
}
```

[def]: https://www.acmicpc.net/problem/11726