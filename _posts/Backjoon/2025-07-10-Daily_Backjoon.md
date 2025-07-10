---
layout: post
title: "[데일리 백준] 1083"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-07-10
last_modified_at: 2025-07-10
---
## Gold
### [1083][def]

```c++
#include <iostream>
#include <vector>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    int n;
    cin >> n;
    vector<int> list(n);
    for(int i = 0 ; i < n ; i++) cin >> list[i];
    int s;
    cin >> s;
    for(int i = 0 ; i < n ; i++) {
        int range = min(n, i+s+1);
        int max = list[i];
        int maxIndex = i;
        for(int j = i+1 ; j < range ; j++) {
            if(list[j] > max) {
                max = list[j];
                maxIndex = j;
            }
        }
        for(int j = maxIndex ; j > i ; j--) swap(list[j], list[j-1]);
        s -= (maxIndex - i);
        if(!s) break;
    }
    for(int e : list) cout << e << ' ';
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- Greedy + Sorting

</div>
</details>

[def]: https://www.acmicpc.net/problem/1083