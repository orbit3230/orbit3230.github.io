---
layout: post
title: "[데일리 백준] 1929"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-04-16
last_modified_at: 2024-04-16
---
## Silver
### [1929][def]

```c++
#include <iostream>
using namespace std;

int main() {
    int from, to;
    cin >> from >> to;

    finding :
    for(int i = from ; i <= to ; i++) {
        if(i == 1) continue;
        for(int j = 2 ; j * j <= i ; j++) {
            if(i % j == 0) {
                from = i + 1;
                goto finding;
            }
        }
        cout << i << '\n';
    }
}
```

[def]: https://www.acmicpc.net/problem/1929