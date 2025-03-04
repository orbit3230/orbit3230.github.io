---
layout: post
title: "[데일리 백준] 4195"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-03-04
last_modified_at: 2025-03-04
---
## Gold
### [4195][def]

```c++
#include <iostream>
#include <vector>
#include <unordered_map>
using namespace std;

typedef struct Friend {
    int index;
    int parent;
    int peoples;
} Friend;

int find(vector<Friend>& friends, Friend& f) {
    if(f.index == f.parent) return f.index;
    return f.parent = find(friends, friends[f.parent]);
}
int unionFind(vector<Friend>& friends, int a, int b) {
    int rootA = find(friends, friends[a]);
    int rootB = find(friends, friends[b]);
    if(rootA == rootB) return friends[rootA].peoples;
    friends[rootB].parent = rootA;
    int people = friends[rootA].peoples + friends[rootB].peoples;
    friends[rootA].peoples = friends[rootB].peoples = people;
    return people;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    int t;
    cin >> t;
    while(t--) {
        int f;
        cin >> f;
        vector<Friend> friends;
        unordered_map<string, int> name_index;
        int index = 0;
        string a, b;
        while(f--) {
            cin >> a >> b;
            int indexA, indexB;
            if(name_index.find(a) == name_index.end()) {
                friends.push_back({index, index, 1});
                name_index[a] = index;
                indexA = index++;
            } else {indexA = name_index[a];}
            if(name_index.find(b) == name_index.end()) {
                friends.push_back({index, index, 1});
                name_index[b] = index;
                indexB = index++;
            } else {indexB = name_index[b];}
            cout << unionFind(friends, indexA, indexB) << '\n';
        }
    }
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- Disjoint Set

</div>
</details>

[def]: https://www.acmicpc.net/problem/4195