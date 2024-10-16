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
using namespace std;
// traveling salesman problem
int tsp(vector<vector<int>>& matrix, vector<vector<int>>& dpTable, int prev, int mask, const int n) {
    if(mask == (1 << n) - 1) {  // all '1' -> optimal tour success, return to start point
        return (matrix[prev][0] == 0) ? INT32_MAX/2 : matrix[prev][0];  // div 2 : prevent overflow
    }
    // using memoization
    if(dpTable[prev][mask] != 0) return dpTable[prev][mask];
    dpTable[prev][mask] = INT32_MAX/2;  // div 2 : prevent overflow
    for(int i = 1 ; i < n ; i++) {
        // not visited && has route
        if((mask & (1 << i)) == 0 && matrix[prev][i] != 0) {
            dpTable[prev][mask]
            = min(dpTable[prev][mask], tsp(matrix, dpTable, i, mask | (1 << i), n)+matrix[prev][i]);
        }
    }
    return dpTable[prev][mask];
}

int main() {
    int n;
    cin >> n;
    vector<vector<int>> matrix(n, vector<int>(n));
    for(int i = 0 ; i < n ; i++) {
        for(int j = 0 ; j < n ; j++) cin >> matrix[i][j];
    }
    vector<vector<int>> dpTable(n, vector<int>(1 << n, 0));  // bit-masking index
    int result = tsp(matrix, dpTable, 0, 1, n);
    cout << result;
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