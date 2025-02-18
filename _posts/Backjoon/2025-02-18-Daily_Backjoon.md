---
layout: post
title: "[데일리 백준] 16931"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-02-18
last_modified_at: 2025-02-18
---
## Silver
### [16931][def]

```c++
#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n, m;
    cin >> n >> m;
    vector<vector<int>> cube(n, vector<int>(m));
    for(int i = 0 ; i < n ; i++) {
        for(int j = 0 ; j < m ; j++) cin >> cube[i][j];
    }
    int count = 2 * n * m;
    int prev;
    // front
    for(int j = 0 ; j < m ; j++) {
        prev = 0;
        for(int i = n-1 ; i >= 0 ; i--) {
            if(cube[i][j] > prev) count += cube[i][j] - prev;
            prev = cube[i][j];
        }
    }
    // back
    for(int j = 0 ; j < m ; j++) {
        prev = 0;
        for(int i = 0 ; i < n ; i++) {
            if(cube[i][j] > prev) count += cube[i][j] - prev;
            prev = cube[i][j];
        }
    }
    // left
    for(int i = 0 ; i < n ; i++) {
        prev = 0;
        for(int j = 0 ; j < m ; j++) {
            if(cube[i][j] > prev) count += cube[i][j] - prev;
            prev = cube[i][j];
        }
    }
    // right
    for(int i = 0 ; i < n ; i++) {
        prev = 0;
        for(int j = m-1 ; j >= 0 ; j--) {
            if(cube[i][j] > prev) count += cube[i][j] - prev;
            prev = cube[i][j];
        }
    }
    cout << count;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 3차원 기하학

</div>
</details>

[def]: https://www.acmicpc.net/problem/16931