---
layout: post
title: "[데일리 백준] 2822"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-05-08
last_modified_at: 2025-05-08
---
## Silver
### [2822][def]

```c++
#include <iostream>
#include <queue>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);

    priority_queue<pair<int, int>> pq;
    for(int i = 1 ; i <= 8 ; i++) {
        int input;
        cin >> input;
        pq.push({input, i});
    }
    int sum = 0;
    vector<int> indices(5);
    for(int i = 0 ; i < 5 ; i++) {
        sum += pq.top().first;
        indices[i] = pq.top().second;
        pq.pop();
    }
    cout << sum << '\n';
    sort(indices.begin(), indices.end());
    for(int index : indices) cout << index << ' ';
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 정렬 (날먹)

</div>
</details>

[def]: https://www.acmicpc.net/problem/2822