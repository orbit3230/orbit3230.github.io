---
layout: post
title: "[데일리 백준] 10986"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-09-04
last_modified_at: 2024-09-04
---
## Gold
### [10986][def]

```c++
#include <iostream>
#include <vector>
using namespace std;

// return nC2
long long combination2(long long n) {
    return n * (n-1) / 2;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    int n, m;
    cin >> n >> m;

    int input;
    long long sum = 0;  // 누적합
    vector<int> modulars(m, 0);  // 각 인덱스에 해당하는 나머지를 가지는 누적합 원소의 개수를 저장
    for(int i = 0 ; i < n ; i++)  {
        cin >> input;
        sum += input;
        modulars[sum % m]++;
    }

    long long count = 0;
    count += modulars[0];
    for(int i = 0 ; i < m ; i++) {
        count += combination2(modulars[i]);
    }
    cout << count;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 센스있는 누적합 문제.

- 특정 부분의 구간 합이 어떠한 수 `M`으로 나누어 떨어지려면,  
해당 구간의 시작(`start-1`)과 끝(`end`)에 해당하는 누적합의 나머지가 같아야 한다.  

</div>
</details>

[def]: https://www.acmicpc.net/problem/10986