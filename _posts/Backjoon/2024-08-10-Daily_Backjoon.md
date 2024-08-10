---
layout: post
title: "[데일리 백준] 2467"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-08-10
last_modified_at: 2024-08-10
---
## Gold
### [2467][def]

- 스트릭 날먹
- [2470][def2] 문제와 완전히 동일함.

```c++
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    int n;
    cin >> n;
    vector<int> list;
    int next;
    for(int i = 0 ; i < n ; i++) {
        cin >> next;
        list.push_back(next);
    }
    sort(list.begin(), list.end());
    int left = 0;           // 왼쪽 포인터
    int right = n-1;   // 오른쪽 포인터
    int sum;
    int min_abs = 2000000000;
    pair<int, int> result;
    while(left < right) {
        sum = list[left] + list[right];
        if(sum == 0) {
            result = {list[left], list[right]};
            break;
        }
        if(abs(sum) < min_abs) {
            min_abs = abs(sum);
            result = {list[left], list[right]};
        }
        if(sum < 0) {
            left++;
        }
        else {  // sum > 0
            right--;
        }
    }

    cout << result.first << ' ' << result.second;
}
```

[def]: https://www.acmicpc.net/problem/2467
[def2]: https://www.acmicpc.net/problem/2470