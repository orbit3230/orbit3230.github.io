---
layout: post
title: "[데일리 백준] 11758"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-07-07
last_modified_at: 2024-07-07
---
## Gold
### [11758][def]

```c++
#include <iostream>
using namespace std;

int main() {
    long long x1, y1, x2, y2, x3, y3;
    cin >> x1 >> y1 >> x2 >> y2 >> x3 >> y3;

    long long CCW = (x2 - x1) * (y3 - y1) - (x3 - x1) * (y2 - y1);
    if (CCW > 0) cout << 1;
    else if (CCW < 0) cout << -1;
    else cout << 0;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- [CCW 알고리즘](https://degurii.tistory.com/47#code)의 존재를 알게되었다.   

- 아래는 신발끈 공식을 적용한 코드 (결과는 같다.)

```c++
#include <iostream>
using namespace std;

int main() {
    long long x1, y1, x2, y2, x3, y3;
    cin >> x1 >> y1 >> x2 >> y2 >> x3 >> y3;

    long long CCW = (x1*y2 + x2*y3 + x3*y1) - (x2*y1 + x3*y2 + x1*y3);
    if (CCW > 0) cout << 1;
    else if (CCW < 0) cout << -1;
    else cout << 0;
}
```

</div>
</details> 

[def]: https://www.acmicpc.net/problem/11758