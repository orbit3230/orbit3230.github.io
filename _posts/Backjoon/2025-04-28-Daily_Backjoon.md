---
layout: post
title: "[데일리 백준] 14311"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-04-28
last_modified_at: 2025-04-28
---
## Silver
### [14311][def]

```c++
#include <iostream>
#include <vector>
#include <algorithm>
#include <cmath>
using namespace std;

typedef struct Target {
    int index;
    double time;
} Target;

bool compare(const Target& a, const Target& b) {
    if(a.time == b.time) return a.index < b.index;
    return a.time < b.time;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    int n;
    cin >> n;
    vector<Target> targets(n);
    double x, y, speed;
    for(int i = 0 ; i < n ; i++) {
        targets[i].index = i+1;
        cin >> x >> y >> speed;
        targets[i].time = sqrt(x*x + y*y)/speed;
    }
    sort(targets.begin(), targets.end(), compare);
    for(Target& target : targets) cout << target.index << '\n';
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 거리 계산 (날먹)

</div>
</details>

[def]: https://www.acmicpc.net/problem/14311