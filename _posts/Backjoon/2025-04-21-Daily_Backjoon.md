---
layout: post
title: "[데일리 백준] 17087"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-04-21
last_modified_at: 2025-04-21
---
## Silver
### [17087][def]

```c++
#include <iostream>
#include <vector>
using namespace std;

int gcd(int a, int b) {
    if(b == 0) return a;
    return gcd(b, a%b);
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    
    int n, s;
    cin >> n >> s;
    vector<int> list(n);
    int input;
    for(int i = 0 ; i < n ; i++) {
        cin >> input;
        list[i] = abs(s-input);
    }
    int gcd_ = list[0];
    for(int i = 1 ; i < n ; i++) gcd_ = gcd(gcd_, list[i]);
    cout << gcd_;
}
```

<details>
<summary>코멘트 ★</summary>
<div markdown="1">

- 유클리드 호제법

</div>
</details>

[def]: https://www.acmicpc.net/problem/17087