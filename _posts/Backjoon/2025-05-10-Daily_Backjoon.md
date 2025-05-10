---
layout: post
title: "[데일리 백준] 9625"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-05-10
last_modified_at: 2025-05-10
---
## Silver
### [9625][def]

```c++
#include <iostream>
using namespace std;

string change(string& s) {
    string result = "";
    int size = s.size();
    for(int i = 0 ; i < size ; i++) {
        if(s[i] == 'A') {
            result += "B";
            continue;
        }
        result += "BA";
    }
    return result;
}

int main() {
    int n;
    cin >> n;
    string s = "A";
    while(n--) s = change(s);
    int a = 0;
    int b = 0;
    for(char c : s) {
        if(c == 'A') {
            a++;
            continue;
        }
        b++;
    }
    cout << a << ' ' << b;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 문자열 (날먹)

</div>
</details>

[def]: https://www.acmicpc.net/problem/9625