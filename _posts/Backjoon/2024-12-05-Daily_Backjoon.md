---
layout: post
title: "[데일리 백준] 2342"
excerpt: "1 Gold,"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-12-05
last_modified_at: 2024-12-05
---
## Gold
### [2342][def]

```c++
#include <iostream>
#include <vector>
#define INF INT32_MAX/2
using namespace std;

int traversal(vector<int>& instruction, vector<vector<int>>& cost,
vector<vector<vector<int>>>& dpTable, int index, int size, int left, int right) {
    if(index == size) return 0;
    if(dpTable[index][left][right] != -1) return dpTable[index][left][right];
    dpTable[index][left][right] = 0;
    int next = instruction[index];
    int moveLeft = INF;
    if(right != next)
        moveLeft = cost[left][next] + traversal(instruction, cost, dpTable, index + 1, size, next, right);
    int moveRight = INF;
    if(left != next)
        moveRight = cost[right][next] + traversal(instruction, cost, dpTable, index + 1, size, left, next);
    dpTable[index][left][right] = min(moveLeft, moveRight);
    return dpTable[index][left][right];
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);

    int input;
    vector<int> instruction;
    while(cin >> input) {
        if(!input) break;
        instruction.push_back(input);
    }
    // [current_index][left][right]
    vector<vector<vector<int>>> dpTable((int)instruction.size(), vector<vector<int>>(5, vector<int>(5, -1)));
    // [from][to]
    vector<vector<int>> cost = {% raw %}{{0, 2, 2, 2, 2},
                                {0, 1, 3, 4, 3},
                                {0, 3, 1, 3, 4},
                                {0, 4, 3, 1, 3},
                                {0, 3, 4, 3, 1}}{% endraw %};
    traversal(instruction, cost, dpTable, 0, instruction.size(), 0, 0);
    cout << dpTable[0][0][0];
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- Dynamic Programming.

- DP 테이블을 만들 때 현재가 몇 번째 index 인 지도 함께 저장하는 것이 포인트.  

</div>
</details>

[def]: https://www.acmicpc.net/problem/2342