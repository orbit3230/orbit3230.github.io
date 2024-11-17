---
layout: post
title: "[데일리 백준] 14425"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-11-17
last_modified_at: 2024-11-17
---
## Silver
### [14425][def]

```c++
#include <iostream>
#include <unordered_set>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);

    int n, m;
    cin >> n >> m;
    unordered_set<string> s;
    string input;
    for(int i = 0 ; i < n ; i++) {
        cin >> input;
        s.insert(input);
    }
    int count = 0;
    for(int i = 0 ; i < m ; i++) {
        cin >> input;
        if(s.find(input) != s.end()) count++;
    }
    cout << count;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 문자열(쉬어가는 날)

</div>
</details>

[def]: https://www.acmicpc.net/problem/14425