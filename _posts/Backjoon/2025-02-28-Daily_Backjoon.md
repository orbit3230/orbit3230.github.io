---
layout: post
title: "[데일리 백준] 25308"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-02-28
last_modified_at: 2025-02-28
---
## Gold
### [25308][def]

```c++
#include <iostream>
#include <vector>
#include <cmath>
#define root2 sqrt(2)
using namespace std;

bool checking(const vector<int>& stat_case) {
    for(int i = 0 ; i < 8 ; i++) {
        int left = stat_case[(!i) ? 7 : i - 1];
        int right = stat_case[(i == 7) ? 0 : i + 1];
        double threshold = root2*left*right / (left+right);  // sqrt(2) * a * b / (a + b)
        if(stat_case[i] < threshold) return false;
    }
    return true;
}

void combination(const vector<int>& stats, vector<int>& stat_case, vector<bool>& used, int& count) {
    if(stat_case.size() == 8) {
        if(checking(stat_case)) count++;
        return;
    }
    for(int i = 0 ; i < 8 ; i++) {
        if(used[i]) continue;
        used[i] = true;
        stat_case.push_back(stats[i]);
        combination(stats, stat_case, used, count);
        stat_case.pop_back();
        used[i] = false;
    }
}

int main() {
    vector<int> stats(8);
    for(int i = 0 ; i < 8 ; i++) cin >> stats[i];
    int count = 0;
    vector<int> stat_case;
    vector<bool> used(8, false);
    combination(stats, stat_case, used, count);
    cout << count;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 수학 + 조합(백트래킹)

- 직각삼각형의 서로 직각인 두 변의 길이를 a, b라고 할 때,  
직각인 꼭짓점에서부터 직각을 반으로 나누는 직선과 빗변의 교점 간의 거리는  
`sqrt(2) * a * b / (a + b)`이다.  

  - 반으로 나뉘는 두 삼각형의 넓이를 `sin45`를 이용해 계산하여 더한 것이 `1/2ab` 인 것을 활용  

</div>
</details>

[def]: https://www.acmicpc.net/problem/25308