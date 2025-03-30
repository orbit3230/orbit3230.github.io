---
layout: post
title: "[데일리 백준] 16935"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-03-30
last_modified_at: 2025-03-30
---
## Gold
### [16935][def]

```c++
#include <iostream>
#include <vector>
using namespace std;

void function1(vector<vector<int>>& matrix, int n, int m) {
    for(int j = 0 ; j < m ; j++) {
        int row = n-1;
        for(int i = 0 ; i < n>>1 ; i++) {
            swap(matrix[i][j], matrix[row--][j]);
        }
    }
}
void function2(vector<vector<int>>& matrix, int n, int m) {
    for(int i = 0 ; i < n ; i++) {
        int col = m-1;
        for(int j = 0 ; j < m>>1 ; j++) {
            swap(matrix[i][j], matrix[i][col--]);
        }
    }
}
void function3(vector<vector<int>>& matrix, int n, int m) {
    vector<vector<int>> result(m, vector<int>(n));
    for(int i = 0 ; i < n ; i++) {
        int col = n-1-i;
        for(int j = 0 ; j < m ; j++) {
            result[j][col] = matrix[i][j];
        }
    }
    matrix = result;
}
void function4(vector<vector<int>>& matrix, int n, int m) {
    vector<vector<int>> result(m, vector<int>(n));
    for(int i = 0 ; i < n ; i++) {
        int col = i;
        int row = m-1;
        for(int j = 0 ; j < m ; j++) {
            result[row--][col] = matrix[i][j];
        }
    }
    matrix = result;
}
void function5(vector<vector<int>>& matrix, int n, int m) {
    vector<vector<int>> result(n, vector<int>(m));
    int subRow = n>>1;
    int subCol = m>>1;
    for(int i = 0 ; i < subRow ; i++) {
        for(int j = 0 ; j < subCol ; j++) {
            result[i][j+subCol] = matrix[i][j];
        }
    }
    for(int i = 0 ; i < subRow ; i++) {
        for(int j = subCol ; j < m ; j++) {
            result[i+subRow][j] = matrix[i][j];
        }
    }
    for(int i = subRow ; i < n ; i++) {
        for(int j = subCol ; j < m ; j++) {
            result[i][j-subCol] = matrix[i][j];
        }
    }
    for(int i = subRow ; i < n ; i++) {
        for(int j = 0 ; j < subCol ; j++) {
            result[i-subRow][j] = matrix[i][j];
        }
    }
    matrix = result;
}
void function6(vector<vector<int>>& matrix, int n, int m) {
    vector<vector<int>> result(n, vector<int>(m));
    int subRow = n>>1;
    int subCol = m>>1;
    for(int i = 0 ; i < subRow ; i++) {
        for(int j = 0 ; j < subCol ; j++) {
            result[i+subRow][j] = matrix[i][j];
        }
    }
    for(int i = 0 ; i < subRow ; i++) {
        for(int j = subCol ; j < m ; j++) {
            result[i][j-subCol] = matrix[i][j];
        }
    }
    for(int i = subRow ; i < n ; i++) {
        for(int j = subCol ; j < m ; j++) {
            result[i-subRow][j] = matrix[i][j];
        }
    }
    for(int i = subRow ; i < n ; i++) {
        for(int j = 0 ; j < subCol ; j++) {
            result[i][j+subCol] = matrix[i][j];
        }
    }
    matrix = result;
}

void printMatrix(const vector<vector<int>>& matrix, int n, int m) {
    for(int i = 0 ; i < n ; i++) {
        for(int j = 0 ; j < m ; j++) {
            cout << matrix[i][j] << ' ';
        }
        cout << '\n';
    }
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    int n, m, r;
    cin >> n >> m >> r;
    vector<vector<int>> matrix(n, vector<int>(m));
    for(int i = 0; i < n; i++) {
        for (int j = 0; j < m; j++) {
            cin >> matrix[i][j];
        }
    }
    int type;
    for(int i = 0 ; i < r ; i++) {
        cin >> type;
        n = matrix.size();
        m = matrix[0].size();
        switch(type) {
            case 1 :
                function1(matrix, n, m);
                break;
            case 2 :
                function2(matrix, n, m);
                break;
            case 3 :
                function3(matrix, n, m);
                break;
            case 4 :
                function4(matrix, n, m);
                break;
            case 5 :
                function5(matrix, n, m);
                break;
            case 6 :
                function6(matrix, n, m);
                break;
        }
    }
    n = matrix.size();
    m = matrix[0].size();
    printMatrix(matrix, n, m);
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 구현 (무지성)

</div>
</details>

[def]: https://www.acmicpc.net/problem/16935