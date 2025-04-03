---
layout: post
title: "[데일리 백준] 14427"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-04-03
last_modified_at: 2025-04-03
---
## Gold
### [14427][def]

```c++
#include <iostream>
#include <vector>
#include <queue>
using namespace std;

typedef struct Object {
    int value;
    int index;
    bool removed = false;
} Object;

struct Compare {
    bool operator()(Object* a, Object* b) const {
        if (a->value == b->value) return a->index > b->index;
        return a->value > b->value;
    }
};

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    int n;
    cin >> n;
    vector<Object*> list;
    priority_queue<Object*, vector<Object*>, Compare> pq;
    for(int i = 0 ; i < n ; i++) {
        Object* o = new Object();
        cin >> o->value;
        o->index = i;
        pq.push(o);
        list.push_back(o);
    }
    int m;
    cin >> m;
    int type, i, v;
    while(m--) {
        cin >> type;
        if(type == 1) {
            cin >> i >> v;
            i--;  // 0-based index
            list[i]->removed = true;
            Object* o = new Object();
            o->value = v;
            o->index = i;
            pq.push(o);
            list[i] = o;
            continue;
        }
        while(pq.top()->removed) pq.pop();
        cout << pq.top()->index+1 << '\n';
    }
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 우선순위 큐

</div>
</details>

[def]: https://www.acmicpc.net/problem/14427