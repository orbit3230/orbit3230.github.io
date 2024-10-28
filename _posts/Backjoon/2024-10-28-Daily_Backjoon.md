---
layout: post
title: "[데일리 백준] 11444"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-10-28
last_modified_at: 2024-10-28
---
## Gold
### [11444][def]

```c++
#include <iostream>
#include <vector>
#define DIV 1000000007
using namespace std;

// 계산 결과는 a에 담아서 줍니다.
void multiply(vector<vector<long long>>& a, const vector<vector<long long>>& b) {
    long long lt = (a[0][0]*b[0][0] + a[0][1]*b[1][0]) % DIV;
    long long lb = (a[1][0]*b[0][0] + a[1][1]*b[1][0]) % DIV;
    long long rt = (a[0][0]*b[0][1] + a[0][1]*b[1][1]) % DIV;
    long long rb = (a[1][0]*b[0][1] + a[1][1]*b[1][1]) % DIV;
    a[0][0] = lt; a[0][1] = rt; a[1][0] = lb; a[1][1] = rb;
}
void power(vector<vector<long long>>& a, long long n, const vector<vector<long long>>& origin) {
    if(n == 1) return;
    power(a, n/2, origin);
    multiply(a, a);  // a = a^2
    // e.g.,
    // 13 -> 6 -> 3 -> 1
    // 1 -> 2(+1) -> 6 -> 12(+1) = 13 (복원을 위한 +1)
    if(n % 2 == 1) {
        multiply(a, origin);
    }
}

// [[0, 1][1, 1]]^x = [[fib(x-1), fib(x)][fib(x), fib(x+1)]]
long long fibonacci(long long n) {
  vector<vector<long long>> matrix(2, vector<long long>(2, 1));
  matrix[0][0] = 0;
  const vector<vector<long long>> origin = matrix;
  
  power(matrix, n, origin);
  
  return matrix[0][1];
}

int main() {
  long long n;
  cin >> n;
  cout << fibonacci(n);

  return 0;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 분할 정복을 통한 거듭제곱을 이용한 피보나치 수열 계산 문제.  

- [2749][def3]와 같은 문제이다.  
(모듈러 연산 값만 다름. 그래서 코드도 사실상 똑같음)

- 그래서 코드를 복붙하는 대가로 알고리즘의 correctness와 time complexity를 분석해보았다.  
![complexity_and_time_complexity][def2]

</div>
</details>

[def]: https://www.acmicpc.net/problem/11444
[def2]: https://i.imgur.com/bPW8ZKU.jpeg
[def3]: https://www.acmicpc.net/problem/2749