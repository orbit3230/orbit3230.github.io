---
layout: post
title: "[데일리 백준] 2003"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-02-27
last_modified_at: 2025-02-27
---
## Silver
### [2003][def]

```c++
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);

    int n, m;
    cin >> n >> m;
    vector<int> list(n);
    for(int i = 0 ; i < n ; i++) cin >> list[i];
    int left_point = 0;
    int right_point = 0;
    int sum = list[0];
    int count = 0;
    while(right_point < n) {
        if(sum < m) {
            right_point++;
            sum += list[right_point];
            continue;
        }
        if(sum == m) count++;
        sum -= list[left_point];
        left_point++;
    }
    cout << count;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 투 포인터 (날먹)

</div>
</details>

[def]: https://www.acmicpc.net/problem/2003