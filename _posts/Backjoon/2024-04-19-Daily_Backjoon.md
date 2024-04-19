---
layout: post
title: "[데일리 백준] 1193"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-04-19
last_modified_at: 2024-04-19
---
## Silver
### [1193][def]

```c
#include <iostream>
using namespace std;

int main() {
    int x;
    cin >> x;
    int upper = 1;
    int seq = 1;
    int currentLine = 1;
    while(x > seq) {
        seq += ++upper;
        currentLine++;
    }
    upper = upper - (seq - x);
    int lower = 1 + (seq - x);

    // 지그재그 이므로,
    if(currentLine % 2 == 1) {
        int temp = upper;
        upper = lower;
        lower = temp;
    }

    cout << upper << '/' << lower;
}
```

[def]: https://www.acmicpc.net/problem/1193