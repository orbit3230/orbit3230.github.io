---
layout: post
title: "[데일리 백준] 1516"
excerpt: "1 Gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-12-09
last_modified_at: 2024-12-09
---
## Gold
### [1516][def]

```c++
#include <iostream>
#include <vector>
#include <queue>
using namespace std;

typedef struct Building {
    int cost;
    vector<Building*> prevs;
    bool optimized = false;
} Building;

int dp(Building& b) {
    if(b.optimized) return b.cost;
    b.optimized = true;
    int prev_max = 0;
    for(Building* prev : b.prevs) {
        prev_max = max(prev_max, dp(*prev));
    }
    return b.cost += prev_max;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    int n;
    cin >> n;
    vector<Building> buildings(n);
    int next;
    for(int i = 0 ; i < n ; i++) {
        cin >> buildings[i].cost;
        while(cin >> next) {
            if(next == -1) break;
            next--;  // 0-based index
            buildings[i].prevs.push_back(&buildings[next]);
        }
    }
    for(Building& b : buildings) {
        dp(b);
        cout << b.cost << '\n';
    }
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 위상정렬의 탈을 쓴, Dynamic Programming 문제 !!!

- [ACM Craft][def2] 문제와 사실상 동일하다고 봐도 된다.  
  - 이때도 속았던 것 같은데 또 속았다 !! ㅠㅠ

- +) 다시 생각해보니까, 위상 정렬로도 풀 수 있다.  
단순히 dp_max 필드를 추가하여 지금까지의 선수 노드들 중 가장 큰 값을 기억하면 된다.  

```c++
#include <iostream>
#include <vector>
#include <queue>
using namespace std;

typedef struct Building {
    int cost;
    int dp_max = 0;
    vector<Building*> nexts;
    int input_degree = 0;
} Building;

void topological_sort(vector<Building>& buildings, int n) {
    queue<Building*> q;
    // initialize
    for(Building& b : buildings) {
        if(!b.input_degree) q.push(&b);
    }
    Building* b;
    while(!q.empty()) {
        b = q.front();
        q.pop();
        for(Building* next : b->nexts) {
            next->input_degree--;
            next->dp_max = max(next->dp_max, b->cost);
            if(!next->input_degree) {
                next->cost += next->dp_max;
                q.push(next);
            }
        }
    }
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    int n;
    cin >> n;
    vector<Building> buildings(n);
    int next;
    for(int i = 0 ; i < n ; i++) {
        cin >> buildings[i].cost;
        while(cin >> next) {
            if(next == -1) break;
            next--;  // 0-based index
            buildings[next].nexts.push_back(&buildings[i]);
            buildings[i].input_degree++;
        }
    }
    topological_sort(buildings, n);
    for(Building& b : buildings) cout << b.cost << '\n';
}
```

</div>
</details>

[def]: https://www.acmicpc.net/problem/1516
[def2]: https://www.acmicpc.net/problem/1005