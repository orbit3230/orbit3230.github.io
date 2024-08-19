---
layout: post
title: "[데일리 백준] 7453"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-08-19
last_modified_at: 2024-08-19
---
## Gold
### [7453][def]

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
    vector<int> a;
    vector<int> b;
    vector<int> c;
    vector<int> d;
    int a_, b_, c_, d_;
    for(int i = 0 ; i < n ; i++) {
        cin >> a_ >> b_ >> c_ >> d_;
        a.push_back(a_);
        b.push_back(b_);
        c.push_back(c_);
        d.push_back(d_);
    }
    
    vector<int> ab;  // a 배열과 b 배열 합의 모든 경우를 저장
    vector<int> cd;  // c 배열과 d 배열 합의 모든 경우를 저장
    for(int i = 0 ; i < n ; i++) {
        for(int j = 0 ; j < n ; j++) {
            ab.push_back(a[i] + b[j]);
            cd.push_back(c[i] + d[j]);
        }
    }
    // ab와 cd에 대하여 투 포인터
    sort(ab.begin(), ab.end());
    sort(cd.begin(), cd.end());
    long long count = 0;
    int sum;
    int ab_point = 0;
    int cd_point = cd.size() - 1;
    while(ab_point < ab.size() && cd_point >= 0) {
        sum = ab[ab_point] + cd[cd_point];
        if(sum == 0) {
            long long ab_count = 1;
            long long cd_count = 1;
            // 같은 값은 조합이기 때문에 경우의 수로 곱하여 더해준다.
            while(ab_point + 1 < ab.size() && ab[ab_point] == ab[ab_point + 1]) {
                ab_point++;
                ab_count++;
            }
            while(cd_point - 1 >= 0 && cd[cd_point] == cd[cd_point - 1]) {
                cd_point--;
                cd_count++;
            }
            count += ab_count * cd_count;
        }
        if(sum < 0) {
            ab_point++;
            continue;
        }
        cd_point--;
    }

    cout << count;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 신박한 투 포인터 문제.

</div>
</details>

[def]: https://www.acmicpc.net/problem/7453