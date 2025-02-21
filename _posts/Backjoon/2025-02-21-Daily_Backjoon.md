---
layout: post
title: "[데일리 백준] 1069"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-02-21
last_modified_at: 2025-02-21
---
## Gold
### [1069][def]

```c++
#include <iostream>
#include <cmath>
#include <iomanip>
using namespace std;

int main() {
    int x, y, d, t;
    cin >> x >> y >> d >> t;
    double distance = sqrt(x*x + y*y);
    if((double)d/t <= 1) {  // case 1 : only 걷기
        cout << fixed << setprecision(10) << distance;
        return 0;
    }
    double speed = (double)d/t;
    // case 2 : 덜 점프 + 걷기
    double less = (int)distance/d*t;  // 덜 점프했을 때 걸린 시간
    less += (distance - (less*speed));  // 덜 점프했을 때 남은 거리
    // case 3 : 더 점프 + 걷기
    double more = (int)distance/d*t+t;  // 더 점프했을 때 걸린 시간
    more += ((more*speed) - distance);  // 더 점프했을 때 남은 거리
    double min = std::min(less, more);

    // case 4 : 방향 조절해서 점프만
    if(distance > d) {
        double only_jump = (int)distance/d*t+t;
        min = std::min(min, only_jump);
    }

    // case 5 : 단 두번의 점프
    if(distance < d) {
        double two_jump = 2*t;
        min = std::min(min, two_jump);
    }
    cout << fixed << setprecision(10) << min;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 좌표 거리 계산.

- 매우 많은 케이스.

</div>
</details>

[def]: https://www.acmicpc.net/problem/1069