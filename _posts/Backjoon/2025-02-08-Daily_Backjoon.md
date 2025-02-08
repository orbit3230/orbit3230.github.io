---
layout: post
title: "[데일리 백준] 18310"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-02-08
last_modified_at: 2025-02-08
---
## Gold
### [18310][def]

```c++
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    
    int n;
    cin >> n;
    vector<int> houses(n);
    for(int i = 0 ; i < n ; i++) cin >> houses[i];
    sort(houses.begin(), houses.end());
    cout << houses[(n-1)/2];
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 정렬 + 그리디 날먹

</div>
</details>

[def]: https://www.acmicpc.net/problem/18310