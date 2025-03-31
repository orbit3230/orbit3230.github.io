---
layout: post
title: "[데일리 백준] 5676"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-03-31
last_modified_at: 2025-03-31
---
## Gold
### [5676][def]

```c++
#include <iostream>
#include <vector>
using namespace std;

typedef struct Node {
    int negatives = 0;
    int zeros = 0;
} Node;

void makeSegtree(vector<Node>& segtree, int index) {
    for(int i = index ; i >= 1 ; i--) {
        segtree[i].negatives = segtree[i<<1].negatives + segtree[(i<<1)+1].negatives;
        segtree[i].zeros = segtree[i<<1].zeros + segtree[(i<<1)+1].zeros;
    }
}
void update(vector<Node>& segtree, int index, int value) {
    int negatives = (value < 0);
    int zeros = (value == 0);
    int negDiff = negatives - segtree[index].negatives;
    int zeroDiff = zeros - segtree[index].zeros;
    if(!negDiff && !zeroDiff) return;
    segtree[index].negatives = negatives;
    segtree[index].zeros = zeros;
    index >>= 1;
    while(index > 0) {
        segtree[index].negatives += negDiff;
        segtree[index].zeros += zeroDiff;
        index >>= 1;
    }
}
Node getSum(vector<Node>& segtree, int a, int b, int start, int end, int index) {
    if(b < start || end < a) return {0, 0};
    if(a <= start && end <= b) return segtree[index];
    int mid = (start+end) >> 1;
    Node left = getSum(segtree, a, b, start, mid, (index<<1));
    Node right = getSum(segtree, a, b, mid+1, end, (index<<1)+1);
    return {left.negatives+right.negatives, left.zeros+right.zeros};
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    int n, k;
    while(cin >> n >> k) {
        int size = 1;
        while(size < n) size <<= 1;
        size <<= 1;
        vector<Node> segtree(size);
        int leafIndex = size >> 1;
        int inputIndex = leafIndex + n;
        int input;
        for(int i = leafIndex ; i < inputIndex ; i++) {
            cin >> input;
            segtree[i] = {(input < 0), (input == 0)};
        }
        makeSegtree(segtree, leafIndex-1);
        char type;
        int a, b;
        while(k--) {
            cin >> type >> a >> b;
            if(type == 'C') {
                update(segtree, leafIndex+a-1, b);
                continue;
            }
            Node result = getSum(segtree, a, b, 1, leafIndex, 1);
            if(result.zeros) {
                cout << 0;
                continue;
            }
            cout << (result.negatives % 2 ? '-' : '+');
        }
        cout << '\n';
    }
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- Segment Tree

</div>
</details>

[def]: https://www.acmicpc.net/problem/5676