---
layout: post
title: "[데일리 백준] 1027"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-08-30
last_modified_at: 2024-08-30
---
## Gold
### [1027][def]

```c++
#include <iostream>
#include <vector>
using namespace std;

int watch(vector<int>& buildings, int current, int start, int end, int changing) {
    if(start < 0 || start >= buildings.size()) return 0;
    int visible = 0;
    double tilt = 0.0;
    double can_see = 0.0;
    int recent = 0;
    for(int i = start ; i != end ; i += changing) {
        if(buildings[i] > can_see) {
            recent = buildings[i];
            visible++;
            tilt = (double)(buildings[current] - recent) / abs(current - i);
        }
        can_see = buildings[current] - (tilt * abs(current - (i + changing)));
    }
    return visible;
}

int main() {
    int n;
    cin >> n;
    vector<int> buildings;
    int input;
    for(int i = 0 ; i < n ; i++) {
        cin >> input;
        buildings.push_back(input);
    }

    int max_visible = 0;
    int visible;
    for(int i = 0 ; i < n ; i++) {
        visible = 0;
        visible += watch(buildings, i, i-1, -1, -1);
        visible += watch(buildings, i, i+1, n, 1);
        if(visible > max_visible) {
            max_visible = visible;
        }
    }
    cout << max_visible;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 기하학 문제.

- 역시 기하학 문제는 반례가 정말 빡세다...

</div>
</details>

[def]: https://www.acmicpc.net/problem/1027