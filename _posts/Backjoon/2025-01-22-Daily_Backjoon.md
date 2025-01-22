---
layout: post
title: "[데일리 백준] 2022"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-01-22
last_modified_at: 2025-01-22
---
## Gold
### [2022][def]

```c++
#include <iostream>
#include <cmath>
using namespace std;

int main() {
    double a, b, c;
    cin >> a >> b >> c;
    double min = 0; double max = std::min(a, b);
    double x;
    while(1) {
        x = (min + max) / 2;
        double left1 = c / sqrt(b*b - x*x);
        double left2 = c / sqrt(a*a - x*x);
        if(abs(left1 + left2 - 1.0) < 1e-9) break;
        if(left1 + left2 >= 1.0) {
            max = x;
            continue;
        }
        min = x;
    }
    cout << x;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 재밌는 수학 문제 2

- 오차를 계산할 땐 절댓값으로 !!

</div>
</details>

[def]: https://www.acmicpc.net/problem/2022