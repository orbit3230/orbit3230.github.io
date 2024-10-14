---
layout: post
title: "[데일리 백준] 2098"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-10-14
last_modified_at: 2024-10-14
---
## Gold
### [2098][def]

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

- Traveling Salesperson Problem.

- DP 이론 수업에서 배운 수도 코드랑은 조금 다르게 코드를 작성했다.  
재귀 함수를 이용한 DFS와 유사한 방식이다.  
이 코드가 더 직관적이기도 하고,  
수도코드대로 작성하려면 조합을 구해야하는데 그건 좀 막막해서 이 방법을 선택했다.

</div>
</details>

[def]: https://www.acmicpc.net/problem/2098