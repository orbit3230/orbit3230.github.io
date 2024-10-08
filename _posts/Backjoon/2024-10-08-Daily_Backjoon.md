---
layout: post
title: "[데일리 백준] 2295"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-10-08
last_modified_at: 2024-10-08
---
## Gold
### [2295][def]

```c++
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

// k-z 값을 담은 객체
typedef struct kMz {
    int k;
    int value;
} kMz;

bool compare(const kMz& v1, const kMz& v2) {
    return v1.value < v2.value;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);

    int n;
    cin >> n;
    vector<int> list(n);
    for(int i = 0 ; i < n ; i++) cin >> list[i];
    sort(list.begin(), list.end());
    // (x + y + z) = k  ->  (x + y) = (k - z)
    vector<int> xy;  // x + y array
    vector<kMz> kz;  // k - z array
    for(int i = 0 ; i < n ; i++) {
        for(int j = i ; j < n ; j++) {
            xy.push_back(list[i] + list[j]);
            kz.push_back({list[j], list[j] - list[i]});
        }
    }
    sort(xy.begin(), xy.end());
    sort(kz.begin(), kz.end(), compare);
    int xyIndex = xy.size() - 1;
    int kzIndex = kz.size() - 1;
    int xy_; kMz kz_;
    int result = 0;
    while(xyIndex >= 0 && kzIndex >= 0) {
        xy_ = xy[xyIndex];
        kz_ = kz[kzIndex];
        if(xy_ == kz_.value) {
            result = max(result, kz_.k);
        }
        if(xy_ > kz_.value) {
            xyIndex--;
            continue;
        }
        kzIndex--;
    }
    cout << result;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 투 포인터 + 중간에서 만나기

- [백준 7453 - 합이 0인 네 정수][def2] 문제에서 영감을 얻었다. (유사한 알고리즘)

</div>
</details>

[def]: https://www.acmicpc.net/problem/2295
[def2]: https://www.acmicpc.net/problem/7453