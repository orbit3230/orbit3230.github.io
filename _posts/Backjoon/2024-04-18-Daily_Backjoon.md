---
layout: post
title: "[데일리 백준] 1032"
excerpt: "1 Bronze"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-04-18
last_modified_at: 2024-04-18
---
## Bronze
### [1032][def]

```c
#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    string files[n];
    for(int i = 0 ; i < n ; i++) {
        cin >> files[i];
    }
    string result = files[0];
    for(int index = 0 ; index < result.length() ; index++) {
        for(int f = 1 ; f < n ; f++) {
            if(files[f][index] != result[index]) {
                result[index] = '?';
                break;
            }
        }
    }
    cout << result << '\n';
}
```

[def]: https://www.acmicpc.net/problem/1032