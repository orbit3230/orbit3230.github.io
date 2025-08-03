---
layout: post
title: "[데일리 백준] 1719"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-08-03
last_modified_at: 2025-08-03
---
## Gold
### [1719][def]

```c++
#include <iostream>
#include <vector>
#define INF INT32_MAX >> 1
using namespace std;

int main() {
    int n, m;
    cin >> n >> m;
    vector<vector<int>> adjacent(n, vector<int>(n, INF));
    vector<vector<int>> first_go(n, vector<int>(n, -1));
    for(int i = 0 ; i < n ; i++) adjacent[i][i] = 0;
    int from, to, weight;
    while(m--) {
        cin >> from >> to >> weight;
        from--; to--;  // 0-based index
        adjacent[from][to] = adjacent[to][from] = weight;
        first_go[from][to] = to;
        first_go[to][from] = from;
    }
    for(int k = 0 ; k < n ; k++) {
        for(int i = 0 ; i < n ; i++) {
            for(int j = 0 ; j < n ; j++) {
                int originPath = adjacent[i][j];
                int newPath = adjacent[i][k] + adjacent[k][j];
                if(newPath < originPath) {
                    adjacent[i][j] = newPath;
                    first_go[i][j] = first_go[i][k];
                }
            }
        }
    }
    for(int i = 0 ; i < n ; i++) {
        for(int j = 0 ; j < n ; j++) {
            cout << (first_go[i][j] == -1 ? "-" : to_string(first_go[i][j]+1)) << ' ';
        }
        cout << '\n';
    }
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- Floyd-Warshall

</div>
</details>

[def]: https://www.acmicpc.net/problem/1719