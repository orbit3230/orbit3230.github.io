---
layout: post
title: "[데일리 백준] 8979"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-06-14
last_modified_at: 2025-06-14
---
## Silver
### [8979][def]

```c++
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

typedef struct Country {
    int gold;
    int silver;
    int bronze;
    int index;
    bool operator<(const Country& other) const {
        if (gold != other.gold) return gold > other.gold;
        if (silver != other.silver) return silver > other.silver;
        return bronze > other.bronze;
    }
} Country;

int main() {
    int n, k;
    cin >> n >> k;
    vector<Country> countries(n);
    for(int i = 0 ; i < n ; i++) cin >> countries[i].index >> countries[i].gold >> countries[i].silver >> countries[i].bronze;
    sort(countries.begin(), countries.end());
    int rank = 1;
    for(int i = 0 ; i < n ; i++) {
        if(i > 0 && (countries[i].gold != countries[i-1].gold || countries[i].silver != countries[i-1].silver || countries[i].bronze != countries[i-1].bronze)) {
            rank = i + 1;
        }
        if(countries[i].index == k) {
            cout << rank;
            return 0;
        }
    }
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 정렬 (날먹)

</div>
</details>

[def]: https://www.acmicpc.net/problem/8979