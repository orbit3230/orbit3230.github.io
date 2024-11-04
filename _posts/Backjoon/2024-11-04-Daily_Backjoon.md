---
layout: post
title: "[데일리 백준] 1005"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-11-04
last_modified_at: 2024-11-04
---
## Gold
### [1005][def]

```c++
#include <iostream>
#include <vector>
using namespace std;

typedef struct Building {
    int time;
    int degree = 0;
    vector<int> prev;
} Building;

int dp(vector<Building>& buildings, vector<int>& dpTable, int index) {
    if(buildings[index].degree == 0) return dpTable[index] = buildings[index].time;
    if(dpTable[index] != -1) return dpTable[index];  // already optimized
    int max = 0;
    for(int prev : buildings[index].prev) {
        max = std::max(max, dp(buildings, dpTable, prev));
    }
    
    return dpTable[index] = buildings[index].time + max;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    int t;
    cin >> t;
    for(int i = 0 ; i < t ; i++) {
        int n, k;
        cin >> n >> k;
        vector<Building> buildings(n+1);
        for(int j = 1 ; j <= n ; j++) {
            cin >> buildings[j].time;
        }
        int from, to;
        for(int j = 0 ; j < k ; j++) {
            cin >> from >> to;
            buildings[to].prev.push_back(from);
            buildings[to].degree++;
        }
        int winning;
        cin >> winning;
        vector<int> dpTable(n+1, -1);
        dp(buildings, dpTable, winning);
        cout << dpTable[winning] << '\n';
    }
    
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- DFS + DP

- 문제의 카테고리는 위상정렬로 구분되었지만, 사실상 위상정렬의 개념만 사용할 뿐  
일반적인 위상정렬의 문제해결 알고리즘을 사용하지는 않는다.  

- 핵심은 
  - 진입 노드들의 건설시간은 병렬로 진행되므로  
  이들 중 최댓값으로 DP Table을 갱신해야 한다는 점.  

  - 그리고 winning 노드에서 거꾸로 거슬러 올라가며 갱신해야한다는 점.

- 주의할 점으로, DP Table을 `0`으로 초기화 할 경우 실제 값이 `0`이 될 수도 있기 때문에 DP의 이득이 사라질 수도 있다는 점이다.  

  - 앞으로는 `-1`로 초기화하는 습관을 들이도록 하겠다.  

</div>
</details>

[def]: https://www.acmicpc.net/problem/1005