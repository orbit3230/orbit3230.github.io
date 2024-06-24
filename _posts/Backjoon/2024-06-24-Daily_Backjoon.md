---
layout: post
title: "[데일리 백준] 1541"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-06-24
last_modified_at: 2024-06-24
---
## Silver
### [1541][def]

```c++
#include <iostream>
using namespace std;

int main() {
    string line;
    cin >> line;

    int front = 0;
    int back = 0;
    string num = "";
    bool minusTrigger = false;
    for(int i = 0 ; i < line.length() ; i++) {
        if(line[i] - '0' >= 0 && line[i] - '0' <= 9) {
            num += line[i];
        }
        else if(line[i] == '+') {
            back += stoi(num);
            num = "";
        }
        else if(line[i] == '-') {
            back += stoi(num);
            if(minusTrigger) {
                front -= back;
            }
            else {
                front = back;
            }
            back = 0;
            num = "";
            minusTrigger = true;
        }
    }
    back += stoi(num);
    front += (minusTrigger) ? -back : back;

    cout << front;
}
``` 

[def]: https://www.acmicpc.net/problem/1541