---
layout: post
title: "[데일리 백준] 2839"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-04-14
last_modified_at: 2024-04-14
---
## Silver
### [2839][def]

```c++
#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    int result = 0;
    while(true) {
        if(n < 0) {
            result = -1;
            break;
        }
        if(n % 5 == 0) {
            result += n / 5;
            break;
        }
        n -= 3;
        result++;
    }
    cout << result;
}
```

[def]: https://www.acmicpc.net/problem/2839