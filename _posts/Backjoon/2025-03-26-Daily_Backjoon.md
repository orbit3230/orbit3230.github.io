---
layout: post
title: "[데일리 백준] 1038"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-03-26
last_modified_at: 2025-03-26
---
## Gold
### [1038][def]

```c++
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

void backtracking(vector<long long>& list, long long n) {
    list.push_back(n);
    int last = n % 10;
    if(last == 0) return;
    for(int i = last-1 ; i >= 0 ; i--) {
        backtracking(list, n*10+i);
    }
}

int main() {
    int n;
    cin >> n;
    vector<long long> list;
    for(int i = 0 ; i < 10 ; i++) {
        backtracking(list, i);
    }
    sort(list.begin(), list.end());
    if(n >= list.size()) cout << -1;
    else cout << list[n];
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- Backtracking

</div>
</details>

[def]: https://www.acmicpc.net/problem/1038