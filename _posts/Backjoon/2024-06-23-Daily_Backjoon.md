---
layout: post
title: "[데일리 백준] 1358"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-06-23
last_modified_at: 2024-06-23
---
## Silver
### [1358][def]

```c++
#include <iostream>
using namespace std;

// width, height, x, y, # of players
int w, h, x, y, p;

bool isIn(int x_, int y_) {
    if(y_ >= y && y_ <= y + h) {
        // 1. 정사각형 범위 내
        if(x_ >= x && x_ <= x + w)
            return true;
        // 2. 왼쪽 반원 범위 내
        int radius = h / 2;
        int distance = (x_ - x) * (x_ - x) + (y_ - (y + radius)) * (y_ - (y + radius));
        if(distance <= radius * radius)
            return true;
        // 3. 오른쪽 반원 범위 내
        distance = (x_ - (x + w)) * (x_ - (x + w)) + (y_ - (y + radius)) * (y_ - (y + radius));
        if(distance <= radius * radius)
            return true;
    }
    return false;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    cin >> w >> h >> x >> y >> p;

    int x_, y_;
    int count = 0;
    for(int i = 0 ; i < p ; i++) {
        cin >> x_ >> y_;
        if(isIn(x_, y_))
            count++;
    }
    cout << count;
}
``` 

[def]: https://www.acmicpc.net/problem/1358