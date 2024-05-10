---
layout: post
title: "[데일리 백준] 1652"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-05-10
last_modified_at: 2024-05-10
---
## Silver
### [1652][def]

```c++
#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;

    string room[n];
    for(int i = 0 ; i < n ; i++) {
        cin >> room[i];
    }

    // 가로
    int count = 0;
    int stretch;
    for(int i = 0 ; i < n ; i++) {
        stretch = 0;
        for(int j = 0 ; j < n ; j++) {
            if(room[i][j] == '.') {
                stretch++;
            }
            else {
                stretch = 0;
            }
            if(stretch == 2) {
                count++;
            }
        }
    }
    cout << count << " ";

    // 세로
    count = 0;
    stretch = 0;
    for(int i = 0 ; i < n ; i++) {
        stretch = 0;
        for(int j = 0 ; j < n ; j++) {
            if(room[j][i] == '.') {
                stretch++;
            }
            else {
                stretch = 0;
            }
            if(stretch == 2) {
                count++;
            }
        }
    }
    cout << count;

}
```

[def]: https://www.acmicpc.net/problem/1652