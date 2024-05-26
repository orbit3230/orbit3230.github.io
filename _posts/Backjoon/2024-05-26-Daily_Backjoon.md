---
layout: post
title: "[데일리 백준] 1543"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-05-25
last_modified_at: 2024-05-25
---
## Silver
### [1543][def]

```c++
#include <iostream>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
	cin.tie(NULL);
	cout.tie(NULL);

    int n, m;
    cin >> n >> m;
    
    // 2차원 배열을 일렬로 쭉 늘어놓을 것이다.  
    int* array = (int *)malloc(sizeof(int) * (n * m));
    for(int i = 0 ; i < n*m ; i++) {
        cin >> array[i];
        array[i] += (i % m == 0) ? 0 : array[i-1];  // 각 행의 누적 합으로 저장
    }
    int k;
    cin >> k;
    for(int t = 0 ; t < k ; t++) {
        int i, j, x, y;
        cin >> i >> j >> x >> y;
        i--; j--; x--; y--; // 0부터 시작하도록 adjust

        int sum = 0;
        for(int row = i ; row <= x ; row++) {
            sum += array[m*row + y];
            if(j != 0)
                sum -= array[(m*row + j)-1];
        }

        cout << sum << '\n';
    }
}
```

[def]: https://www.acmicpc.net/problem/1543