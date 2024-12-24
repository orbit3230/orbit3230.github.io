---
layout: post
title: "[데일리 백준] 2212"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-12-24
last_modified_at: 2024-12-24
---
## Gold
### [2212][def]

```c++
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

typedef struct Point {
    int x;
    int nextGap = 0;
} Point;

bool compare1(const Point& p1, const Point& p2) {
    return p1.x < p2.x;
}
bool compare2(const Point& p1, const Point& p2) {
    return p1.nextGap > p2.nextGap;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);

    int n, k;
    cin >> n >> k;
    vector<Point> points(n);
    for(int i = 0 ; i < n ; i++) cin >> points[i].x;
    sort(points.begin(), points.end(), compare1);

    for(int i = 0 ; i < n-1 ; i++) points[i].nextGap = points[i+1].x - points[i].x;
    sort(points.begin(), points.end(), compare2);
    // 다음 포인트와의 gap이 가장 큰 것을 회피
    // 만들어지는 총 gap의 개수는 k-1
    for(int i = 0 ; i < k-1 ; i++) points[i].nextGap = 0;

    int sum = 0;
    for(Point point : points) sum += point.nextGap;
    cout << sum;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- Greedy Algorithm

- 범위를 k개 생성하면, 그 사이 gap은 k-1개 생성된다는 아이디어가 중요

</div>
</details>

[def]: https://www.acmicpc.net/problem/2212