---
layout: post
title: "[데일리 백준] 1764"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-06-15
last_modified_at: 2024-06-15
---
## Silver
### [1764][def]

```c++
#include <iostream>
#include <unordered_set>
#include <set>
using namespace std;

int main() {
    int n, m;
    cin >> n >> m;
    unordered_set<string> dutto;
    set<string> dubbojab;

    string next;
    for(int i = 0 ; i < n ; i++) {
        cin >> next;
        dutto.insert(next);
    }

    for(int i = 0 ; i < m ; i++) {
        cin >> next;
        if(dutto.find(next) != dutto.end()) {
            dubbojab.insert(next);
        }
    }

    int size = dubbojab.size();
    cout << size << '\n';
    set<string>::iterator it = dubbojab.begin();
    for(; it != dubbojab.end() ; it++) {
        cout << *it << '\n';
    }
}
```

[def]: https://www.acmicpc.net/problem/1764