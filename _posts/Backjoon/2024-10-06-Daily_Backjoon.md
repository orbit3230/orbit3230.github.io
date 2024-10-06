---
layout: post
title: "[데일리 백준] 18869"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-10-06
last_modified_at: 2024-10-06
---
## Gold
### [18869][def]

```c++
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

typedef struct Planet {
    int size;
    int order;
} Planet;

bool compare(const Planet& p1, const Planet& p2) {
    return p1.size < p2.size;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);

    int m, n;
    cin >> m >> n;
    vector<Planet> planets(n);
    vector<vector<int>> ordering(m, vector<int>(n));
    for(int i = 0 ; i < m ; i++) {
        for(int j = 0 ; j < n ; j++) {
            cin >> planets[j].size;
            planets[j].order = j;
        }
        sort(planets.begin(), planets.end(), compare);
        int rank = -1;
        int prev = -1;
        for(int j = 0 ; j < n ; j++) {
            if(planets[j].size != prev) rank++;
            ordering[i][planets[j].order] = rank;
            prev = planets[j].size;
        }
    }
    int count = 0;
    for(int i = 0 ; i < m ; i++) {
        for(int j = i+1 ; j < m ; j++) {
            for(int k = 0 ; k < n ; k++) {
                if(ordering[i][k] != ordering[j][k]) {
                    goto notSame;
                }
            }
            count++;
            notSame:
            continue;
        }
    }
    cout << count;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 정렬 + 좌표 압축

- 좌표 압축을 다시금 연습했다. 좌표 압축을 따로 공부하진 않았는데, 내멋대로 한 방식이 어지간한 코드보다 빠르다 !

</div>
</details>

[def]: https://www.acmicpc.net/problem/18869