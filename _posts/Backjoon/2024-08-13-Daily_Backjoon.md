---
layout: post
title: "[데일리 백준] 10775"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-08-13
last_modified_at: 2024-08-13
---
## Gold
### [10775][def]

```c++
#include <iostream>
#include <vector>
#include <set>
using namespace std;

typedef struct Gate {
    bool available;
    set<int>* adjacent;  // 해당 게이트와 인접한 "사용 불가능한" 게이트들 집합
} Gate;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    int g, p;
    cin >> g >> p;
    vector<Gate*> gates;
    for(int i = 0 ; i < g ; i++) {
        Gate* gate = new Gate();
        gate->available = true;
        gates.push_back(gate);
    }

    int count = 0;
    int n;
    for(int i = 0 ; i < p ; i++) {
        cin >> n;
        n--;  // 0-based index
        if(gates[n]->available) {  // 즉시 사용 가능한 경우
            count++;
            gates[n]->available = false;
            set<int>* adjacent = new set<int>();
            adjacent->insert(n);
            gates[n]->adjacent = adjacent;
        }
        else {  // 사용 불가능한 경우, 가장 가까운 사용 가능한 게이트로 이동
            int index = n;
            do {
                index = *(gates[index]->adjacent->begin()) - 1;
                if(index < 0) goto done;  // 사용 가능한 게이트가 없음
            } while(!gates[index]->available);
            count++;
            gates[index]->available = false;
            gates[n]->adjacent->insert(index);
            gates[index]->adjacent = gates[n]->adjacent;
        }
    }
    done:
    cout << count;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 분리 집합이 이게 맞는건지는 잘 모르겠지만, 분리 집합을 짧게 이론만 공부해보았고 나름의 적용을 해보았다.  

- 다만 Union까지 구현하였더니 시간 초과가 났다 . . .

</div>
</details>

[def]: https://www.acmicpc.net/problem/10775