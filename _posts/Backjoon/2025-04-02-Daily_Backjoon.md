---
layout: post
title: "[데일리 백준] 25711"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-04-02
last_modified_at: 2025-04-02
---
## Gold
### [25711][def]

```c++
#include <iostream>
#include <vector>
#include <cmath>
#include <iomanip>
using namespace std;

typedef struct Location {
    long long x;
    long long y;
} Location;

double distance(Location& a, Location&b) {
    return sqrt((a.x - b.x) * (a.x - b.x) + (a.y - b.y) * (a.y - b.y));
}

int main() {
    ios::sync_with_stdio(0);
    cin.tie(0);
    cout.tie(0);

    int n, q;
    cin >> n >> q;
    vector<Location> locations(n);
    for(int i = 0 ; i < n ; i++) cin >> locations[i].x;
    for(int i = 0 ; i < n ; i++) cin >> locations[i].y;

    vector<double> prefix_sum(n, 0);
    double cost = 0;
    double sum = 0;
    for(int i = 1 ; i < n ; i++) {
        cost = distance(locations[i-1], locations[i]);
        if(locations[i-1].y < locations[i].y) cost *= 3;
        else if(locations[i-1].y == locations[i].y) cost *= 2;
        sum += cost;
        prefix_sum[i] = sum;
    }
    vector<double> prefix_sum_reversed(n, 0);
    sum = 0;
    for(int i = n-1 ; i >= 0 ; i--) {
        cost = distance(locations[i+1], locations[i]);
        if(locations[i+1].y < locations[i].y) cost *= 3;
        else if(locations[i+1].y == locations[i].y) cost *= 2;
        sum += cost;
        prefix_sum_reversed[i] = sum;
    }
    int from, to;
    while(q--) {
        cin >> from >> to;
        from--; to--;  // 0-based index
        if(from > to) {
            cout << fixed << setprecision(10) << prefix_sum_reversed[to] - prefix_sum_reversed[from] << '\n';
            continue;
        }
        cout << fixed << setprecision(10) << prefix_sum[to] - prefix_sum[from] << '\n';
    }
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 누적 합

</div>
</details>

[def]: https://www.acmicpc.net/problem/25711