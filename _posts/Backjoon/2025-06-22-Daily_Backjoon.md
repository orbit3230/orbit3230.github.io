---
layout: post
title: "[데일리 백준] 4948"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-06-22
last_modified_at: 2025-06-22
---
## Silver
### [4948][def]

```c++
#include <iostream>
#include <vector>
#define MAX 123456 << 1
using namespace std;

void eratos(vector<int>& primes) {
    vector<bool> isPrime(MAX, true);
    for(int base = 2 ; base * base < MAX ; base++) {
        if(isPrime[base]) for(int i = base * base ; i < MAX ; i += base) isPrime[i] = false;
    }
    for(int i = 2 ; i < MAX ; i++) if(isPrime[i]) primes.push_back(i);
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    vector<int> primes;
    eratos(primes);
    int n;
    while(cin >> n) {
        if(!n) break;
        int n_2 = n << 1;
        int count = 0;
        for(int prime : primes) {
            if(prime > n && prime <= n_2) count++;
        }
        cout << count << '\n';
    }
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 소수 판정 (날먹)

</div>
</details>

[def]: https://www.acmicpc.net/problem/4948