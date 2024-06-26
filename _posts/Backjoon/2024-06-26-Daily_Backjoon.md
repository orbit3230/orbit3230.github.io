---
layout: post
title: "[데일리 백준] 3063"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-06-26
last_modified_at: 2024-06-26
---
## Silver
### [3063][def]

```c++
#include <iostream>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    int t;
    cin >> t;
    int x1, y1, x2, y2, x1_, x2_, y1_, y2_;
    int origin_area;
    int overlap_area;
    for(int i = 0 ; i < t ; i++) {
        cin >> x1 >> y1 >> x2 >> y2 >> x1_ >> y1_ >> x2_ >> y2_;
        origin_area = (x2 - x1) * (y2 - y1);
        // 겹치지 않는 경우
        if(x1_ >= x2 || x2_ <= x1 || y1_ >= y2 || y2_ <= y1) {
            overlap_area = 0;
        }
        // 겹치는 경우
        else {
            if(x1_ < x1) x1_ = x1;
            if(y1_ < y1) y1_ = y1;
            if(x2_ > x2) x2_ = x2;
            if(y2_ > y2) y2_ = y2;
            overlap_area = (x2_ - x1_) * (y2_ - y1_);
        }

        cout << origin_area - overlap_area << '\n';
    }
}
``` 

[def]: https://www.acmicpc.net/problem/3063