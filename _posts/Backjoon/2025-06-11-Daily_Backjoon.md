---
layout: post
title: "[데일리 백준] 11332"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-06-11
last_modified_at: 2025-06-11
---
## Silver
### [11332][def]

```c++
#include <iostream>
using namespace std;

int main() {
    int c;
    cin >> c;
    string complexity;
    long long n, t, l;
    while(c--) {
        cin >> complexity;
        cin >> n >> t >> l;
        int time = l*100000000;
        if(complexity == "O(N)") {
            if(n * t <= time) {
                cout << "May Pass.\n";
                continue;
            }
            cout << "TLE!\n";
        }
        if(complexity == "O(N^2)") {
            if(n * n * t <= time) {
                cout << "May Pass.\n";
                continue;
            }
            cout << "TLE!\n";
        }
        if(complexity == "O(N^3)") {
            if(n > 10000) {
                cout << "TLE!\n";
                continue;
            }
            if(n * n * n * t <= time) {
                cout << "May Pass.\n";
                continue;
            }
            cout << "TLE!\n";
        }
        if(complexity == "O(2^N)") {
            if(n > 40) {
                cout << "TLE!\n";
                continue;
            }
            if((1LL << n) * t <= time) {
                cout << "May Pass.\n";
                continue;
            }
            cout << "TLE!\n";
        }
        if(complexity == "O(N!)") {
            if(n > 20) {
                cout << "TLE!\n";
                continue;
            }
            long long factorial = 1;
            for(long long i = 2; i <= n; i++) {
                factorial *= i;
                if(factorial * t > time) {
                    cout << "TLE!\n";
                    break;
                }
            }
            if(factorial * t <= time) {
                cout << "May Pass.\n";
            }
        }
    }
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 조건 (날먹)

</div>
</details>

[def]: https://www.acmicpc.net/problem/11332