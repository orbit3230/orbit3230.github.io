---
layout: post
title: "[데일리 백준] 7579"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-11-14
last_modified_at: 2024-11-14
---
## Gold
### [7579][def]

```c++
#include <iostream>
#include <vector>
using namespace std;

typedef struct App {
    int memory;
    short cost;
} App;

void knapsack(vector<vector<int>>& dpTable, const vector<App>& apps, int rowSize, int colSize) {
    for(int i = 1 ; i < rowSize ; i++) {
        for(int j = 0 ; j < colSize ; j++) {
            if(j < apps[i].cost) {  // can't store
                dpTable[i][j] = dpTable[i-1][j];
                continue;
            }
            int prev = dpTable[i-1][j - apps[i].cost];
            dpTable[i][j] = max(dpTable[i-1][j], prev+apps[i].memory);
        }
    }
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);

    int n, m;
    cin >> n >> m;
    int costSum = 0;
    vector<App> apps(n);
    for(int i = 0 ; i < n ; i++) cin >> apps[i].memory;
    for(int i = 0 ; i < n ; i++) {
        cin >> apps[i].cost;
        costSum += apps[i].cost;
    }
    // 각 cost별 확보 가능한 memory의 optimal 계산 테이블
    vector<vector<int>> dpTable(n, vector<int>(costSum+1, 0));
    // initialize
    for(int i = apps[0].cost ; i <= costSum ; i++) dpTable[0][i] = apps[0].memory;
    knapsack(dpTable, apps, n, costSum+1);
    for(int i = 0 ; i <= costSum ; i++) {
        if(dpTable[n-1][i] >= m) {
            cout << i;
            break;
        }
    }
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 다이나믹 프로그래밍 - knapsack 문제  

- Idea  
![idea][def2]
  - dpTable에 각 cost 별로 확보 가능한 memory의 최댓값을 기록해 나가기로 결정했다.  
  - 이 때, notepad에는 column 단위로 access하는 것으로 초안을 작성했지만,  
  이는 성능의 하락이 발생할 수 있기 때문에 실제 구현은 이의 전치행렬로 진행했다.  
  - 실제 디버깅 결과  
  ![debug][def3]

</div>
</details>

[def]: https://www.acmicpc.net/problem/7579
[def2]: https://i.imgur.com/cbzyoNk.png
[def3]: https://i.imgur.com/NIOkfsG.png