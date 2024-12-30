---
layout: post
title: "[데일리 백준] 15824"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-12-30
last_modified_at: 2024-12-30
---
## Gold
### [15824][def]

```c++
#include <iostream>
#include <vector>
#include <algorithm>
#define DIV 1000000007
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);

    int n;
    cin >> n;
    vector<long long> list(n);
    for(int i = 0 ; i < n ; i++) cin >> list[i];
    sort(list.begin(), list.end());

    vector<int> powerMinus1(n);
    int base = 1;
    powerMinus1[0] = base-1;
    for(int i = 1 ; i < n ; i++) {
        base *= 2;
        base %= DIV;
        powerMinus1[i] = base-1;
    }
    int plus = 0;
    int minus = 0;
    for(int i = 0 ; i < n ; i++) {
        plus += (list[i] * powerMinus1[i]) % DIV;
        plus %= DIV;
        minus += (list[i] * powerMinus1[n-i-1]) % DIV;
        minus %= DIV;
    }
    cout << (plus - minus + DIV) % DIV;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 조합론 +  DP(약간)

- 문제 본질에 접근하는 것은 가능했다.  
하지만 시간 복잡도를 줄이는 핵심을 떠올리는 것이 어려웠던 문제.

- 핵심
  - (1) 각 수마다 더해지는 횟수와 빼지는 횟수는 처음부터 정해져있다.
  - (2) 2^n-1 + 2^n-2 + ... + 2^0 = 2^n - 1 이다. (비트 표현을 생각해봐도 그렇다.)
  - (3) 이를 이용하여 패턴을 더해지는 횟수와 빼지는 횟수의 패턴을 찾을 수 있다.
  - (4) 또한 불필요한 거듭제곱 연산을 줄이기 위해 DP 테이블을 만들어 미리 계산해두고 사용한다.  

- 모듈러 연산을 확실하게 하여 오버플로우 방지 !

</div>
</details>

[def]: https://www.acmicpc.net/problem/15824