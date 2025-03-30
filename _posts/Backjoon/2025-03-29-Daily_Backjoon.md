---
layout: post
title: "[데일리 백준] 10867"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-03-29
last_modified_at: 2025-03-29
---
## Silver
### [10867][def]

```c++
#include <iostream>
#include <set>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    int n;
    cin >> n;
    set<int> s;
    int input;
    for(int i = 0 ; i < n ; i++) {
        cin >> input;
        s.insert(input);
    }
    for(int i : s) cout << i << ' ';
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 정렬 (날먹)

</div>
</details>

[def]: https://www.acmicpc.net/problem/10867