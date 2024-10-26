---
layout: post
title: "[데일리 백준] 2294"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-10-26
last_modified_at: 2024-10-26
---
## Gold
### [2294][def]

```c++
#include <iostream>
#include <vector>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);

    int n, k;
    cin >> n >> k;
    vector<int> dpTable(k+1, 0);
    // initialize
    int coin;
    cin >> coin;
    for(int i = 1 ; i <= k ; i++) {
        if(i % coin == 0) dpTable[i] = i / coin;
    }
    
    int prev;
    int sub;
    for(int i = 1 ; i < n ; i++) {
        cin >> coin;
        for(int j = 1 ; j <= k ; j++) {
            prev = dpTable[j];
            if(coin > j) continue;
            if(dpTable[j - coin] == 0 && j%coin != 0) continue;
            sub = dpTable[j - coin] + 1;
            dpTable[j] = (prev == 0) ? sub : min(prev, sub);
        }
    }
    cout << (dpTable[k] == 0 ? -1 : dpTable[k]);
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 다이나믹 프로그래밍.  

- 이번 문제도 특정 cost의 동전 개수를 셀 때,  
현재 동전 가치를 k라고 하면 `coin - k`를 만드는 경우의 수 + 1이 핵심 recursive relation이다.  

</div>
</details>

[def]: https://www.acmicpc.net/problem/2294