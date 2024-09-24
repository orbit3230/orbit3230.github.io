---
layout: post
title: "[데일리 백준] 1016"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-08-29
last_modified_at: 2024-08-29
---
## Gold
### [1016][def]

```c++
#include <iostream>
#include <vector>
using namespace std;

int main() {
    long long min, max;
    cin >> min >> max;
    long long count = max - min + 1;

    vector<bool> m(max-min+1, false);
    long long base = 2;
    long long square;
    while(base * base <= max) {
        square = base * base;
        long long start = (min + square - 1) / square * square;  // min 이상인 square의 배수 중 최솟값
        for(long long num = start ; num <= max ; num += square) {
            if(!m[num-min]) {
                m[num-min] = true;
                count--;
            }
        }
        base++;
    }
    cout << count;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 수학 문제.

- min 이상인 square의 배수 중 최솟값을 찾는 로직이 어려웠다.

</div>
</details>

[def]: https://www.acmicpc.net/problem/1016