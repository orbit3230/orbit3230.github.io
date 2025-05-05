---
layout: post
title: "[데일리 백준] 11004"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-05-01
last_modified_at: 2025-05-01
---
## Silver
### [11004][def]

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
    vector<int> list(n);
    for(int i = 0 ; i < n ; i++) cin >> list[i];
    sort(list.begin(), list.end());
    cout << list[k-1];
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 정렬 (날먹)

</div>
</details>

[def]: https://www.acmicpc.net/problem/11004