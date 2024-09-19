---
layout: post
title: "[데일리 백준] 2493, 1863"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-09-19
last_modified_at: 2024-09-19
---
## Gold
### [2493][def2]  

```c++
#include <iostream>
#include <stack>
using namespace std;

typedef struct Building {
    int height;
    int index;
} Building;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    int n;
    cin >> n;
    stack<Building> s;
    for(int i = 0 ; i < n ; i++) {
        Building b;
        cin >> b.height;
        b.index = i+1;  // 1-based index
        while(!s.empty() && s.top().height < b.height) s.pop();
        cout << (s.empty() ? 0 : s.top().index) << ' ';
        s.push(b);
    }
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 스택을 활용한 문제.

- 오큰수나 옥상정원 문제들과 비슷하게 typical했다.  

</div>
</details>

### [1863][def]

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
    int height;
    int count = 0;
    for(int i = 0 ; i < n ; i++) {
        cin >> height >> height;  // 첫 번째 입력은 필요없다.
        while(!s.empty() && s.top() > height) s.pop();
        if((height != 0) && (s.empty() || s.top() < height)) {
            count++;
            s.push(height);
        } 
    }
    cout << count;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 스택을 활용한 문제.

- 이 문제 또한 typical 하다.  

</div>
</details>

[def]: https://www.acmicpc.net/problem/1863
[def2]: https://www.acmicpc.net/problem/2493