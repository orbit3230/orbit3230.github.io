---
layout: post
title: "[데일리 백준] 14445"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-03-21
last_modified_at: 2025-03-21
---
## Gold
### [14445][def]

```c++
#include <iostream>
using namespace std;

int main() {
    long long n;
    cin >> n;
    if(n == 1) {
        cout << 0;
        return 0;
    }
    if(n % 2 == 0) {
        cout << n/2;
        return 0;
    }
    cout << n/2+1;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 기하학 (날먹)  

</div>
</details>

[def]: https://www.acmicpc.net/problem/14445