---
layout: post
title: "[데일리 백준] 9663"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-10-20
last_modified_at: 2024-10-20
---
## Gold
### [9663][def]

```c++
#include <iostream>
#include <vector>
using namespace std;

void nqueen(vector<bool>& col, vector<bool>& diag1, vector<bool>& diag2, int n, int x, int y, int queens, int& count) {
    if(queens == n) {
        count++;
        return;
    }
    int colIndex = y;
    int diag1Index = (y-x >= 0) ? y-x : 2*n-1 + (y-x);
    int diag2Index = x+y;
    col[colIndex] = false;
    diag1[diag1Index] = false;
    diag2[diag2Index] = false;
    int colIndex_ = colIndex;
    int diag1Index_ = diag1Index;
    int diag2Index_ = diag2Index;

    x += 1;
    for(int j = 0 ; j < n ; j++) {
        colIndex = j;
        diag1Index = (j-x >= 0) ? j-x : 2*n-1 + (j-x);
        diag2Index = x+j;
        if(col[colIndex] && diag1[diag1Index] && diag2[diag2Index]) {
            nqueen(col, diag1, diag2, n, x, j, queens+1, count);
        }
    }
    col[colIndex_] = true;
    diag1[diag1Index_] = true;
    diag2[diag2Index_] = true;
}

int main() {
    int n;
    cin >> n;
    vector<bool> col(n, true);
    vector<bool> diag1(2*n-1, true);  // \ diag -> index : (y-x >= 0) ? y-x : 2*n-1+ (y-x)
    vector<bool> diag2(2*n-1, true); // / diag -> index : x+y
    int count = 0;
    for(int i = 0 ; i < n ; i++) {
        nqueen(col, diag1, diag2, n, 0, i, 1, count);
    }
    cout << count;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 드디어 풀었다 N-Queen !!

- 백트래킹 문제이다. 

  - 백트래킹을 숙달하고 나니 풀 수는 있었지만,  
  정답을 찾아내는 것은 성공했으나 시간 제한을 통과하지 못했다.  

  - 우선 퀸을 한 행에 반드시 하나씩, 그리고 한 열에 반드시 하나씩 위치해야 한다는 점이 포인트이다.

  - 따라서 2차원 배열을 사용할 필요도 없고, 이중 반복문을 사용할 필요도 없다. 단순히 행을 하나씩 늘려가며 해당 열/대각선에 위치 가능한 지만 판단하며 백트래킹을 진행하면 해결 가능하다.  

</div>
</details>

[def]: https://www.acmicpc.net/problem/9663