---
layout: post
title: "[데일리 백준] 1996"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-05-19
last_modified_at: 2025-05-19
---
## Silver
### [1996][def]

```c++
#include <iostream>
#include <vector>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    int n;
    cin >> n;
    vector<vector<char>> map(n, vector<char>(n));
    for(int i = 0 ; i < n ; i++) {
        string input;
        cin >> input;
        for(int j = 0 ; j < n ; j++) map[i][j] = input[j];
    }
    vector<vector<char>> solution(n, vector<char>(n));
    for(int i = 0 ; i < n ; i++) {
        for(int j = 0 ; j < n ; j++) {
            if(map[i][j] != '.') {
                solution[i][j] = '*';
                continue;
            }
            int count = 0;
            for(int x = -1 ; x<= 1 ; x++) {
                for(int y = -1 ; y<= 1 ; y++) {
                    if(x == 0 && y == 0) continue;
                    if(i + x < 0 || i + x >= n || j + y < 0 || j + y >= n) continue;
                    if(map[i + x][j + y] != '.') count += map[i + x][j + y] - '0';
                }
            }
            if(count >= 10) {
                solution[i][j] = 'M';
                continue;
            }
            solution[i][j] = count + '0';
        }
    }
    for(int i = 0 ; i < n ; i++) {
        for(int j = 0 ; j < n ; j++) cout << solution[i][j];
        cout << '\n';
    }
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 브루트포스 (날먹)

</div>
</details>

[def]: https://www.acmicpc.net/problem/1996