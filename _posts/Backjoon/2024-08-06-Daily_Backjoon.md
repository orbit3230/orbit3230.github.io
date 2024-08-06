---
layout: post
title: "[데일리 백준] 2623"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-08-06
last_modified_at: 2024-08-06
---
## Gold
### [2623][def]

```c++
#include <iostream>
#include <vector>
#include <queue>
using namespace std;

typedef struct Singer {
    int id;
    vector<Singer*> next;
    int inputDegree;
} Singer;

void topological_sort(vector<Singer*>& singers, int n) {
    vector<int> result;
    queue<Singer*> q;
    for(int i = 0 ; i < n ; i++) {
        if(singers[i]->inputDegree == 0) {
            q.push(singers[i]);
        }
    }
    Singer* s;
    while(!q.empty()) {
        s = q.front();
        q.pop();
        result.push_back(s->id);
        for(Singer* next : s->next) {
            next->inputDegree--;
            if(next->inputDegree == 0) {
                q.push(next);
            }
        }
    }
    // 완성 실패
    if(result.size() != n) {
        cout << 0;
        return;
    }
    // 완성 성공
    for(int i = 0 ; i < n ; i++) {
        cout << result[i] << '\n';
    }
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    int n, m;
    cin >> n >> m;
    vector<Singer*> singers;
    for(int i = 0 ; i < n ; i++) {
        Singer* s = new Singer();
        s->id = i+1;
        s->inputDegree = 0;
        singers.push_back(s);
    }
    for(int i = 0 ; i < m ; i++) {
        int num_s;
        cin >> num_s;
        Singer* from = nullptr;
        Singer* to = nullptr;
        int index;
        for(int j = 0 ; j < num_s ; j++) {
            cin >> index;
            index--;  // 0-based index
            if(from == nullptr) {  // first input
                from = singers[index];
            }
            else {
                to = singers[index];
                from->next.push_back(to);
                to->inputDegree++;
                from = to;
            }
        }
    }

    topological_sort(singers, n);
}
```

[def]: https://www.acmicpc.net/problem/2623