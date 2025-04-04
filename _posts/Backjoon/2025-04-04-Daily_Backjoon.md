---
layout: post
title: "[데일리 백준] 14921"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-04-04
last_modified_at: 2025-04-04
---
## Gold
### [14921][def]

```c++
#include <iostream>
#include <vector>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    
    int n;
    cin >> n;
    vector<int> list(n);
    for(int i = 0 ; i < n ; i++) cin >> list[i];
    int leftPointer = 0;
    int rightPointer = n-1;
    int left, right, sum;
    int min = INT32_MAX;
    while(leftPointer < rightPointer) {
        left = list[leftPointer];
        right = list[rightPointer];
        sum = left + right;
        if(abs(min) > abs(sum)) min = sum;
        if(!sum) break;
        if(sum > 0) {
            rightPointer--;
            continue;
        }
        leftPointer++;
    }
    cout << min;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- Two Pointers

</div>
</details>

[def]: https://www.acmicpc.net/problem/14921