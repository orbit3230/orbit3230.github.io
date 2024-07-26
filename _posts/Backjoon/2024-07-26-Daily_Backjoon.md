---
layout: post
title: "[데일리 백준] 1302"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-07-26
last_modified_at: 2024-07-26
---
## Silver
### [1302][def]

```c++
#include <iostream>
#include <map>
using namespace std;

int main() {
    int n;
    cin >> n;
    string name;
    map<string, int> map;
    for(int i = 0 ; i < n ; i++) {
        cin >> name;
        if(map.find(name) == map.end()) {
            map[name] = 1;
        }
        else {
            map[name]++;
        }
    }

    int max = 0;
    string max_name;
    for(auto it = map.begin() ; it != map.end() ; it++) {
        if(it->second > max) {
            max = it->second;
            max_name = it->first;
        }
    }
    cout << max_name;
}
```

[def]: https://www.acmicpc.net/problem/1302