---
layout: post
title: "[데일리 백준] 3020"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-02-11
last_modified_at: 2025-02-11
---
## Gold
### [3020][def]

```c++
#include <iostream>
#include <vector>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);

    int n, h;
    cin >> n >> h;
    vector<int> lower(h+2, 0);
    vector<int> upper(h+1, 0);
    int height;
    for(int i = 0 ; i < n ; i++) {
        cin >> height;
        if(!(i % 2)) {
            lower[height+1]++;
            continue;
        }
        upper[h-height]++;
    }
    vector<int> obstacle(h+1, 0);
    int lower_obstacle = (n+1)/2;
    for(int i = 1 ; i <= h ; i++) {
        lower_obstacle -= lower[i];
        obstacle[i] += lower_obstacle;
    }
    int upper_obstacle = n/2;
    for(int i = h ; i >= 1 ; i--) {
        upper_obstacle -= upper[i];
        obstacle[i] += upper_obstacle;
    }

    int min = INT32_MAX;
    int count = 0;
    for(int i = 1; i <= h ; i++) {
        if(obstacle[i] <= min) {
            if(obstacle[i] == min) {
                count++;
                continue;
            }
            min = obstacle[i];
            count = 1;
            continue;
        }
    }
    cout << min << ' ' << count;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- Prefix Sum

</div>
</details>

[def]: https://www.acmicpc.net/problem/3020