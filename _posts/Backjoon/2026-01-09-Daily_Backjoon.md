---
layout: post
title: "[데일리 백준] 2012"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2026-01-09
last_modified_at: 2026-01-09
---
## Silver
### [2012][def]

```c++
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> expectation(n);
    for(int i = 0 ; i < n ; i++) cin >> expectation[i];
    sort(expectation.begin(), expectation.end());
    long long totalCost = 0;
    for(int i = 0 ; i < n ; i++) {
        totalCost += abs(expectation[i] - (i + 1));
    }
    cout << totalCost;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- Greedy Algorithm

</div>
</details>

[def]: https://www.acmicpc.net/problem/2012