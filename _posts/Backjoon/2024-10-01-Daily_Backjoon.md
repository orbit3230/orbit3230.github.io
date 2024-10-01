---
layout: post
title: "[데일리 백준] 3955"
excerpt: "1 Platinum"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-10-01
last_modified_at: 2024-10-01
---
## Platinum
### [3955][def]

```c++
#include <iostream>
#include <string>
#define MAX_CANDY 1000000000
using namespace std;
// x와 y는 레퍼런스 -> 결과를 저장하기 위함
int extended_euclid(int a, int b, int& x, int& y) {
    if(b == 0) {
        x = 1;  // 첫 x_ = 1
        y = 0;  // 첫 y_ = 0
        return a;  // gcd
    }
    int x_, y_;  // 레퍼런스로 전달 -> 이전 단계의 x, y를 의미
    int r = a % b;
    int q = a / b;
    int gcd = extended_euclid(b, a % b, x_, y_);
    x = y_;
    y = x_ - (y_* q);
    return gcd;
}
// y = Kx/C + 1/C
// 정수인 y에 대하여 정수인 해 x가 존재하려면, 기울기인 K/C가 정수가 되어서는 안될듯.
// +) 추가로 C/K 가 약분되어도(또는 K/C가 약분되어도), 아무리 1/C를 더해봐야 정수가 될 수 없음 <- 이건 왜 그런걸까?
// 결국 K와 C는 서로소여야 한다.
int main() {
    int t;
    cin >> t;
    for(int i = 0 ; i < t ; i++) {
        int k, c;
        cin >> k >> c;
        if(c == 1) {
            cout << (k+1 > MAX_CANDY ? "IMPOSSIBLE" : to_string(k+1)) << '\n';
            continue;
        }
        if(k == 1) {
            cout << "1\n";
            continue;
        }
        if(k % c == 0 || c % k == 0) {
            cout <<"IMPOSSIBLE\n";
            continue;
        }
        int x, y;
        int gcd = extended_euclid(k, c, x, y);
        if(gcd != 1) {
            cout << "IMPOSSIBLE\n";
            continue;
        }
        if(y < 0) y += k;
        if(y > MAX_CANDY) {
            cout << "IMPOSSIBLE\n";
            continue;
        }
        cout << y << '\n';
    }
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 확장 유클리드 호제법을 접해보는 문제.

- 해를 구할 수 없는 상황에대한 조건은 직관적으로 알 수 있었는데,  
막상 해를 구할 수 있는 상황에서, 브루트포스가 아닌 방법으로 빠르게 해를 구하는 방법은 따로 공부하지 않는 한 알기 어려운 것 같다.  

- 처음엔 gcd를 왜 반환해야 하는지 필요성을 못 느껴서 `void` 함수로 제작했었는데, 생각해보니 단순히 두 수를 한 번 모듈러 시켜본다고 해서 서로소가 아니지.  
잠시 너무 멍청했었다. gcd를 반환하여 체크하는 방식으로 수정하였다.  

- 예외처리 해야할 상황이 너무 많았음

</div>
</details>

[def]: https://www.acmicpc.net/problem/3955