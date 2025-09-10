---
layout: post
title: "[데일리 백준] 14719"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-09-10
last_modified_at: 2025-09-10
---
## Gold
### [14719][def]

```c++
#include <iostream>
#include <vector>
using namespace std;

int main() {
    int w;
    cin >> w >> w;
    vector<int> land(w);
    for(int i = 0 ; i < w ; i++) cin >> land[i];
    int rainfall = 0;
    for(int i = 0 ; i < w ; i++) {
        int left_max = 0;
        int right_max = 0;
        for(int j = 0 ; j < i ; j++) left_max = max(left_max, land[j]);
        for(int j = i+1 ; j < w ; j++) right_max = max(right_max, land[j]);
        rainfall += max(0, min(left_max, right_max) - land[i]);
    }
    cout << rainfall;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- Implementation

</div>
</details>

[def]: https://www.acmicpc.net/problem/14719