---
layout: post
title: "[데일리 백준] 1799"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-11-15
last_modified_at: 2024-11-15
---
## Gold
### [1799][def]

```c++
#include <iostream>
#include <vector>
using namespace std;

void bishop(vector<pair<int, int>>& availables, vector<bool>& diag1Check, vector<bool>& diag2Check,
int current, int avail_size, int count, int& max_count) {
    if(avail_size - current + count <= max_count) return;
    max_count = max(max_count, count);
    for(int i = current ; i < avail_size ; i++) {
        int diag1 = availables[i].first;
        int diag2 = availables[i].second;
        if(!diag1Check[diag1] || !diag2Check[diag2]) continue;
        diag1Check[diag1] = false;
        diag2Check[diag2] = false;
        bishop(availables, diag1Check, diag2Check, i+1, avail_size, count+1, max_count);
        diag1Check[diag1] = true;
        diag2Check[diag2] = true;
    }
}

// diag1 : '\' direction
// diag2 : '/' direction
int main() {
    int n;
    cin >> n;
    int size = 2*n - 1;
    vector<pair<int, int>> blackAvailables;  // {diag1, diag2}
    vector<pair<int, int>> whiteAvailables;  // {diag1, diag2}
    vector<bool> blackDiag1Check(size, false);
    vector<bool> blackDiag2Check(size, false);
    vector<bool> whiteDiag1Check(size, false);
    vector<bool> whiteDiag2Check(size, false);
    bool input;
    int diag1, diag2;
    for(int i = 0 ; i < n ; i++) {
        for(int j = 0 ; j < n ; j++) {
            cin >> input;
            diag1 = (j - i) + (n - 1);
            diag2 = i + j;
            if(!input) continue;
            if((i + j) % 2 == 0) {
                blackAvailables.push_back({diag1, diag2});
                blackDiag1Check[diag1] = true;
                blackDiag2Check[diag2] = true;
            } else {
                whiteAvailables.push_back({diag1, diag2});
                whiteDiag1Check[diag1] = true;
                whiteDiag2Check[diag2] = true;
            }
        }
    }
    int blackMaxCount = 0;
    int whiteMaxCount = 0;
    int blackAvailSize = blackAvailables.size();
    int whiteAvailSize = whiteAvailables.size();
    bishop(blackAvailables, blackDiag1Check, blackDiag2Check, 0, blackAvailSize, 0, blackMaxCount);
    bishop(whiteAvailables, whiteDiag1Check, whiteDiag2Check, 0, whiteAvailSize, 0, whiteMaxCount);
    cout << blackMaxCount + whiteMaxCount;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 백트래킹 문제.

- n-Queens 문제와 유사하다.  
백트래킹 구현이나 diag 처리 등은 거의 동일하지만,  
이 문제에서 시간복잡도를 log_2 만큼 줄이는 트릭은,  
검은색 타일의 비숍과 흰색 타일의 비숍은 서로에게 전혀 영향을 주지 않는 다는 점을 이용해  
각각에 대한 정보만으로 백트래킹을 각각 돌릴 수 있다는 점이다.  

</div>
</details>

[def]: https://www.acmicpc.net/problem/1799