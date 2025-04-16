---
layout: post
title: "[데일리 백준] 2118"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-04-16
last_modified_at: 2025-04-16
---
## Gold
### [2118][def]

```c++
#include <iostream>
#include <vector>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);

    int n;
    cin >> n;
    vector<int> list(n);
    cin >> list[0];
    for(int i = 1 ; i < n ; i++) {
        cin >> list[i];
        list[i] += list[i-1];
    }
    int left, right, leftSum, rightSum;
    left = -1; right = 0;
    int total = list[n-1];
    int distance, maxDistance;
    maxDistance = 0;
    while(right < n) {
        leftSum = (left == -1 ? list[right] : list[right] - list[left]);
        rightSum = total - leftSum;
        maxDistance = max(maxDistance, min(leftSum, rightSum));
        if(leftSum > rightSum) {
            left++;
            continue;
        }
        right++;
    }
    cout << maxDistance;
}
```

<details>
<summary>코멘트 ★</summary>
<div markdown="1">

- 누적 합 + 투 포인터

</div>
</details>

[def]: https://www.acmicpc.net/problem/2118