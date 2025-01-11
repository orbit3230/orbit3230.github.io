---
layout: post
title: "[데일리 백준] 17136"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-01-11
last_modified_at: 2025-01-11
---
## Gold
### [17136][def]

```c++
#include <iostream>
#include <vector>
using namespace std;

void backtracking(vector<vector<bool>>& paper, vector<int>& papers, int i, int j, int ones, int count, int& minCount) {
    if(!ones) {
        minCount = min(minCount, count);
        return;
    }
    if(i >= 10) return;
    if(!paper[i][j]) {  // no need. keep going
        if(j+1 == 10) backtracking(paper, papers, i+1, 0, ones, count, minCount);
        else backtracking(paper, papers, i, j+1, ones, count, minCount);
        return;
    }
    if(count+1 >= minCount) return;  // pruning
    for(int size = 1 ; size <= 5 ; size++) {
        int iSize = i+size; int jSize = j+size;
        if(iSize > 10 || jSize > 10) continue;
        int hidden = 0;
        vector<pair<int, int>> hiddenCheck;
        for(int x = i ; x < iSize ; x++) {
            for(int y = j ; y < jSize ; y++) {
                if(!paper[x][y]) {
                    // repair
                    for(pair<int, int> check : hiddenCheck) paper[check.first][check.second] = true;
                    goto next;
                }
                paper[x][y] = false;
                hidden++;
                hiddenCheck.push_back({x, y});
            }
        }
        if(papers[size] == 0) {  // no more papers
            // repair
            for(pair<int, int> check : hiddenCheck) paper[check.first][check.second] = true;
            goto next;
        }
        papers[size]--;
        if(j+size == 10) backtracking(paper, papers, i+1, 0, ones-hidden, count+1, minCount);
        else backtracking(paper, papers, i, j+size, ones-hidden, count+1, minCount);
        // repair
        for(pair<int, int>& check : hiddenCheck) paper[check.first][check.second] = true;
        papers[size]++;
        next:
        continue;
    }
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);

    vector<vector<bool>> paper(10, vector<bool>(10));
    bool input;
    int ones = 0;
    for(int i = 0 ; i < 10 ; i++) {
        for(int j = 0 ; j < 10 ; j++) {
            cin >> input;
            paper[i][j] = input;
            if(input) ones++;
        }
    }
    int minCount = INT32_MAX;
    vector<int> papers(5+1, 5);
    backtracking(paper, papers, 0, 0, ones, 0, minCount);
    cout << (minCount == INT32_MAX ? -1 : minCount);
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 백트래킹

- 조건이 많아서 구현이 조금 까다로운 문제이다.  

</div>
</details>

[def]: https://www.acmicpc.net/problem/17136