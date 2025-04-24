---
layout: post
title: "[데일리 백준] 2086"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-04-24
last_modified_at: 2025-04-24
---
## Gold
### [2086][def]

```c++
#include <iostream>
#include <vector>
#define DIV 1000000000
using namespace std;

void multiply(vector<vector<long long>>& a, const vector<vector<long long>>& b) {
    vector<vector<long long>> result(2, vector<long long>(2, 0));
    result[0][0] = (a[0][0] * b[0][0] + a[0][1] * b[1][0]) % DIV;
    result[0][1] = (a[0][0] * b[0][1] + a[0][1] * b[1][1]) % DIV;
    result[1][0] = (a[1][0] * b[0][0] + a[1][1] * b[1][0]) % DIV;
    result[1][1] = (a[1][0] * b[0][1] + a[1][1] * b[1][1]) % DIV;
    a = result;
}
void power(vector<vector<long long>>& fibonacci, const vector<vector<long long>>& origin, long long n) {
    if(n == 1) return;
    power(fibonacci, origin, n>>1);
    multiply(fibonacci, fibonacci);
    if(n % 2 == 1) multiply(fibonacci, origin);
}
long long fibonacci(long long n) {
    vector<vector<long long>> fibonacci(2, vector<long long>(2, 1));
    fibonacci[0][0] = 0;
    const vector<vector<long long>> origin = fibonacci;
    power(fibonacci, origin, n);
    return fibonacci[0][1];
}

int main() {
    long long a, b;
    cin >> a >> b;
    // S(n) = F(n+2) - 1
    cout << (fibonacci(b+2) - fibonacci(a+1)+DIV)%DIV;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 피보나치 수열 (분할 정복)

- 모듈러 뺄셈 연산 시 음수 처리를 주의하자

</div>
</details>

[def]: https://www.acmicpc.net/problem/2086