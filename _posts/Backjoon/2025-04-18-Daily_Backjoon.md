---
layout: post
title: "[데일리 백준] 18221"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-04-18
last_modified_at: 2025-04-18
---
## Silver
### [18221][def]

```c++
#include <iostream>
#include <vector>
#include <cmath>
using namespace std;

typedef struct Point {
    int r;
    int c;
} Point;

bool distance(Point& me, Point& prof) {
    return sqrt((me.r - prof.r) * (me.r - prof.r) + (me.c - prof.c) * (me.c - prof.c)) >= 5;
}
bool count(Point& me, Point& prof, vector<Point>& friends) {
    int count = 0;
    int from_x = min(me.r, prof.r);
    int to_x = max(me.r, prof.r);
    int from_y = min(me.c, prof.c);
    int to_y = max(me.c, prof.c);
    for(Point& f : friends) {
        if(f.r >= from_x && f.r <= to_x && f.c >= from_y && f.c <= to_y) count++;
    }
    return count >= 3;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);

    int n;
    cin >> n;
    Point me;
    Point prof;
    vector<Point> friends;
    int input;
    for(int i = 0 ; i < n ; i++) {
        for(int j = 0 ; j < n ; j++) {
            cin >> input;
            if(input == 1) {
                friends.push_back({i, j});
                continue;
            }
            if(input == 2) {
                me.r = i; me.c = j;
                continue;
            }
            if(input == 5) {
                prof.r = i; prof.c = j;
                continue;
            }
        }
    }
    cout << (distance(me, prof) && count(me, prof, friends) ? 1 : 0);
}
```

<details>
<summary>코멘트 ★</summary>
<div markdown="1">

- 기하학 (날먹)

</div>
</details>

[def]: https://www.acmicpc.net/problem/18221