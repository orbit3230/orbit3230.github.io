---
layout: post
title: "[데일리 백준] 18436"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-03-03
last_modified_at: 2025-03-03
---
## Gold
### [18436][def]

```c++
#include <iostream>
#include <vector>
using namespace std;

typedef struct Element {
    int odds = 0;
    int evens = 0;
} Element;

void makeSegtree(vector<Element>& segtree, int index) {
    for(int i = index ; i >= 1 ; i--) {
        segtree[i].odds = segtree[i<<1].odds + segtree[(i<<1)+1].odds;
        segtree[i].evens = segtree[i<<1].evens + segtree[(i<<1)+1].evens;
    }
}
void update(vector<Element>& segtree, int index, int value) {
    if(segtree[index].odds == value%2) return;
    segtree[index].odds = value % 2;
    segtree[index].evens = !(value % 2);
    index >>= 1;
    while(index > 0) {
        segtree[index].odds = segtree[index<<1].odds + segtree[(index<<1)+1].odds;
        segtree[index].evens = segtree[index<<1].evens + segtree[(index<<1)+1].evens;
        index >>= 1;
    }
}
void getResult(vector<Element>& segtree, int a, int b, int start, int end, int index, Element& result) {
    if(end < a || b < start) return;
    if(a <= start && end <= b) {
        result.odds += segtree[index].odds;
        result.evens += segtree[index].evens;
        return;
    }
    int mid = (start + end) >> 1;
    getResult(segtree, a, b, start, mid, (index<<1), result);
    getResult(segtree, a, b, mid+1, end, (index<<1)+1, result);
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    int n;
    cin >> n;
    int size = 1;
    while(size < n) size <<= 1;
    size <<= 1;
    vector<Element> segtree(size);
    int leafIndex = size >> 1;
    int input_size = leafIndex + n;
    int input;
    for(int i = leafIndex ; i < input_size ; i++) {
        cin >> input;
        segtree[i].odds = input % 2;
        segtree[i].evens = !(input % 2);
    }
    makeSegtree(segtree, leafIndex-1);

    int m;
    cin >> m;
    int type, a, b;
    while(m--) {
        cin >> type >> a >> b;
        if(type == 1) {
            update(segtree, leafIndex+a-1, b);
            continue;
        }
        Element result;
        getResult(segtree, a, b, 1, leafIndex, 1, result);
        cout << ((type-2) ? result.odds : result.evens) << '\n';
    }
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- Segment Tree  

</div>
</details>

[def]: https://www.acmicpc.net/problem/18436