---
layout: post
title: "[데일리 백준] 1011"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-01-10
last_modified_at: 2025-01-10
---
## Gold
### [1011][def]

```c++
#include <iostream>
#include <vector>
using namespace std;

int main() {
    int t;
    cin >> t;
    // 카운팅 조건
    // (1) n*n을 지날 때 (1, 4, 9, 16, 25 ...)
    // (2) n*(n+1)을 지날 때 (2, 6, 12, 20, 30 ...)
    long long base = 1;
    vector<int> count_thresholds;
    long long case1 = 0;
    long long case2 = 0;
    while(1) {
        case1 = base*base;
        case2 = base*(base+1);
        if(case1 >= INT32_MAX) break;
        count_thresholds.push_back(case1);
        count_thresholds.push_back(case2);
        base++;
    }

    int a, b;
    while(t--) {
        cin >> a >> b;
        int diff = b - a;
        int count = 1;
        for(int threshold : count_thresholds) {
            if(threshold < diff) count++;
        }
        cout << count << ' ';
    }
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 재미있는 수학 문제 !

- 카운팅이 늘어나는 기점이 되는 수 들의 규칙성을 찾아내는 재밌는 문제다.  

- 좀 더 증명을 해보자면,  

  - 숫자가 늘어나기 직전, 가질 수 있는 최대값값 수열은 양 쪽이 대칭인 모양으로서 
    - (1) 1 2 3 ... n-1, n, n-1, ... 3 2 1  ->  이와 같이 홀수 개거나
    - (2) 1 2 3 ... n-1, n, n, n-1, ... 3 2 1  ->  이와 같이 짝수 개를 가진다.

  - 이 수들의 합을 계산해보면,
    - (1) (n-1)n/2 + n(n+1)/2 = n^2
    - (2) n(n+1)/2 + n(n+1)/2 = n(n+1)

  - 따라서 n^2와 n(n+1)을 지나는 순간, 카운팅이 늘어나는 것을 알 수 있다.

</div>
</details>

[def]: https://www.acmicpc.net/problem/1011