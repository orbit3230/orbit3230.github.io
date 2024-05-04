---
layout: post
title: "[데일리 백준] 1427"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-05-04
last_modified_at: 2024-05-04
---
## Silver
### [1427][def]

```c++
#include <iostream>
#include <string>
using namespace std;

string sort(int* n, int size) {
    int temp;
    for(int i = 1 ; i < size ; i++) {
        for(int j = i ; j > 0 ; j--) {
            if(n[j] > n[j-1]) {
                temp = n[j];
                n[j] = n[j-1];
                n[j-1] = temp;
            }
        }
    }
    string result = "";
    for(int i = 0 ; i < size ; i++) {
        result += to_string(n[i]);
    }
    return result;
}

int main() {
    string n_s;
    cin >> n_s;
    int size = n_s.length();
    int n[size];
    for(int i = 0 ; i < size ; i++) {
        n[i] = n_s[i] - '0';
    }
    cout << sort(n, size);
}
```

[def]: https://www.acmicpc.net/problem/1427