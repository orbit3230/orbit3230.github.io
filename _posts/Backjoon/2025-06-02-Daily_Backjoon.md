---
layout: post
title: "[데일리 백준] 2116"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-06-02
last_modified_at: 2025-06-02
---
## Gold
### [2116][def]

```c++
#include <iostream>
#include <vector>
using namespace std;

int getMax(int a, int b, int c, int d) {
    return max(max(a, b), max(c, d));
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);

    int n;
    cin >> n;
    vector<vector<int>> dice(n, vector<int>(6));
    for (int i = 0 ; i < n ; i++) for (int j = 0 ; j < 6 ; j++) cin >> dice[i][j];
    vector<int> opposite(6);
    opposite[0] = 5;  // A - F
    opposite[1] = 3;  // B - D
    opposite[2] = 4;  // C - E
    opposite[3] = 1;  // D - B
    opposite[4] = 2;  // E - C
    opposite[5] = 0;  // F - A
    vector<vector<int>> sides(6, vector<int>(4));
    sides[0] = {1, 2, 3, 4};  // A - B C D E
    sides[1] = {0, 2, 4, 5};  // B - A C E F
    sides[2] = {0, 1, 3, 5};  // C - A B D F
    sides[3] = {0, 2, 4, 5};  // D - A C E F
    sides[4] = {0, 1, 3, 5};  // E - A B D F
    sides[5] = {1, 2, 3, 4};  // F - B C D E
    int max_sum = 0;
    for(int c = 0 ; c < 6 ; c++) {
        int sum = 0;
        int surface_index = c;
        int surface = dice[0][surface_index];
        for(int i = 0 ; i < n ; i++) {
            for(int j = 0 ; j < 6 ; j++) {
                if(dice[i][j] == surface) {
                    surface_index = j;
                    break;
                }
            }
            int max = getMax(
                dice[i][sides[surface_index][0]],
                dice[i][sides[surface_index][1]],
                dice[i][sides[surface_index][2]],
                dice[i][sides[surface_index][3]]
            );
            sum += max;
            surface_index = opposite[surface_index];
            surface = dice[i][surface_index];
        }
        max_sum = max(max_sum, sum);
    }
    cout << max_sum;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- Brute-force & Implementation

</div>
</details>

[def]: https://www.acmicpc.net/problem/2116