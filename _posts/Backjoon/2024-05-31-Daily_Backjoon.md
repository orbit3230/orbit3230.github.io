---
layout: post
title: "[데일리 백준] 1065"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-05-31
last_modified_at: 2024-05-31
---
## Silver
### [1065][def]

```c++
#include <iostream>
using namespace std;

bool isHansu(int i) {
    // 네 자리수(only 1000) : 한수 X
    if(i == 1000)
        return false;

    // 세 자리수 : 검증 필요
    int first;
    if(first = i / 100) {
        int second = (i - first*100) / 10;
        int third = (i - first*100 - second*10);
        if(first - second == second - third)
            return true;
        else
            return false;
    }

    // 두 자리수, 한 자리수 : 무조건 한수
    return true;
}

int main() {
    int n;
    cin >> n;

    int count = 0;
    for(int i = 1 ; i <= n ; i++) {
        if(isHansu(i))
            count++;
    }
    cout << count;
}
```

[def]: https://www.acmicpc.net/problem/1065