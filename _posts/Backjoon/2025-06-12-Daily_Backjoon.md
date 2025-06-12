---
layout: post
title: "[데일리 백준] 26517"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-06-12
last_modified_at: 2025-06-12
---
## Silver
### [26517][def]

```c++
#include <iostream>
using namespace std;

int main() {
    int k;
    cin >> k;
    long long a, b, c, d;
    cin >> a >> b >> c >> d;
    long long left = a*k + b;
    long long right = c*k + d;
    if(left == right) {
        cout << "Yes " << left;
        return 0;
    }
    cout << "No";
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 수학 (날먹)

</div>
</details>

[def]: https://www.acmicpc.net/problem/26517