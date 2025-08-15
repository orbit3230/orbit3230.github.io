---
layout: post
title: "[데일리 백준] 2141"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-08-01
last_modified_at: 2025-08-01
---
## Gold
### [2141][def]

```c++
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

typedef struct Point {
    int position;
    int people;
} Point;

bool comparePosition(const Point &a, const Point &b) {
    return a.position < b.position;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);

    int n;
    cin >> n;
    vector<Point> points(n);
    long long peopleSum = 0;
    for(int i = 0 ; i < n ; i++) {
        cin >> points[i].position >> points[i].people;
        peopleSum += points[i].people;
    }
    long long middle = (peopleSum+1) >> 1;
    sort(points.begin(), points.end(), comparePosition);
    int index = 0;
    long long sum = 0;
    do {
        sum += points[index++].people;
    } while(index < n && sum < middle);
    cout << points[index-1].position;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- Sorting

</div>
</details>

[def]: https://www.acmicpc.net/problem/2141