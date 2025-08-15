---
layout: post
title: "[데일리 백준] 8983"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-07-23
last_modified_at: 2025-07-23
---
## Gold
### [8983][def]

```c++
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

typedef struct Point {
    int x;
    int y;
} Point;

int binarySearch(vector<int>& base, int find, int size) {
    int left = 0;
    int right = size-1;
    while(left <= right) {
        int mid = (left+right) >> 1;
        if(base[mid] < find) {
            left = mid+1;
            continue;
        }
        if(base[mid] > find) {
            right = mid-1;
            continue;
        }
        return mid;
    }
    return left;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);

    int m, n, l;
    cin >> m >> n >> l;
    vector<int> base(m);
    for(int i = 0 ; i < m ; i++) cin >> base[i];
    sort(base.begin(), base.end());
    vector<Point> targets(n);
    for(int i = 0 ; i < n ; i++) cin >> targets[i].x >> targets[i].y;

    int count = 0;
    for(Point& target : targets) {
        if(target.y > l) continue;
        int fromRange = target.x - (l-target.y);
        fromRange = max(fromRange, 0);
        int toRange = target.x + (l-target.y);
        int index = binarySearch(base, fromRange, m);
        if(index < m && base[index] <= toRange) count++;
    }
    cout << count;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- Sorting + Binary Search

</div>
</details>

[def]: https://www.acmicpc.net/problem/8983