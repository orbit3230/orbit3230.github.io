---
layout: post
title: "[데일리 백준] 2023"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-11-18
last_modified_at: 2024-11-18
---
## Gold
### [2023][def]

```c++
#include <iostream>
using namespace std;

bool isPrime(int n) {
    for(int i = 2 ; i * i <= n ; i++) {
        if(n % i == 0) return false;
    }
    return true;
}

void makes(int num, int size, int n, int* list) {
    if(size == n) {
        cout << num << '\n';
        return;
    }
    num *= 10;
    for(int i = 0 ; i < 4 ; i++) {
        int p = list[i];
        if(isPrime(num+p)) {
            makes(num+p, size+1, n, list);
        }
    }
}

int main() {
    ios::sync_with_stdio(false);
    cout.tie(NULL);

    int n;
    cin >> n;
    int onesPrime[4] = {2, 3, 5, 7};
    int list[4] = {1, 3, 7, 9};
    for(int prime : onesPrime) {
        makes(prime, 1, n, list);
    }
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 무난한 백트래킹+소수 판별 문제.  

</div>
</details>

[def]: https://www.acmicpc.net/problem/2023