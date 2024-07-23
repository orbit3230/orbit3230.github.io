---
layout: post
title: "[데일리 백준] 10815"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-07-23
last_modified_at: 2024-07-23
---
## Silver
### [10815][def]

```c++
#include <iostream>
#include <set>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    int n;
    cin >> n;
    set<int> sanggeun;
    int num;
    for(int i = 0 ; i < n ; i++) {
        cin >> num;
        sanggeun.insert(num);
    }
    int m;
    cin >> m;
    bool result;
    for(int i = 0 ; i < m ; i++) {
        cin >> num;
        if(sanggeun.find(num) != sanggeun.end()) result = true;
        else result = false;
        cout << result << ' ';
    }
}
```

[def]: https://www.acmicpc.net/problem/10815