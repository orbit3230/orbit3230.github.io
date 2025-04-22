---
layout: post
title: "[데일리 백준] 14400"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-04-22
last_modified_at: 2025-04-22
---
## Silver
### [14400][def]

```c++
#include <iostream>
#include <vector>
#include <algorithm>
#include <cmath>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);

    int n;
    cin >> n;
    vector<int> x(n);
    vector<int> y(n);
    for(int i = 0 ; i < n ; i++) cin >> x[i] >> y[i];
    sort(x.begin(), x.end());
    sort(y.begin(), y.end());
    int x_median = x[n/2];
    int y_median = y[n/2];
    long long distance = 0;
    for(int i = 0 ; i < n ; i++) distance += abs(x[i]-x_median) + abs(y[i]-y_median);
    cout << distance;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- Manhattan distance

</div>
</details>

[def]: https://www.acmicpc.net/problem/14400