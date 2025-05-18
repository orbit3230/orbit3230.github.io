---
layout: post
title: "[데일리 백준] 5347"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-05-18
last_modified_at: 2025-05-18
---
## Silver
### [5347][def]

```c++
#include <iostream>
using namespace std;

int gcd(int a, int b) {
    if (b == 0) return a;
    return gcd(b, a % b);
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    int n;
    cin >> n;
    while(n--) {
        int a, b;
        cin >> a >> b;
        int gcd = ::gcd(a, b);
        long long lcm = ((long long)a / gcd) * b;
        cout << lcm << '\n';
    }
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 최소공배수 (날먹)

</div>
</details>

[def]: https://www.acmicpc.net/problem/5347