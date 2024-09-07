---
layout: post
title: "[데일리 백준] 2170"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-09-07
last_modified_at: 2024-09-07
---
## Gold
### [2170][def]

```c++
#include <iostream>
#include <queue>
using namespace std;

typedef struct Line {
    int from;
    int to;
    bool operator<(const Line& other) const {
        return this->from > other.from;
    }
} Line;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    int n;
    cin >> n;
    priority_queue<Line> lines;
    for(int i = 0 ; i < n ; i++) {
        Line line;
        cin >> line.from >> line.to;
        lines.push(line);
    }

    int start = 0;
    int end = -(1 << 31);
    int length = 0;
    int sum = 0;
    while(!lines.empty()) {
        int from = lines.top().from;
        int to = lines.top().to;
        lines.pop();
        // 연결이 끊어지는 경우
        if(from > end) {
            sum += length;
            start = from;
            end = to;
        }
        // 연결이 유지되는 경우
        else {
            if(to > end) end = to;  // 더 길어지는 경우
        }
        length = end - start;
    }
    sum += length;
    cout << sum;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 스위핑 알고리즘을 알게되었다.  

  - 사실 새로운 알고리즘이라고 하기도 뭐한게, 그냥 순서대로 쓸면서(sweep) 탐색하는 알고리즘이라  
  자연스럽게 습득하였다.  

- 꼭 큐(queue)의 특성을 사용해야 하는 게 아니라면,  
우선순위 큐를 사용하여 원소들을 정렬해 꺼내 쓰는 것 보다  
벡터에 원소를 다 넣고 한 번의 정렬만 수행하는 것이 더 빠르다.  

</div>
</details>

[def]: https://www.acmicpc.net/problem/2170