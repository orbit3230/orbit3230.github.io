---
layout: post
title: "[데일리 백준] 14916"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-12-27
last_modified_at: 2024-12-27
---
## Silver
### [14916][def]

```c++
#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    if(n == 1 || n == 3) {
        cout << -1;
        return 0;
    }
    int coins = 0;
    coins += n/5;
    n %= 5;
    if(n % 2 == 1) {
        coins--;
        n += 5;
    }
    coins += n/2;
    cout << coins;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- Greedy Algorithm (날먹)

</div>
</details>

[def]: https://www.acmicpc.net/problem/14916