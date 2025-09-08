---
layout: post
title: "[데일리 백준] 1025"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-09-08
last_modified_at: 2025-09-08
---
## Gold
### [1025][def]

```c++
#include <iostream>
#include <vector>
#include <unordered_set>
#define MAX 1000000000
using namespace std;

void init(unordered_set<int>& powers) {
    int base = 0;
    while(base * base < MAX) {
        powers.insert(base * base);
        base++;
    }
}

void find(vector<vector<int>> map, unordered_set<int>& powers, int& max, int n, int m) {
    int num, row, col;
    for(int row_step = 0 ; row_step <= n ; row_step++) {
        for(int col_step = 0 ; col_step <= m ; col_step++) {
            if(!row_step && !col_step) continue;
            for(int startRow = 0 ; startRow < n ; startRow++) {
                for(int startCol = 0 ; startCol < m ; startCol++) {
                    row = startRow;
                    col = startCol;
                    num = 0;
                    while(row < n && col < m && row >= 0 && col >= 0) {
                        num *= 10;
                        num += map[row][col];
                        if(powers.find(num) != powers.end()) max = std::max(max, num);
                        row += row_step;
                        col += col_step;
                    }
                }
            }
        }
    }
    for(int row_step = 0 ; row_step <= n ; row_step++) {
        for(int col_step = 0 ; col_step <= m ; col_step++) {
            if(!row_step && !col_step) continue;
            for(int startRow = n-1 ; startRow >= 0 ; startRow--) {
                for(int startCol = 0 ; startCol < m ; startCol++) {
                    row = startRow;
                    col = startCol;
                    num = 0;
                    while(row >= 0 && col < m) {
                        num *= 10;
                        num += map[row][col];
                        if(powers.find(num) != powers.end()) max = std::max(max, num);
                        row -= row_step;
                        col += col_step;
                    }
                }
            }
        }
    }
    for(int row_step = 0 ; row_step <= n ; row_step++) {
        for(int col_step = 0 ; col_step <= m ; col_step++) {
            if(!row_step && !col_step) continue;
            for(int startRow = 0 ; startRow < n ; startRow++) {
                for(int startCol = m-1 ; startCol >= 0 ; startCol--) {
                    row = startRow;
                    col = startCol;
                    num = 0;
                    while(row < n && col >= 0) {
                        num *= 10;
                        num += map[row][col];
                        if(powers.find(num) != powers.end()) max = std::max(max, num);
                        row += row_step;
                        col -= col_step;
                    }
                }
            }
        }
    }
    for(int row_step = 0 ; row_step <= n ; row_step++) {
        for(int col_step = 0 ; col_step <= m ; col_step++) {
            if(!row_step && !col_step) continue;
            for(int startCol = m-1 ; startCol >= 0 ; startCol--) {
                for(int startRow = n-1 ; startRow >= 0 ; startRow--) {
                    row = startRow;
                    col = startCol;
                    num = 0;
                    while(row >= 0 && col >= 0) {
                        num *= 10;
                        num += map[row][col];
                        if(powers.find(num) != powers.end()) max = std::max(max, num);
                        row -= row_step;
                        col -= col_step;
                    }
                }
            }
        }
    }
}

int main() {
    int n, m;
    cin >> n >> m;
    vector<vector<int>> map(n, vector<int>(m));
    char input;
    for(int i = 0 ; i < n ; i++) {
        for(int j = 0 ; j < m ; j++) {
            cin >> input;
            map[i][j] = input - '0';
        }
    }
    unordered_set<int> powers;
    init(powers);

    int max = -1;
    find(map, powers, max, n, m);
    cout << max;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- Brute-Force

</div>
</details>

[def]: https://www.acmicpc.net/problem/1025