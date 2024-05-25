---
layout: post
title: "[데일리 백준] 1543"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-05-25
last_modified_at: 2024-05-25
---
## Silver
### [1543][def]

```c++
#include <iostream>
#include <iostream>
#include <string>
using namespace std;

int finding(string s, string find) {
    int index = 0;
    int s_length = s.length();
    int f_length = find.length();
    int count = 0;
    while(index <= s_length - f_length) {
        if(s.substr(index, f_length) == find) {
            count++;
            index += f_length;
            continue;
        }
        index++;
    }
    return count;
}

int main() {
    string s;
    getline(cin, s);

    string find;
    getline(cin, find);

    cout << finding(s, find);
}
```

[def]: https://www.acmicpc.net/problem/1543