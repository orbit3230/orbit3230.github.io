---
layout: post
title: "[데일리 백준] 14786"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-04-11
last_modified_at: 2025-04-11
---
## Gold
### [14786][def]

```c++
#include <iostream>
#include <cmath>
#include <iomanip>
using namespace std;

// f(x)
double fx(double x, int a, int b, int c) {
    return a*x + b*sin(x) - c;
}
// f'(x)
double fprimex(double x, int a, int b, int c) {
    return a + b*cos(x);
}

int main() {
    int a, b, c;
    cin >> a >> b >> c;
    double x = 0;
    double f_x, f_primex;
    do {
        f_x = fx(x, a, b, c);
        f_primex = fprimex(x, a, b, c);
        x = x - f_x / f_primex;
    } while(abs(f_x) > 1e-10);
    cout << fixed << setprecision(20) << x;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 이분 탐색으로 해결 불가능한 이유
  - 단조 증가 함수가 아닌 경우가 있다. (위 아래로 요동치는 경우)

- 해결 방법 : 수치해석의 뉴턴-랩슨 방법을 사용

</div>
</details>

[def]: https://www.acmicpc.net/problem/14786