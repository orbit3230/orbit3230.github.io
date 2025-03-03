---
layout: post
title: "[데일리 백준] 16562"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-03-02
last_modified_at: 2025-03-02
---
## Gold
### [16562][def]

```c++
#include <iostream>
#include <vector>
using namespace std;

typedef struct Friend {
    int index;
    int parent;
    int cost;
} Friend;

int find(vector<Friend>& friends, Friend& f) {
    if(f.index == f.parent) return f.index;
    return friends[f.index].parent = find(friends, friends[f.parent]);
}
void unionFind(vector<Friend>& friends, int a, int b) {
    int rootA = find(friends, friends[a]);
    int rootB = find(friends, friends[b]);
    friends[rootB].parent = rootA;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);

    int n, m, k;
    cin >> n >> m >> k;
    vector<Friend> friends(n);
    for(int i = 0 ; i < n ; i++) {
        friends[i].index = friends[i].parent = i;
        cin >> friends[i].cost;
    }
    int a, b;
    while(m--) {
        cin >> a >> b;
        unionFind(friends, a-1, b-1);  // 0-based index
    }
    vector<int> min_cost(n, INT32_MAX);
    for(Friend& f : friends) {
        find(friends, f);  // path compression
        min_cost[f.parent] = min(min_cost[f.parent], f.cost);
    }
    int sum = 0;
    for(int& cost : min_cost) if(cost != INT32_MAX) sum += cost;
    if(sum > k) {
        cout << "Oh no";
        return 0;
    }
    cout << sum;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- Disjoint Set  

</div>
</details>

[def]: https://www.acmicpc.net/problem/16562