---
layout: post
title: "[데일리 백준] 11478"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-01-28
last_modified_at: 2025-01-28
---
## Silver
### [11478][def]

```c++
#include <iostream>
#include <unordered_set>
using namespace std;

int main() {
    string s;
    cin >> s;
    int size = s.size();
    unordered_set<string> set;
    string subStr;
    for(int i = 0 ; i < size ; i++) {
        subStr = "";
        for(int j = i ; j < size ; j++) {
            subStr += s[j];
            set.insert(subStr);
        }
    }
    cout << set.size();
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 집합 날먹

</div>
</details>

[def]: https://www.acmicpc.net/problem/11478