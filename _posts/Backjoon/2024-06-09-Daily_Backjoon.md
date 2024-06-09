---
layout: post
title: "[데일리 백준] 30804"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-06-09
last_modified_at: 2024-06-09
---
## Silver
### [30804][def]

```c++
#include <iostream>
#include <vector>
using namespace std;

int makeTanghulu(vector<int> t, int n) {

    int max = 0;

    vector<int>::iterator it = t.begin();
    while(it < t.end()) {
        int length = 2;
        int fruit1 = *it;
        it++;
        int fruit2 = *it;
        int next;
        vector<int>::iterator nextStart = it;  // 다음 시작점
        it++;
        while(it < t.end()) {
            next = *it;
            if(*(it-1) != *(it-2))
                nextStart = it-1;
            if(next != fruit1 && next != fruit2) {
                if(fruit1 == fruit2) {
                    fruit2 = next;
                }
                else {
                    it = nextStart;
                    break;
                }
            }
            length++;
            it++;
        }
        if(length > max)
            max = length;
    }

    return max;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    int n;
    cin >> n;
    if(n == 1) {
        cout << 1;
        return 0;
    }

    vector<int> tanghulu;

    int next;
    for(int i = 0 ; i < n ; i++) {
        cin >> next;
        tanghulu.push_back(next);
    }

    int max = makeTanghulu(tanghulu, n);

    cout << max;
}
```

[def]: https://www.acmicpc.net/problem/30804