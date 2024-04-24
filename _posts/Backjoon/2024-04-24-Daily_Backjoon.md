---
layout: post
title: "[데일리 백준] 1051"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-04-24
last_modified_at: 2024-04-24
---
## Silver
### [1051][def]

```c++
#include <iostream>
using namespace std;

int main() {
    int n, m;
    cin >> n >> m;
    int matrix[n][m] = {0, };
    for(int i = 0 ; i < n ; i++) {
        string line;
        cin >> line;
        for(int j = 0 ; j < m ; j++) {
            matrix[i][j] = line[j] - '0';
        }
    }

    int maxSize = n < m ? n : m;

    int maxSizeSquare = 1;
    for(int size = maxSize ; size > 1 ; size--) {
        for(int r = 0 ; r < n - size + 1 ; r++) {
            for(int c = 0 ; c < m - size + 1 ; c++) {
                if(matrix[r][c] == matrix[r + size - 1][c] && matrix[r][c] == matrix[r][c + size - 1] 
                && matrix[r][c] == matrix[r + size - 1][c + size - 1]) {
                    maxSizeSquare = size;
                    goto end;
                }
            }
        }
    }
    end:

    cout << maxSizeSquare * maxSizeSquare;
}
```

[def]: https://www.acmicpc.net/problem/1051