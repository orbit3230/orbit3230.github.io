---
layout: post
title: "[데일리 백준] 10159"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-02-06
last_modified_at: 2025-02-06
---
## Gold
### [10159][def]

```c++
#include <iostream>
#include <vector>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    int n, m;
    cin >> n >> m;
    vector<vector<bool>> knows(n, vector<bool>(n, false));
    for(int i = 0 ; i < n ; i++) knows[i][i] = true;
    int a, b;
    while(m--) {
        cin >> a >> b;
        a--; b--;  // 0-based index
        knows[a][b] = true;
    }
    for(int k = 0 ; k < n ; k++) {
        for(int i = 0 ; i < n ; i++) {
            for(int j = 0 ; j < n ; j++) {
                if(i == j) continue;
                knows[i][j] = knows[i][j] || (knows[i][k] && knows[k][j]);
            }
        }
    }
    int count;
    for(int i = 0 ; i < n ; i++) {
        count = 0;
        for(int j = 0 ; j < n ; j++) {
            if(!knows[i][j] && !knows[j][i]) count++;
        }
        cout << count << '\n';
    }
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 플로이드-워셜

- 서로 간의 관계를 단방향 그래프로 나타내는게 핵심

</div>
</details>

[def]: https://www.acmicpc.net/problem/10159