---
layout: post
title: "[데일리 백준] 1343"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-05-12
last_modified_at: 2024-05-12
---
## Silver
### [1343][def]

```c++
#include <iostream>
#include <string>
using namespace std;

string cover(string board) {
    string result = "";
    int count = 0;
    for(int i = 0 ; i < board.length() ; i++) {
        if(board[i] == 'X') {
            count++;
        }
        else {
            if(count % 2 == 1) {
                cout << -1;
                return "";
            }
            for(int j = 0 ; j < count / 4 ; j++) {
                result += "AAAA";
            }
            result += (count % 4 == 2) ? "BB" : "";
            result += ".";
            count = 0;
        }
    }
    if(count % 2 == 1) {
        cout << -1;
        return "";
    }
    for(int j = 0 ; j < count / 4 ; j++) {
        result += "AAAA";
    }
    result += (count % 4 == 2) ? "BB" : "";
    return result;
}

int main() {
    string board;
    cin >> board;
    string result = cover(board);
    cout << result;
}
```

[def]: https://www.acmicpc.net/problem/1343