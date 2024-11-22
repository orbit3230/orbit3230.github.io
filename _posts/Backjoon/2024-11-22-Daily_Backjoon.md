---
layout: post
title: "[데일리 백준] 1911"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-11-22
last_modified_at: 2024-11-22
---
## Gold
### [1911][def]

```c++
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

typedef struct Puddle {
    int from;
    int to;
} Puddle;

bool compare(const Puddle& a, const Puddle& b) {
    return a.from < b.from;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);

    int n, l;
    cin >> n >> l;
    vector<Puddle> puddles(n);
    for(int i = 0 ; i < n ; i++) {
        cin >> puddles[i].from >> puddles[i].to;
    }
    sort(puddles.begin(), puddles.end(), compare);

    int clear = 0;
    int count = 0;
    int length;
    int panel;
    for(Puddle p : puddles) {
        clear = max(clear, p.from);
        if(clear >= p.to) continue;
        length = p.to - clear;
        panel = (length-1) / l + 1;
        clear += panel * l;
        count += panel;
    }
    cout << count;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 그리디 알고리즘 + 스위핑

</div>
</details>

[def]: https://www.acmicpc.net/problem/1911