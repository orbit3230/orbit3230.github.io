---
layout: post
title: "[데일리 백준] 11501"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-12-08
last_modified_at: 2024-12-08
---
## Silver
### [11501][def]

```c++
#include <iostream>
#include <vector>
#include <queue>
using namespace std;

typedef struct Stock {
    int day;
    int value;
    bool operator<(const Stock& other) const {
        if (this->value == other.value)
            return this->day > other.day;
        return this->value < other.value;
    }
} Stock;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    int t;
    cin >> t;
    while(t--) {
        int n;
        cin >> n;
        vector<int> days(n);
        priority_queue<Stock> pq;
        int input;
        for(int i = 0 ; i < n ; i++) {
            cin >> input;
            days[i] = input;
            pq.push({i, input});
        }
        long long sum = 0;
        long long used_money = 0;
        int stock_count = 0;
        for(int i = 0 ; i < n ; i++) {
            long long day = days[i];
            while(!pq.empty() && pq.top().day < i) pq.pop();
            // 저점에서 매수
            if(day != pq.top().value) {
                used_money += day;
                stock_count++;
                continue;
            }
            // 고점에서 매도
            sum += day*stock_count - used_money;
            used_money = 0;
            stock_count = 0;
            pq.pop();
        }
        cout << sum << '\n';
    }
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- Greedy Algorithm

- 우선순위 큐를 활용하여 풀었다. (like 최솟값 찾기 문제)
  - 그러나, 이 문제를 가장 간단하게 푸는 핵심은 뒤에서부터 접근하는 것이었다.  

</div>
</details>

[def]: https://www.acmicpc.net/problem/11501