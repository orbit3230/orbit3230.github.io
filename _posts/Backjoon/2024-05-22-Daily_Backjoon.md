---
layout: post
title: "[데일리 백준] 10158"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-05-22
last_modified_at: 2024-05-22
---
## Silver
### [10158][def]

```c++
#include <iostream>
using namespace std;

int moving(int current, int max, int time) {
    current += time;
    if((current / max) % 2 == 0) { // 짝수 번째 페이즈 (늘어나는)
        return current % max;
    }
    else { // 홀수 번째 페이즈 (줄어드는)
        return max - (current % max);
    }
}

int main() {
    int w, h;
    cin >> w >> h;
    int p, q;
    cin >> p >> q;
    int t;
    cin >> t;

    int x = moving(p, w, t);
    int y = moving(q, h, t);

    cout << x << ' ' << y << '\n';
}
```

[def]: https://www.acmicpc.net/problem/10158