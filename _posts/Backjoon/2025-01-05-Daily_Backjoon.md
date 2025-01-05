---
layout: post
title: "[데일리 백준] 2243"
excerpt: "1 Platinum"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-01-05
last_modified_at: 2025-01-05
---
## Platinum
### [2243][def]

```c++
#include <iostream>
#include <vector>
#define SIZE 2097152
using namespace std;

void update(vector<int>& segtree, int index, int value) {
    segtree[index] += value;
    index >>= 1;
    while(index > 0) {
        segtree[index] = segtree[index<<1] + segtree[(index<<1)+1];
        index >>= 1;
    }
}

int find(vector<int>& segtree, int b, int c, int index, const int& leafIndex) {
    if((index << 1) >= SIZE) {
        update(segtree, index, -1);
        return index - leafIndex + 1;
    }
    int left = segtree[index<<1];
    int right = segtree[(index<<1)+1];
    if(b <= left) return find(segtree, b, c, index<<1, leafIndex);
    return find(segtree, b-left, c, (index<<1)+1, leafIndex);
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    int n;
    cin >> n;
    vector<int> segtree(SIZE, 0);
    int leafIndex = SIZE >> 1;
    
    int a, b, c;
    while(n--) {
        cin >> a;
        if(!(a-1)) {
            cin >> b;
            cout << find(segtree, b, c, 1, leafIndex) << '\n';
            continue;
        }
        cin >> b >> c;
        update(segtree, leafIndex+b-1, c);
    }
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 세그먼트 트리 + 이분 탐색

- 일반적인 세그먼트 트리의 범위 탐색이 아닌,  
이분 탐색을 통해 리프 노드까지 내려가는 탐색 방식이 독특한 문제.

</div>
</details>

[def]: https://www.acmicpc.net/problem/2243