---
layout: post
title: "[데일리 백준] 1758"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-06-21
last_modified_at: 2024-06-21
---
## Silver
### [1758][def]

```c++
#include <iostream>
#include <algorithm>
#include <vector>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    int n;
    cin >> n;

    vector<int> v;
    int next;
    for(int i = 0 ; i < n ; i++) {
        cin >> next;
        v.push_back(next);
    }
    sort(v.begin(), v.end());
    reverse(v.begin(), v.end());

    vector<int>::iterator it = v.begin();
    int index = 1;
    long long sum = 0;
    int tip;
    while(true) {
        tip = (*it) - ((index++)-1);
        if(tip < 0 || it == v.end()) {
            break;
        }
        sum += tip;
        it++;
    }

    cout << sum;
}
``` 

[def]: https://www.acmicpc.net/problem/1758