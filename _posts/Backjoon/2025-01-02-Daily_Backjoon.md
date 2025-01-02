---
layout: post
title: "[데일리 백준] 2527"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-01-02
last_modified_at: 2025-01-02
---
## Silver
### [2527][def]

```c++
#include <iostream>
using namespace std;

typedef struct Point {
    int x;
    int y;
} Point;
typedef struct Rectangle {
    Point from;
    Point to;
} Rectangle;

int main() {
    Rectangle a, b;
    while(cin >> a.from.x >> a.from.y >> a.to.x >> a.to.y >> b.from.x >> b.from.y >> b.to.x >> b.to.y) {
        if(b.to.x < a.from.x || a.to.x < b.from.x || b.to.y < a.from.y || a.to.y < b.from.y) {
            cout << 'd' << '\n';
            continue;
        }
        if((b.to.x == a.from.x && b.to.y == a.from.y) || (b.from.x == a.to.x && b.to.y == a.from.y) 
        || (b.to.x == a.from.x && b.from.y == a.to.y) || (b.from.x == a.to.x && b.from.y == a.to.y)) {
            cout << 'c' << '\n';
            continue;
        }
        if(b.to.x == a.from.x || b.from.x == a.to.x || b.to.y == a.from.y || b.from.y == a.to.y) {
            cout << 'b' << '\n';
            continue;
        }
        cout << 'a' << '\n';
    }
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 기하학 (2차원 좌표평면)

</div>
</details>

[def]: https://www.acmicpc.net/problem/2527