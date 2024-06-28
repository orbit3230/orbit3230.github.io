---
layout: post
title: "[데일리 백준] 11003, 1697"
excerpt: "1 Platinum, 1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-06-28
last_modified_at: 2024-06-28
---
## Platinum
### [11003][def]

```c++
#include <iostream>
#include <algorithm>
#include <queue>
using namespace std;

typedef struct Element {
    int data;
    int order;
    bool operator<(const Element &e) const {
        return data > e.data;
    }
} Element;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    int n, l;
    cin >> n >> l;

    priority_queue<Element> q;
    int next;
    for(int i = 0 ; i < n ; i++) {
        cin >> next;
        q.push({next, i});
        while(q.top().order <= i - l) {
            q.pop();
        }     
        cout << q.top().data << ' ';
    }
}
```

<br>

## Silver
### [1697][def2]

```c++
#include <iostream>
#include <queue>
using namespace std;

typedef struct Position {
    int n_;
    int step;
} Position;

int calculate(int n, int k) {
    if(n >= k) return n - k;
    bool *visited = new bool[k+20];
    for(int i = 0 ; i < k+20 ; i++) visited[i] = false;
    queue<Position> q;
    q.push({n, 0});
    Position p_;
    int n_;
    int step;
    while(true) {
        p_ = q.front();
        q.pop();
        n_ = p_.n_;
        step = p_.step;
        if(n_ == k) return step;
        if(n_ < k) {
            if(n_ < k/2 + 10 && !visited[n_ * 2]) {
                q.push({n_ * 2, step + 1});
                visited[n_ * 2] = true;
            }
            if(!visited[n_ + 1] || n_ == 0) {
                q.push({n_ + 1, step + 1});
                visited[n_ + 1] = true;
            }
        }
        if(n_ > 0 && !visited[n_ - 1]) {
            q.push({n_ - 1, step + 1});
            visited[n_ - 1] = true;
        }
    }
}

int main() {
    int n, k;
    cin >> n >> k;
    cout << calculate(n, k);
}
``` 

[def]: https://www.acmicpc.net/problem/11003
[def2]: https://www.acmicpc.net/problem/1697