---
layout: post
title: "[데일리 백준] 28283"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-11-21
last_modified_at: 2024-11-21
---
## Gold
### [28283][def]

```c++
#include <iostream>
#include <vector>
#include <algorithm>
#include <queue>
using namespace std;

typedef struct Computer {
    int value;
    bool security = false;
    int securityStep = 0;
    vector<Computer*> neighbors;
} Computer;

bool compare(const Computer& a, const Computer& b) {
    return a.value*a.securityStep > b.value*b.securityStep;
}

void securityBFS(Computer* c) {
    queue<Computer*> q;
    vector<Computer*> trace;
    q.push(c);
    while(!q.empty()) {
        Computer* current = q.front();
        q.pop();
        int step = current->securityStep;
        for(Computer* next : current->neighbors) {
            if(next->security || (next->securityStep != 0 && next->securityStep <= step+1)) {
                continue;
            }
            next->securityStep = step+1;
            next->security = true;
            q.push(next);
            trace.push_back(next);
        }
    }
    // reset visited
    for(Computer* c : trace) {
        c->security = false;
    }
}

int main () {
    ios::sync_with_stdio(false);
    cin.tie(NULL);

    int n, m, x, y;
    cin >> n >> m >> x >> y;
    vector<Computer> network(n);
    for(int i = 0 ; i < n ; i++) {
        cin >> network[i].value;
    }
    int from, to;
    for(int i = 0 ; i < m ; i++) {
        cin >> from >> to;
        from--; to--;  // 0-based index
        network[from].neighbors.push_back(&network[to]);
        network[to].neighbors.push_back(&network[from]);
    }
    vector<Computer*> securityDone(y);
    int index;
    for(int i = 0 ; i < y ; i++) {
        cin >> index;
        index--;  // 0-based index
        securityDone[i] = &network[index];
        network[index].security = true;
    }
    for(Computer* c : securityDone) {
        securityBFS(c);
    }
    sort(network.begin(), network.end(), compare);
    // infinity check
    for(Computer c : network) {
        if(c.securityStep == 0 && !c.security &&c.value != 0) {
            cout << -1;
            return 0;
        }
    }
    long long money = 0;
    for(int i = 0 ; i < x ; i++) {
        money += (long long)network[i].value*network[i].securityStep;
    }
    cout << money;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- BFS + 정렬 + 그리디 문제.

- 코드가 좀 지저분하고 비효율적이긴 한데,  
구현이 너무 많아서 다시 풀 엄두가 안남. 패스!

</div>
</details>

[def]: https://www.acmicpc.net/problem/28283