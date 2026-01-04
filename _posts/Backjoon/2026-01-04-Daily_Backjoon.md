---
layout: post
title: "[데일리 백준] 10819"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2026-01-04
last_modified_at: 2026-01-04
---
## Silver
### [10819][def]

```c++
#include <iostream>
#include <vector>
using namespace std;

void backtracking(vector<int>& list, int count, int n, int sum, int prev, int& max, vector<bool>& used) {
    if(count == n) {
        max = std::max(max, sum);
        return;
    }
    for(int i = 0 ; i < n ; i++) {
        if(used[i]) continue;
        if(count != 0) sum += abs(prev - list[i]);
        used[i] = true;
        backtracking(list, count+1, n, sum, list[i], max, used);
        used[i] = false;
        if(count != 0) sum -= abs(prev - list[i]);
    }
}

int main() {
    int n;
    cin >> n;
    vector<int> list(n);
    for(int i = 0 ; i < n ; i++) cin >> list[i];
    int max = 0;
    vector<bool> used(n, false);
    backtracking(list, 0, n, 0, 0, max, used);
    cout << max;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- Backtracking

</div>
</details>

[def]: https://www.acmicpc.net/problem/10819