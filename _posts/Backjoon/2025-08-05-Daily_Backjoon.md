---
layout: post
title: "[데일리 백준] 1092"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-08-05
last_modified_at: 2025-08-05
---
## Gold
### [1092][def]

```c++
#include <iostream>
#include <vector>
#include <queue>
#include <algorithm>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);

    int n;
    cin >> n;
    vector<int> cranes(n);
    for(int i = 0 ; i < n ; i++) cin >> cranes[i];
    sort(cranes.begin(), cranes.end(), greater<int>());
    int m;
    cin >> m;
    vector<int> boxes(m);
    for(int i = 0 ; i < m ; i++) cin >> boxes[i];
    sort(boxes.begin(), boxes.end(), greater<int>());
    if(boxes[0] > cranes[0]) {
        cout << -1;
        return 0;
    }
    int time = 0;
    int moved_count = 0;
    int box_index = 0;
    vector<bool> moved_boxes(m, false);
    while(moved_count != m) {
        for(int crane : cranes) {
            bool found = false;
            for(int i = box_index ; i < m ; i++) {
                if(moved_boxes[i]) continue;
                if(crane >= boxes[i]) {
                    moved_boxes[i] = true;
                    moved_count++;
                    box_index = i+1;
                    found = true;
                    break;
                }
            }
            if(!found) goto NextTime;
        }
        NextTime:
        time++;
        box_index = 0;
    }
    
    cout << time;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- Greedy + Sorting

</div>
</details>

[def]: https://www.acmicpc.net/problem/1092