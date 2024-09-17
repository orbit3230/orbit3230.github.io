---
layout: post
title: "[데일리 백준] 2437"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-09-17
last_modified_at: 2024-09-17
---
## Gold
### [2437][def]

```c++
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;
// 알고리즘 분석 : 정렬한 벡터의 1~N번째 까지의 누적합 + 1보다 N+1번째 원소가 더 크면 안된다.
// 누적합이 해당 원소들로 만들 수 있는 최대 한계이며, N+1번째 원소를 동원해 다음 수부터 만들어 나가야 하기 때문
int main() {
    int n;
    cin >> n;
    vector<int> list(n);
    for(int i = 0 ; i < n ; i++) {
        cin >> list[i];
    }
    sort(list.begin(), list.end());
    int sum = 0;
    for(int i = 0 ; i < n ; i++) {
        if(list[i] > sum+1) break;
        sum += list[i];
    }
    cout << sum+1;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 그리디 알고리즘 문제.

- 수학적인 직관력이 많이 필요한 문제였다.  

</div>
</details>

[def]: https://www.acmicpc.net/problem/2437