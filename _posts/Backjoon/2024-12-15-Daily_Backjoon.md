---
layout: post
title: "[데일리 백준] 2812"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-12-15
last_modified_at: 2024-12-15
---
## Gold
### [2812][def]

```c++
#include <iostream>
#include <stack>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    int n, k;
    cin >> n >> k;
    string num;
    cin >> num;
    stack<int> s;
    for(int i = 0 ; i < n ; i++) {
        int next = num[i]-'0';
        // 되도록이면 큰 자리수에서 작은 수를 먼저 제거하는 것이 이득이다.
        // 작은 자리수에서는 제거하더라도 값에 큰 영향을 X
        while(k && !s.empty() && s.top() < next) {
            s.pop();
            k--;
        }
        s.push(next);
    }
    // 같은 수라서 덜 지워졌다면 털어내기
    while(k--) s.pop();

    stack<int> result;
    while(!s.empty()) {
        result.push(s.top());
        s.pop();
    }
    while(!result.empty()) {
        cout << result.top();
        result.pop();
    }
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- Greedy Algorithm + Stack

- 큰 자리 수에서 먼저 제거의 할당량을 채우는 것이 더 이득이다. 이게 포인트

</div>
</details>

[def]: https://www.acmicpc.net/problem/2812