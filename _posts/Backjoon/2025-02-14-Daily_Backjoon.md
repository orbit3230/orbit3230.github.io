---
layout: post
title: "[데일리 백준] 3273"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-02-14
last_modified_at: 2025-02-14
---
## Silver
### [3273][def]

```c++
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);

    int n;
    cin >> n;
    vector<int> list(n);
    for(int i = 0 ; i < n ; i++) cin >> list[i];
    int x;
    cin >> x;
    sort(list.begin(), list.end());
    int left = 0;
    int right = n-1;
    int count = 0;
    while(left < right) {
        int sum = list[left] + list[right];
        if(sum == x) count++;
        if(sum <= x) {
            left++;
            continue;
        }
        right--;
    }
    cout << count;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 투 포인터

</div>
</details>

[def]: https://www.acmicpc.net/problem/3273