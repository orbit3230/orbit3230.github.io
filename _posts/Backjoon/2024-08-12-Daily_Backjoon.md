---
layout: post
title: "[데일리 백준] 2143"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-08-12
last_modified_at: 2024-08-12
---
## Gold
### [2143][def]

```c++
#include <iostream>
#include <vector>
#include <unordered_map>
using namespace std;

// 첫 배열의 부분합으로 얻을 수 있는 가지수에 대한 해시맵을 만들어두고,
// 두 번째 배열의 부분합에 대하여 타겟 값에서 뺀 값이 해시맵에 몇 번 카운트 되어있는지 세는 방식.
long long counts(vector<int>& a, int n, vector<int>& b, int m, int t) {
    long long count = 0;
    int a_left = -1, a_right = 0, a_leftSum, a_rightSum, a_sum;
    int b_left = -1, b_right = 0, b_leftSum, b_rightSum, b_sum;
    unordered_map<int, int> a_map;
    for(a_left = -1 ; a_left < n ; a_left++) {
        for(a_right = a_left + 1 ; a_right < n ; a_right++) {
            a_leftSum = (a_left == -1) ? 0 : a[a_left];
            a_rightSum = a[a_right];
            a_sum = a_rightSum - a_leftSum;
            a_map[a_sum]++;
        }
    }
    for(b_left = -1 ; b_left < m ; b_left++) {
        for(b_right = b_left + 1 ; b_right < m ; b_right++) {
            b_leftSum = (b_left == -1) ? 0 : b[b_left];
            b_rightSum = b[b_right];
            b_sum = b_rightSum - b_leftSum;
            count += a_map[t - b_sum];
        }
    }
    return count;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    int t;
    cin >> t;
    int n;
    cin >> n;
    vector<int> a;
    int sum = 0;
    int next;
    for(int i = 0 ; i < n ; i++) {
        cin >> next;
        sum += next;
        a.push_back(sum);
    }
    int m;
    cin >> m;
    vector<int> b;
    sum = 0;
    for(int i = 0 ; i < m ; i++) {
        cin >> next;
        sum += next;
        b.push_back(sum);
    }

    cout << counts(a, n, b, m, t);
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 인덱스를 이용해 시간복잡도를 `O(n)`으로 만드는 해시맵 테이블 기법을 이용했다.  

- 메모리 제한이 빡세서 걱정했는데 다행히도 통과했다. (맵을 두 개 만들었다면 실패했을 것)

</div>
</details>

[def]: https://www.acmicpc.net/problem/2143