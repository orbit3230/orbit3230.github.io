---
layout: post
title: "[데일리 백준] 11896"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-03-14
last_modified_at: 2025-03-14
---
## Silver
### [11896][def]

```c++
#include <iostream>
using namespace std;

int main() {
    int a, b;
    cin >> a >> b;
    long long result = 0;
    if(a == 2 || b == 2 || (a == 1 && b >= 2)) result -= 2;
    a = (a % 2 == 0 ? a : a+1);
    b = (b % 2 == 0 ? b : b-1);
    int count = (b - a) / 2 + 1;
    result += (long long)(a + b) * count / 2;
    cout << result;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 기하학 (날먹)

- 두 수 사이의 모든 짝수의 합 (2 제외)

</div>
</details>

[def]: https://www.acmicpc.net/problem/11896