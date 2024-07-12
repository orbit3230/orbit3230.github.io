---
layout: post
title: "[데일리 백준] 30678"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-07-12
last_modified_at: 2024-07-12
---
## Gold
### [30678][def]

```c++
#include <iostream>
#include <vector>
#include <cmath>
using namespace std;

void draw(vector<vector<char>>& result, int nth, bool star, int size, int x = 0, int y = 0) {
    if(nth == 0) {
        if(star) result[x][y] = '*';
        else result[x][y] = ' ';
        return;
    }

    int newSize = size / 5; // 각 하위 그리드의 크기를 계산
    for(int i = 0 ; i < 5 ; i++) {
        for(int j = 0 ; j < 5 ; j++) {
            if(star) {
                if((i == 0 || i == 1) && (j == 2)) draw(result, nth - 1, true, newSize, x + i*newSize, y + j*newSize);
                else if(i == 2) draw(result, nth - 1, true, newSize, x + i*newSize, y + j*newSize);
                else if(i == 3 && (j == 1 || j == 2 || j == 3)) draw(result, nth - 1, true, newSize, x + i*newSize, y + j*newSize);
                else if(i == 4 && (j == 1 || j == 3)) draw(result, nth - 1, true, newSize, x + i*newSize, y + j*newSize);
                else draw(result, nth - 1, false, newSize, x + i*newSize, y + j*newSize);
            }
            else draw(result, nth - 1, false, newSize, x + i*newSize, y + j*newSize);
        }
    }
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    int n;
    cin >> n;
    int size = ceil(pow(5, n));
    vector<vector<char>> result(size, vector<char>(size));
    draw(result, n, true, size);
    for(int i = 0 ; i < size ; i++) {
        for(int j = 0 ; j < size ; j++) {
            cout << result[i][j];
        }
        cout << '\n';
    }
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- `int size = pow(5, 2)` -> `24` ??!!  
SO MUCH TROUBLE . . .

</div>
</details> 

[def]: https://www.acmicpc.net/problem/30678