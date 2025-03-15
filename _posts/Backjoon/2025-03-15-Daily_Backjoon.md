---
layout: post
title: "[데일리 백준] 17286"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-03-15
last_modified_at: 2025-03-15
---
## Silver
### [17286][def]

```c++
#include <iostream>
#include <vector>
#include <cmath>
using namespace std;

typedef struct Point {
    int x;
    int y;
} Point;

double distance(Point& a, Point& b) {
    return sqrt((a.x - b.x) * (a.x - b.x) + (a.y - b.y) * (a.y - b.y));
}
void backtracking(Point& yuumi, vector<Point>& points, vector<bool>& visited, int index, double sum, double& min) {
    if(index == 3) {
        min = std::min(min, sum);
        return;
    }
    for(int i = 0 ; i < 3 ; i++) {
        if(visited[i]) continue;
        visited[i] = true;
        backtracking(points[i], points, visited, index+1, sum + distance(yuumi, points[i]), min);
        visited[i] = false;
    }
}

int main() {
    Point yuumi;
    cin >> yuumi.x >> yuumi.y;
    vector<Point> points(3);
    for(int i = 0; i < 3; i++) cin >> points[i].x >> points[i].y;
    double min = INT32_MAX;
    vector<bool> visited(3, false);
    backtracking(yuumi, points, visited, 0, 0, min);
    cout << (int)min;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 기하학 (날먹)

</div>
</details>

[def]: https://www.acmicpc.net/problem/17286