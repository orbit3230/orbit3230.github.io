---
layout: post
title: "[데일리 백준] 2357, 14428"
excerpt: "2 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-11-19
last_modified_at: 2024-11-19
---
## Gold
### [2357][def]

```c++
#include <iostream>
#include <vector>
using namespace std;

typedef struct Number {
    int min = INT32_MAX;
    int max = INT32_MIN;
} Number;

void makeSegtree(vector<Number>& segtree, int leafIndex) {
    for(int i = leafIndex-1; i >= 1 ; i--) {
        segtree[i].min = min(segtree[i<<1].min, segtree[(i<<1)+1].min);
        segtree[i].max = max(segtree[i<<1].max, segtree[(i<<1)+1].max);
    }
}
// {min, max}
pair<int, int> getMinMax(vector<Number>& segtree, int a, int b, int start, int end, int index) {
    if(end < a || b < start) return {INT32_MAX, INT32_MIN};
    if(a <= start && end <= b) return {segtree[index].min, segtree[index].max};
    int mid = (start + end) / 2;
    pair<int, int> left = getMinMax(segtree, a, b, start, mid, index<<1);
    pair<int, int> right = getMinMax(segtree, a, b, mid+1, end, (index<<1)+1);
    return {min(left.first, right.first), max(left.second, right.second)};
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
    vector<Number> segtree(size);
    int leafIndex = size >> 1;  // 1-based index
    int input;
    for(int i = 0 ; i < n ; i++) {
        cin >> input;
        segtree[i+leafIndex].min = segtree[i+leafIndex].max = input;
    }
    makeSegtree(segtree, leafIndex);
    int a, b;
    for(int i = 0 ; i < m ; i++) {
        cin >> a >> b;
        auto minmax = getMinMax(segtree, a, b, 1, leafIndex, 1);
        cout << minmax.first << ' ' << minmax.second << '\n';
    }
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 세그먼트 트리.

  - 최댓값과 최솟값을 모두 구해보는 응용문제이다.  

  - 구간 값 읽어오는 함수에서 계속 조건식 범위 실수하는데, 주의하도록 하자 !

</div>
</details>

### [14428][def2]

```c++
#include <iostream>
#include <vector>
using namespace std;

typedef struct Number {
    int index;
    int value = INT32_MAX;
    bool operator<(const Number& other) const {
        return (this->value == other.value) ?
        (this->index < other.index) : (this->value < other.value);
    }
} Number;

void makeSegtree(vector<Number>& segtree, int leafIndex) {
    for(int i = leafIndex-1 ; i >= 1; i--) {
        segtree[i] = (segtree[i<<1] < segtree[(i<<1)+1]) ? segtree[i<<1] : segtree[(i<<1)+1];
    }
}
void update(vector<Number>& segtree, int leafIndex, int a, int b) {
    int index = leafIndex + a;
    segtree[index].value = b;
    index >>= 1;
    while(index > 0) {
        segtree[index] = (segtree[index<<1] < segtree[(index<<1)+1]) ? segtree[index<<1] : segtree[(index<<1)+1];
        index >>= 1;
    }
}
Number getMin(vector<Number>& segtree, int a, int b, int start, int end, int index) {
    if(end < a || b < start) return {-1, INT32_MAX};
    if(a <= start && end <= b) return segtree[index];
    int mid = (start + end) / 2;
    Number left = getMin(segtree, a, b, start, mid, index<<1);
    Number right = getMin(segtree, a, b, mid+1, end, (index<<1)+1);
    return (left < right) ? left : right;
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
    vector<Number> segtree(size);
    int leafIndex = size >> 1;  // 1-based index
    for(int i = 0 ; i < n ; i++) {
        segtree[i+leafIndex].index = i+1;
        cin >> segtree[i+leafIndex].value;
    }
    makeSegtree(segtree, leafIndex);
    int m;
    cin >> m;
    int type, a, b;
    for(int i = 0 ; i < m ; i++) {
        cin >> type >> a >> b;
        if(type == 1) {
            update(segtree, leafIndex, a-1, b);
            continue;
        }
        Number result = getMin(segtree, a, b, 1, leafIndex, 1);
        cout << result.index << '\n';
    }
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 세그먼트 트리.

- 최솟값을 구하는 세그먼트 트리. 한 가지 다른 점이 있다면,  
인덱스를 구해야 하기 때문에 함께 저장해서 다루어야 한다.  

</div>
</details>

[def]: https://www.acmicpc.net/problem/2357
[def2]: https://www.acmicpc.net/problem/14428