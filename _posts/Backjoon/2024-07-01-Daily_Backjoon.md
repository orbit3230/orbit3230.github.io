---
layout: post
title: "[데일리 백준] 14500"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-07-01
last_modified_at: 2024-07-01
---
## Gold
### [14500][def]

```c++
#include <iostream>
#include <vector>
using namespace std;

int tetromino_I(const vector<vector<int>>& tetris, int n, int m, int x, int y) {
    int max = 0;
    int I_vertical = 0;
    if(x + 3 < n) {
        for(int i = 0 ; i < 4 ; i++) {
            I_vertical += tetris[x + i][y];
        }
        if(I_vertical > max) max = I_vertical;
    }
    int I_horizontal = 0;
    if(y + 3 < m) {
        for(int i = 0 ; i < 4 ; i++) {
            I_horizontal += tetris[x][y + i];
        }
        if(I_horizontal > max) max = I_horizontal;
    }
    return max;
}
int tetromino_O(const vector<vector<int>>& tetris, int n, int m, int x, int y) {
    int max = 0;
    int O = 0;
    if(x + 1 < n && y + 1 < m) {
        O = tetris[x][y] + tetris[x][y + 1] + tetris[x + 1][y] + tetris[x + 1][y + 1];
        if(O > max) max = O;
    }
    return max;
}
int tetromino_L(const vector<vector<int>>& tetris, int n, int m, int x, int y) {
    int max = 0;
    int L1 = 0;
    if(x + 2 < n && y + 1 < m) {
        L1 = tetris[x][y] + tetris[x + 1][y] + tetris[x + 2][y] + tetris[x + 2][y + 1];
        if(L1 > max) max = L1;
    }
    int L2 = 0;
    if(x - 1 >= 0 && y + 2 < m) {
        L2 = tetris[x][y] + tetris[x][y + 1] + tetris[x][y + 2] + tetris[x - 1][y + 2];
        if(L2 > max) max = L2;
    }
    int L3 = 0;
    if(x - 2 >= 0 && y - 1 >= 0) {
        L3 = tetris[x][y] + tetris[x - 1][y] + tetris[x - 2][y] + tetris[x - 2][y - 1];
        if(L3 > max) max = L3;
    }
    int L4 = 0;
    if(x + 1 < n && y - 2 >= 0) {
        L4 = tetris[x][y] + tetris[x][y - 1] + tetris[x][y - 2] + tetris[x + 1][y - 2];
        if(L4 > max) max = L4;
    }
    int L5 = 0;
    if(x + 1 < n && y + 2 < m) {
        L5 = tetris[x][y] + tetris[x][y + 1] + tetris[x][y + 2] + tetris[x + 1][y + 2];
        if(L5 > max) max = L5;
    }
    int L6 = 0;
    if(x - 2 >= 0 && y + 1 < m) {
        L6 = tetris[x][y] + tetris[x - 1][y] + tetris[x - 2][y] + tetris[x - 2][y + 1];
        if(L6 > max) max = L6;
    }
    int L7 = 0;
    if(x - 1 >= 0 && y - 2 >= 0) {
        L7 = tetris[x][y] + tetris[x][y - 1] + tetris[x][y - 2] + tetris[x - 1][y - 2];
        if(L7 > max) max = L7;
    }
    int L8 = 0;
    if(x + 2 < n && y - 1 >= 0) {
        L8 = tetris[x][y] + tetris[x + 1][y] + tetris[x + 2][y] + tetris[x + 2][y - 1];
        if(L8 > max) max = L8;
    }
    return max;
}
int tetromino_S(const vector<vector<int>>& tetris, int n, int m, int x, int y) {
    int max = 0;
    int S_vertical = 0;
    if(x + 2 < n && y + 1 < m) {
        S_vertical = tetris[x][y] + tetris[x + 1][y] + tetris[x + 1][y + 1] + tetris[x + 2][y + 1];
        if(S_vertical > max) max = S_vertical;
    }
    int S_horizontal = 0;
    if(x - 1 >= 0 && y + 2 < m) {
        S_horizontal = tetris[x][y] + tetris[x][y + 1] + tetris[x - 1][y + 1] + tetris[x - 1][y + 2];
        if(S_horizontal > max) max = S_horizontal;
    }
    int s_reverse_vertical = 0;
    if(x + 2 < n && y - 1 >= 0) {
        s_reverse_vertical = tetris[x][y] + tetris[x + 1][y] + tetris[x + 1][y - 1] + tetris[x + 2][y - 1];
        if(s_reverse_vertical > max) max = s_reverse_vertical;
    }
    int s_reverse_horizontal = 0;
    if(x + 1 < n && y + 2 < m) {
        s_reverse_horizontal = tetris[x][y] + tetris[x][y + 1] + tetris[x + 1][y + 1] + tetris[x + 1][y + 2];
        if(s_reverse_horizontal > max) max = s_reverse_horizontal;
    }
    return max;
}
int tetromino_T(const vector<vector<int>>& tetris, int n, int m, int x, int y) {
    int max = 0;
    int T1 = 0;
    if(x + 1 < n && y + 2 < m) {
        T1 = tetris[x][y] + tetris[x][y + 1] + tetris[x][y + 2] + tetris[x + 1][y + 1];
        if(T1 > max) max = T1;
    }
    int T2 = 0;
    if(x - 2 >= 0 && y + 1 < m) {
        T2 = tetris[x][y] + tetris[x - 1][y] + tetris[x - 2][y] + tetris[x - 1][y + 1];
        if(T2 > max) max = T2;
    }
    int T3 = 0;
    if(x - 1 >= 0 && y - 2 >= 0) {
        T3 = tetris[x][y] + tetris[x][y - 1] + tetris[x][y - 2] + tetris[x - 1][y - 1];
        if(T3 > max) max = T3;
    }
    int T4 = 0;
    if(x + 2 < n && y - 1 >= 0) {
        T4 = tetris[x][y] + tetris[x + 1][y] + tetris[x + 2][y] + tetris[x + 1][y - 1];
        if(T4 > max) max = T4;
    }
    return max;
}

int findMax(const vector<vector<int>>& tetris, int n, int m) {
    int max = 0;
    int I;
    int O;
    int L;
    int S;
    int T;
    for(int i = 0 ; i < n ; i++) {
        for(int j = 0 ; j < m ; j++) {
            I = tetromino_I(tetris, n, m, i, j);
            if(I > max) max = I;
            O = tetromino_O(tetris, n, m, i, j);
            if(O > max) max = O;
            L = tetromino_L(tetris, n, m, i, j);
            if(L > max) max = L;
            S = tetromino_S(tetris, n, m, i, j);
            if(S > max) max = S;
            T = tetromino_T(tetris, n, m, i, j);
            if(T > max) max = T;
        }
    }

    return max;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    int n, m;
    cin >> n >> m;

    vector<vector<int>> tetris(n, vector<int>(m));
    for(int i = 0 ; i < n ; i++) {
        for(int j = 0 ; j < m ; j++) {
            cin >> tetris[i][j];
        }
    }

    cout << findMax(tetris, n, m);
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 위와 같이 모든 경우의 수를 나열하는 것 말고, DFS 그래프 탐색을 이용한 풀이도 생각해보았다.  
다만, 이미 탐색한 전적이 있는 경우도 중복으로 탐색되어,  
효율성이 많이 떨어지는데, 이에 대한 해결책은 찾지 못하였다.  
백트래킹을 이용하는 것 같은데,,

```c++
#include <iostream>
#include <vector>
using namespace std;

