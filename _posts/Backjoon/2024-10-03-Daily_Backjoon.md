---
layout: post
title: "[데일리 백준] 2343"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-10-03
last_modified_at: 2024-10-03
---
## Silver
### [2343][def]

```c++
#include <iostream>
#include <vector>
using namespace std;

bool can_make(vector<int>& list, int size, int pieces) {
    int sum = 0;
    int count = 0;
    for(int i = 0 ; i < list.size() ; i++) {
        if(list[i] > size) return false;
        if(sum + list[i] > size) {
            count++;
            sum = list[i];
        }
        else sum += list[i];
        if(count == pieces) return false;
    }
    return true;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);

    int n, m;
    cin >> n >> m;
    int sum = 0;
    vector<int> list(n);
    for(int i = 0 ; i < n ; i++) {
        cin >> list[i];
        sum += list[i];
    }
    int left = sum / m;
    int right = sum;
    int max_piece = 0;
    while(left <= right) {
        int mid = (left + right) / 2;
        if(can_make(list, mid, m)) {
            max_piece = mid;
            right = mid - 1;
            continue;
        }
        left = mid + 1;
    }
    cout << max_piece;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- Parametric Search

- 역으로 생각하여 최대 조각의 크기를 왔다갔다 하며 이분탐색하며 해결하는 문제이다.  
역으로 생각하기. - Parametric Search

</div>
</details>

[def]: https://www.acmicpc.net/problem/2343