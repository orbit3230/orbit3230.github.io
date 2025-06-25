---
layout: post
title: "[데일리 백준] 28278"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-06-25
last_modified_at: 2025-06-25
---
## Silver
### [28278][def]

```c++
#include <iostream>
#include <stack>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    int n;
    cin >> n;
    stack<int> s;
    int command, x;
    while(n--) {
        cin >> command;
        switch(command) {
            case 1:
                cin >> x;
                s.push(x);
                break;
            case 2:
                if(s.empty()) {
                    cout << -1 << '\n';
                    break;
                }
                cout << s.top() << '\n';
                s.pop();
                break;
            case 3:
                cout << s.size() << '\n';
                break;
            case 4:
                cout << (s.empty() ? 1 : 0) << '\n';
                break;
            case 5:
                if(s.empty()) {
                    cout << -1 << '\n';
                    break;
                }
                cout << s.top() << '\n';
                break;
        }
    }
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 스택 (날먹)

</div>
</details>

[def]: https://www.acmicpc.net/problem/28278