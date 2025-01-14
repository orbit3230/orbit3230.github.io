---
layout: post
title: "[데일리 백준] 1275"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-01-14
last_modified_at: 2025-01-14
---
## Gold
### [1275][def]

```c++
#include <iostream>
#include <vector>
using namespace std;

void makeSegtree(vector<long long>& segtree, int leafIndex, int n) {
    int size = leafIndex + n;
    for(int i = leafIndex ; i < size ; i++) cin >> segtree[i];
    for(int i = leafIndex-1 ; i >= 1 ; i--) segtree[i] = segtree[i<<1] + segtree[(i<<1)+1];
}
long long getSum(vector<long long>& segtree, int x, int y, int start, int end, int index) {
    if(y < start || end < x) return 0;
    if(x <= start && end <= y) return segtree[index];
    int mid = (start + end) >> 1;
    return getSum(segtree, x, y, start, mid, index<<1) + getSum(segtree, x, y, mid+1, end, (index<<1)+1);
}
void update(vector<long long>& segtree, int index, int value) {
    segtree[index] = value;
    index >>= 1;
    while(index > 0) {
        segtree[index] = segtree[index<<1] + segtree[(index<<1)+1];
        index >>= 1;
    }
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    int n, q;
    cin >> n >> q;
    int size = 1;
    while(size < n) size <<= 1;
    size <<= 1;
    vector<long long> segtree(size, 0);
    int leafIndex = size >> 1;
    makeSegtree(segtree, leafIndex, n);

    int x, y, a, b;
    while(q--) {
        cin >> x >> y >> a >> b;
        if(x > y) swap(x, y);
        cout << getSum(segtree, x, y, 1, leafIndex, 1) << '\n';
        update(segtree, leafIndex+a-1, b);
    }
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 무난한 세그먼트 트리 연습 문제

</div>
</details>

[def]: https://www.acmicpc.net/problem/1275