---
layout: post
title: "[데일리 백준] 13301"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-05-23
last_modified_at: 2025-05-23
---
## Silver
### [13301][def]

```c++
#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    long long nMinus1 = 1;
    long long nMinus2 = 1;
    if(n == 1) {
        cout << 4;
        return 0;
    }
    if(n == 2) {
        cout << 6;
        return 0;
    }
    for(int i = 3; i <= n; i++) {
        long long temp = nMinus1 + nMinus2;
        nMinus2 = nMinus1;
        nMinus1 = temp;
    }
    cout << (nMinus1+nMinus2) * 2 + nMinus1 * 2;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 피보나치 수열 (날먹)

</div>
</details>

[def]: https://www.acmicpc.net/problem/13301