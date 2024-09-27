---
layout: post
title: "[데일리 백준] 2096"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-09-27
last_modified_at: 2024-09-27
---
## Gold
### [2096][def]

```c++
#include <iostream>
#include <vector>
using namespace std;

typedef struct DP {
    int max;
    int min;
} DP;

int min3(int a, int b, int c) {
    return (a < b) ? ((a < c) ? a : c) : ((b < c) ? b : c);
}
int max3(int a, int b, int c) {
    return (a > b) ? ((a > c) ? a : c) : ((b > c) ? b : c);
}

void copyCtoP(vector<DP>& current, vector<DP>& previous) {
    for(int i = 0 ; i < 3 ; i++) {
        previous[i].min = current[i].min;
        previous[i].max = current[i].max;
    }
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    int n;
    cin >> n;
    // initialize
    vector<DP> previous(3);
    vector<DP> current(3);
    cin >> previous[0].min >> previous[1].min >> previous[2].min;
    previous[0].max = previous[0].min;
    previous[1].max = previous[1].min;
    previous[2].max = previous[2].min;

    for(int i = 1 ; i < n ; i++) {
        int n1, n2, n3;
        cin >> n1 >> n2 >> n3;
        current[0].min = min(previous[0].min, previous[1].min) + n1;
        current[0].max = max(previous[0].max, previous[1].max) + n1;
        current[1].min = min3(previous[0].min, previous[1].min, previous[2].min) + n2;
        current[1].max = max3(previous[0].max, previous[1].max, previous[2].max) + n2;
        current[2].min = min(previous[1].min, previous[2].min) + n3;
        current[2].max = max(previous[1].max, previous[2].max) + n3;
        copyCtoP(current, previous);
    }

    cout << max3(previous[0].max, previous[1].max, previous[2].max) << " " 
              << min3(previous[0].min, previous[1].min, previous[2].min);
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 다이나믹 프로그래밍 문제.  

- 메모리를 효율적으로 사용해요 ~

</div>
</details>

[def]: https://www.acmicpc.net/problem/2096