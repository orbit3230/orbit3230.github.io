---
layout: post
title: "[데일리 백준] 2630"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-06-06
last_modified_at: 2024-06-06
---
## Silver
### [2630][def]

```c++
#include <iostream>
using namespace std;

int white = 0;
int blue = 0;

// [from_x, to_x), [from_y, to_y)
void split(bool **paper, int from_x, int from_y, int to_x, int to_y) {
    bool color = paper[from_y][from_x];
    for(int i = from_y ; i < to_y ; i++) {
        for(int j = from_x ; j < to_x ; j++) {
            if(paper[i][j] != color)
                goto division;
        }
    }
    // for 문을 통과했다면 해당 조각은 단색.
    if(color)
        blue++;
    else
        white++;
    return;

    division:
    split(paper, from_x, from_y, (from_x + to_x) / 2, (from_y + to_y) / 2);  // 좌상단
    split(paper, (from_x + to_x) / 2, from_y, to_x, (from_y + to_y) / 2);    // 우상단
    split(paper, from_x, (from_y + to_y) / 2, (from_x + to_x) / 2, to_y);    // 좌하단
    split(paper, (from_x + to_x) / 2, (from_y + to_y) / 2, to_x, to_y);      // 우하단

}

int main() {
    int n;
    cin >> n;

    bool **paper = new bool*[n];
    for(int i = 0 ; i < n ; i++) {
        paper[i] = new bool[n];
        for(int j = 0 ; j < n ; j++) {
            cin >> paper[i][j];
        }
    }

    split(paper, 0, 0, n, n);

    cout << white << '\n' << blue;
}
```

[def]: https://www.acmicpc.net/problem/2630