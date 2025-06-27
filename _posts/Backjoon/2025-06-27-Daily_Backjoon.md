---
layout: post
title: "[데일리 백준] 10974"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-06-27
last_modified_at: 2025-06-27
---
## Silver
### [10974][def]

```c++
#include <iostream>
#include <vector>
using namespace std;

void backtrack(vector<int>& list, vector<bool>& used, int n) {
    if(list.size() == n) {
        for(int e : list) cout << e << ' ';
        cout << '\n';
        return;
    }
    for(int i = 0 ; i < n ; i++) {
        if(!used[i]) {
            list.push_back(i+1);
            used[i] = true;
            backtrack(list, used, n);
            used[i] = false;
            list.pop_back();
        }
    }
}

int main() {
    ios::sync_with_stdio(false);
    cout.tie(NULL);

    int n;
    cin >> n;
    vector<int> list;
    vector<bool> used(n, false);
    backtrack(list, used, n);
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 백트래킹

</div>
</details>

[def]: https://www.acmicpc.net/problem/10974