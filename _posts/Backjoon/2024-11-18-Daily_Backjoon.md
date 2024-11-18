---
layout: post
title: "[데일리 백준] 2023, 10942"
excerpt: "2 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-11-18
last_modified_at: 2024-11-18
---
## Gold
### [2023][def]

```c++
#include <iostream>
using namespace std;

bool isPrime(int n) {
    for(int i = 2 ; i * i <= n ; i++) {
        if(n % i == 0) return false;
    }
    return true;
}

void makes(int num, int size, int n, int* list) {
    if(size == n) {
        cout << num << '\n';
        return;
    }
    num *= 10;
    for(int i = 0 ; i < 4 ; i++) {
        int p = list[i];
        if(isPrime(num+p)) {
            makes(num+p, size+1, n, list);
        }
    }
}

int main() {
    ios::sync_with_stdio(false);
    cout.tie(NULL);

    int n;
    cin >> n;
    int onesPrime[4] = {2, 3, 5, 7};
    int list[4] = {1, 3, 7, 9};
    for(int prime : onesPrime) {
        makes(prime, 1, n, list);
    }
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 무난한 백트래킹+소수 판별 문제.  

</div>
</details>

### [10942][def2]

```c++
#include <iostream>
#include <vector>
using namespace std;

void makeTable(vector<vector<bool>>& dpTable, vector<int>& list, int n) {
    // odd
    for(int i = 0 ; i < n ; i++) dpTable[i][i] = true;
    for(int i = 0 ; i < n ; i++) {
        int left = i-1;
        int right = i+1;
        while((left >= 0) && (right < n)) {
            if(dpTable[left+1][right-1] && (list[left] == list[right])) {
                dpTable[left][right] = true;
            }
            left--;
            right++;
        }
    }
    // even
    for(int i = 1 ; i < n ; i++) dpTable[i-1][i] = (list[i-1] == list[i]);
    for(int i = 1 ; i < n ; i++) {
        int left = i-1;
        int right = i+2;
        while((left >= 0) && (right < n)) {
            if(dpTable[left+1][right-1] && (list[left] == list[right])) {
                dpTable[left][right] = true;
            }
            left--;
            right++;
        }
    }
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    int n;
    cin >> n;
    vector<int> list(n);
    for(int i = 0 ; i < n ; i++) cin >> list[i];
    vector<vector<bool>> dpTable(n, vector<bool>(n));
    makeTable(dpTable, list, n);
    int m;
    cin >> m;
    int from, to;
    for(int i = 0 ; i < m ; i++) {
        cin >> from >> to;
        from--; to--;  // 0-based index
        cout << dpTable[from][to] << '\n';  
    }
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- Dynamic Programming.

- 팰린드롬 검사 시, 중복 계산을 피할 수 있다.  
  - 그러나, 큰 팰린드롬 -> 작은 팰린드롬으로 내려가는 방식은 잘못된 방식이다.  
  큰 팰린드롬 검사에서 팰린드롬이 아님을 밝혔더라도, 작은 팰린드롬 검사에서 팰린드롬이 될 수 있다.  

  - 따라서 작은 팰린드롬 -> 큰 팰린드롬으로 양 끝단에 하나씩 추가하는 방식으로 DP Table을 구성할 수 있다. 

</div>
</details>

[def]: https://www.acmicpc.net/problem/2023
[def2]: https://www.acmicpc.net/problem/10942