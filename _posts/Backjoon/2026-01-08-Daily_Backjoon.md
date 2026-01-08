---
layout: post
title: "[데일리 백준] 15988"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2026-01-08
last_modified_at: 2026-01-08
---
## Silver
### [15988][def]

```c++
#include <iostream>
#include <vector>
#define SIZE 1000001
#define DIV 1000000009
using namespace std;

int main() {
    int t;
    cin >> t;
    vector<int> table(SIZE);
    table[0] = 1; table[1] = 2; table[2] = 4;
    for(int i = 3 ; i < SIZE ; i++) {
        table[i] = (table[i] + (table[i-3] % DIV)) % DIV;
        table[i] = (table[i] + (table[i-2] % DIV)) % DIV;
        table[i] = (table[i] + (table[i-1] % DIV)) % DIV;
    }
    int n;
    while(t--) {
        cin >> n;
        n--;  // 0-based index
        cout << table[n] << '\n';
    }
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- Dynamic Programming

</div>
</details>

[def]: https://www.acmicpc.net/problem/15988