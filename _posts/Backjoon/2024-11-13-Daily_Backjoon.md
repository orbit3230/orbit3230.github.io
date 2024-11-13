---
layout: post
title: "[데일리 백준] 2042, 10868"
excerpt: "2 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-11-13
last_modified_at: 2024-11-13
---
## Gold
### [2042][def]

```c++
#include <iostream>
#include <vector>
using namespace std;

void makeSegtree(vector<long long>& segtree, int leafIndex) {
    for(int i = leafIndex-1 ; i >= 1 ; i--) {
        segtree[i] = segtree[i<<1] + segtree[(i<<1)+1];
    }
}
void update(vector<long long>& segtree, int b, long long c, int leafIndex) {
    int index = leafIndex + b;
    segtree[index] = c;
    while((index >>= 1) >= 1) {
        segtree[index] = segtree[index<<1] + segtree[(index<<1)+1];
    }
}
// root부터 시작 -> recursive
long long getPrefixSum(vector<long long>& segtree, int start, int end, int b, int c, int index) {
    if(c < start || b > end) return 0;
    if(b <= start && end <= c) return segtree[index];
    int mid = (start + end) / 2;
    return getPrefixSum(segtree, start, mid, b, c, index*2) // left
    + getPrefixSum(segtree, mid+1, end, b, c, index*2+1);  // right
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    int n, m, k;
    cin >> n >> m >> k;
    int size = 1;
    while(size < n) size <<= 1;
    size <<= 1;
    vector<long long> segtree(size, 0);
    // store in leaf
    int leafIndex = size >> 1;
    for(int i = 0 ; i < n ; i++) {
        cin >> segtree[leafIndex + i];
    }
    makeSegtree(segtree, leafIndex);
    int a, b; long long c;
    for(int i = 0 ; i < m+k ; i++) {
        cin >> a >> b >> c;
        b--;  // 0-based index
        if(a == 1) {
            update(segtree, b, c, leafIndex);
            continue;
        }
        c--;  // 0-based index
        cout << getPrefixSum(segtree, 0, leafIndex-1, b, c, 1) << '\n';
    }
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 세그먼트 트리.

- 배운 점
  - 세그먼트 트리 내에서 특정 구간 합을 구할 때에는 재귀를 사용할 수 있다.  
  그리고 꼭 0-based index를 사용할 필요는 없을 듯.  
  애초에 벡터에서 인덱스를 `1`부터 사용하기 때문  

</div>
</details>

### [10868][def2]

```c++
#include <iostream>
#include <vector>
using namespace std;

void makeSegtree(vector<int>& segtree, int leafIndex) {
    for(int i = leafIndex-1 ; i >= 1 ; i--) {
        segtree[i] = min(segtree[i<<1], segtree[(i<<1)+1]);
    }
}

int findMin(const vector<int>& segtree, int start, int end, int a, int b, int index) {
    if(b < start || end < a) return INT32_MAX;
    if(a <= start && end <= b) return segtree[index];
    int mid = (start + end) / 2;
    return min(findMin(segtree, start, mid, a, b, index*2), findMin(segtree, mid+1, end, a, b, index*2+1));
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
    vector<int> segtree(size, INT32_MAX);
    int leafIndex = size >> 1;
    for(int i = 0 ; i < n ; i++) {
        cin >> segtree[i+leafIndex];
    }
    makeSegtree(segtree, leafIndex);
    int a, b;
    for(int i = 0 ; i < m ; i++) {
        cin >> a >> b;
        cout << findMin(segtree, 1, leafIndex, a, b, 1) << '\n';
    }
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 세그먼트 트리.

- 1-based index를 사용했다.  

</div>
</details>

[def]: https://www.acmicpc.net/problem/2042
[def2]: https://www.acmicpc.net/problem/10868