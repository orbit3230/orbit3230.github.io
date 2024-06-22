---
layout: post
title: "[데일리 백준] 2422"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-06-22
last_modified_at: 2024-06-22
---
## Silver
### [2422][def]

```c++
#include <iostream>
#include <vector>
#include <set>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    int n, m;
    cin >> n >> m;

    vector<set<int>> v;
    for(int i = 1 ; i <= n ; i++) {
        set<int> s;
        for(int j = i+1 ; j <= n ; j++) {
            s.insert(j);
        }
        v.push_back(s);
    }

    int x, y;
    for(int j = 0 ; j < m ; j++) {
        cin >> x >> y;
        if(x > y) {
            int temp = x;
            x = y;
            y = temp;
        }
        v[x-1].erase(y);
    }

    int count = 0;
    for(int i = 0 ; i < n-2 ; i++) {
        int second;
        set<int>::iterator it = v[i].begin();
        while(it != v[i].end()) {
            second = *(it++);
            // first와 third가 서로 섞이면 안되는 경우를 제외하기 위해
            set<int>::iterator it2 = v[second-1].begin();
            int third;
            while(it2 != v[second-1].end()) {
                third = *(it2++);
                if(v[i].find(third) != v[i].end()) {
                    count++;
                }
            }
        }
    }

    cout << count;
}
``` 

[def]: https://www.acmicpc.net/problem/2422