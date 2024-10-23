---
layout: post
title: "[데일리 백준] 1182"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-10-23
last_modified_at: 2024-10-23
---
## Silver
### [1182][def]

```c++
#include <iostream>
#include <vector>
using namespace std;

void find(vector<int>& list, int index, int sum,  int n, int s, int& count) {
    sum += list[index];
    if(sum == s) count++;
    for(int i = index+1 ; i < n ; i++) {
        find(list, i, sum, n, s, count);
    }
}

int main() {
    int n, s;
    cin >> n >> s;
    vector<int> list(n);
    for(int i = 0 ; i < n ; i++) cin >> list[i];
    int count = 0;
    for(int i = 0 ; i < n ; i++) {
        find(list, i, 0, n, s, count);
    }
    cout << count;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 간단한 백트래킹 문제.

- 잠깐동안 부분 수열을 연속된 부분 수열로 잘못 이해했다.  
부분 수열은 연속된 원소가 아니어도 된다.  

</div>
</details>

[def]: https://www.acmicpc.net/problem/1182