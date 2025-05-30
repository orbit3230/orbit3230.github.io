---
layout: post
title: "[데일리 백준] 11066"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-05-30
last_modified_at: 2025-05-30
---
## Gold
### [11066][def]

```c++
#include <iostream>
#include <vector>
using namespace std;

int main() {
    int t;
    cin >> t;
    while(t--) {
        ios::sync_with_stdio(false);
        cin.tie(NULL);
        cout.tie(NULL);

        int n;
        cin >> n;
        vector<vector<int>> dpTable(n, vector<int>(n, 0));
        vector<int> prefix_sum(n, 0);
        int input;
        int sum = 0;
        for(int i = 0 ; i < n ; i++) {
            cin >> input;
            sum += input;
            prefix_sum[i] = sum;
        }
        for(int j = 1 ; j < n ; j++) {
            int i_max = n-j;
            for(int i = 0 ; i < i_max ; i++) {
                int optimal = INT32_MAX;
                int row = i;
                int col = i+j;
                for(int k = row ; k < col ; k++)
                    optimal = min(optimal, dpTable[row][k] + dpTable[k+1][col] + prefix_sum[col] - (row == 0 ? 0 : prefix_sum[row-1]));
                dpTable[row][col] = optimal;
            }
        }
        cout << dpTable[0][n-1] << '\n';
    }
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- Dynamic Programming

- Similar as [11049][def2] - Matrix Chain Multiplication

</div>
</details>

[def]: https://www.acmicpc.net/problem/11066
[def2]: https://www.acmicpc.net/problem/11049  