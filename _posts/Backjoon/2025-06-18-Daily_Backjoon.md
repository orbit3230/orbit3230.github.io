---
layout: post
title: "[데일리 백준] 3036"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-06-18
last_modified_at: 2025-06-18
---
## Silver
### [3036][def]

```c++
#include <iostream>
#include <vector>
using namespace std;

int gcd(int a, int b) {
    if(a == 0) return b;
    return gcd(b % a, a);
}

int main() {
    int n;
    cin >> n;
    vector<int> circles(n);
    for(int i = 0 ; i < n ; i++) cin >> circles[i];
    for(int i = 1 ; i < n ; i++) {
        int gcd = ::gcd(circles[0], circles[i]);
        cout << circles[0] / gcd << '/' << circles[i] / gcd  << '\n';
    }
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 수학 (날먹)

</div>
</details>

[def]: https://www.acmicpc.net/problem/3036