---
layout: post
title: "[데일리 백준] 14438"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-02-09
last_modified_at: 2025-02-09
---
## Gold
### [14438][def]

```c++
#include <iostream>
#include <vector>
#define INF INT32_MAX
using namespace std;

void makeSegtree(vector<int>& segtree, int index) {
    index--;
    while(index >= 1) {
        segtree[index] = min(segtree[index<<1], segtree[(index<<1)+1]);
        index--;
    }
}
void update(vector<int>& segtree, int index, int value) {
    segtree[index] = value;
    index >>= 1;
    while(index >= 1) {
        segtree[index] = min(segtree[index<<1], segtree[(index<<1)+1]);
        index >>= 1;
    }
}
int getMin(vector<int>& segtree, int a, int b, int start, int end, int index) {
    if(end < a || b < start) return INF;
    if(a <= start && end <= b) return segtree[index];
    int mid = (start + end) >> 1;
    return min(getMin(segtree, a, b, start, mid, (index<<1)), getMin(segtree, a, b, mid+1, end, (index<<1)+1));
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
    vector<int> segtree(size, INF);
    int leafIndex = size >> 1;
    int start = leafIndex;
    for(int i = 0 ; i < n ; i++, start++) cin >> segtree[start];
    makeSegtree(segtree, leafIndex);

    int m;
    cin >> m;
    int type, a, b;
    while(m--) {
        cin >> type >> a >> b;
        type--;
        if(!type) {
            update(segtree, leafIndex+a-1, b);
            continue;
        }
        cout << getMin(segtree, a, b, 1, leafIndex, 1) << '\n';
    }
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 세그먼트 트리 Remind

</div>
</details>

[def]: https://www.acmicpc.net/problem/14438