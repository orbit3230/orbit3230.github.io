---
layout: post
title: "[데일리 백준] 2565"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-09-04
last_modified_at: 2025-09-04
---
## Gold
### [2565][def]

```c++
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

struct Line {
    int from;
    int to;
};

bool compare(const Line& l1, const Line& l2) {
    return l1.to < l2.to;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);

    int n;
    cin >> n;
    vector<Line> lines(n);
    for(int i = 0 ; i < n ; i++) cin >> lines[i].from >> lines[i].to;
    sort(lines.begin(), lines.end(), compare);

    vector<int> dpTable;
    dpTable.push_back(lines[0].from);  // init
    for(int i = 1 ; i < n ; i++) {
        int check = lines[i].from;
        for(int& next : dpTable) {
            if(check < next) {
                next = check;
                goto nextLoop;
            }
        }
        dpTable.push_back(check);
        nextLoop:
        continue;
    }
    cout << n - dpTable.size();
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- Dynamic Programming (LIS, 가장 긴 증가하는 부분 수열)

</div>
</details>

[def]: https://www.acmicpc.net/problem/2565