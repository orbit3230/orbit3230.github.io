---
layout: post
title: "[데일리 백준] 2436"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-09-29
last_modified_at: 2024-09-29
---
## Gold
### [2436][def]

```c++
#include <iostream>
using namespace std;

bool gcdCheck(int GCD, int a, int b) {
    while(a % b != 0) {
        int temp = a % b;
        a = b;
        b = temp;
    }
    return b == GCD;
}

int main() {
    int GCD, LCM;
    cin >> GCD >> LCM;

    int a = GCD;
    int b = LCM;
    int multiplier = 1;
    pair<int, int> answer = {a, b};
    while(a * multiplier < b / multiplier) {
        if(b % multiplier == 0 && gcdCheck(GCD, a * multiplier, b / multiplier)) {
            answer = {a * multiplier, b / multiplier};
        }
        multiplier++;
    }
    cout << answer.first << ' ' << answer.second;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 유클리드 호제법을 활용한 문제

- 브루트포스로 풀되, 필요없는 수를 최대한 잘 건너뛰는게 중요했다.  

</div>
</details>

[def]: https://www.acmicpc.net/problem/2436