---
layout: post
title: "[데일리 백준] 1613"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-05-26
last_modified_at: 2025-05-26
---
## Gold
### [1613][def]

```c++
#include <iostream>
#include <vector>
#define INF INT32_MAX>>1
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    int n, k;
    cin >> n >> k;
    vector<vector<int>> adjacency(n, vector<int>(n, INF));
    for(int i = 0 ; i < n ; i++) adjacency[i][i] = 0;
    int a, b;
    while(k--) {
        cin >> a >> b;
        a--; b--;  // 0-based index
        adjacency[a][b] = 1;
    }
    for(int k = 0 ; k < n ; k++) {
        for(int i = 0 ; i < n ; i++) {
            for(int j = 0 ; j < n ; j++) {
                adjacency[i][j] = min(adjacency[i][j], adjacency[i][k] + adjacency[k][j]);
            }
        }
    }
    int s;
    cin >> s;
    while(s--) {
        cin >> a >> b;
        a--; b--;  // 0-based index
        if(adjacency[a][b] == INF && adjacency[b][a] == INF) {
            cout << 0 << '\n';
            continue;
        }
        if(adjacency[a][b] != INF) {
            cout << -1 << '\n';
            continue;
        }
        cout << 1 << '\n';
    }
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- Floyd-Warshall (prerequisite)

</div>
</details>

[def]: https://www.acmicpc.net/problem/1613