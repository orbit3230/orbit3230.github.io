---
layout: post
title: "[데일리 백준] 9613, 2960, 1188"
excerpt: "2 Silver, 1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-09-24
last_modified_at: 2024-09-24
---
## Silver
### [9613][def]

```c++
#include <iostream>
#include <vector>
using namespace std;

int getGCD(int a, int b) {
    while(a % b != 0) {
        int temp = a % b;
        a = b;
        b = temp;
    }
    return b;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    int t;
    cin >> t;
    for(int i = 0 ; i < t ; i++) {
        int n;
        cin >> n;
        vector<int> list(n);
        for(int i = 0 ; i < n ; i++) cin >> list[i];
        long long sum = 0;
        for(int i = 0 ; i < n ; i++) {
            for(int j = i+1 ; j < n ; j++) {
                sum += getGCD(list[i], list[j]);
            }
        }
        cout << sum << '\n';
    }
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 유클리드 호제법을 활용한 간단한 문제.

- a와 b를 대소비교하여 swap할 필요가 없다는 것을 새삼 깨달아버렸다.

</div>
</details>

### [2960][def2]

```c++
#include <iostream>
#include <vector>
using namespace std;

void eratos(int n, int k) {
    vector<int> isPrime(n+1, true);
    int count = 0;
    for(int base = 2 ; base < n+1 ; base++) {
        if(isPrime[base])
            for(int i = base ; i < n+1 ; i += base) {
                if(isPrime[i]) {
                    count += 1;
                    if(count == k) {
                        cout << i;
                        return;
                    }
                    isPrime[i] = false;
                }
            }
    }
}

int main() {
    int n, k;
    cin >> n >> k;
    eratos(n, k);
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 에라토스테네스의 체의 원리를 가르치는 기초문제.  

</div>
</details>

<br>

## Gold
### [1188][def3]

```c++
#include <iostream>
using namespace std;

int divide(int n, int m) {
    if(m == 0) return 0;            // 종료조건(1) : 분배 끝
    if(m == 1) return 0;            // 종료조건(2) : 남은 사람이 한 명 -> 몰빵
    if(n == 0) return 0;             // 종료조건(3) : 인원수의 배수만큼 딱 맞아떨어짐
    if(n == 1) return m-1;      // 종료조건(4) :1개를 m명에게 분할
    if(n >= m) return divide(n % m, m);  // 3개를 2명에게 나누는 것은 1개를 2명에게 나누는 것과 같다
    return n + divide(n, m-n);  // 우선 n개를 일정한 비율로 나누고 남은 것을 처리해보자
}

int main() {
    int n, m;
    cin >> n >> m;
    cout << divide(n, m);
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 유클리드 호제법의 원리와 유사한 문제.

- 재귀적으로 해결하였다.

</div>
</details>

[def]: https://www.acmicpc.net/problem/9613
[def2]: https://www.acmicpc.net/problem/2960
[def3]: https://www.acmicpc.net/problem/1188