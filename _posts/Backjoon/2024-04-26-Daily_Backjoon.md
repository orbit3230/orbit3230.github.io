---
layout: post
title: "[데일리 백준] 1110"
excerpt: "1 Bronze"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-04-25
last_modified_at: 2024-04-25
---
## Bronze
### [1110][def]

```c++
#include <iostream>
using namespace std;

int main() {
    int origin = 0;
    int num = 0;
    int count = 0;
    cin >> origin;

    num = origin;
    while(true) {
        num = ((num % 10) * 10) + ((num / 10 + num % 10) % 10);
        count++;
        if(num == origin) {
            cout << count;
            break;
        }
    }
}
```

[def]: https://www.acmicpc.net/problem/1110