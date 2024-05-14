---
layout: post
title: "[데일리 백준] 11723"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-05-14
last_modified_at: 2024-05-14
---
## Silver
### [11723][def]

```c++
#include <iostream>
using namespace std;

bool set[20];

void add(int x) {
    set[x - 1] = true;
}
void remove(int x) {
    set[x - 1] = false;
}
void check(int x) {
    cout << (set[x - 1] ? 1 : 0) << "\n";
}
void toggle(int x) {
    set[x - 1] = !set[x - 1];
}
void all() {
    for(int i = 0 ; i < 20 ; i++) {
        set[i] = true;
    }
}
void empty() {
    for(int i = 0 ; i < 20 ; i++) {
        set[i] = false;
    }
}


int main() {
    cin.tie(NULL);
    ios::sync_with_stdio(false);

    int m;
    cin >> m;

    string command;
    int x;
    for(int i = 0 ; i < m ; i++) {
        // case of all, empty
        cin >> command;
        if(command == "all") {
            all();
            continue;
        }
        else if(command == "empty") {
            empty();
            continue;
        }
        // case of the rest
        cin >> x;
        if(command == "add")
            add(x);
        else if(command == "remove")
            remove(x);
        else if(command == "check")
            check(x);
        else if(command == "toggle")
            toggle(x);
    }
}
```

[def]: https://www.acmicpc.net/problem/11723