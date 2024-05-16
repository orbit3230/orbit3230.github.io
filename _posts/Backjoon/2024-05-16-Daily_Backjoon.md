---
layout: post
title: "[데일리 백준] 11729, 1914"
excerpt: "2 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-05-16
last_modified_at: 2024-05-16
---
## Gold
### [11729][def]

```c++
#include <iostream>
using namespace std;

void hanoi(int n, int from, int to, int temp) {
    if(n == 1) {
        cout << from << " " << to << "\n";
        return;
    }
    hanoi(n-1, from, temp, to);
    cout << from << " " << to << "\n";
    hanoi(n-1, temp, to, from);
}

int main() {
    int n;
    cin >> n;
    cout << (1<<n) - 1 << "\n";  // 2^n - 1
    hanoi(n, 1, 3, 2);
}
```

### [1914][def2]

```c++
#include <iostream>
using namespace std;

void hanoi(int n, int from, int to, int temp) {
    if(n == 1) {
        cout << from << " " << to << "\n";
        return;
    }
    hanoi(n-1, from, temp, to);
    cout << from << " " << to << "\n";
    hanoi(n-1, temp, to, from);
}

// n*2를 string으로 구하여 알려주는 함수
string big2x(string n) {
    string result = "";
    int carry = 0;
    for(int i = n.length()-1 ; i >= 0 ; i--) {
        int num = (n[i] - '0') * 2 + carry;
        carry = num / 10;
        result += (num % 10) + '0';  // characterize
    }
    if(carry == 1)
        result += '1';
    
    // reverse
    string real_result = "";
    for(int i = result.length()-1 ; i >= 0 ; i--)
        real_result += result[i];
    return real_result;
}


int main() {
    double n;
    cin >> n;
    string result = "1";
    for(int i = 0 ; i < n ; i++)
        result = big2x(result);
    // 2의 제곱수들 중에서는 마지막 자리가 0으로 끝나는 경우가 없다.
    result[result.length()-1] -= 1;
    cout << result << "\n";
    if(n <= 20)
        hanoi(n, 1, 3, 2);
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- `2^100` 이라는 아주 큰 수를 다루는데 사실상 중점이 있었다.  
C++ 프로그래밍 2주차 과제였던 BigInteger 덧셈과 뺄셈을 구현하는 문제가 생각난다.  

</div>
</details>

[def]: https://www.acmicpc.net/problem/11729
[def2]: https://www.acmicpc.net/problem/1914