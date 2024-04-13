---
layout: post
title: "[데일리 백준] 1874"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-04-13
last_modified_at: 2024-04-13
---
## Silver
### [1874][def]

```c++
#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> stack(n);
    vector<char> result;

    int next;
    int last = 1;
    for(int i = 0 ; i < n ; i++) {
        cin >> next;
        if(i==0) {
            for(int j = 1 ; j <= next ; j++) {
                stack.push_back(last++);
                result.push_back('+');
            }
            stack.pop_back();
            result.push_back('-');
        }
        else {
            if(next > stack.back()) {
                for(int j = last ; j <= next ; j++) {
                    stack.push_back(last++);
                    result.push_back('+');
                }
                stack.pop_back();
                result.push_back('-');
            }
            else {
                if(next != stack.back()) {
                    cout << "NO";
                    return 0;
                }
                else {
                    stack.pop_back();
                    result.push_back('-');
                }
            }
        }
    }

    for(int i = 0 ; i < result.size() ; i++) {
        cout << result[i] << "\n";
    }
}
```

[def]: https://www.acmicpc.net/problem/1874