---
layout: post
title: "[데일리 백준] 1484"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-08-02
last_modified_at: 2025-08-02
---
## Gold
### [1484][def]

```c++
#include <iostream>
#include <vector>
#define MAX 50001
using namespace std;

long long calculate(int i, int g) {
    return g + (long long)i*i;
}

int main() {
    ios::sync_with_stdio(false);
    cout.tie(NULL);

    int g;
    cin >> g;

    vector<long long> squares(MAX);
    for(long long i = 0 ; i < MAX ; i++) squares[i] = i*i;

    int pointer = 0;
    bool flag = false;
    for(int i = 1 ; i < MAX ; i++) {
        long long y = calculate(i, g);
        while(pointer < MAX && squares[pointer] < y) pointer++;
        if(squares[pointer] == y) {
            cout << pointer << '\n';
            flag = true;
        }
    }
    if(!flag) cout << -1;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- Math

</div>
</details>

[def]: https://www.acmicpc.net/problem/1484