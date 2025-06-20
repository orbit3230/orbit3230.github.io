---
layout: post
title: "[데일리 백준] 9020"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-06-20
last_modified_at: 2025-06-20
---
## Silver
### [9020][def]

```c++
#include <iostream>
#include <vector>
#include <unordered_set>
using namespace std;

void eratos(unordered_set<int>& primes, int n) {
    vector<bool> isPrime(n, true);
    for(int base = 2 ; base * base < n ; base++) if(isPrime[base]) for(int i = base * base ; i < n ; i += base) isPrime[i] = false;
    for(int i = 2 ; i < n ; i++) if(isPrime[i]) primes.insert(i);
}

pair<int, int> finding(unordered_set<int>& primes, int n) {
    int pointer = n >> 1;
    while(pointer >= 2) {
        if(primes.find(pointer) != primes.end() && primes.find(n - pointer) != primes.end()) {
            return {pointer, n - pointer};
        }
        pointer--;
    }
}

int main() {
    int t;
    cin >> t;
    unordered_set<int> primes;
    eratos(primes, 10000);
    while(t--) {
        int n;
        cin >> n;
        pair<int, int> result = finding(primes, n);
        cout << result.first << ' ' << result.second << '\n';
    }
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 소수 판정 (날먹)

</div>
</details>

[def]: https://www.acmicpc.net/problem/9020