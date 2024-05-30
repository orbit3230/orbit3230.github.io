---
layout: post
title: "[데일리 백준] 2134"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-05-30
last_modified_at: 2024-05-30
---
## Silver
### [2134][def]

```c++
#include <iostream>
using namespace std;

int main() {
    int n, m, k;
    // n : # of floors (of original storage)
    // m : # of floors (of new storage)
    // k : # of workers
    cin >> n >> m >> k;

    int origin[n];
    int origin_sum = 0;
    for(int i = 0 ; i < n ; i++) {
        cin >> origin[i];
        origin_sum += origin[i];
    }

    int newS[m];
    int new_Sum = 0;
    for(int i = 0 ; i < m ; i++) {
        cin >> newS[i];
        new_Sum += newS[i];
    }

    int x = (origin_sum > new_Sum) ? new_Sum : origin_sum;
    int x_copy = x;
    long y = 0;

    int index = 0;
    while(true) {
        if(origin[index] >= x_copy) {  // 해당 층에 있는 것을 다 못 옮기는 경우 (혹은 딱맞게)
            y += x_copy * (index+1);
            break;
        }
        else {
            y += origin[index] * (index+1);
            x_copy -= origin[index];
        }
        index++;
    }

    x_copy = x;
    index = 0;
    while(true) {
        if(newS[index] >= x_copy) {  // 해당 층에 있는 것을 다 못 옮기는 경우 (혹은 딱맞게)
            y += x_copy * (index+1);
            break;
        }
        else {
            y += newS[index] * (index+1);
            x_copy -= newS[index];
        }
        index++;
    }

    cout << x << " " << y;
}
```

[def]: https://www.acmicpc.net/problem/2134