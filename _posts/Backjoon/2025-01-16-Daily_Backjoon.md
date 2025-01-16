---
layout: post
title: "[데일리 백준] 2230"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-01-16
last_modified_at: 2025-01-16
---
## Gold
### [2230][def]

```c++
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);

    int n, m;
    cin >> n >> m;
    vector<int> list(n);
    for(int i = 0 ; i < n ; i++) cin >> list[i];
    sort(list.begin(), list.end());

    int leftPoint = 0;
    int rightPoint = 1;
    int left, right;
    int diff;
    int minDiff = INT32_MAX;
    while(leftPoint <= rightPoint && rightPoint < n) {
        left = list[leftPoint];
        right = list[rightPoint];
        diff = right - left;
        if(diff >= m) {
            minDiff = min(minDiff, diff);
            leftPoint++;
            continue;
        }
        rightPoint++;
    }
    cout << minDiff;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 투 포인터 리마인드

</div>
</details>

[def]: https://www.acmicpc.net/problem/2230