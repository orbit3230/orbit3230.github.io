---
layout: post
title: "[데일리 백준] 12100"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-09-03
last_modified_at: 2024-09-03
---
## Gold
### [12100][def]

```c++
#include <iostream>
#include <vector>
#include <queue>
using namespace std;

vector<vector<int>>* moveUp(vector<vector<int>>* board, int n) {
    vector<vector<int>>* afterMove = new vector<vector<int>>(n, vector<int>(n, 0));
    int top = 0;
    for(int j = 0 ; j < n ; j++) {
        top = 0;
        for(int i = 0 ; i < n ; i++) {
            int current = (*board)[i][j];
            if(current == 0) continue;  // 빈공간
            if((*afterMove)[top][j] == current) {  // 합쳐지는 경우
                (*afterMove)[top][j] <<= 1;
                top++;
                continue;
            }
            // 합쳐지지 않는 경우
            if((*afterMove)[top][j] != 0) top++;
            (*afterMove)[top][j] = current;
        }
    }
    return afterMove;
}
vector<vector<int>>* moveDown(vector<vector<int>>* board, int n) {
    vector<vector<int>>* afterMove = new vector<vector<int>>(n, vector<int>(n, 0));
    int top = n-1;
    for(int j = 0 ; j < n ; j++) {
        top = n-1;
        for(int i = n-1 ; i >= 0 ; i--) {
            int current = (*board)[i][j];
            if(current == 0) continue;  // 빈공간
            if((*afterMove)[top][j] == current) {  // 합쳐지는 경우
                (*afterMove)[top][j] <<= 1;
                top--;
                continue;
            }
            // 합쳐지지 않는 경우
            if((*afterMove)[top][j] != 0) top--;
            (*afterMove)[top][j] = current;
        }
    }
    return afterMove;
}
vector<vector<int>>* moveLeft(vector<vector<int>>* board, int n) {
    vector<vector<int>>* afterMove = new vector<vector<int>>(n, vector<int>(n, 0));
    int top = 0;
    for(int i = 0 ; i < n ; i++) {
        top = 0;
        for(int j = 0 ; j < n ; j++) {
            int current = (*board)[i][j];
            if(current == 0) continue;  // 빈공간
            if((*afterMove)[i][top] == current) {  // 합쳐지는 경우
                (*afterMove)[i][top] <<= 1;
                top++;
                continue;
            }
            // 합쳐지지 않는 경우
            if((*afterMove)[i][top] != 0) top++;
            (*afterMove)[i][top] = current;
        }
    }
    return afterMove;
}
vector<vector<int>>* moveRight(vector<vector<int>>* board, int n) {
    vector<vector<int>>* afterMove = new vector<vector<int>>(n, vector<int>(n, 0));
    int top = n-1;
    for(int i = 0 ; i < n ; i++) {
        top = n-1;
        for(int j = n-1 ; j >= 0 ; j--) {
            int current = (*board)[i][j];
            if(current == 0) continue;  // 빈공간
            if((*afterMove)[i][top] == current) {  // 합쳐지는 경우
                (*afterMove)[i][top] <<= 1;
                top--;
                continue;
            }
            // 합쳐지지 않는 경우
            if((*afterMove)[i][top] != 0) top--;
            (*afterMove)[i][top] = current;
        }
    }
    return afterMove;
}

int findMax(vector<vector<int>>* board, int n) {
    int max = 0;
    for(int i = 0 ; i < n ; i++) {
        for(int j = 0 ; j < n ; j++) {
            if((*board)[i][j] > max) max = (*board)[i][j];
        }
    }
    return max;
}

int simulate(vector<vector<int>>& board, int n) {
    int maxBlock = 0;
    queue<pair<vector<vector<int>>*, int>> q;
    q.push(make_pair(&board, 0));
    vector<vector<int>>* b;
    int depth;
    vector<vector<int>>* up;
    vector<vector<int>>* down;
    vector<vector<int>>* left;
    vector<vector<int>>* right;
    int max;
    while(!q.empty()) {
        b = q.front().first;
        depth = q.front().second;
        q.pop();
        if(depth == 5) {
            max = findMax(b, n);
            if(max > maxBlock) maxBlock = max;
            continue;
        }
        up = moveUp(b, n);
        q.push(make_pair(up, depth+1));
        down = moveDown(b, n);
        q.push(make_pair(down, depth+1));
        left = moveLeft(b, n);
        q.push(make_pair(left, depth+1));
        right = moveRight(b, n);
        q.push(make_pair(right, depth+1));
    }
    return maxBlock;
}

int main() {
    int n;
    cin >> n;
    vector<vector<int>> board(n, vector<int>(n));
    for(int i = 0 ; i < n ; i++) {
        for(int j = 0 ; j < n ; j++) {
            cin >> board[i][j];
        }
    }
    int maxint = simulate(board, n);
    cout << maxint;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 빡센 구현 & 시뮬레이션 문제.

- 알고리즘 분류는 백트래킹으로 되어있었지만, 단순 BFS로 경우의 수를 쪼아서 풀었다. (최대 큐의 크기 : 1024)

- 다만 [2024(hard)][def2] 문제를 풀기에는 역부족이었다.  

</div>
</details>

[def]: https://www.acmicpc.net/problem/12100
[def2]: https://www.acmicpc.net/problem/12094