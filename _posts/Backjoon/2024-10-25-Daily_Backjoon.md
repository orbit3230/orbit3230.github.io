---
layout: post
title: "[데일리 백준] 2293"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-10-25
last_modified_at: 2024-10-25
---
## Gold
### [2293][def]

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
    for(int i = 0 ; i <= k ; i+=coin) dpTable[i] = 1;

    int prev;
    int sub;
    for(int i = 1 ; i < n ; i++) {
        cin >> coin;
        for(int j = 1 ; j <= k ; j++) {
            prev = dpTable[j];
            sub = (j - coin >= 0) ? dpTable[j-coin] : 0;
            dpTable[j] = prev + sub;
        }
    }
    cout << dpTable[k];
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 다이나믹 프로그래밍.  

- 관계식을 찾아내는 것이 너무나도 어려웠다.  
사용할 동전의 개수를 하나 씩 늘려가며 경우의 수를 갱신한다.  
  - value `k`를 만드는 경우의 수 : 이전 동전까지 사용하여 `k`를 만드는 경우의 수 + 현재 동전 상태에서 `k-현재 동전 값`을 만드는 경우의 수.  
  cost가 `2`인 동전을 사용하여 `4`를 만드려면, cost가 `2`인 동전으로 `2`를 만드는 경우의 수에서 **동전을 하나 더** 쓰면 되기 때문이다.  

</div>
</details>

[def]: https://www.acmicpc.net/problem/2293