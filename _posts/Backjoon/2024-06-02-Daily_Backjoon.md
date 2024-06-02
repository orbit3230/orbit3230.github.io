---
layout: post
title: "[데일리 백준] 9375"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-06-02
last_modified_at: 2024-06-02
---
## Silver
### [9375][def]

```c++
#include <iostream>
#include <vector>
using namespace std;

typedef struct Clothes {
    string name;
    int count;
} Clothes;

int main() {
    int t;
    cin >> t;
    for(int i = 0 ; i < t ; i++) {
        int n;
        cin >> n;
        vector<Clothes> clothes;
        for(int j = 0 ; j < n ; j++) {
            string name, type;
            cin >> name >> type;
            bool found = false;
            // 이미 있는 종류의 옷이면 개수만 ++
            for(Clothes &c : clothes) {
                if(c.name == type) {
                    c.count++;  // 레퍼런스로 받아야 하는 이유
                    found = true;
                    break;
                }
            }
            // 새로운 종류의 옷이면 추가
            if(!found) {
                clothes.push_back({type, 1});
            }
        }
        int kinds = 1;
        for(Clothes c : clothes) {
            kinds *= c.count + 1;
        }
        kinds--; // 알몸은 부끄러우니까...
        cout << kinds << '\n';
    }
}
```

[def]: https://www.acmicpc.net/problem/9375