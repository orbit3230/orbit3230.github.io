---
layout: post
title: "[데일리 백준] 9465"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-11-02
last_modified_at: 2024-11-02
---
## Silver
### [9465][def]

```c++
#include <iostream>
#include <vector>
using namespace std;

void dp(vector<vector<short>>& stickers, vector<vector<int>>& dpTable, int n) {
    dpTable[0][1] = stickers[0][0];
    dpTable[1][1] = stickers[1][0];
    for(int j = 2 ; j < n+1 ; j++) {
        dpTable[0][j] = std::max(dpTable[1][j-1], dpTable[1][j-2]) + stickers[0][j-1];
        dpTable[1][j] = std::max(dpTable[0][j-1], dpTable[0][j-2]) + stickers[1][j-1];
    }
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    int t;
    cin >> t;
    for(int i = 0 ; i < t ; i++) {
        int n;
        cin >> n;
        vector<vector<short>> stickers(2, vector<short>(n));
        vector<vector<int>> dpTable(2, vector<int>(n+1, 0));
        for(int r = 0 ; r < 2 ; r++) {
            for(int c = 0 ; c < n ; c++) {
                cin >> stickers[r][c];
            }
        }
        dp(stickers, dpTable, n);
        int max = std::max(dpTable[0][n], dpTable[1][n]);
        cout << max << '\n';
    }
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 다이나믹 프로그래밍.

- 문제 발상을 떠올리는 것은 쉬웠는데,  
평소에 풀던대로 Top-Down으로 구현했더니 시간초과가 났다...
그래서 다소 익숙하지 않은 Bottom-Up으로 구현하려니 조금 어려웠음

</div>
</details>

[def]: https://www.acmicpc.net/problem/9465