---
layout: post
title: "[데일리 백준] 18258"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-04-26
last_modified_at: 2025-04-26
---
## Silver
### [18258][def]

```c++
#include <iostream>
#include <queue>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    int n;
    cin >> n;
    string type;
    int element;
    queue<int> q;
    while(n--) {
        cin >> type;
        switch(type[0]) {
            case 'p' :
                if(type == "push") {
                    cin >> element;
                    q.push(element);
                    break;
                }
                if(q.empty()) {
                    cout << -1 << '\n';
                    break;
                }
                cout << q.front() << '\n';
                q.pop();
                break;
            case 's' :
                cout << q.size() << '\n';
                break;
            case 'e' :
                cout << (q.empty() ? 1 : 0) << '\n';
                break;
            case 'f' :
                cout << (q.empty() ? -1 : q.front()) << '\n';
                break;
            case 'b' :
                cout << (q.empty() ? -1 : q.back()) << '\n';
                break;
        }
    }
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 큐 (날먹)

</div>
</details>

[def]: https://www.acmicpc.net/problem/18258