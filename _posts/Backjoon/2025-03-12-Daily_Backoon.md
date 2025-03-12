---
layout: post
title: "[데일리 백준] 12781"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-03-12
last_modified_at: 2025-03-12
---
## Gold
### [12781][def]

```c++
#include <iostream>
using namespace std;

typedef struct Point {
    int x;
    int y;
} Point;
typedef struct Line {
    Point p1;
    Point p2;
} Line;

int ccw(Point& p1, Point& p2, Point& p3) {
    return (p1.x*p2.y + p2.x*p3.y + p3.x*p1.y) - (p1.y*p2.x + p2.y*p3.x + p3.y*p1.x);
}

int main() {
    Line l1, l2;
    cin >> l1.p1.x >> l1.p1.y >> l1.p2.x >> l1.p2.y;
    cin >> l2.p1.x >> l2.p1.y >> l2.p2.x >> l2.p2.y;

    int ccw_l1_l2_1 = ccw(l1.p1, l1.p2, l2.p1);
    int ccw_l1_l2_2 = ccw(l1.p1, l1.p2, l2.p2);

    int ccw_l2_l1_1 = ccw(l2.p1, l2.p2, l1.p1);
    int ccw_l2_l1_2 = ccw(l2.p1, l2.p2, l1.p2);

    if((long long)ccw_l1_l2_1*ccw_l1_l2_2 < 0 && (long long)ccw_l2_l1_1*ccw_l2_l1_2 < 0) {
        cout << 1;
        return 0;
    }
    cout << 0;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- CCW - Line Segment Intersection

</div>
</details>

[def]: https://www.acmicpc.net/problem/12781