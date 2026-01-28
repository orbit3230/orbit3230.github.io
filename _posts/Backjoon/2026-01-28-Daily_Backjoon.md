---
layout: post
title: "[데일리 백준] 14889"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2026-01-28
last_modified_at: 2026-01-28
---
## Silver
### [14889][def]

```c++
#include <iostream>
#include <vector>
using namespace std;

void backtracking(vector<vector<int>>& synergy, vector<bool>& team1picked, int n, int size, int teamSize, int startIndex, int& min) {
    if(size == teamSize) {
        int team1 = 0;
        int team2 = 0;
        for(int i = 0 ; i < n ; i++) {
            for(int j = 0 ; j < n ; j++) {
                if(team1picked[i] && team1picked[j]) {
                    team1 += synergy[i][j];
                    continue;
                }
                if(!team1picked[i] && !team1picked[j]) team2 += synergy[i][j];
            }
        }
        min = std::min(min, abs(team1-team2));
    }
    for(int i = startIndex ; i < n ; i++) {
        team1picked[i] = true;
        backtracking(synergy, team1picked, n, size+1, teamSize, i+1, min);
        team1picked[i] = false;
    }
}

int main() {
    int n;
    cin >> n;
    vector<vector<int>> synergy(n, vector<int>(n));
    for(int i = 0 ; i < n ; i++) for(int j = 0 ; j < n ; j++) cin >> synergy[i][j];
    vector<bool> team1picked(n, false);
    int min = INT32_MAX;
    int teamSize = n >> 1;
    backtracking(synergy, team1picked, n, 0, teamSize, 0, min);
    cout << min;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- Backtracking

</div>
</details>

[def]: https://www.acmicpc.net/problem/14889