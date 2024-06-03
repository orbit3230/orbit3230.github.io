---
layout: post
title: "[데일리 백준] 1740"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-06-03
last_modified_at: 2024-06-03
---
## Silver
### [1740][def]

```c++
#include <iostream>
#include <cmath>
using namespace std;

long long powerOfThree(int power) {
    long long sum = 1;
    for(int i = 0 ; i < power ; i++) {
        sum *= 3;
    }
    return sum;
}

int main() {
    long long n;
    cin >> n;
    
    int power = 0;
    long long sum = 0;
    for(long long mask = 1 ; mask <= n ; mask <<= 1, power += 1) {
        if((n & mask) != 0)
            sum += powerOfThree(power);
    }

    cout << sum;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 비트마스킹을 사용하면 아주 아름다워지는 문제

- `long`은 생각보다 큰 수를 잘 못담는다. (JAVA와 다름)  
`long long`을 쓰자

- `<cmath>` 라이브러리의 함수들은 대부분 계산 결과로 `double`을 리턴하므로,  
부동소수점 문제가 발생할 수 있다.  
매우 큰 수를 다루어야 하는 경우,  
직접 계산 함수를 구현하자.  

</div>
</details>

[def]: https://www.acmicpc.net/problem/1740