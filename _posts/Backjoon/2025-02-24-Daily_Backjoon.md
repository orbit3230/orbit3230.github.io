---
layout: post
title: "[데일리 백준] 13241"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-02-24
last_modified_at: 2025-02-24
---
## Silver
### [13241][def]

```c++
#include <iostream>
using namespace std;

int main() {
    long long a, b;
    cin >> a >> b;
    long long gcd;
    long long a_ = a ; long long b_ = b;
    while(a % b) {
        long long temp = a % b;
        a = b;
        b = temp;
    }
    gcd = b;
    cout << a_ * b_ / gcd;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 최소공배수(유클리드 호제법, 날먹)

</div>
</details>

[def]: https://www.acmicpc.net/problem/13241