---
layout: post
title: "[데일리 백준] 2660"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-01-26
last_modified_at: 2025-01-26
---
## Gold
### [2660][def]

```c++
#include <iostream>
#include <vector>
#define INF INT32_MAX>>1
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    int n;
    cin >> n;
    vector<vector<int>> adjacency(n, vector<int>(n, INF));
    for(int i = 0 ; i < n ; i++) adjacency[i][i] = 0;
    int a, b;
    while(cin >> a >> b) {
        if(a == -1 && b == -1) break;
        a--; b--;  // 0-based index
        adjacency[a][b] = 1;
        adjacency[b][a] = 1;
    }
    for(int k = 0 ; k < n ; k++) {
        for(int i = 0 ; i < n ; i++) {
            for(int j = 0 ; j < n ; j++) {
                if(i == j) continue;
                adjacency[i][j] = min(adjacency[i][j], adjacency[i][k] + adjacency[k][j]);
            }
        }
    }
    int min = INF;
    vector<int> kings;
    for(int i = 0 ; i < n ; i++) {
        int max = 0;
        for(int j = 0 ; j < n ; j++) {
            if(i == j) continue;
            max = std::max(max, adjacency[i][j]);
        }
        if(max < min) {
            min = max;
            kings.clear();
            kings.push_back(i);
            continue;
        }
        if(max == min) kings.push_back(i);
    }
    cout << min << ' ' << kings.size() << '\n';
    for(int i : kings) cout << i+1 << ' ';  // 1-based index
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 플로이드-워셜

</div>
</details>

[def]: https://www.acmicpc.net/problem/2660