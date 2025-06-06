---
layout: post
title: "[데일리 백준] 13909"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-06-06
last_modified_at: 2025-06-06
---
## Gold
### [13909][def]

```c++
#include <iostream>
#include <vector>
#include <unordered_map>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);

    int n, k;
    cin >> n >> k;
    vector<int> prefix_sum(n+1, 0);
    unordered_map<int, int> count;
    count[0]++;
    int sum = 0;
    int input;
    long long result = 0;
    for(int i = 0 ; i < n ; i++) {
        cin >> input;
        sum += input;
        prefix_sum[i+1] = sum;
        if(count.find(sum - k) != count.end()) result += count[sum - k];
        count[sum]++;
    }
    cout << result;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- Prefix Sum with Hash Map

</div>
</details>

[def]: https://www.acmicpc.net/problem/13909