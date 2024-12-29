---
layout: post
title: "[데일리 백준] 11656"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-12-29
last_modified_at: 2024-12-29
---
## Silver
### [11656][def]

```c++
#include <iostream>
#include <string>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    string s;
    cin >> s;
    vector<string> suffixes;
    for(size_t i = 0; i < s.size(); i++) {
        suffixes.push_back(s.substr(i));
    }
    sort(suffixes.begin(), suffixes.end());
    for(string suffix : suffixes) {
        cout << suffix << '\n';
    }
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 문자열 + 정렬 (날먹)

</div>
</details>

[def]: https://www.acmicpc.net/problem/11656