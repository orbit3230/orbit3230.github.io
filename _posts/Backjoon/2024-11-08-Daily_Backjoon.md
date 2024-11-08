---
layout: post
title: "[데일리 백준] 2217"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-11-08
last_modified_at 2024-11-08
---
## Gold
### [2217][def]

```c++
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> ropes(n);
    for(int i = 0 ; i < n ; i++) cin >> ropes[i];
    sort(ropes.begin(), ropes.end(), greater<int>());
    int max = 0;
    for(int i = 0 ; i < n ; i++) {
        max = std::max(max, ropes[i]*(i+1));
    }
    cout << max;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 그리디 알고리즘. (날먹)

</div>
</details>

[def]: https://www.acmicpc.net/problem/2217