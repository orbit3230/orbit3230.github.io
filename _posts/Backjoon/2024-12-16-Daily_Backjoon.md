---
layout: post
title: "[데일리 백준] 2268"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-12-16
last_modified_at: 2024-12-16
---
## Gold
### [2268][def]

```c++
#include <iostream>
#include <vector>
using namespace std;

long long getSum(vector<long long>& segtree, int a, int b, int start, int end, int index) {
    if(b < start || end < a) return 0;
    if(a <= start && end <= b) return segtree[index];
    int mid = (start + end) >> 1;
    return getSum(segtree, a, b, start, mid, index<<1) + getSum(segtree, a, b, mid+1, end, (index<<1)+1);
}

void modify(vector<long long>& segtree, int index, int value) {
    index--;  // 0-based index
    segtree[index] = value;
    index >>= 1;
    while(index) {
        segtree[index] = segtree[index<<1] + segtree[(index<<1)+1];
        index >>= 1;
    }
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    int n, m;
    cin >> n >> m;

    int size = 1;
    while(size < n) size <<= 1;
    size <<= 1;
    vector<long long> segtree(size, 0);
    int leafIndex = size>>1;
    
    int type, a, b;
    while(m--) {
        cin >> type >> a >> b;
        if(!type) {
            if(a > b) swap(a, b);
            cout << getSum(segtree, a, b, 1, leafIndex, 1) << '\n';
            continue;
        }
        modify(segtree, a+leafIndex, b);
    }
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- Segment Tree

- 무난하다.

</div>
</details>

[def]: https://www.acmicpc.net/problem/2268