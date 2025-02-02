---
layout: post
title: "[데일리 백준] 4673"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-02-02
last_modified_at: 2025-02-02
---
## Silver
### [4673][def]

```c++
#include <iostream>
#include <vector>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cout.tie(NULL);

    vector<bool> isSelfNum(10500, true);
    for(int i = 1 ; i <= 10000 ; i++) {
        int sum = i;
        int n = i;
        while(n) {
            sum += n%10;
            n /= 10;
        }
        isSelfNum[sum] = false;
    }
    for(int i = 1 ; i <= 10000 ; i++) if(isSelfNum[i]) cout << i << '\n';
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 브루트 포스 날먹먹

</div>
</details>

[def]: https://www.acmicpc.net/problem/4673