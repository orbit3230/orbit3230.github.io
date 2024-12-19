---
layout: post
title: "[데일리 백준] 1904"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-12-19
last_modified_at: 2024-12-19
---
## Silver
### [1904][def]

```c++
#include <iostream>
#define DIV 15746
using namespace std;

int fibonacci(int n) {
    int nMinus1 = 1;
    int nMinus2 = 1;
    int temp;
    for(int i = 2 ; i <= n ; i++) {
        temp = nMinus1;
        nMinus1 = (nMinus1 + nMinus2) % DIV;
        nMinus2 = temp;
    }
    return nMinus1;
}

int main() {
    int n;
    cin >> n;
    cout << fibonacci(n);
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- Dynamic Programming

- 점화식은 피보나치 수열

</div>
</details>

[def]: https://www.acmicpc.net/problem/1904