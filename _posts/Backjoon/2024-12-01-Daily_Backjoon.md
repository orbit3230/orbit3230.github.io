---
layout: post
title: "[데일리 백준] 13251"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-12-01
last_modified_at: 2024-12-01
---
## Silver
### [13251][def]

```c++
#include <iostream>
#include <vector>
#include <iomanip>
using namespace std;

int main() {
    int m;
    cin >> m;
    vector<int> colors(m);
    int sum = 0;
    for(int i = 0 ; i < m ; i++) {
        cin >> colors[i];
        sum += colors[i];
    }
    int k;
    cin >> k;
    double p = 0.0;
    for(int i = 0 ; i < m ; i++) {
        int color = colors[i];
        if(color < k) continue;  // 모자라서 뽑을 수가 없음
        double temp = 1.0;
        for(int i = 0 ; i < k ; i++) {
            temp *= (double)(color - i) / (sum - i);
        }
        p += temp;
    }
    cout << fixed << setprecision(10) << p;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 확률론

</div>
</details>

[def]: https://www.acmicpc.net/problem/13251