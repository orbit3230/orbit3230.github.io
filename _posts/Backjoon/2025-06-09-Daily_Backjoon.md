---
layout: post
title: "[데일리 백준] 2668"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-06-09
last_modified_at: 2025-06-09
---
## Gold
### [2668][def]

```c++
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

bool dfs(vector<int>& toward, vector<bool>& visited, vector<int>& trace, int index, const int target) {
    visited[index] = true;
    trace.push_back(index+1);
    if(toward[index] == target) return true;
    if(!visited[toward[index]]) return dfs(toward, visited, trace, toward[index], target);
    return false;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    int n;
    cin >> n;
    vector<int> toward(n);
    for(int i = 0 ; i < n ; i++) {
        cin >> toward[i];
        toward[i]--;  // 0-based index
    }

    vector<int> result;
    vector<bool> visited(n, false);
    for(int i = 0 ; i < n ; i++) {
        vector<int> trace;
        if(dfs(toward, visited, trace, i, i)) {
            for(int t : trace) result.push_back(t);
            continue;
        }
        for(int t : trace) visited[t-1] = false;
    }
    sort(result.begin(), result.end());
    cout << result.size() << '\n';
    for(int r : result) cout << r << '\n';
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- DFS

</div>
</details>

[def]: https://www.acmicpc.net/problem/2668