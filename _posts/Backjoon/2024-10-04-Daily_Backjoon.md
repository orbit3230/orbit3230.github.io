---
layout: post
title: "[데일리 백준] 1300"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-10-04
last_modified_at: 2024-10-04
---
## Gold
### [1300][def]

```c++
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int n;
    cin >> n;
    int k;
    cin >> k;

    int left = 1;
    int right = k;
    int mid;
    while(left <= right) {
        mid = (left + right) / 2;
        int count = 0;
        for(int i = 1 ; i <= n ; i++) {
            // n : i번째 행의 모든 숫자가 mid보다 작음
            // mid / i : i번째 행에서 mid보다 작은 숫자의 개수 (더 큰 숫자가 있음. n 미만이라는 뜻)
            count += min(mid / i, n);
        }
        if(count >= k) {
            right = mid - 1;
            continue;
        }
        left = mid + 1;
    }
    cout << right+1;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- Parametric Search + Binary Search

- 주석으로 작성한 부분에 해당하는 개념을 파악하는데 어려움을 겪었다.  

</div>
</details>

[def]: https://www.acmicpc.net/problem/1300