---
layout: post
title: "[데일리 백준] 1639"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-10-18
last_modified_at: 2024-10-18
---
## Silver
### [1639][def]

```c++
#include <iostream>
using namespace std;

void multiply(long long& a, int b, int c, long long a_) {
    if(b == 1) return;
    multiply(a, b/2, c, a_);
    a = (a * a) % c;
    if(b % 2 == 1) a = (a * a_) % c;
}

int main() {
    long long a;
    int b, c;
    cin >> a >> b >> c;
    long long a_ = a;
    multiply(a, b, c, a_);
    cout << a % c;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 분할 정복을 통한 거듭제곱 문제.  

- 또한 [백준 2749][def2] 문제의 기반이 되는 문제이다.  

</div>
</details>

[def]: https://www.acmicpc.net/problem/1639
[def2]: https://www.acmicpc.net/problem/2749