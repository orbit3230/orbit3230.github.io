---
layout: post
title: "[데일리 백준] 1120"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-01-03
last_modified_at: 2025-01-03
---
## Silver
### [1120][def]

```c++
#include <iostream>
using namespace std;

int main() {
    string a, b;
    cin >> a >> b;
    
    int min = INT32_MAX;
    int diff;
    for(int i = 0 ; i < b.length()-a.length()+1 ; i++) {
        diff = 0;
        for(int j = 0 ; j < a.length() ; j++) {
            if(a[j] != b[j+i]) diff++;
        }
        min = std::min(min, diff);
    }
    cout << min;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 문자열 + 브루트포스 (날먹)

</div>
</details>

[def]: https://www.acmicpc.net/problem/1120