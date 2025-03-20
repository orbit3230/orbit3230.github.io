---
layout: post
title: "[데일리 백준] 20157"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-03-20
last_modified_at: 2025-03-20
---
## Gold
### [20157][def]

```c++
#include <iostream>
#include <unordered_map>
#define INF INT32_MAX>>1
#define M 10000000
using namespace std;

int gcd(int a, int b) {
    int temp;
    while(b != 0) {
        temp = a % b;
        a = b;
        b = temp;
    }
    return a;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);

    int n;
    cin >> n;
    // x*M + y, count
    unordered_map<long long, int> quadrant_1;
    unordered_map<long long, int> quadrant_2;
    unordered_map<long long, int> quadrant_3;
    unordered_map<long long, int> quadrant_4;
    int x, y;
    int max_count = 0;
    for(int i = 0 ; i < n ; i++) {
        cin >> x >> y;
        int x_ = x, y_ = y;
        x = abs(x); y = abs(y);
        int dividor = gcd(x, y);
        x /= dividor; y /= dividor;
        long long value = x*M + y;
        int count;
        if(x_ >= 0 && y_ >= 0) count = ++quadrant_1[value];
        if(x_ < 0 && y_ >= 0) count = ++quadrant_2[value]; 
        if(x_ <= 0 && y_ < 0) count = ++quadrant_3[value];
        if(x_ > 0 && y_ < 0) count = ++quadrant_4[value];
        max_count = max(max_count, count);
    }
    cout << max_count;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 기하학 (2차원 좌표평면)

- Overflow & Floating point error 주의

</div>
</details>

[def]: https://www.acmicpc.net/problem/20157