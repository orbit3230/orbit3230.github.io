---
layout: post
title: "[데일리 백준] 11728"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-04-20
last_modified_at: 2025-04-20
---
## Silver
### [11728][def]

```c++
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    int n, m;
    cin >> n >> m;
    int size = n+m;
    vector<int> list(size);
    for(int i = 0 ; i < size ; i++) cin >> list[i];
    sort(list.begin(), list.end());
    for(int e : list ) cout << e << ' ';
}
```

<details>
<summary>코멘트 ★</summary>
<div markdown="1">

- 정렬 (날먹)

</div>
</details>

[def]: https://www.acmicpc.net/problem/11728