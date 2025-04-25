---
layout: post
title: "[데일리 백준] 9196"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-04-25
last_modified_at: 2025-04-25
---
## Silver
### [9196][def]

```c++
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

typedef struct Rectangle {
    int sorted_index;
    int h;
    int w;
    int power_of_diagonal;
} Rectangle;

bool compare(const Rectangle& a, const Rectangle& b) {
    if(a.power_of_diagonal == b.power_of_diagonal) return a.h < b.h;
    return a.power_of_diagonal < b.power_of_diagonal;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    vector<Rectangle> rectangles;
    for(int h = 1 ; h <= 150 ; h++) {
        for(int w = h+1 ; w <= 150 ; w++) {
            Rectangle r;
            r.h = h;
            r.w = w;
            r.power_of_diagonal = h*h + w*w;
            rectangles.push_back(r);
        }
    }
    sort(rectangles.begin(), rectangles.end(), compare);
    int size = rectangles.size();
    int h, w;
    while(cin >> h >> w) {
        if(!h || !w) break;
        for(int i = 0 ; i < size ; i++) {
            if(rectangles[i].h == h && rectangles[i].w == w) {
                cout << rectangles[i+1].h << ' ' << rectangles[i+1].w << '\n';
                break;
            }
        }
    }
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 정렬

</div>
</details>

[def]: https://www.acmicpc.net/problem/9196