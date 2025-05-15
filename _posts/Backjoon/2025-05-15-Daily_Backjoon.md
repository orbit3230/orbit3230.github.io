---
layout: post
title: "[데일리 백준] 15688"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-05-15
last_modified_at: 2025-05-15
---
## Silver
### [15688][def]

```c++
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    int n;
    cin >> n;
    vector<int> list(n);
    for(int i = 0 ; i < n ; i++) cin >> list[i];
    sort(list.begin(), list.end());
    for(int i = 0 ; i < n ; i++) cout << list[i] << '\n';
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 정렬 (날먹)

</div>
</details>

[def]: https://www.acmicpc.net/problem/15688