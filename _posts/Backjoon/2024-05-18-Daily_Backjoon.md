---
layout: post
title: "[데일리 백준] 1475"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-05-18
last_modified_at: 2024-05-18
---
## Silver
### [1475][def]

```c++
#include <iostream>
#include <string>
#include <math.h>
using namespace std;

int needSets(string room) {
    int num[10] = {0, };
    for(int i = 0 ; i < room.length() ; i++) {
        num[room[i] - '0']++;
    }
    // 6과 9는 하나로 묶어서 생각
    num[6] += num[9];
    num[6] = ceil((double)num[6] / 2);
    num[9] = 0;
    
    int max = 0;
    for(int i = 0 ; i < 10 ; i++) {
        if(num[i] > max) {
            max = num[i];
        }
    }
    return max;
}

int main() {
    string room;
    cin >> room;
    cout << needSets(room);
}
```

[def]: https://www.acmicpc.net/problem/1475