---
layout: post
title: "[데일리 백준] 4134"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-05-09
last_modified_at: 2025-05-09
---
## Silver
### [4134][def]

```c++
#include <iostream>
using namespace std;

long long nextPrime(long long n) {
    if(n < 2) return 2;
    long long next = n;
    while(true) {
        for(long long i = 2; i*i <= next ; i++) {
            if(next % i == 0) goto NextSearch;
        }
        return next;
        NextSearch:
        next++;
    }
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    int t;
    cin >> t;
    for(int i = 0 ; i < t ; i++) {
        long long n;
        cin >> n;
        cout << nextPrime(n) << '\n';
    }
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 소수 판별 (날먹)

</div>
</details>

[def]: https://www.acmicpc.net/problem/4134