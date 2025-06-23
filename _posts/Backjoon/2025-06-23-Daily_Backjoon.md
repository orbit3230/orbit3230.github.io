---
layout: post
title: "[데일리 백준] 9507"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-06-23
last_modified_at: 2025-06-23
---
## Silver
### [9507][def]

```c++
#include <iostream>
#include <vector>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    vector<long long> ggfibo(70, 1);
    ggfibo[2] = 2;
    ggfibo[3] = 4;
    for(int i = 4 ; i < 70 ; i++) ggfibo[i] = ggfibo[i - 1] + ggfibo[i - 2] + ggfibo[i - 3] + ggfibo[i - 4];
    int t;
    cin >> t;
    int n;
    while(t--) {
        cin >> n;
        cout << ggfibo[n] << '\n';
    }
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 피보나치 (날먹)

</div>
</details>

[def]: https://www.acmicpc.net/problem/9507