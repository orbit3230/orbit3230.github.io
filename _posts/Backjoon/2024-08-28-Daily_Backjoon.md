---
layout: post
title: "[데일리 백준] 6198"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-08-28
last_modified_at: 2024-08-28
---
## Gold
### [6198][def]

```c++
#include <iostream>
#include <stack>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);

    int n;
    cin >> n;
    stack<int> s;
    unsigned int count = 0;
    int input;
    for(int i = 0 ; i < n ; i++) {
        cin >> input;
        while(!s.empty() && s.top() <= input) {
            s.pop();
        }
        count += s.size();
        s.push(input);
    }
    cout << count;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 스택을 활용한 문제

</div>
</details>

[def]: https://www.acmicpc.net/problem/6198