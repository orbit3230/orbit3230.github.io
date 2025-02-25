---
layout: post
title: "[데일리 백준] 10655"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-02-25
last_modified_at: 2025-02-25
---
## Silver
### [10655][def]

```c++
#include <iostream>
#include <vector>
using namespace std;

typedef struct Point {
    int x;
    int y;
} Point;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);

    int n;
    cin >> n;
    vector<Point> points(n);
    for(int i = 0 ; i < n ; i++) cin >> points[i].x >> points[i].y;
    long long distance = 0;
    int longest = 0;
    int prev_two = 0;
    int prev_one = abs(points[1].x - points[0].x) + abs(points[1].y - points[0].y);
    int skip;
    distance += prev_one;
    prev_two = prev_one;
    for(int i = 2 ; i < n ; i++) {
        prev_one = abs(points[i].x - points[i-1].x) + abs(points[i].y - points[i-1].y);
        distance += prev_one;
        skip = abs(points[i].x - points[i-2].x) + abs(points[i].y - points[i-2].y);
        longest = max(longest, prev_two + prev_one - skip);
        prev_two = prev_one;
    }
    cout << distance - longest;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 2차원 좌표 기하학

</div>
</details>

[def]: https://www.acmicpc.net/problem/10655