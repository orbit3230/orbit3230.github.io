---
layout: post
title: "[데일리 백준] 2251"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-10-16
last_modified_at: 2024-10-16
---
## Gold
### [2251][def]

```c++
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

void simulate(int a, int b, int c, 
int a_c, int b_c, int c_c, vector<vector<vector<bool>>>& cases, vector<int>& result) {
    if(a_c == 0) result.push_back(c_c);
    int aToB, aToC, bToA, bToC, cToA, cToB;
    aToB = min(b, b_c + a_c) - b_c;
    if(!cases[a_c-aToB][b_c+aToB][c_c]) {
        cases[a_c-aToB][b_c+aToB][c_c] = true;
        simulate(a, b, c, a_c-aToB, b_c+aToB, c_c, cases, result);
    } 
    aToC = min(c, c_c + a_c) - c_c;
    if(!cases[a_c-aToC][b_c][c_c+aToC]) {
        cases[a_c-aToC][b_c][c_c+aToC] = true;
        simulate(a, b, c, a_c-aToC, b_c, c_c+aToC, cases, result);
    }
    bToA = min(a, a_c + b_c) - a_c;
    if(!cases[a_c+bToA][b_c-bToA][c_c]) {
        cases[a_c+bToA][b_c-bToA][c_c] = true;
        simulate(a, b, c, a_c+bToA, b_c-bToA, c_c, cases, result);
    }
    bToC = min(c, c_c + b_c) - c_c; 
    if(!cases[a_c][b_c-bToC][c_c+bToC]) {
        cases[a_c][b_c-bToC][c_c+bToC] = true;
        simulate(a, b, c, a_c, b_c-bToC, c_c+bToC, cases, result);
    }
    cToA = min(a, a_c + c_c) - a_c;
    if(!cases[a_c+cToA][b_c][c_c-cToA]) {
        cases[a_c+cToA][b_c][c_c-cToA] = true;
        simulate(a, b, c, a_c+cToA, b_c, c_c-cToA, cases, result);
    }
    cToB = min(b, b_c + c_c) - b_c;
    if(!cases[a_c][b_c+cToB][c_c-cToB]) {
        cases[a_c][b_c+cToB][c_c-cToB] = true;
        simulate(a, b, c, a_c, b_c+cToB, c_c-cToB, cases, result);
    }
    return;
}

int main() {
    ios::sync_with_stdio(false);
    cout.tie(NULL);

    int a, b, c;
    cin >> a >> b >> c;
    vector<vector<vector<bool>>> cases(a+1, vector<vector<bool>>(b+1, vector<bool>(c+1, false)));
    cases[0][0][c] = true;
    vector<int> result;
    simulate(a, b, c, 0, 0, c, cases, result);
    sort(result.begin(), result.end());
    for(int i : result) cout << i << ' ';
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 신박한 그래프 탐색 문제.  

- 중복 여부를 어떻게 처리할 지 고민했는데,  
메모리를 조금 소비면서 3차원 배열로 표현하기로 결정했다.  

</div>
</details>

[def]: https://www.acmicpc.net/problem/2251