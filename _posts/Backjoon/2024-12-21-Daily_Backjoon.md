---
layout: post
title: "[데일리 백준] 17386"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-12-21
last_modified_at: 2024-12-21
---
## Gold
### [17386][def]

```c++
#include <iostream>
using namespace std;

typedef struct Point {
    int x;
    int y;
} Point;
typedef struct Line {
    Point a;
    Point b;
} Line;

int ccw(long long x1, long long y1, long long x2, long long y2, long long x3, long long y3) {
    long long ccw = 0;
    ccw += (x1*y2) + (x2*y3) + (x3*y1);
    ccw -= (x2*y1) + (x3*y2) + (x1*y3);
    return (ccw < 0) ? -1 : (ccw > 0);
}

int main() {
    Line l1, l2;
    cin >> l1.a.x >> l1.a.y >> l1.b.x >> l1.b.y;
    cin >> l2.a.x >> l2.a.y >> l2.b.x >> l2.b.y;

    // l1 -> l2 CCWs
    int ccw1 = ccw(l1.a.x, l1.a.y, l1.b.x, l1.b.y, l2.a.x, l2.a.y);
    int ccw2 = ccw(l1.a.x, l1.a.y, l1.b.x, l1.b.y, l2.b.x, l2.b.y);
    // l2 -> l1 CCWs
    int ccw3 = ccw(l2.a.x, l2.a.y, l2.b.x, l2.b.y, l1.a.x, l1.a.y);
    int ccw4 = ccw(l2.a.x, l2.a.y, l2.b.x, l2.b.y, l1.b.x, l1.b.y);

    int l1_l2 = ccw1*ccw2;
    int l2_l1 = ccw3*ccw4;
    if(l1_l2 <= 0 && l2_l1 <= 0) {
        cout << 1;
        return 0;
    }
    cout << 0;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- CCW + 선분 교차 판정

- [17387][def2] 문제에서 조건이 완화된 버전 (날먹)  

</div>
</details>

[def]: https://www.acmicpc.net/problem/17386
[def2]: https://www.acmicpc.net/problem/17387