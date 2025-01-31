---
layout: post
title: "[데일리 백준] 1052"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-01-31
last_modified_at: 2025-01-31
---
## Gold
### [1052][def]

```c++
#include <iostream>
using namespace std;

int bits(int n) {
    int count = 0;
    while(n) {
        count += n & 1;
        n >>= 1;
    }
    return count;
}

int main() {
    int n, k;
    cin >> n >> k;
    int mask = n;  // 각 n 번째 비트가 1이면 2^n 리터 물병이 채워진 것
    
    int need = 0;
    int lowestBit;
    while(bits(mask) > k) {
        lowestBit = mask & -mask;  // 천잰가?
        mask += lowestBit;
        need += lowestBit;
    }
    cout << need;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 그리디 알고리즘

- 매우 매우 참신하고 기발한 문제!  
만들어지는 물병은 2^n 리터임을 잘 이용하는 문제이다.  

- 추가로 `a & -a`는 `a`의 가장 오른쪽 비트만을 마스킹하는 트릭 !!  
아주 섹시한 연산인 듯 하다.  

</div>
</details>

[def]: https://www.acmicpc.net/problem/1052