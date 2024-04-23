---
layout: post
title: "[데일리 백준] 2740"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-04-23
last_modified_at: 2024-04-23
---
## Silver
### [2740][def]

```c++
#include <iostream>
using namespace std;

int main() {
    int rA, cA;
    cin >> rA >> cA;
    int matrixA[rA][cA];
    for(int i = 0; i < rA; i++) {
        for(int j = 0; j < cA; j++) {
            cin >> matrixA[i][j];
        }
    }
    int rB, cB;
    cin >> rB >> cB;
    int matrixB[rB][cB];
    for(int i = 0; i < rB; i++) {
        for(int j = 0; j < cB; j++) {
            cin >> matrixB[i][j];
        }
    }

    int rC = rA;
    int cC = cB;
    int matrixC[rC][cC];
    for(int i = 0 ; i < cB ; i++) {
        for(int j = 0 ; j < rA ; j++) {
            matrixC[j][i] = 0;
            for(int k = 0 ; k < rB ; k++) {
                matrixC[j][i] += matrixB[k][i] * matrixA[j][k];
            }
        }
    }

    for(int i = 0; i < rC; i++) {
        for(int j = 0; j < cC; j++) {
            cout << matrixC[i][j] << " ";
        }
        cout << "\n";
    }
}
```

[def]: https://www.acmicpc.net/problem/2740