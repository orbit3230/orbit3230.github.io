---
layout: post
title: "[데일리 백준] 15989"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-04-05
last_modified_at: 2025-04-05
---
## Gold
### [15989][def]

```c++
#include <iostream>
#include <vector>
using namespace std;

int main() {
    int t;
    cin >> t;
    vector<int> table(10001, 0);
    table[1] = 1;
    table[2] = 2;
    table[3] = 3;
    for(int i = 4 ; i <= 10000 ; i++) {
        table[i] = table[i-3] + i/2 + 1;
    }
    while(t--) {
        int n;
        cin >> n;
        cout << table[n] << '\n';
    }
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- Math

</div>
</details>

[def]: https://www.acmicpc.net/problem/15989