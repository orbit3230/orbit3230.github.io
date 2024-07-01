---
layout: post
title: "[데일리 백준] 31997"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-06-30
last_modified_at: 2024-06-30
---
## Gold
### [31997][def]

```c++
#include <iostream>
#include <vector>
using namespace std;

typedef struct Attendance {
    int from;
    int to;
} Attendance;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    int N, M, T;
    cin >> N >> M >> T;
    vector<Attendance> attend(N);

    // 참석 정보 입력
    int from, to;
    for(int i = 0 ; i < N ; i++) {
        cin >> from >> to;
        attend[i] = {from, to};
    }

    // 친한 관계에 따른 타임테이블 누적합 완성
    int *timeTable = new int[T];
    for(int i = 0 ; i < T ; i++) {
        timeTable[i] = 0;
    }
    int one, other;
    int oneFrom, oneTo, otherFrom, otherTo;
    int layerFrom, layerTo;
    for(int i = 0 ; i < M ; i++) {
        cin >> one >> other;
        one--; other--;
        oneFrom = attend[one].from; oneTo = attend[one].to;
        otherFrom = attend[other].from; otherTo = attend[other].to;
        layerFrom = (oneFrom > otherFrom) ? oneFrom : otherFrom;
        layerTo = (oneTo < otherTo) ? oneTo : otherTo;

        // 누적합을 효율적으로 계산하는 방법 !!
        if(layerFrom < layerTo) {
            timeTable[layerFrom]++;
            timeTable[layerTo]--;
        }
    }

    int sum = 0;
    for(int i = 0 ; i < T ; i++) {
        sum += timeTable[i];
        cout << sum << '\n';
    }
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 특정 범위에 값을 누적할 때(레이어 시킬 때), 반복문을 사용하여 누적시키는 것은 비효율적이다.  

- 아주 효율적인 방법이 있다.  
  - 시작 인덱스에 `+ a`, 종료 인덱스 + 1에 `- a`
  - 그리고 마지막에 한 번의 루프를 돌며 값을 누적시키는 것이다.  
  - 위 문제에서 이 방법을 사용했다.  
  - 매우 시간적으로 효율적이다.  

  <br>

- 그리고 추가적으로, `set` 보다는 `vector`가 메모리 소모량이 적다.  

</div>
</details> 

[def]: https://www.acmicpc.net/problem/31997