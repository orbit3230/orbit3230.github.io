---
layout: post
title: "[데일리 백준] 2744"
excerpt: "1 Bronze"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-07-25
last_modified_at: 2024-07-25
---
## Silver
### [2744][def]

```c++
#include <iostream>
using namespace std;

int main() {
    string s;
    cin >> s;
    for(int i = 0 ; i < s.size() ; i++) {
        if(s[i] >= 'A' && s[i] <= 'Z')
            s[i] += 32;
        else
            s[i] -= 32;
    }
    cout << s;
}
```

- 외박으로 인한 날먹

[def]: https://www.acmicpc.net/problem/2744