---
layout: post
title: "[데일리 백준] 2504"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-08-04
last_modified_at: 2024-08-04
---
## Gold
### [2504][def]

```c++
#include <iostream>
#include <stack>
using namespace std;

typedef struct Paren {
    char parenthesis;
    int storage;
} Paren;

int main() {
    string line;
    cin >> line;
    stack<Paren> stack;
    char next;
    int value;
    int sum = 0;
    for(int i = 0 ; i < line.length() ; i++) {
        next = line[i];
        if(next == '(' || next == '[') {
            stack.push({next, 1});
        }
        else {  // ')' or ']'
            if(stack.empty()) {
                cout << 0;
                return 0;
            }
            Paren pop = stack.top();
            stack.pop();
            if(pop.parenthesis == '(' && next == ')') {
                value = pop.storage * 2;
            }
            else if(pop.parenthesis == '[' && next == ']') {
                value = pop.storage * 3;
            }
            else {
                cout << 0;
                return 0;
            }
            // summation
            if(stack.empty()) {
                sum += value;
            }
            else {
                Paren& top = stack.top();
                if(top.storage == 1) {
                    top.storage = value;
                }
                else {
                    top.storage += value;
                }
            }
        }
    }
    if(!stack.empty()) {
        cout << 0;
    }
    else {
        cout << sum;
    }
}
```

[def]: https://www.acmicpc.net/problem/2504