---
layout: post
title: "[데일리 백준] 2166"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-07-29
last_modified_at: 2024-07-29
---
## Gold
### [2166][def]

```c++
#include <iostream>
#include <vector>
#include <iomanip>
using namespace std;

typedef struct Point {
    int x;
    int y;
} Point;

double triangle(Point* p1, Point* p2, Point* p3) {
    long long x1 = p1->x; long long y1 = p1->y;
    long long x2 = p2->x; long long y2 = p2->y;
    long long x3 = p3->x; long long y3 = p3->y;
    // 도형이 오목한 경우를 생각하여 Not abs
    double surface = 1.0/2.0 * (x1*y2 + x2*y3 + x3*y1 - x1*y3 - x2*y1 - x3*y2);
    return surface;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    int n;
    cin >> n;
    Point* base = new Point;  // 이 베이스를 중심으로 삼각형을 n-2개 만들어 다각형을 쪼갤거임.
    cin >> base->x >> base->y;
    vector<Point*> points(n-1);
    for(int i = 0 ; i < n-1 ; i++) {
        Point* p = new Point;
        points[i] = p;
        cin >> points[i]->x >> points[i]->y;
    }

    double sum = 0.0;
    for(int i = 0 ; i < n-2 ; i++) {
        sum += triangle(base, points[i], points[i+1]);
    }
    if(sum < 0) {  // 최종적으로 abs
        sum *= -1;
    }
    cout << fixed << setprecision(1) << sum;
}
```
<details>
<summary>코멘트</summary>
<div markdown="1">

- 다각형 중에서는 오목한 모양의 다각형도 존재한다.  
신발끈 공식(벡터 외적)에는 해당 계산을 위한 부호값이 붙어서 나오기 때문에,  
해당 부호를 살려주는 것이 중요하다.  

</div>
</details>

[def]: https://www.acmicpc.net/problem/2166