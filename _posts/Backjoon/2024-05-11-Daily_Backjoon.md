---
layout: post
title: "[데일리 백준] 12873"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-05-11
last_modified_at: 2024-05-11
---
## Silver
### [12873][def]

```c++
#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;

    // 0번 인덱스 미사용
    int list[n+1];
    int size = n;
    for(int i = 0 ; i < n+1 ; i++) {
        list[i] = i;
    }

    long round; // 현재 라운드에 돌아야 할 사람 수
    int kill;  // 죽일 인덱스
    int now = 1; // 라운드 시작 시 현재 바라보고 있는 번호
    for(long t = 1 ; t < n ; t++) {
        round = t * t * t;
        kill = (now + ((round % size)-1)) % size;
        kill = (kill == 0) ? size : kill;
        // kill person
        for(int i = kill ; i < size ; i++) {
            list[i] = list[i+1];
        }
        size--;
        now = (kill > size) ? 1 : kill;
    }
    cout << list[1];
}
```

[def]: https://www.acmicpc.net/problem/12873