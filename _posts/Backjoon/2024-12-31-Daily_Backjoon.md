---
layout: post
title: "[데일리 백준] 1049"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-12-31
last_modified_at: 2024-12-31
---
## Silver
### [1049][def]

```c++
#include <iostream>
using namespace std;

int main() {
    int n, m;
    cin >> n >> m;
    double set_min = INT32_MAX;
    int piece_min = INT32_MAX;
    int set, piece;
    while(m--) {
        cin >> set >> piece;
        set_min = min(set_min, set / 6.0);
        piece_min = min(piece_min, piece);
    }
    if(set_min > piece_min) {
        cout << n*piece_min;
        return 0;
    }
    cout << (int)(n/6*(set_min*6) + min((n%6)*piece_min, (int)(set_min*6)));
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 그리디 알고리즘 (날먹)

</div>
</details>

[def]: https://www.acmicpc.net/problem/1049