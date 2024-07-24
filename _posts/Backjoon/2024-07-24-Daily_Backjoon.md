---
layout: post
title: "[데일리 백준] 1406"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-07-24
last_modified_at: 2024-07-24
---
## Silver
### [1406][def]

```c++
#include <iostream>
#include <stack>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    string line;
    cin >> line;
    stack<char> left, right;  // right는 커서 왼쪽 이동 시 하나씩 쌓임
    for(int i = 0 ; i < line.size() ; i++) {
        left.push(line[i]);
    }
    
    int n;
    cin >> n;
    char command;
    char extra_command;
    for(int i = 0 ; i < n ; i++) {
        cin >> command;
        if(command == 'L') {
            if(!left.empty()) {
                right.push(left.top());
                left.pop();
            }
        }
        else if(command == 'D') {
            if(!right.empty()) {
                left.push(right.top());
                right.pop();
            }
        }
        else if(command == 'B') {
            if(!left.empty()) {
                left.pop();
            }
        }
        else {  // 'P'
            cin >> extra_command;
            left.push(extra_command);
        }
    }
    // 커서 맨 앞으로 이동
    while(!left.empty()) {
        right.push(left.top());
        left.pop();
    }
    // 출력
    while(!right.empty()) {
        cout << right.top();
        right.pop();
    }
}
```

[def]: https://www.acmicpc.net/problem/1406