---
layout: post
title: "[데일리 백준] 1251"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-01-21
last_modified_at: 2025-01-21
---
## Silver
### [1251][def]

```c++
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

string reverse(string s) {
    string result = "";
    for(int i = s.size()-1 ; i >= 0 ; i--) {
        result += s[i];
    }
    return result;
}

int main() {
    string input;
    cin >> input;
    size_t size = input.size();
    string result;
    vector<string> list;
    for(int i = 1 ; i < size-1 ; i++) {
        for(int j = i+1 ; j < size ; j++) {
            result = "";
            result += reverse(input.substr(0, i));
            result += reverse(input.substr(i, j-i));
            result += reverse(input.substr(j, size-j));
            list.push_back(result);
        }
    }
    sort(list.begin(), list.end());
    cout << list[0];
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 문자열 날먹

</div>
</details>

[def]: https://www.acmicpc.net/problem/1251