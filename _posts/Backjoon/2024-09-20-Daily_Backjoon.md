---
layout: post
title: "[데일리 백준] 1655"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-09-20
last_modified_at: 2024-09-20
---
## Gold
### [1655][def]

```c++
#include <iostream>
#include <queue>
using namespace std;

void swapTop(priority_queue<int, vector<int>, greater<int>>& minHeap, priority_queue<int>& maxHeap) {
    int minTop = minHeap.top();
    int maxTop = maxHeap.top();
    minHeap.pop();
    maxHeap.pop();
    minHeap.push(maxTop);
    maxHeap.push(minTop);
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    int n;
    cin >> n;
    priority_queue<int, vector<int>, greater<int>> minHeap;
    priority_queue<int> maxHeap;
    int current;
    for(int i = 0 ; i < n ; i++) {
        cin >> current;
        maxHeap.push(current);
        minHeap.push(current);
        // swap
        if(minHeap.top() < maxHeap.top()) {
            swapTop(minHeap, maxHeap);
        }
        // 만약 짝수개수일 때 둘 중 더 큰 수를 출력하려는 문제였다면, minHeap을 출력하면 될 것.
        cout << maxHeap.top() << '\n';
    }
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 두 개의 우선순위 큐를 적절하게 활용해야 하는 문제.

- 분명히 더 좋은 풀이방법이 있을 법 한데, 잘 떠오르지가 않는다. 우선은 보류

</div>
</details>

[def]: https://www.acmicpc.net/problem/1655