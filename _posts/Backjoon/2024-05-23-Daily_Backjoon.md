---
layout: post
title: "[데일리 백준] 1476"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-05-23
last_modified_at: 2024-05-23
---
## Silver
### [1476][def]

```c++
#include <iostream>
using namespace std;

int main() {
    int e, s, m;
    cin >> e >> s >> m;

    if(e == 15) e = 0;
    if(s == 28) s = 0;
    if(m == 19) m = 0;

    int year = 1;
    while(true) {
        if(year % 15 == e && year % 28 == s && year % 19 == m)
            break;
        year++;
    }

    cout << year << '\n';
}
```

[def]: https://www.acmicpc.net/problem/1476