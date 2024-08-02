---
layout: post
title: "[데일리 백준] 1198"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-08-02
last_modified_at: 2024-08-02
---
## Silver
### [1198][def]

- [2166][def2]번 문제와 유사한 문제이다.  

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
    double surface = 1.0/2.0 * abs((x1*y2 + x2*y3 + x3*y1) - (x1*y3 + x2*y1 + x3*y2));
    return surface;
}
// 2166번 문제를 베이스로 짠 코드
int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    int n;
    cin >> n;
    vector<Point*> points(n);
    for(int i = 0 ; i < n ; i++) {
        Point* p = new Point;
        points[i] = p;
        cin >> points[i]->x >> points[i]->y;
    }

    double max = 0.0;
    double surface;
    for(int i = 0 ; i < n ; i++) {
        for(int j = i+1 ; j < n ; j++) {
            for(int k = j+1 ; k < n ; k++) {
                if(i == j || j == k || k == i) continue;
                surface = triangle(points[i], points[j], points[k]);
                if(surface > max) {
                    max = surface;
                }
            }
        }
    }

    cout << fixed << setprecision(1) << max;
}
```

[def]: https://www.acmicpc.net/problem/1198
[def2]: https://www.acmicpc.net/problem/2166