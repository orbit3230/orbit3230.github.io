---
layout: post
title: "[데일리 백준] 1254"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-04-20
last_modified_at: 2024-04-20
---
## Silver
### [1254][def]

```c++
#include <iostream>
using namespace std;

bool checkPalindrome(string s) {
    int len = s.length();
    for(int i = 0; i < len / 2; i++) {
        if(s[i] != s[len - i - 1]) return false;
    }
    return true;
}

int insidePalindrome(string s) {
    int insidePalinIndex = -1;
    for(int i = s.length() - 2; i >= 0; i--) {
        if(checkPalindrome(s.substr(i, s.length()))) {
            insidePalinIndex = i;
            continue;
        }
    }
    return insidePalinIndex;
}

int main() {
    string s;
    cin >> s;
    int insidePalinIndex = insidePalindrome(s);
    int lastIndex = insidePalinIndex == -1 ? s.length() - 1 : insidePalinIndex;
    while(true) {
        if(checkPalindrome(s)) {
            cout << s.length();
            break;
        }
        s = s + s[--lastIndex];
    }
}
```

[def]: https://www.acmicpc.net/problem/1254