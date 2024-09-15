---
layout: post
title: "[데일리 백준] 1715"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-09-15
last_modified_at: 2024-09-15
---
## Gold
### [1715][def]

```c++
#include <iostream>
#include <queue>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    int n;
    cin >> n;
    priority_queue<int, vector<int>, greater<int>> pq;
    short input;
    for(int i = 0 ; i < n ; i++) {
        cin >> input;
        pq.push(input);
    }
    int sum = 0;
    int card1;
    int card2;
    while(pq.size() != 1) {
        card1 = pq.top();
        pq.pop();
        card2 = pq.top();
        pq.pop();
        sum += card1 + card2;
        pq.push(card1 + card2);
    }
    cout << sum;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 우선순위 큐를 활용하는 전형적인 문제.  

- 처음엔 너무 쉬워서 왜 골드 4인가 싶었는데,  
문제를 잘못 이해했었다.  
그런데 제대로 이해하고 푼 후에도 쉽다고 느꼈다.  
확실히 예전만큼 골드가 무섭게 느껴지지는 않는 것 같다.  

</div>
</details>

[def]: https://www.acmicpc.net/problem/1715
[def2]: https://www.acmicpc.net/problem/1715