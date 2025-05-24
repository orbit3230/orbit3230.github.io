---
layout: post
title: "[데일리 백준] 15624"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-05-24
last_modified_at: 2025-05-24
---
## Silver
### [15624][def]

```c++
#include <iostream>
#define DIV 1000000007
using namespace std;

int main() {
    int n;
    cin >> n;
    long long nMinus1 = 0;
    long long nMinus2 = 1;
    if(n == 0) {
        cout << 0;
        return 0;
    }
    if(n == 1) {
        cout << 1;
        return 0;
    }
    for(int i = 1; i <= n; i++) {
        long long temp = (nMinus1 + nMinus2) % DIV;
        nMinus2 = nMinus1;
        nMinus1 = temp;
    }
    cout << nMinus1;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 피보나치 수열 (날먹)

</div>
</details>

[def]: https://www.acmicpc.net/problem/15624