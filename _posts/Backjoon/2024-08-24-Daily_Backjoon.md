---
layout: post
title: "[데일리 백준] 1202"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-08-24
last_modified_at: 2024-08-24
---
## Gold
### [1202][def]

```c++
#include <iostream>
#include <vector>
#include <queue>
#include <algorithm>
using namespace std;

typedef struct Jewelry {
    int weight;
    int price;
    bool operator<(const Jewelry& other) const {
        return this->weight > other.weight;
    }
} Jewelry;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    int n, k;
    cin >> n >> k;
    priority_queue<Jewelry> jewelries;
    for(int i = 0 ; i < n ; i++) {
        Jewelry j = {0, 0};
        cin >> j.weight >> j.price;
        jewelries.push(j);
    }
    vector<int> bags(k);
    for(int i = 0 ; i < k ; i++) {
        cin >> bags[i];
    }
    sort(bags.begin(), bags.end());

    priority_queue<int> maxHeap;
    long long sum = 0;
    for(int i = 0 ; i < k ; i++) {
        while(!jewelries.empty() && jewelries.top().weight <= bags[i]) {
            maxHeap.push(jewelries.top().price);
            jewelries.pop();
        }
        if(!maxHeap.empty()) {
            sum += maxHeap.top();
            maxHeap.pop();
        }
    }
    cout << sum;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 아이디어를 떠올리기 힘들었다.  
심화적인 우선순위 큐 & 정렬 문제

</div>
</details>

[def]: https://www.acmicpc.net/problem/1202