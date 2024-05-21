---
layout: post
title: "[데일리 백준] 2669"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-05-21
last_modified_at: 2024-05-21
---
## Silver
### [2669][def]

```c++
#include <iostream>
using namespace std;

int main() {
    bool graph[100][100] = {false, };

    int x1, y1, x2, y2;
    for(int i = 0 ; i < 4 ; i++) {
        cin >> x1 >> y1 >> x2 >> y2;
        for(int x = x1 ; x < x2 ; x++) {
            for(int y = y1 ; y < y2 ; y++) {
                graph[x][y] = true;
            }
        }
    }

    int sum = 0;
    for(int i = 0 ; i < 100 ; i++) {
        for(int j = 0 ; j < 100 ; j++) {
            if(graph[i][j])
                sum++;
        }
    }
    cout << sum;
}
```

[def]: https://www.acmicpc.net/problem/2669