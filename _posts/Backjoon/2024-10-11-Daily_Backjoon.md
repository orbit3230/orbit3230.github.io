---
layout: post
title: "[데일리 백준] 16565"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-10-11
last_modified_at: 2024-10-11
---
## Gold
### [16565][def]

```c++
#include <iostream>
#include <vector>
#define DIV 10007
using namespace std;

vector<vector<int>> dp(53, vector<int>(53, 0));

int combination(int n, int r) {
    if(dp[n][r] != 0) return dp[n][r];
    if(n == r || r == 0) return dp[n][r] = 1;
    return dp[n][r] = (combination(n-1, r-1) + combination(n-1, r)) % DIV;
}

int main() {
    int n;
    cin >> n;
    if(n < 4) {
        cout << 0;
        return 0;
    }
    
    int result = 0;
    for(int pair = 1; pair <= n / 4; pair++) {
        if(pair % 2 == 1) {
            result = (result + (combination(13, pair) * combination(52-pair*4, n-pair*4)) % DIV) % DIV;
        }
        else {
            result = (result - (combination(13, pair) * combination(52-pair*4, n-pair*4)) % DIV + DIV) % DIV;
        }
    }
    cout << result << endl;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 조합론 + 포함 배제의 원리

  - 조합을 구할 때 DP를 이용하여 구했다.  

  - 포함 배제의 원리를 알게 되었다.

- 모듈러 연산의 분배 법칙이 뺄셈 연산에서는 음수 방지를 해주어야 한다는 것,  
그리고 나눗셈 연산에서는 아예 적용되지 않는다는 것을 remind 했다.  

- 초기 코드가 어디서 잘못된건지 도저히 모르겠다.  
그래서 그냥 코드를 갈아엎고 포함 배제의 원리를 적용했다.  

</div>
</details>

[def]: https://www.acmicpc.net/problem/16565