---
layout: post
title: "[데일리 백준] 1377"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-07-15
last_modified_at: 2025-07-15
---
## Gold
### [1377][def]

```c++
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

typedef struct Element {
    int value;
    int index;
} Element;

bool compare(const Element& a, const Element& b) {
    if(a.value == b.value) return a.index < b.index;
    return a.value < b.value;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n;
    cin >> n;
    vector<Element> list(n);
    for(int i = 0 ; i < n ; i++) {
        cin >> list[i].value;
        list[i].index = i;
    }
    sort(list.begin(), list.end(), compare);
    int max = 0;
    for(int i = 0 ; i < n ; i++) {
        int diff = list[i].index - i;
        max = std::max(max, diff);
    }
    cout << max+1;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- Sorting

</div>
</details>

[def]: https://www.acmicpc.net/problem/1377