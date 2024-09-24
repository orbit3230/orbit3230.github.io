---
layout: post
title: "[데일리 백준] 12865"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-09-24
last_modified_at: 2024-09-24
---
## Gold
### [12865][def]

```c++
#include <iostream>
#include <vector>
using namespace std;

typedef struct Object {
    int weight;
    short value;
} Object;
// 행 단위 배열 메모리 접근. 이게 더 빠를 것이다.
void dp(vector<vector<int>>& dpTable, vector<Object>& list, int n, int k) {
    int startCol = list[0].weight;
    // outofbounds 방지를 위해 첫 열은 직접 초기화
    for(int j = startCol ; j < k+1 ; j++) {
        dpTable[0][j] = list[0].value;
    }
    // dpTable 완성
    for(int i = 1 ; i < n ; i++) {
        startCol = min(startCol, list[i].weight);
        for(int j = startCol ; j < k+1 ; j++) {
            if(j < list[i].weight || dpTable[i-1][j] >= dpTable[i-1][j-list[i].weight] + list[i].value) {
                dpTable[i][j] = dpTable[i-1][j];
                continue;
            }
            dpTable[i][j] = dpTable[i-1][j-list[i].weight] + list[i].value;
        }
    }
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);

    int n, k;
    cin >> n >> k;
    vector<vector<int>> dpTable(n, vector<int>(k+1, 0));
    vector<Object> list(n);
    for(int i = 0 ; i < n ; i++) {
        cin >> list[i].weight >> list[i].value;
    }

    dp(dpTable, list, n, k);
    cout << dpTable[n-1][k];
}
```

- 실행 시간 : 44ms

<details>
<summary>코멘트</summary>
<div markdown="1">

- 오늘은 추가적인 DP 학습을 위하여 배낭 문제를 공부해 보았다.  

- 추가적으로, 아래처럼 열 단위 배열 메모리 접근을 하게되면  
메모리의 contiguous한 특성때문에 백준 기준 3배의 시간 차이가 발생한다. (더 느리다)  

```c++
#include <iostream>
#include <vector>
using namespace std;

typedef struct Object {
    int weight;
    short value;
} Object;
// 열 단위 배열 메모리 접근을 해볼 것이다. (시간 테스트)
void dp(vector<vector<int>>& dpTable, vector<Object>& list, int k, int n) {
    int startRow = list[0].weight;
    // outofbounds 방지를 위해 첫 열은 직접 초기화
    for(int i = startRow ; i < k+1 ; i++) {
        dpTable[i][0] = list[0].value;
    }
    // dpTable 완성
    for(int j = 1 ; j < n ; j++) {
        startRow = min(startRow, list[j].weight);
        for(int i = startRow ; i < k+1 ; i++) {
            if(i < list[j].weight || dpTable[i][j-1] >= dpTable[i-list[j].weight][j-1] + list[j].value) {
                dpTable[i][j] = dpTable[i][j-1];
                continue;
            }
            dpTable[i][j] = dpTable[i-list[j].weight][j-1] + list[j].value;
        }
    }
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);

    int n, k;
    cin >> n >> k;
    vector<vector<int>> dpTable(k+1, vector<int>(n, 0));
    vector<Object> list(n);
    for(int i = 0 ; i < n ; i++) {
        cin >> list[i].weight >> list[i].value;
    }

    dp(dpTable, list, k, n);
    cout << dpTable[k][n-1];
}
```

- 실행 시간 : 112ms

</div>
</details>

[def]: https://www.acmicpc.net/problem/12865