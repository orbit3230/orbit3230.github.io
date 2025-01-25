---
layout: post
title: "[데일리 백준] 1269"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-01-25
last_modified_at: 2025-01-25
---
## Gold
### [1269][def]

```c++
#include <iostream>
#include <unordered_set>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);

    int n, m;
    cin >> n >> m;
    unordered_set<int> a;
    int input;
    for(int i = 0 ; i < n ; i++) {
        cin >> input;
        a.insert(input);
    }
    int intersection = 0;
    for(int i = 0 ; i < m ; i++) {
        cin >> input;
        if(a.find(input) != a.end()) intersection++;
    }
    cout << n + m - 2 * intersection;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 집합 날먹

</div>
</details>

[def]: https://www.acmicpc.net/problem/1269