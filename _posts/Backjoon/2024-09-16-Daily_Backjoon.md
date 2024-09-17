---
layout: post
title: "[데일리 백준] 17425"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-09-16
last_modified_at: 2024-09-16
---
## Gold
### [17425][def]

```c++
#include <iostream>
#include <vector>
#define MAX 1000001
using namespace std;

vector<long long> preprocess() {
    vector<long long> gN(MAX, 1);
    for(int base = 2 ; base < MAX ; base++) {
        int base_ = base;
        while(base_ < MAX) {
            gN[base_] += base;
            base_ += base;
        }
    }
    // 누적합 배열 화
    for(int i = 2 ; i < MAX ; i++) {
        gN[i] += gN[i-1];
    }
    return gN;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    int t;
    cin >> t;
    vector<long long> gN = preprocess();
    int n;
    for(int i = 0 ; i < t ; i++) {
        cin >> n;
        cout << gN[n] << '\n';
    }
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 에라토스테네스의 체 방식으로 각 수의 약수의 개수, 곧 약수의 합을 구하는게 핵심인 문제.  
재밌는 문제였다.  

</div>
</details>

[def]: https://www.acmicpc.net/problem/17425