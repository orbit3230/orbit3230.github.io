---
layout: post
title: "[데일리 백준] 2477"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-02-15
last_modified_at: 2025-02-15
---
## Silver
### [2477][def]

```c++
#include <iostream>
#include <vector>
using namespace std;

typedef struct Input {
    int direction;
    int length;
} Input;

int main() {
    int k;
    cin >> k;
    vector<Input> inputDouble(12, {0, 0});
    for(int i = 0 ; i < 6 ; i++) {
        int direction, length;
        cin >> direction >> length;
        inputDouble[i] = {direction, length};
    }
    for(int i = 0 ; i < 6 ; i++) {
        inputDouble[i+6] = inputDouble[i];
    }
    int x = 0;
    int y = 0;
    for(int i = 0 ; i < 6 ; i++) {
        if(inputDouble[i].direction == 1 || inputDouble[i].direction == 2) {
            x = max(x, inputDouble[i].length);
            continue;
        }
        y = max(y, inputDouble[i].length);
    }
    // a, b, a, b 패턴 찾기
    int intersectionX, intersectionY;
    for(int i = 0 ; i < 9 ; i++) {
        if(inputDouble[i].direction == inputDouble[i+2].direction && inputDouble[i+1].direction == inputDouble[i+3].direction) {
            intersectionX = inputDouble[i+1].length;
            intersectionY = inputDouble[i+2].length;
            break;
        }
    }
    cout << (x*y - intersectionX*intersectionY) * k;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 기하학 + 구현

- 반시계 방향으로 들어오는 input에서 작은 직사각형을 찾는 패턴찾기가 다소 어렵다.

</div>
</details>

[def]: https://www.acmicpc.net/problem/2477