---
layout: post
title: "[데일리 백준] 3980"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-07-29
last_modified_at: 2025-07-29
---
## Gold
### [3980][def]

```c++
#include <iostream>
#include <vector>
using namespace std;

void backtrack(vector<vector<int>>& players, int& max,
    vector<bool>& isPlaced, vector<bool>& isFilled, int value, int count) {
    if(count == 11) {
        max = std::max(max, value);
        return;
    }
    if(value+(11-count)*100 <= max) return;  // branch-and-bound
    for(int i = 0 ; i < 11 ; i++) {  // player
        bool isTherePosition = false;
        if(!isPlaced[i]) {
            isTherePosition = true;
            for(int j = 0 ; j < 11 ; j++) {  // position
                if(players[i][j] && !isFilled[j]) {
                    isPlaced[i] = true;
                    isFilled[j] = true;
                    backtrack(players, max, isPlaced, isFilled, value+players[i][j], count+1);
                    isFilled[j] = false;
                    isPlaced[i] = false;
                }
            }
        }
        if(!isTherePosition) return;  // no more opportunity
    }
    return;
}

int main() {
    int t;
    cin >> t;
    while(t--) {
        vector<vector<int>> players(11, vector<int>(11));
        for(int i = 0 ; i < 11 ; i++) for(int j = 0 ; j < 11 ; j++) cin >> players[i][j];
        int max = 0;
        vector<bool> isPlaced(11, false);
        vector<bool> isFilled(11, false);
        backtrack(players, max, isPlaced,  isFilled, 0, 0);
        cout << max << '\n';
    }
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- Backtracking

- Branch-and-Bound 를 잘 하는 것이 중요

</div>
</details>

[def]: https://www.acmicpc.net/problem/3980