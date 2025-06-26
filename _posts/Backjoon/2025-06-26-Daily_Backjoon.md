---
layout: post
title: "[데일리 백준] 1205"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-06-26
last_modified_at: 2025-06-26
---
## Silver
### [1205][def]

```c++
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    int n, score, p;
    cin >> n >> score >> p;
    vector<int> scores(n+1);
    scores[0] = INT32_MAX;
    for(int i = 1 ; i <= n ; i++) cin >> scores[i];
    sort(scores.begin(), scores.end(), greater<int>());

    int rank = 1;
    for(int i = 1 ; i <= n ; i++) {
        if(scores[i-1] != scores[i] && scores[i-1] != score) rank = i;
        if(scores[i] < score) {
            cout << rank;
            return 0;
        }
    }
    if(scores[n] != score) rank = n + 1;
    cout << (n < p ? rank : -1);
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 정렬

</div>
</details>

[def]: https://www.acmicpc.net/problem/1205