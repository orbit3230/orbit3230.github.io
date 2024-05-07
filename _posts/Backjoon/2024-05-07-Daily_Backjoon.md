---
layout: post
title: "[데일리 백준] 2563"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-05-07
last_modified_at: 2024-05-07
---
## Silver
### [2563][def]

```c++
#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;

    bool paper[100][100] = {false};
    int x;
    int y;
    for(int i = 0 ; i < n ; i++) {
        cin >> x >> y;
        for(int r = x ; r < x+10 ; r++) {
            for(int c = y ; c < y+10 ; c++) {
                paper[r][c] = true;
            }
        }
    }
    int area = 0;
    for(int r = 0 ; r < 100 ; r++) {
        for(int c = 0 ; c < 100 ; c++) {
            if(paper[r][c])
                area++;
        }
    }
    cout << area;
}
```

[def]: https://www.acmicpc.net/problem/2563