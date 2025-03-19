---
layout: post
title: "[데일리 백준] 14583"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-03-19
last_modified_at: 2025-03-19
---
## Gold
### [14583][def]

```c++
#include <iostream>
#include <cmath>
#include <iomanip>
using namespace std;

int main() {
    double v, h;
    cin >> v >> h;
    double a = v*h / (sqrt(v*v + h*h) + v);
    double width = sqrt(v*v + a*a);
    double height = sqrt(v*v + h*h) * a / width;
    cout << fixed << setprecision(2) << width/2 << ' ' << height;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 수학 (도형)  

- 직접 그려보면 합동을 이용해 식이 정리된다.  

</div>
</details>

[def]: https://www.acmicpc.net/problem/14583