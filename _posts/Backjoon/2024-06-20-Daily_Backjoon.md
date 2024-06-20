---
layout: post
title: "[데일리 백준] 6064"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-06-20
last_modified_at: 2024-06-20
---
## Silver
### [6064][def]

```c++
#include <iostream>
using namespace std;

int calculate(int N, int M, int x, int y) {
    int gap = N - M;
    int result = x;
    int M_copy = M;
    M = (x % M == 0) ? M : x % M;
    do {
        if(M == y) break;
        M = ((M + gap) > 0) ? (M + gap) % M_copy : (M + gap) + M_copy;
        if(M == 0) M = M_copy;
        result += N;
    } while(result <= N * M_copy);
    if(M != y) return -1;
    return result;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    int t;
    cin >> t;

    int N, M, x, y;
    for(int i = 0 ; i < t ; i++) {
        cin >> N >> M >> x >> y;
        cout << calculate(N, M, x, y) << '\n';
    }
}
``` 

[def]: https://www.acmicpc.net/problem/6064