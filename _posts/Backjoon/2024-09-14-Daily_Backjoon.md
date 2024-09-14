---
layout: post
title: "[데일리 백준] 17298"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-09-14
last_modified_at: 2024-09-14
---
## Gold
### [17298][def]

```c++
#include <iostream>
#include <vector>
#include <stack>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    int n;
    cin >> n;
    vector<int> count(1000001, 0);
    vector<int> inputs(n);
    for(int i = 0 ; i < n ; i++) {
        cin >> inputs[i];
        count[inputs[i]]++;
    }
    stack<int> s;
    for(int i = n-1 ; i >= 0 ; i--) {
        int current = inputs[i];
        while(!s.empty() && count[current] >= count[s.top()]) {
            s.pop();
        }
        inputs[i] = (s.empty() ? -1 : s.top());  // inputs 벡터를 결과 백터로 재사용(메모리 절약)
        s.push(current);
    }
    for(int i = 0 ; i < n ; i++) {
        cout << inputs[i] << " ";
    }
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 스택을 활용하는 문제.

- [오큰수][def2] 문제와 사실상 크게 다를 게 없다.

</div>
</details>

[def]: https://www.acmicpc.net/problem/17298
[def2]: https://www.acmicpc.net/problem/17298