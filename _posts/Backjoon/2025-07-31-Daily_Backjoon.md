---
layout: post
title: "[데일리 백준] 13144"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-07-31
last_modified_at: 2025-07-31
---
## Gold
### [13144][def]

```c++
#include <iostream>
#include <vector>
#define SIZE 100001
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);

    int n;
    cin >> n;
    vector<int> list(n);
    vector<bool> isUsed(SIZE, false);
    for(int i = 0 ; i < n ; i++) cin >> list[i];
    int rightPoint = 1;
    int left, right;
    long long result = 0;
    for(int leftPoint = 0 ; leftPoint < n ; leftPoint++) {
        if(leftPoint >= rightPoint) rightPoint = leftPoint + 1;
        left = list[leftPoint];
        isUsed[left] = true;
        while(rightPoint != n) {
            right = list[rightPoint];
            if(isUsed[right]) break;
            isUsed[right] = true;
            rightPoint++;
        }
        result += rightPoint - leftPoint;
        isUsed[left] = false;
    }
    cout << result;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- Two Pointers

</div>
</details>

[def]: https://www.acmicpc.net/problem/13144