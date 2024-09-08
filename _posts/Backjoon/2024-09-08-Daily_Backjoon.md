---
layout: post
title: "[데일리 백준] 13334"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-09-08
last_modified_at: 2024-09-08
---
## Gold
### [13334][def]

```c++
#include <iostream>
#include <algorithm>
#include <vector>
#include <queue>
using namespace std;
// 내가 생각한 알고리즘
// 1. to(끝점) 기준으로 정렬하여 하나씩 가져와서 우선순위 큐에 넣음
// 2. 해당 우선순위 큐는 from(시작점) 기준임.
// 3. 큐에서 범위를 벗어난 라인을 모두 삭제
// 4. 큐의 사이즈 체크
typedef struct Line {
    int from;
    int to;
    bool operator<(const Line& other) const {
        return this->from > other.from;
    }
} Line;

bool compare(const Line& a, const Line& b) {
    return a.to < b.to;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    int n;
    cin >> n;
    vector<Line> lines;
    for(int i = 0 ; i < n ; i++) {
        Line line;
        cin >> line.from >> line.to;
        if(line.from > line.to) {  // swap
            line.to = line.from ^ line.to;
            line.from = line.from ^ line.to;
            line.to = line.from ^ line.to;
        }
        lines.push_back(line);
    }
    int d;
    cin >> d;

    sort(lines.begin(), lines.end(), compare);  // to 기준으로 정렬
    priority_queue<Line> pq;  // from 기준으로 정렬
    int max = 0;
    int start; int end;
    for(int i = 0 ; i < n ; i++) {
        Line line = lines[i];
        end = line.to;
        start = end - d;
        pq.push(line);
        while(!pq.empty() && pq.top().from < start) {  // 범위를 벗어난 라인 모두 삭제
            pq.pop();
        }
        int current = pq.size();
        if(max < current) max = current;
    }
    cout << max;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 스위핑 알고리즘을 응용한 문제.  

- 정렬의 기준이 핵심이 되는 문제였다.  

</div>
</details>

[def]: https://www.acmicpc.net/problem/13334