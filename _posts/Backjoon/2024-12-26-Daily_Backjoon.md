---
layout: post
title: "[데일리 백준] 13305"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-12-26
last_modified_at: 2024-12-26
---
## Silver
### [13305][def]

```c++
#include <iostream>
#include <vector>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);

    int n;
    cin >> n;
    vector<int> distances(n-1);
    for(int i = 0 ; i < n-1 ; i++) cin >> distances[i];
    vector<long long> costs(n-1);  // discard nth
    for(int i = 0 ; i < n-1 ; i++) cin >> costs[i];

    long long cost = costs[0];
    long long sum = cost*distances[0];
    for(int i = 1 ; i < n ; i++) {
        cost = min(cost, costs[i]);
        sum += cost*distances[i];
    }
    cout << sum;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- Greedy Algorithm

</div>
</details>

[def]: https://www.acmicpc.net/problem/13305