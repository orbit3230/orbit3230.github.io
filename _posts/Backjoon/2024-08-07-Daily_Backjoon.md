---
layout: post
title: "[데일리 백준] 1806"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-08-07
last_modified_at: 2024-08-07
---
## Gold
### [1806][def]

- 투 포인터에 대하여 공부하였음.

```c++
#include <iostream>
#include <vector>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    int n, s;
    cin >> n >> s;
    vector<int> sums;
    int sum = 0;
    int next;
    for(int i = 0 ; i < n ; i++) {
        cin >> next;
        sum += next;
        sums.push_back(sum);
    }
    if(sums[n-1] < s) {  // 완성할 수 없는 경우
        cout << 0;
        return 0;
    }
    int left = -1;  // 왼쪽 포인터
    int right = 0;  // 오른쪽 포인터
    int leftSum, rightSum, partialSum;
    int minLength = n+1;
    while(right < n) {
        leftSum = (left == -1) ? 0 : sums[left];
        rightSum = sums[right];
        partialSum = rightSum - leftSum;
        if(partialSum < s) {  // 부족하다면 오른쪽 포인터 이동
            right++;
            continue;
        }
        // 충분하다면 길이 비교 후 왼쪽 포인터 이동
        minLength = min(minLength, right - left);
        left++;
    }
    cout << minLength;
}
```

[def]: https://www.acmicpc.net/problem/1806