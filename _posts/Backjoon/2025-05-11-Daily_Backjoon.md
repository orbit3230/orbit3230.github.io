---
layout: post
title: "[데일리 백준] 9625"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-05-11
last_modified_at: 2025-05-11
---
## Silver
### [9625][def]

```c++
#include <iostream>
using namespace std;

void change(pair<int, int>& ab) {
    int a = ab.first;
    int b = ab.second;
    ab.first = b;
    ab.second = a+b;
}

int main() {
    int n;
    cin >> n;
    pair<int, int> ab;
    ab.first = 1;
    ab.second = 0;
    while(n--) change(ab);
    cout << ab.first << ' ' << ab.second;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 수열 (날먹)

</div>
</details>

[def]: https://www.acmicpc.net/problem/9625