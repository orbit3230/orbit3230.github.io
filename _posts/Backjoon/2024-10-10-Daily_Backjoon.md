---
layout: post
title: "[데일리 백준] 22968"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-10-10
last_modified_at: 2024-10-10
---
## Gold
### [22968][def]

```c++
#include <iostream>
#include <vector>
#define VMAX 1000000000
using namespace std;
// dp[1] = 1
// dp[i] = dp[i-1] + dp[i-2] + 1
// 1 :  새롭게 높이를 추가하는 한 개의 노드
void dp(vector<int>& dpTable) {
    dpTable.push_back(0);
    dpTable.push_back(1);
    int index = 2;
    while(dpTable[index-1] <= VMAX) {
        dpTable.push_back(dpTable[index-1] + dpTable[index-2] + 1);
        index++;
    }
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    int t;
    cin >> t;
    vector<int> dpTable;
    dp(dpTable);
    int size = dpTable.size();
    for(int i = 0 ; i < t ; i++) {
        int v;
        cin >> v;
        int index;
        for(index = 1 ; index < size ; index++) {
            if(v < dpTable[index]) break;
        }
        cout << index-1 << '\n';
    }
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- Dynamic Programming

- 점화식을 손쉽게 찾을 수 있었다.  

</div>
</details>

[def]: https://www.acmicpc.net/problem/22968