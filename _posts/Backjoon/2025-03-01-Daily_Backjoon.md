---
layout: post
title: "[데일리 백준] 3079"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-03-01
last_modified_at: 2025-03-01
---
## Gold
### [3079][def]

```c++
#include <iostream>
#include <vector>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);

    int n, m;
    cin >> n >> m;
    vector<int> checkpoints(n);
    long long max = 0;
    for(int i = 0 ; i < n ; i++) {
        cin >> checkpoints[i];
        max = std::max(max, (long long)checkpoints[i]);
    }
    long long min = 0;
    max *= m;
    long long min_total_time = 0;
    while(min <= max) {
        long long time = (min+max)>>1;
        long long count = 0;
        for(int& checkpoint : checkpoints) {
            count += time / checkpoint;
            if(count >= m) break;
        }
        if(count >= m) {
            min_total_time = time;
            max = time-1;
            continue;
        }
        min = time+1;
    }
    cout << min_total_time;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- Parametric Search + Binary Search

</div>
</details>

[def]: https://www.acmicpc.net/problem/3079