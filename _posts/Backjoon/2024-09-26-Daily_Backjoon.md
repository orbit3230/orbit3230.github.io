---
layout: post
title: "[데일리 백준] 1934, 1850, 1990"
excerpt: "1 Bronze, 1 Silver, 1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-09-26
last_modified_at: 2024-09-26
---
## Bronze
### [1934][def]

```c++
#include <iostream>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    int t;
    cin >> t;
    for(int i = 0 ; i < t ; i++) {
        int a, b;
        cin >> a >> b;
        if(a < b) swap(a, b);
        int a_ = a; int b_ = b;
        while(a % b != 0) {
            int temp = a % b;
            a = b;
            b = temp;
        }
        int result = a_ * (b_ / b);
        cout << result << '\n';
    }
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 유클리드 호제법을 활용한 문제 1

</div>
</details>

<br>

## Silver
### [1850][def2]

```c++
#include <iostream>
using namespace std;

int main() {
    long long a, b;
    cin >> a >> b;
    while(a % b != 0) {
        long long temp = a % b;
        a = b;
        b = temp;
    }
    string result(b, '1');
    cout << result;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 유클리드 호제법을 활용한 문제 2

- 증명하기에는 매우 어려운 문제.  

</div>
</details>

<br>

## Gold
### [1990][def3]

```c++
#include <iostream>
#include <vector>
using namespace std;

bool isPalindrome(int n) {
    string s = to_string(n);
    int left = 0;
    int right = s.size()-1;
    while(left < right) {
        if(s[left] != s[right]) return false;
        left++; right--;
    }
    return true;
}

void eratos(int a, int b) {
    int size = b+1;
    vector<bool> isPrime(size, true);
    for(int base = 2 ; base * base <= size ; base++) {
        if(isPrime[base]) {
            for(int notPrime = base * base ; notPrime < size ; notPrime += base)
                isPrime[notPrime] = false;
        }
    }
    for(int i = a ; i <= b ; i++) {
        if(isPrime[i] && isPalindrome(i)) {
            cout << i << '\n';
        }
    }
    cout << "-1";
}

int main() {
    int a, b;
    cin >> a >> b;
    eratos(a, b);
}
```

- 아래 코멘트에 더 성능 좋은 코드를 작성했다 !

<details>
<summary>코멘트</summary>
<div markdown="1">

- 에라토스테네스의 체를 활용한 문제.

- 하지만, 체를 활용하여 모든 소수를 구하는 것 보다, 그냥 팰린드롬을 먼저 확인하고  
해당 팰린드롬 수가 소수인 지를 확인하는 게 더 빠르다. 

```c++
#include <iostream>
#include <vector>
using namespace std;

bool isPalindrome(int n) {
    int original = n;
    int reversed = 0;
    while (n != 0) {
        int digit = n % 10;
        reversed = reversed * 10 + digit;
        n /= 10;
    }
    return original == reversed;
}

bool isPrime(int n) {
    for(int i = 2 ; i * i <= n ; i++) if(n % i == 0) return false;
    return true;
}

int main() {
    int a, b;
    cin >> a >> b;
    if(a % 2 == 0) a++;
    for(int i = a ; i <= b ; i+=2) if(isPalindrome(i) && isPrime(i)) cout << i << '\n';
    cout << -1;
}
```

- 여기서 아주 조금만 더 개선해보자면,  
에라스토테네스의 체를 다시 사용하여 `sqrt(b)` 까지의 소수만 구하고  
소수를 판별할 때 소수들로만 나누어보고 나누어떨어지는 지를 확인하는 방법도 있다.  
(시간 변화는 크게 없었음)  

```c++
#include <iostream>
#include <vector>
#include <cmath>
using namespace std;

void getPrimes(int b, vector<int>& primes) {
    int size = sqrt(b);
    vector<bool> isPrime(size + 1, true);
    for(int base = 2 ; base * base <= b ; base++) {
        if(isPrime[base]) {
            for(int i = base * base ; i <= size ; i += base) {
                isPrime[i] = false;
            }
        }
    }
    for(int i = 2 ; i <= size ; i++)
        if(isPrime[i]) primes.push_back(i);
}

bool isPalindrome(int n) {
    int original = n;
    int reversed = 0;
    while (n != 0) {
        int digit = n % 10;
        reversed = reversed * 10 + digit;
        n /= 10;
    }
    return original == reversed;
}
bool isPrime(vector<int>& primes, int n) {
    for(int prime : primes) {
        if(prime * prime > n) break;
        if(n % prime == 0 && n != prime) return false;
    }
    return true;
}

int main() {
    int a, b;
    cin >> a >> b;
    if(a % 2 == 0) a++;
    vector<int> primes;  // sqrt(b) 미만의 소수 모음
    getPrimes(b, primes);
    for(int i = a ; i <= b ; i+=2) if(isPalindrome(i) && isPrime(primes, i)) cout << i << '\n';
    cout << -1;
}
```

</div>
</details>

[def]: https://www.acmicpc.net/problem/1934
[def2]: https://www.acmicpc.net/problem/1850
[def3]: https://www.acmicpc.net/problem/1990