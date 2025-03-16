---
layout: post
title: "[데일리 백준] 15803"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-03-16
last_modified_at: 2025-03-16
---
## Silver
### [15803][def]

```c++
#include <iostream>
using namespace std;

typedef struct Point {
    int x;
    int y;
} Point;

int main() {
    Point p1, p2, p3;
    cin >> p1.x >> p1.y >> p2.x >> p2.y >> p3.x >> p3.y;
    // sort
    if(p1.x > p2.x) swap(p1, p2);
    if(p2.x > p3.x) swap(p2, p3);
    if(p1.x > p2.x) swap(p1, p2);

    long long p1_p2_x_diff = (long long)p2.x - p1.x;
    long long p1_p2_y_diff = (long long)p2.y - p1.y;
    long long p2_p3_x_diff = (long long)p3.x - p2.x;
    long long p2_p3_y_diff = (long long)p3.y - p2.y;
    long long p1_p3_x_diff = (long long)p3.x - p1.x;
    long long p1_p3_y_diff = (long long)p3.y - p1.y;
    if(!(p1_p2_x_diff) || !(p2_p3_x_diff) || !(p1_p3_x_diff)) {
        if(!(p1_p2_x_diff) && !(p2_p3_x_diff) && !(p1_p3_x_diff) && (p1.x == p2.x && p2.x == p3.x)) {
            cout << "WHERE IS MY CHICKEN?";
            return 0;
        }
        cout << "WINNER WINNER CHICKEN DINNER!";
        return 0;
    }
    double p1_p2_slope = (double)p1_p2_y_diff / p1_p2_x_diff;
    double p2_p3_slope = (double)p2_p3_y_diff / p2_p3_x_diff;
    double p1_p3_slope = (double)p1_p3_y_diff / p1_p3_x_diff;
    if((p1_p2_slope == p2_p3_slope) && (p2_p3_slope == p1_p3_slope)) {
        cout << "WHERE IS MY CHICKEN?";
        return 0;
    }
    cout << "WINNER WINNER CHICKEN DINNER!";
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 기하학 (날먹)

</div>
</details>

[def]: https://www.acmicpc.net/problem/15803