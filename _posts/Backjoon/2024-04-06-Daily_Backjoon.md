---
layout: post
title: "[데일리 백준] 15829"
excerpt: "1 Bronze"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-04-06
last_modified_at: 2024-04-06
---
## Bronze
### [15829][def]

```c++
#include <iostream>
#include <math.h>
using namespace std;

int main() {
    int length;
    cin >> length;
    string str;
    cin >> str;

    int seq;
    unsigned long long pows;
    unsigned long long hash = 0;
    for(int i = 0 ; i < length ; i++) {
        seq = (str[i] - 'a' + 1);
        pows = 1;
        for(int p = 0 ; p < i ; p++) {
            pows *= 31;
            pows %= 1234567891;
        }
        hash += seq * pows;
    }
    hash %= 1234567891;

    cout << hash;
}
```

[def]: https://www.acmicpc.net/problem/15829