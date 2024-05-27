---
layout: post
title: "[데일리 백준] 1064"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-05-27
last_modified_at: 2024-05-27
---
## Silver
### [1064][def]

```c++
#include <iostream>
#include <iomanip>
#include <cmath>
using namespace std;

typedef struct Point {
    double x, y;
} Point;

int main() {
    double x, y;
    Point p1[4], p2[4], p3[4], p4[4];  // p1 : 첫 번째 평행사변형, p2 : 두 번째 평행사변형, p3 : 세 번째 평행사변형, p4 : 네 번째 평행사변형
    for(int i = 0; i < 3; i++) {
        cin >> x >> y;
        p1[i].x = p2[i].x = p3[i].x = p4[i].x = x;
        p1[i].y = p2[i].y = p3[i].y = p4[i].y = y;
    }
    // 우선 평행사변형을 만들 수 없는 경우를 생각해보자.
    // 세 점이 일직선 상에 있는 경우이다. (기울기가 같음)
    if(((p1[0].x - p1[1].x) == 0) || ((p1[1].x - p1[2].x) == 0)) {  // 기울기가 둘다 무한대(세로 직선)이거나
        if((p1[0].x - p1[1].x) == (p1[1].x - p1[2].x)) {
            cout << "-1.0";
            return 0;
        }
    }
    else if (((p1[0].y - p1[1].y) / (p1[0].x - p1[1].x)) == ((p1[1].y - p1[2].y) / (p1[1].x - p1[2].x))) {  // 기울기가 같은 경우
        cout << "-1.0";
        return 0;
    }
    // 만들 수 있는 평행사변형을 두 개 만들어보자.
    // (1) 0->1 직선과 같은 직선을 2->3로 그리는 방법
    p1[3].x = p1[2].x + (p1[1].x - p1[0].x);
    p1[3].y = p1[2].y + (p1[1].y - p1[0].y);
    // (2) 0->1 직선과 같은 직선을 3->2로 그리는 방법
    p2[3].x = p2[2].x - (p2[1].x - p2[0].x);
    p2[3].y = p2[2].y - (p2[1].y - p2[0].y);
    // (3) 0->2 직선과 같은 직선을 1->3로 그리는 방법
    p3[3].x = p3[1].x + (p3[2].x - p3[0].x);
    p3[3].y = p3[1].y + (p3[2].y - p3[0].y);
    // (4) 0->2 직선과 같은 직선을 3->1로 그리는 방법
    p4[3].x = p4[1].x - (p4[2].x - p4[0].x);
    p4[3].y = p4[1].y - (p4[2].y - p4[0].y);

    // 두 평행사변형의 둘레 길이를 구해보자.  
    double peri1 = 0.0;
    peri1 += sqrt(pow(p1[0].x - p1[1].x, 2) + pow(p1[0].y - p1[1].y, 2));
    peri1 += sqrt(pow(p1[1].x - p1[3].x, 2) + pow(p1[1].y - p1[3].y, 2));
    peri1 += sqrt(pow(p1[3].x - p1[2].x, 2) + pow(p1[3].y - p1[2].y, 2));
    peri1 += sqrt(pow(p1[2].x - p1[0].x, 2) + pow(p1[2].y - p1[0].y, 2));

    double peri2 = 0.0;
    peri2 += sqrt(pow(p2[0].x - p2[1].x, 2) + pow(p2[0].y - p2[1].y, 2));
    peri2 += sqrt(pow(p2[1].x - p2[2].x, 2) + pow(p2[1].y - p2[2].y, 2));
    peri2 += sqrt(pow(p2[2].x - p2[3].x, 2) + pow(p2[2].y - p2[3].y, 2));
    peri2 += sqrt(pow(p2[3].x - p2[0].x, 2) + pow(p2[3].y - p2[0].y, 2));

    double peri3 = 0.0;
    peri3 += sqrt(pow(p3[0].x - p3[1].x, 2) + pow(p3[0].y - p3[1].y, 2));
    peri3 += sqrt(pow(p3[1].x - p3[3].x, 2) + pow(p3[1].y - p3[3].y, 2));
    peri3 += sqrt(pow(p3[3].x - p3[2].x, 2) + pow(p3[3].y - p3[2].y, 2));
    peri3 += sqrt(pow(p3[2].x - p3[0].x, 2) + pow(p3[2].y - p3[0].y, 2));

    double peri4 = 0.0;
    peri4 += sqrt(pow(p4[0].x - p4[2].x, 2) + pow(p4[0].y - p4[2].y, 2));
    peri4 += sqrt(pow(p4[2].x - p4[1].x, 2) + pow(p4[2].y - p4[1].y, 2));
    peri4 += sqrt(pow(p4[1].x - p4[3].x, 2) + pow(p4[1].y - p4[3].y, 2));
    peri4 += sqrt(pow(p4[3].x - p4[0].x, 2) + pow(p4[3].y - p4[0].y, 2));

    double max_peri = max(peri1, max(peri2, max(peri3, peri4)));
    double min_peri = min(peri1, min(peri2, min(peri3, peri4)));
    cout << fixed << setprecision(15) << max_peri - min_peri;
}
```

[def]: https://www.acmicpc.net/problem/1064