---
layout: post
title: "[데일리 백준] 11057"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-09-18
last_modified_at: 2025-09-18
---
## Silver
### [11057][def]

```c++
#include <iostream>
#include <vector>
#define DIV 10007
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> list(10, 1);
    int sum = 0;
    for(int i = 0 ; i < n-1 ; i++) {
        for(int j = 0 ; j < 10 ; j++) {
            list[j] += (j == 0 ? 0 : list[j-1]) % DIV;
            list[i] %= DIV;
        }
    }
    for(int i = 0 ; i < 10 ; i++) {
        sum += (list[i] % DIV);
        sum %= DIV;
    }
    cout << sum;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- Math

</div>
</details>

[def]: https://www.acmicpc.net/problem/11057