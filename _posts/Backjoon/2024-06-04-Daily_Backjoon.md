---
layout: post
title: "[데일리 백준] 11047"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-06-04
last_modified_at: 2024-06-04
---
## Silver
### [11047][def]

```c++
#include <iostream>
using namespace std;

int num_of_coins = 0;

void needCoins(int *coins, int n, int have) {
    int isAvailable = n-1;
    if(have == 0) {
        return;
    }
    while(coins[isAvailable] > have) {
        isAvailable -= 1;
    }
    num_of_coins += have / coins[isAvailable];
    have = have - (have / coins[isAvailable]) * coins[isAvailable];
    needCoins(coins, isAvailable, have);
}

int main() {
    int n, k;
    cin >> n >> k;

    int coins[n];
    for(int i = 0 ; i < n ; i++) {
        cin >> coins[i];
    }

    needCoins(coins, n, k);

    cout << num_of_coins << '\n';
}
```

[def]: https://www.acmicpc.net/problem/11047