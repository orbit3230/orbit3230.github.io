---
layout: post
title: "[데일리 백준] 1018"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-04-03
last_modified_at: 2024-04-03
---
## Silver
### [1018][def]

```c++
#include <iostream>
using namespace std;

int firstBlack(int i , int j, char board[50][50]) {
    int turn = 0;
    for(int x = i ; x < i+8 ; x++)
        for(int y = j ; y < j+8 ; y++)
            if((x+y)%2 == 0) {
                if(board[x][y] != 'B')
                    turn++;
            }
            else
                if(board[x][y] != 'W')
                    turn++;
    return turn;
}
int firstWhite(int i , int j, char board[50][50]) {
    int turn = 0;
    for(int x = i ; x < i+8 ; x++)
        for(int y = j ; y < j+8 ; y++)
            if((x+y)%2 == 0) {
                if(board[x][y] != 'W')
                    turn++;
            }
            else
                if(board[x][y] != 'B')
                    turn++;
    return turn;
}

int main() {
    int m, n;
    cin >> m;
    cin >> n;
    char board[50][50];
    string line;
    for(int i = 0 ; i < m ; i++) {
        cin >> line;
        for(int j = 0 ; j < n ; j++)
            board[i][j] = line[j];
    }

    int turn;
    int turnBlack;
    int turnWhite;
    int minTurn = -1;
    for(int i = 0 ; i <= m-8 ; i++) {
        for(int j = 0 ; j <= n-8 ; j++) {
            turnBlack = firstBlack(i, j, board);
            turnWhite = firstWhite(i, j, board);
            turn = (turnBlack < turnWhite) ? turnBlack : turnWhite;

            if(minTurn == -1 || minTurn > turn)
                minTurn = turn;
        }
    }

    cout << minTurn;
}
```

[def]: https://www.acmicpc.net/problem/1018