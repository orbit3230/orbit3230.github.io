---
layout: post
title: "[데일리 백준] 12852"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-02-26
last_modified_at: 2025-02-26
---
## Gold
### [12852][def]

```c++
#include <iostream>
#include <vector>
using namespace std;

void dfs(int n, int step, int& min_step, vector<int>& trace, vector<int>& min_trace) {
    trace.push_back(n);
    if(n == 1) {
        min_step = step;
        min_trace = trace;
        trace.pop_back();
        return;
    }
    if(step >= min_step) {
        trace.pop_back();
        return;
    }
    if(!(n % 3)) dfs(n/3, step+1, min_step, trace, min_trace);
    if(!(n % 2)) dfs(n/2, step+1, min_step, trace, min_trace);
    dfs(n-1, step+1, min_step, trace, min_trace);
    trace.pop_back();
    return;
}

int main() {
    ios::sync_with_stdio(false);
    cout.tie(NULL);

    int n;
    cin >> n;
    int min_step = INT32_MAX;
    vector<int> trace;
    vector<int> min_trace;
    dfs(n, 0, min_step, trace, min_trace);
    cout << min_step << '\n';
    for(int& t : min_trace) cout << t << ' ';
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- DFS

</div>
</details>

[def]: https://www.acmicpc.net/problem/12852