---
layout: post
title: "[데일리 백준] 1439"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-05-09
last_modified_at: 2024-05-09
---
## Silver
### [1439][def]

```c++
#include <iostream>
using namespace std;

int test(string s) {
    int count0 = 0;
    int count1 = 0;

    bool trigger = false;
    for(int i = 0 ; i < s.length() ; i++) {
        if(s[i] == '0' && !trigger) {
            count0++;
            trigger = true;
        
        }
        else if(s [i] == '1' && trigger) {
            trigger = false;
        }
    }

    trigger = false;
    for(int i = 0 ; i < s.length() ; i++) {
        if(s[i] == '1' && !trigger) {
            count1++;
            trigger = true;
        
        }
        else if(s [i] == '0' && trigger) {
            trigger = false;
        }
    }
    return (count0 <= count1) ? count0 : count1;
}

int main() {
    string s;
    cin >> s;
    cout << test(s);
}
```

[def]: https://www.acmicpc.net/problem/1439