---
layout: post
title: "[데일리 백준] 2941"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-04-29
last_modified_at: 2024-04-29
---
## Silver
### [2941][def]

```c++
#include <iostream>
#include <string>
using namespace std;

int checkCroatian(string str, int index) {
    string substr3 = str.substr(index, 3);
    string substr2 = str.substr(index, 2);
    if(substr3 == "dz=") {
        return 2;
    }
    if(substr2 == "c=" || substr2 == "c-" || substr2 == "d-" || substr2 == "lj" || substr2 == "nj" || substr2 == "s=" || substr2 == "z=") {
        return 1;
    }
    return 0;
}

int main() {
    string str;
    cin >> str;

    int wordCount = 0;
    for(int i = 0 ; i < str.length() ; i++) {
        wordCount++;
        i += checkCroatian(str, i);
    }

    cout << wordCount;
}
```

[def]: https://www.acmicpc.net/problem/2941