// T는 따로 처리
int tetromino_T(const vector<vector<int>>& tetris, int n, int m, int x, int y) {
    int max = 0;
    int T1 = 0;
    if(x + 1 < n && y + 2 < m) {
        T1 = tetris[x][y] + tetris[x][y + 1] + tetris[x][y + 2] + tetris[x + 1][y + 1];
        if(T1 > max) max = T1;
    }
    int T2 = 0;
    if(x - 2 >= 0 && y + 1 < m) {
        T2 = tetris[x][y] + tetris[x - 1][y] + tetris[x - 2][y] + tetris[x - 1][y + 1];
        if(T2 > max) max = T2;
    }
    int T3 = 0;
    if(x - 1 >= 0 && y - 2 >= 0) {
        T3 = tetris[x][y] + tetris[x][y - 1] + tetris[x][y - 2] + tetris[x - 1][y - 1];
        if(T3 > max) max = T3;
    }
    int T4 = 0;
    if(x + 2 < n && y - 1 >= 0) {
        T4 = tetris[x][y] + tetris[x + 1][y] + tetris[x + 2][y] + tetris[x + 1][y - 1];
        if(T4 > max) max = T4;
    }
    return max;
}

// 나머지 모양들은 dfs로 처리 가능
int dfs_search(const vector<vector<int>>& tetris, vector<vector<bool>> visited, int n, int m, int x, int y, int count = 1) {
    visited[x][y] = true;
    if(count == 4) {
        return tetris[x][y];
    }
    int max = 0;
    int dfs;
    if(x - 1 >= 0 && !visited[x - 1][y]) {
        dfs = dfs_search(tetris, visited, n, m, x - 1, y, count + 1) + tetris[x][y];
        if(dfs > max) max = dfs;
    }
    if(x + 1 < n && !visited[x + 1][y]) {
        dfs = dfs_search(tetris, visited, n, m, x + 1, y, count + 1) + tetris[x][y];
        if(dfs > max) max = dfs;
    }
    if(y - 1 >= 0 && !visited[x][y - 1]) {
        dfs = dfs_search(tetris, visited, n, m, x, y - 1, count + 1) + tetris[x][y];
        if(dfs > max) max = dfs;
    }
    if(y + 1 < m && !visited[x][y + 1]) {
        dfs = dfs_search(tetris, visited, n, m, x, y + 1, count + 1) + tetris[x][y];
        if(dfs > max) max = dfs;
    }
    return max;
}

int findMax(const vector<vector<int>>& tetris, int n, int m) {
    int max = 0;
    int dfs;
    vector<vector<bool>> visited(n, vector<bool>(m));
    int T;
    for(int i = 0 ; i < n ; i++) {
        for(int j = 0 ; j < m ; j++) {
            for(int k = 0 ; k < n ; k++) {
                for(int l = 0 ; l < m ; l++) {
                    visited[k][l] = false;
                }
            }
            dfs = dfs_search(tetris, visited, n, m, i, j);
            if(dfs > max) max = dfs;
            T = tetromino_T(tetris, n, m, i, j);
            if(T > max) max = T;
        }
    }

    return max;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    int n, m;
    cin >> n >> m;

    vector<vector<int>> tetris(n, vector<int>(m));
    for(int i = 0 ; i < n ; i++) {
        for(int j = 0 ; j < m ; j++) {
            cin >> tetris[i][j];
        }
    }

    cout << findMax(tetris, n, m);
}
```

</div>
</details> 

[def]: https://www.acmicpc.net/problem/14500