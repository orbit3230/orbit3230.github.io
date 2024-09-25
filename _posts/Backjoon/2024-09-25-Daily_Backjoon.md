---
layout: post
title: "[데일리 백준] 1747, 1456, 4355, 4355"
excerpt: "1 Silver,3 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-09-25
last_modified_at: 2024-09-25
---
## Silver
### [1456][def2]

```c++
#include <iostream>
#include <vector>
#include <unordered_set>
#include <cmath>
using namespace std;

void eratos(vector<int>& primes, long long a, long long b) {
    int size = sqrt(b);
    vector<bool> primeCheck(size, true);
    for(int base = 2 ; base < size/2 ; base++) {
        if(primeCheck[base])
            for(int i = base+base ; i <= size ; i += base) {
                primeCheck[i] = false;
            }
    }
    for(int i = 2 ; i < sqrt(b) ; i++) {
        if(primeCheck[i])
            primes.push_back(i);
    }
}

int main() {
    long long a, b;
    cin >> a >> b;
    vector<int> primes;  // a 이상 sqrt(b) 미만의 소수 모음
    eratos(primes, a, b);
    unordered_set<long long> almostPrimes;
    for(long long prime : primes) {
        int base = prime;
        prime *= base;  // N = 2 제곱부터 시작
        while(prime < a) prime *= base;
        while(prime <= b) {
            almostPrimes.insert(prime);
            if(prime > b / base) break;  // 오버플로우 방지
            prime *= base;
        }
    }
    cout << almostPrimes.size();
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 에라토스테네스의 체를 활용하는 소수 관련 문제 1

</div>
</details>

<br>

## Gold
### [1456][def]

```c++
#include <iostream>
#include <vector>
#include <unordered_set>
#include <cmath>
using namespace std;

void eratos(vector<int>& primes, long long a, long long b) {
    int size = sqrt(b);
    vector<bool> primeCheck(size, true);
    for(int base = 2 ; base < size/2 ; base++) {
        if(primeCheck[base])
            for(int i = base+base ; i <= size ; i += base) {
                primeCheck[i] = false;
            }
    }
    for(int i = 2 ; i < sqrt(b) ; i++) {
        if(primeCheck[i])
            primes.push_back(i);
    }
}

int main() {
    long long a, b;
    cin >> a >> b;
    vector<int> primes;  // a 이상 sqrt(b) 미만의 소수 모음
    eratos(primes, a, b);
    unordered_set<long long> almostPrimes;
    for(long long prime : primes) {
        int base = prime;
        prime *= base;  // N = 2 제곱부터 시작
        while(prime < a) prime *= base;
        while(prime <= b) {
            almostPrimes.insert(prime);
            if(prime > b / base) break;  // 오버플로우 방지
            prime *= base;
        }
    }
    cout << almostPrimes.size();
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 에라토스테네스의 체를 활용하는 소수 관련 문제 2

- 오버플로우 컨트롤이 매우 중요하다.  

</div>
</details>

### [4355][def3]

```c++
#include <iostream>
using namespace std;

long long phi(long long n) {
    long long result = n;
    const long long n_ = n;  // 최초 n값을 기억
    // 여기서 n_을 사용하지 않고 n만 사용해도 맞는데, 왜그런지 모르겠음....
    // 당연하게도 더 빨라짐..
    for(long long k = 2 ; k * k <= n_ ; k++) {
        if(n % k == 0) {
            result -= (result / k);  // 소인수의 배수들은 자신과 서로소가 아니다.
        }
        while(n % k == 0) n /= k;  // 소인수의 거듭제곱 제거 
    }
    if(n != 1) {  // 소인수가 남음
        result -= (result / n);  // 반복문을 거친 후의 n은 소수일 것임
    }
    return result;
}

int main() {
    long long n;
    cin >> n;
    cout << phi(n);
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 오일러 피 함수를 사용하는 문제.  

- 소인수를 찾는 알고리즘이 핵심이었다.  

  - 소인수를 더 빠르게 찾는 "폴라드 로" 라는 알고리즘이 있는데,  
  해당 알고리즘을 사용하여 푸는 문제가 [백준 13926][def5] 이다. 입력 값의 범위만 더 커진 문제이다.  

</div>
</details>

### [4355][def4]

```c++
#include <iostream>
using namespace std;

long long phi(long long n) {
    long long result = n;
    const long long n_ = n;  // 최초 n값을 기억
    // 여기서 n_을 사용하지 않고 n만 사용해도 맞는데, 왜그런지 모르겠음....
    for(long long k = 2 ; k * k <= n_ ; k++) {
        if(n % k == 0) {
            result -= (result / k);  // 소인수의 배수들은 자신과 서로소가 아니다.
        }
        while(n % k == 0) n /= k;  // 소인수의 거듭제곱 제거 
    }
    if(n != 1) {  // 소인수가 남음
        result -= (result / n);  // 반복문을 거친 후의 n은 소수일 것임
    }
    return result;
}

int main() {
    long long n;
    cin >> n;
    cout << phi(n);
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 위 문제와 동일한 문제 (입력 범위만 작음)

- 이 코드에서는 위 문제 코드 주석에 작성한 것 처럼 `n`을 반복문 upper bound로 그냥 설정하였더니  
속도 차이가 생겼다....  
(28ms -> 4ms)

</div>
</details>

[def]: https://www.acmicpc.net/problem/1456
[def2]: https://www.acmicpc.net/problem/1747
[def3]: https://www.acmicpc.net/problem/4355
[def4]: https://www.acmicpc.net/problem/4355
[def5]: https://www.acmicpc.net/problem/13926