---
layout: post
title: "[데일리 백준] 1912"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-11-26
last_modified_at: 2024-11-26
---
## Silver
### [1912][def]

```c++
#include <iostream>
#include <vector>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);

    int n;
    cin >> n;
    vector<int> dpTable(n+1);
    dpTable[0] = 0;
    int input;
    int max = INT32_MIN;
    for(int i = 1 ; i <= n ; i++) {
        cin >> input;
        dpTable[i] = std::max(dpTable[i-1]+input, input);
        max = std::max(max, dpTable[i]);
    }
    cout << max;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- Dynamic Programming.

</div>
</details>

[def]: https://www.acmicpc.net/problem/1912