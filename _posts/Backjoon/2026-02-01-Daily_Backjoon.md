---
layout: post
title: "[데일리 백준] 5397"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2026-02-01
last_modified_at: 2026-02-01
---
## Silver
### [5397][def]

```c++
#include <iostream>
#include <stack>
#include <algorithm>
using namespace std;

void left(stack<char>& password, stack<char>& temp) {
    if(password.empty()) return;
    temp.push(password.top());
    password.pop();
}
void right(stack<char>& password, stack<char>& temp) {
    if(temp.empty()) return;
    password.push(temp.top());
    temp.pop();
}
void erase(stack<char>& password) {
    if(password.empty()) return;
    password.pop();
}
void finalize(stack<char>& password, stack<char>& temp) {
    while(!temp.empty()) right(password, temp);
}
void input(stack<char>& password, char c) {
    password.push(c);
}
string output(stack<char>& password) {
    string output = "";
    while(!password.empty()) {
        output += password.top();
        password.pop();
    }
    reverse(output.begin(), output.end());
    return output;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    int t;
    cin >> t;
    while(t--) {
        string string;
        cin >> string;
        stack<char> password;
        stack<char> temp;
        for(char c : string) {
            if(c == '<') left(password, temp);
            else if(c == '>') right(password, temp);
            else if(c == '-') erase(password);
            else input(password, c);
        }
        finalize(password, temp);
        cout << output(password) << '\n';
    }
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- String + Stack

</div>
</details>

[def]: https://www.acmicpc.net/problem/5397