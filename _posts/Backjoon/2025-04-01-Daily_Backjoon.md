---
layout: post
title: "[데일리 백준] 4563"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-04-01
last_modified_at: 2025-04-01
---
## Gold
### [4563][def]

```c++
#include <iostream>
#include <cmath>
using namespace std;

int find(long long a) {
    int origin_a = sqrt(a);
    int count = 0;
    for(int divider = 1 ; divider <= sqrt(a) ; divider++) {
        if(a % divider != 0) continue;
        if(((a / divider) + divider) % 2 != 0) continue;
        long long c = ((a / divider) + divider) >> 1;
        long long b = c - divider;
        if(b <= origin_a) break;
        if(a + b > c) count++;
    }
    return count;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    
    long long a;
    while(cin >> a) {
        if(!a) break;
        cout << find(a*a) << '\n';
    }
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 수학

- `a^2 = b^2 + c^2` = `(b+c)(b-c)`

</div>
</details>

[def]: https://www.acmicpc.net/problem/4563