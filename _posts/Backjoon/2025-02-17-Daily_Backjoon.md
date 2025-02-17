---
layout: post
title: "[데일리 백준] 6588"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-02-17
last_modified_at: 2025-02-17
---
## Silver
### [6588][def]

```c++
#include <iostream>
#include <vector>
#include <set>
#define MAX 1000000
using namespace std;

void eratos(vector<bool>& isPrime, int max) {
    isPrime[0] = isPrime[1] = false;
    for(int base = 2 ; base * base <= max ; base++) {
        if(isPrime[base]) {
            for(int i = base * base ; i <= max ; i += base) {
                isPrime[i] = false;
            }
        }
    }
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    vector<bool> isPrime(MAX+1, true);
    eratos(isPrime, MAX);
    int n;
    while(cin >> n) {
        if(!n) break;
        for(int i = 2 ; i <= n/2 ; i++) {
            if(isPrime[i] && isPrime[n-i]) {
                cout << n << " = " << i << " + " << n-i << '\n';
                break;
            }
        }
    }
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 소수 판정

</div>
</details>

[def]: https://www.acmicpc.net/problem/6588