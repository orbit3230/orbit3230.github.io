---
layout: post
title: "[데일리 백준] 9461"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-05-13
last_modified_at: 2024-05-13
---
## Silver
### [9461][def]

```c++
#include <iostream>
using namespace std;

int main() {
    int t;
    cin >> t;

    long result[100];
    result[0] = 1;
    result[1] = 1;
    result[2] = 1;
    for(int i = 3 ; i < 100 ; i++) {
        result[i] = result[i-3] + result[i-2];
    }

    int n;
    for(int i = 0 ; i < t ; i++) {
        cin >> n;
        cout << result[n-1] << '\n';
    }
}
```

[def]: https://www.acmicpc.net/problem/9461