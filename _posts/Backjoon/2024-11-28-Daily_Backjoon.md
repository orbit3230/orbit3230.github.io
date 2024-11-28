---
layout: post
title: "[데일리 백준] 7578"
excerpt: "1 Platinum"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-11-28
last_modified_at: 2024-11-28
---
## Platinum
### [7578][def]

```c++
#include <iostream>
#include <vector>
#include <unordered_map>
using namespace std;

void update(vector<int>& segtree, int leafIndex, int index) {
    index += leafIndex;
    segtree[index] = 1;
    index >>= 1;
    while(index) {
        segtree[index]++;
        index >>= 1;
    }
}
int getSum(vector<int>& segtree, int a, int b, int start, int end, int index) {
    if(end < a || b < start) return 0;
    if(a <= start && end <= b) return segtree[index];
    int mid = (start + end) / 2;
    return getSum(segtree, a, b, start, mid, index<<1)
    + getSum(segtree, a, b, mid+1, end, (index<<1)+1);
}

/**
 * 왼쪽부터 차례로 연결할 때,
 * 현재 노드를 기준 이미 연결된 노드들 중 인덱스가 자신보다 큰 것의 개수
 * = 교차점의 개수
 */
int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);

    int n;
    cin >> n;
    unordered_map<int, int> hashmap;
    int input;
    for(int i = 0 ; i < n ; i++) {
        cin >> input;
        hashmap[input] = i;
    }
    int size = 1;
    while(size < n) size <<= 1;
    size <<= 1;
    vector<int> segtree(size, 0);  // 누적합 세그먼트트리
    int leafIndex = size>>1;

    long long count = 0;
    int index;
    for(int i = 0 ; i < n ; i++) {
        cin >> input;
        index = hashmap[input];
        update(segtree, leafIndex, index);
        index++;  // 1-based index
        count += getSum(segtree, index+1, leafIndex, 1, leafIndex, 1);
    }
    cout << count;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 세그먼트 트리 응용 문제.  

- 이러한 문제가 등장했을 때 세그먼트 트리를 떠올리는 것이 중요하다.  

</div>
</details>

[def]: https://www.acmicpc.net/problem/7578