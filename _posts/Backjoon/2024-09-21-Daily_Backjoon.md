---
layout: post
title: "[데일리 백준] 14698"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-09-21
last_modified_at: 2024-09-21
---
## Gold
### [14698][def]

```c++
#include <iostream>
#include <queue>
#define DIV 1000000007
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    int t;
    cin >> t;
    for(int i = 0 ; i < t ; i++) {
        int n;
        cin >> n;
        priority_queue<long long, vector<long long>, greater<long long>> pq;
        long long slime;
        for(int i = 0 ; i < n ; i++) {
            cin >> slime;
            pq.push(slime);
        }
        long long energy = 1;
        long long s1, s2;
        long long sum;
        while(pq.size() != 1) {
            s1 = pq.top();
            pq.pop();
            s2 = pq.top();
            pq.pop();
            sum = s1*s2;
            pq.push(sum);
            energy *= (sum % DIV);
            energy %= DIV;
        }
        cout << energy << '\n';
    }
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 우선순위 큐 + 그리디 알고리즘

- 큰 수 모듈러 연산에서 잠깐 꼬였다.  

</div>
</details>

[def]: https://www.acmicpc.net/problem/14698