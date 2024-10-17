---
layout: post
title: "[데일리 백준] 10830"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-10-17
last_modified_at: 2024-10-17
---
## Gold
### [10830][def]

```c++
#include <iostream>
#include <vector>
#define DIV 1000
using namespace std;

void multiply(vector<vector<long long>>& a, const vector<vector<long long>>& b, int n) {
    vector<vector<long long>> temp(n, vector<long long>(n));
    for(int i = 0 ; i < n ; i++) {
        for(int j = 0 ; j < n ; j++) {
            long long sum = 0;
            for(int k = 0 ; k < n ; k++) {
                sum += (a[i][k] * b[k][j]) % DIV;
            }
            temp[i][j] = sum % DIV;
        }
    }
    a = temp;
}

void power(vector<vector<long long>>& matrix, long long b, const vector<vector<long long>>& origin, int n) {
    if(b == 1) return;
    power(matrix, b/2, origin, n);
    multiply(matrix, matrix, n);
    if(b % 2 == 1) {
        multiply(matrix, origin, n);
    }
    return;
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    int n;
    long long b;
    cin >> n >> b;
    vector<vector<long long>> matrix(n, vector<long long>(n));
    for(int i = 0 ; i < n ; i++) {
        for(int j = 0 ; j < n ; j++) {
            cin >> matrix[i][j];
            matrix[i][j] %= DIV;
        }
    }
    vector<vector<long long>> origin = matrix;
    power(matrix, b, origin, n);
    for(int i = 0 ; i < n ; i++) {
        for(int j = 0 ; j < n ; j++) {
            cout << matrix[i][j] << ' ';
        }
        cout << '\n';
    }
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 분할 정복을 통한 행렬의 거듭제곱 문제.  

- [백준 2749][def2] 문제의 기반이 되는 문제이다.  

</div>
</details>

[def]: https://www.acmicpc.net/problem/10830
[def2]: https://www.acmicpc.net/problem/2749