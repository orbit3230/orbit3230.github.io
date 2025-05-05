---
layout: post
title: "[데일리 백준] 11441"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-05-05
last_modified_at: 2025-05-05
---
## Silver
### [11441][def]

```c++
#include <iostream>
#include <vector>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);

    int n;
    cin >> n;
    vector<int> prefix_sum(n);
    cin >> prefix_sum[0];
    int input;
    for(int i = 1 ; i < n ; i++) {
        cin >> input;
        prefix_sum[i] = prefix_sum[i-1] + input;
    }
    int m;
    cin >> m;
    int a, b;
    while(m--) {
        cin >> a >> b;
        a--; b--;  // 0-based index
        cout << prefix_sum[b] - (a == 0 ? 0 : prefix_sum[a-1]) << '\n';
    }
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 누적 합 (날먹)

</div>
</details>

[def]: https://www.acmicpc.net/problem/11441