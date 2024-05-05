---
layout: post
title: "[데일리 백준] 1789"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-05-05
last_modified_at: 2024-05-05
---
## Silver
### [1789][def]

```c++
#include <iostream>
using namespace std;

// 1부터 수를 누적해 더하며 최대로 많은 개수의 수를 더해보자
int accumulate(long s) {
    int n = 1;
    long sum = 0;
    int count = 0;
    while(sum + n <= s) {
        sum += n;
        n++;
        count++;
    }
    return count;
}

int main() {
    long s;
    cin >> s;
    cout << accumulate(s);
}
```

[def]: https://www.acmicpc.net/problem/1789