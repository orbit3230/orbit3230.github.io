---
layout: post
title: "[데일리 백준] 9095"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-05-08
last_modified_at: 2024-05-08
---
## Silver
### [9095][def]

```c++
#include <iostream>
using namespace std;

int main() {
    int t;
    cin >> t;

    // 0번 인덱스 미사용
    int list[11];
    list[1] = 1;
    list[2] = 2;
    list[3] = 4;
    for(int i = 4 ; i < 11 ; i++) {
        list[i] = list[i-1] + list[i-2] + list[i-3];
    }

    int n;
    for(int i = 0 ; i < t ; i++) {
        cin >> n;
        cout << list[n] << "\n";
    }
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 아이디어(점화식)

![recurrence_relation][def2]

</div>
</details>

[def]: https://www.acmicpc.net/problem/9095
[def2]: https://i.imgur.com/WrhdMV0.png