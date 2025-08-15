---
layout: post
title: "[데일리 백준] 13164"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-07-18
last_modified_at: 2025-07-18
---
## Gold
### [13164][def]

```c++
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);

    int n, k;
    cin >> n >> k;
    int prev;
    cin >> prev;
    int current;
    vector<int> diffs;
    int sum = 0;
    for(int i = 1 ; i < n ; i++) {
        cin >> current;
        int diff = current - prev;
        sum += diff;
        diffs.push_back(diff);
        prev = current;
    }
    sort(diffs.begin(), diffs.end(), greater<int>());
    int kMinus1 = k-1;
    for(int i = 0 ; i < kMinus1 ; i++) sum -= diffs[i];
    cout << sum;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- Greedy + Sorting

</div>
</details>

[def]: https://www.acmicpc.net/problem/13164