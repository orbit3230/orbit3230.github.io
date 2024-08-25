---
layout: post
title: "[데일리 백준] 9527"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-08-25
last_modified_at: 2024-08-25
---
## Gold
### [9527][def]

```c++
#include <iostream>
#include <map>
using namespace std;

map<long long, long long> powerMinus1;  // 1, 3, 7, 15 ... 에 해당하는 1의 개수 누적합 맵

// 가장 가까운 2의 제곱수를 찾아서 반환
long long closest(long long a) {
    long long power = 1;
    while((power << 1) <= a) {
        power <<= 1;
    }
    return power;
}

long long calculate(long long a) {
    long long result = 0;
    while (a > 0) {  // 2의 제곱수를 만나면 a가 0이 되어 종료조건을 만족한다.
        long long closestPower = closest(a);  // 가장 가까운 2의 제곱수
        result += (a - closestPower + 1) + powerMinus1[closestPower-1];
        a -= closestPower;
    }
    return result;
}

int main() {
    long long a, b;
    cin >> a >> b;
    powerMinus1[0] = 0;
    powerMinus1[1] = 1;
    for(long long power = 2 ; power <= (1LL << 60) ; power <<= 1) {
        powerMinus1[power-1] = powerMinus1[(power >> 1)-1]*2 + (power >> 1);
    }

    long long a_ = calculate(a-1);
    long long b_ = calculate(b);

    cout << b_ - a_;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 매우 큰 수는 직접 거듭제곱보다 비트연산이 정확하다. (비트연산은 가장 정확한 연산)

- 아래는 아이디어 메모.  
![p9527][def2]

- 아래는 재귀함수로 구현한 초기 코드이다. 해당 코드는 정확하지만, 메모리 초과로 인하여 반복문으로 코드를 수정하였다.  

```c++
#include <iostream>
#include <map>
using namespace std;

map<long long, long long> powerMinus1;  // 1, 3, 7, 15 ... 에 해당하는 1의 개수 누적합 맵

// 가장 가까운 2의 제곱수를 찾아서 반환
long long closest(long long a) {
    long long power = 1;
    while((power << 1) <= a) {
        power <<= 1;
    }
    return power;
}

long long calculate(long long a) {
    long long closestPower = closest(a);  // 가장 가까운 2의 제곱수
    if(a - closestPower == 0) {  // 종료 조건 : 2의 제곱수 (현재 1의 개수가 하나)
        return (a - closestPower + 1) + powerMinus1[closestPower-1];
    }
    return (a - closestPower + 1) + powerMinus1[closestPower-1] + calculate(a - closestPower);
}

int main() {
    long long a, b;
    cin >> a >> b;
    powerMinus1[0] = 0;
    powerMinus1[1] = 1;
    for(long long power = 2 ; power <= (1LL << 60) ; power <<= 1) {
        powerMinus1[power-1] = powerMinus1[(power >> 1)-1]*2 + (power >> 1);
    }

    long long a_ = calculate(a-1);
    long long b_ = calculate(b);

    cout << b_ - a_;
}
```

</div>
</details>

[def]: https://www.acmicpc.net/problem/9527
[def2]: https://i.imgur.com/yVBYPtV.png