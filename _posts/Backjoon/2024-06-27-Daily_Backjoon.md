---
layout: post
title: "[데일리 백준] 1927, 11279"
excerpt: "2 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-06-27
last_modified_at: 2024-06-27
---
## Silver
### [1927][def]

```c++
#include <iostream>
#include <queue>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    int n;
    cin >> n;

    int next;
    int top;
    priority_queue<int, vector<int>, greater<int>> pq;
    for(int i = 0 ; i < n ; i++) {
        cin >> next;
        if(!next) {
            if(pq.empty()) cout << 0;
            else {
                cout << pq.top();
                pq.pop();
            }
            cout << '\n';
        }
        else {
            pq.push(next);
        }
    }
}
```

### [11279][def2]

```c++
#include <iostream>
#include <queue>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    int n;
    cin >> n;

    int next;
    int top;
    priority_queue<int> pq;
    for(int i = 0 ; i < n ; i++) {
        cin >> next;
        if(!next) {
            if(pq.empty()) cout << 0;
            else {
                cout << pq.top();
                pq.pop();
            }
            cout << '\n';
        }
        else {
            pq.push(next);
        }
    }
}
``` 

[def]: https://www.acmicpc.net/problem/1927
[def2]: https://www.acmicpc.net/problem/11279