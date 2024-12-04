---
layout: post
title: "[데일리 백준] 10844, 1915"
excerpt: "1 Silver, 1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-12-04
last_modified_at: 2024-12-04
---
## Silver
### [10844][def]

```c++
#include <iostream>
#include <vector>
#define DIV 1000000000
using namespace std;

int stair(int value, int length, int n, vector<vector<int>>& dpTable) {
    if(length == n) return 1;
    if(dpTable[value][length] != -1) return dpTable[value][length];
    dpTable[value][length] = 0;
    if(value < 9) dpTable[value][length] += stair(value+1, length+1, n, dpTable) % DIV;
    if(value > 0) dpTable[value][length] += stair(value-1, length+1, n, dpTable) % DIV;
    return dpTable[value][length] % DIV;
}

int main() {
    int n;
    cin >> n;
    vector<vector<int>> dpTable(10, vector<int>(n+1, -1));
    int sum = 0;
    for(int i = 1 ; i <= 9 ; i++) {
        sum += stair(i, 1, n, dpTable) % DIV;
        sum %= DIV;
    }
    cout << sum;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- Dynamic Programming.

- 일반적인 Top-down 방식이다.  

</div>
</details>

## Gold
### [1915][def2]

```c++
#include <iostream>
#include <vector>
using namespace  std;

int findSquare(vector<vector<bool>>& board, int i, int j, int n, int m, vector<vector<int>>& dpTable) {
    if(i == n-1 && j == m-1) return board[i][j];
    if(i >= n-1 || j >= m-1) return board[i][j];
    if(dpTable[i][j] != -1) return dpTable[i][j];
    dpTable[i][j] = board[i][j];
    int size = board[i][j];
    int sub_sum = INT32_MAX;
    sub_sum = min(sub_sum, findSquare(board, i+1, j, n, m, dpTable));
    sub_sum = min(sub_sum, findSquare(board, i, j+1, n, m, dpTable));
    sub_sum = min(sub_sum, findSquare(board, i+1, j+1, n, m, dpTable));
    return dpTable[i][j] += (!board[i][j] ? 0 : sub_sum);
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);

    int n, m;
    cin >> n >> m;
    vector<vector<bool>> board(n, vector<bool>(m));
    string input;
    for(int i = 0 ; i < n ; i++) {
        cin >> input;
        for(int j = 0 ; j < m ; j++) board[i][j] = input[j] - '0';
    }
    vector<vector<int>> dpTable(n, vector<int>(m, -1));
    findSquare(board, 0, 0, n, m, dpTable);
    int max = 0;
    for(int i = 0 ; i < n ; i++) {
        for(int j = 0 ; j < m ; j++) {
            max = std::max(max, (dpTable[i][j] == -1 ? board[i][j] : dpTable[i][j]));
        }
    }
    cout << max*max;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- Dynamic Programming.

- 현재 정사각형의 크기는, 오른쪽, 아래, 대각선에 위치한 크기가 하나 작은 정사각형들에 의해 결정된다.  

</div>
</details>

[def]: https://www.acmicpc.net/problem/10844
[def2]: https://www.acmicpc.net/problem/1915