---
layout: post
title: "[데일리 백준] 11049"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-09-30
last_modified_at: 2024-09-30
---
## Gold
### [11049][def]

```c++
#include <iostream>
#include <vector>
using namespace std;

typedef struct Matrix {
    int r;
    int c;
    int min;
} Matrix;

void fillTable(vector<vector<Matrix>>& dp, int n) {
    for (int length = 2 ; length < n ; length++) {
        int r = 0;
        for (int c = length ; c < n ; c++) {
            int minimum = INT32_MAX;
            int r_ = r+length;
            int rowStore;
            int colStore;
            for(int c_ = c-1 ; c_ >= r ; c_--) {
                if(minimum > dp[r][c_].min + dp[r_][c].min + dp[r][c_].r * dp[r][c_].c * dp[r_][c].c) {
                    minimum = dp[r][c_].min + dp[r_][c].min + dp[r][c_].r * dp[r][c_].c * dp[r_][c].c;
                    rowStore = dp[r][c_].r;
                    colStore = dp[r_][c].c;
                }
                r_--;
            }
            dp[r][c].min = minimum;
            dp[r][c].r = rowStore;
            dp[r][c].c = colStore;
            r++;
        }
    }
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);

    int n;
    cin >> n;
    vector<vector<Matrix>> dp(n, vector<Matrix>(n, {0, 0, 0}));  // upper triangular matrix
    // initialize diagonal entries
    for(int i = 0 ; i < n ; i++) {
        cin >> dp[i][i].r >> dp[i][i].c;
        dp[i][i].min = 0;
    }
    // initialize +1 upper diagonal entries
    for(int i = 1 ; i < n ; i++) {
        dp[i-1][i].min = dp[i-1][i-1].r * dp[i-1][i-1].c * dp[i][i].c;
        dp[i-1][i].r = dp[i-1][i-1].r;
        dp[i-1][i].c = dp[i][i].c;
    }
    if(n > 2) fillTable(dp, n);
    cout << dp[0][n-1].min;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- bottom-up 다이나믹 프로그래밍 기법을 활용한 문제.

- DP 배열의 컨트롤이 너무나도 까다로웠다.

</div>
</details>

[def]: https://www.acmicpc.net/problem/11049