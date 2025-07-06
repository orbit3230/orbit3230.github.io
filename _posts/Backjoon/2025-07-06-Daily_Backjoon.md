---
layout: post
title: "[데일리 백준] 15684"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-07-06
last_modified_at: 2025-07-06
---
## Gold
### [15684][def]

```c++
#include <iostream>
#include <vector>
using namespace std;

bool check(const vector<vector<int>>& ladder, int h, int n) {
    for(int i = 0 ; i < n ; i++) {
        int position = i;
        for(int j = 0 ; j < h ; j++) {
            if(ladder[j][position] != -1) position = ladder[j][position];
        }
        if(position != i) return false;
    }
    return true;
}

void addLadder(vector<vector<int>>& ladder, int h, int n, int row, int col, int count, int& min) {
    if(count > 3) return;
    if(check(ladder, h, n)) {
        min = std::min(min, count);
        return;
    }
    for(int i = row ; i < h ; i++) {
        for(int j = (i == row ? col : 0) ; j < n-1 ; j++) {
            if(ladder[i][j] != -1 || ladder[i][j+1] != -1) continue;
            ladder[i][j] = j+1;
            ladder[i][j+1] = j;
            int result;
            addLadder(ladder, h, n, i, j, count+1, min);
            ladder[i][j] = -1;
            ladder[i][j+1] = -1;
        }
    }
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);

    int n, m, h;
    cin >> n >> m >> h;
    vector<vector<int>> ladder(h, vector<int>(n, -1));
    int a, b;
    while(m--) {
        cin >> a >> b;
        a--; b--;  // 0-based index
        ladder[a][b] = b+1;
        ladder[a][b+1] = b;
    }
    int min = INT32_MAX;
    addLadder(ladder, h, n, 0, 0, 0, min);
    cout << (min == INT32_MAX ? -1 : min);
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 백트래킹 & 구현

</div>
</details>

[def]: https://www.acmicpc.net/problem/15684