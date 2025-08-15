---
layout: post
title: "[데일리 백준] 16120"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-07-21
last_modified_at: 2025-07-21
---
## Gold
### [16120][def]

```c++
#include <iostream>
#include <vector>
#include <stack>
using namespace std;

void check(stack<char>& s) {
    vector<char> str(4);
    for(int i = 3 ; i >= 0 ; i--) {
        str[i] = s.top();
        s.pop();
    }
    if(str[0] == 'P' && str[1] == 'P' && str[2] == 'A' && str[3] == 'P') {
        s.push('P');  // replace
        return;
    }
    // restore
    for(char c : str) s.push(c);
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);

    string str;
    cin >> str;
    stack<char> s;

    int size = str.size();
    for(int i = 0 ; i < min(4, size) ; i++) s.push(str[i]);
    if(s.size() == 4) check(s);
    for(int i = 4 ; i < size ; i++) {
        s.push(str[i]);
        if(s.size() >= 4) check(s);
    }
    if(s.size() == 1 && s.top() == 'P') {
        cout << "PPAP";
        return 0;
    }
    cout << "NP";
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 문자열 + 스택

</div>
</details>

[def]: https://www.acmicpc.net/problem/16120