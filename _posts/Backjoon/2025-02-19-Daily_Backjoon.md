---
layout: post
title: "[데일리 백준] 2559"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-02-19
last_modified_at: 2025-02-19
---
## Silver
### [2559][def]

```c++
#include <iostream>
#include <queue>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);

    int n, k;
    cin >> n >> k;
    queue<int> q;
    int sum = 0;
    int input;
    for(int i = 0 ; i < k ; i++) {
        cin >> input;
        sum += input;
        q.push(input);
    }
    int max = sum;
    for(int i = k ; i < n ; i++) {
        sum -= q.front();
        q.pop();
        cin >> input;
        sum += input;
        q.push(input);
        max = std::max(max, sum);
    }
    cout << max;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- Sliding window

</div>
</details>

[def]: https://www.acmicpc.net/problem/2559