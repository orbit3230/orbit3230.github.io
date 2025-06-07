---
layout: post
title: "[데일리 백준] 1735"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-06-07
last_modified_at: 2025-06-07
---
## Silver
### [1735][def]

```c++
#include <iostream>
using namespace std;

int gcd(int a, int b) {
    if(b == 0) return a;
    return gcd(b, a % b);
}

int main() {
    int a_lower, a_upper;
    int b_lower, b_upper;
    cin >> a_upper >> a_lower >> b_upper >> b_lower;
    int upper = (a_upper * b_lower) + (b_upper * a_lower);
    int lower = (a_lower * b_lower);
    int gcd = ::gcd(upper, lower);
    upper /= gcd;
    lower /= gcd;
    cout << upper << ' ' << lower;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- Euclidean Algorithm

</div>
</details>

[def]: https://www.acmicpc.net/problem/1735