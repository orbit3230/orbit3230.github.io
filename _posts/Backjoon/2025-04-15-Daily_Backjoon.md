---
layout: post
title: "[데일리 백준] 1174"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-04-15
last_modified_at: 2025-04-15
---
## Gold
### [1174][def]

```c++
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

void backtracking(vector<long long>& list, long long n) {
    list.push_back(n);
    int one = n % 10;
    for(int i = one-1 ; i >= 0 ; i--) {
        backtracking(list, n*10 + i);
    }
    return;
}

int main() {
    int n;
    cin >> n;
    vector<long long> list;
    for(int i = 0 ; i <= 9 ; i++) {
        backtracking(list, i);
    }
    sort(list.begin(), list.end());
    cout << (n > list.size() ? -1 : list[n-1]);
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- Backtracking (easy)

</div>
</details>

[def]: https://www.acmicpc.net/problem/1174